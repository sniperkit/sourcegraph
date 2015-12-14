import autotest from "sourcegraph/util/autotest";

import React from "react";

import ExampleView from "sourcegraph/def/ExampleView";

import testdataInitial from "sourcegraph/def/testdata/ExampleView-initial.json";
import testdataAvailable from "sourcegraph/def/testdata/ExampleView-available.json";
import testdataNoExamples from "sourcegraph/def/testdata/ExampleView-noExamples.json";

describe("ExampleView", () => {
	it("should initially render empty and want example", () => {
		autotest(testdataInitial, `${__dirname}/testdata/ExampleView-initial.json`,
			<ExampleView
				defURL="/someURL"
				examples={{get(defURL, index) { return null; }, getCount(defURL) { return 10; }}}
				highlightedDef={null} />
		);
	});

	it("should display available example", () => {
		autotest(testdataAvailable, `${__dirname}/testdata/ExampleView-available.json`,
			<ExampleView
				defURL="/someURL"
				examples={{get(defURL, index) { return {Repo: "someRepo", File: "foo.go", StartLine: 3, EndLine: 7, SourceCode: {Lines: [{test: "aLine"}]}}; }, getCount(defURL) { return 10; }}}
				highlightedDef="/otherURL" />
		);
	});

	it("should display no examples info", () => {
		autotest(testdataNoExamples, `${__dirname}/testdata/ExampleView-noExamples.json`,
			<ExampleView
				defURL="/someURL"
				examples={{get(defURL, index) { return null; }, getCount(defURL) { return 0; }}}
				highlightedDef={null} />
		);
	});
});