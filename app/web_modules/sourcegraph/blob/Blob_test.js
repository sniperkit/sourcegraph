// @flow weak

import autotest from "sourcegraph/util/autotest";

import React from "react";

import Blob from "sourcegraph/blob/Blob";

import testdataLines from "sourcegraph/blob/testdata/Blob-lines.json";
import testdataNoLineNumbers from "sourcegraph/blob/testdata/Blob-noLineNumbers.json";

describe("Blob", () => {
	it("should render lines", () => {
		autotest(testdataLines, `${__dirname}/testdata/Blob-lines.json`,
			<Blob contents={"hello\nworld"} lineNumbers={true} startLine={1} endLine={2} highlightedDef="otherDef" />
		);
	});

	it("should not render line numbers by default", () => {
		autotest(testdataNoLineNumbers, `${__dirname}/testdata/Blob-noLineNumbers.json`,
			<Blob contents={"hello\nworld"} highlightedDef={null} />
		);
	});
});
