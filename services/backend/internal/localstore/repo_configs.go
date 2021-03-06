package localstore

import (
	"database/sql"

	"golang.org/x/net/context"
	"sourcegraph.com/sourcegraph/sourcegraph/api/sourcegraph"
	"sourcegraph.com/sourcegraph/sourcegraph/pkg/dbutil"
	"sourcegraph.com/sourcegraph/sourcegraph/pkg/store"
	"sourcegraph.com/sourcegraph/sourcegraph/services/backend/accesscontrol"
)

func init() {
	AppSchema.Map.AddTableWithName(dbRepoConfig{}, "repo_config").SetKeys(false, "Repo")
	AppSchema.CreateSQL = append(AppSchema.CreateSQL,
		"ALTER TABLE repo_config ALTER COLUMN apps TYPE text[] USING array[apps]::text[];",
	)
}

// dbRepoConfig DB-maps a sourcegraph.RepoConfig object.
type dbRepoConfig struct {
	// Repo is the URI of the repository that this config is for.
	Repo string

	Apps *dbutil.StringSlice
}

func (c *dbRepoConfig) toRepoConfig() *sourcegraph.RepoConfig {
	if c.Apps == nil {
		c.Apps = &dbutil.StringSlice{}
	}

	return &sourcegraph.RepoConfig{
		Apps: c.Apps.Slice,
	}
}

func (c *dbRepoConfig) fromRepoConfig(repo string, c2 *sourcegraph.RepoConfig) {
	c.Repo = repo
	c.Apps = dbutil.NewSlice(c2.Apps)
}

// repoConfigs is a DB-backed implementation of the RepoConfigs store.
type repoConfigs struct{}

var _ store.RepoConfigs = (*repoConfigs)(nil)

func (s *repoConfigs) Get(ctx context.Context, repo string) (*sourcegraph.RepoConfig, error) {
	if err := accesscontrol.VerifyUserHasReadAccess(ctx, "RepoConfigs.Get", repo); err != nil {
		return nil, err
	}
	var config dbRepoConfig
	if err := appDBH(ctx).SelectOne(&config, `SELECT * FROM repo_config WHERE repo=$1;`, repo); err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return config.toRepoConfig(), nil
}

func (s *repoConfigs) Update(ctx context.Context, repo string, conf sourcegraph.RepoConfig) error {
	if err := accesscontrol.VerifyUserHasWriteAccess(ctx, "RepoConfigs.Update", repo); err != nil {
		return err
	}
	var dbConf dbRepoConfig
	dbConf.fromRepoConfig(repo, &conf)
	n, err := appDBH(ctx).Update(&dbConf)
	if err != nil {
		return err
	}
	if n == 0 {
		// No config row yet exists, so we must insert it.
		return appDBH(ctx).Insert(&dbConf)
	}
	return nil
}
