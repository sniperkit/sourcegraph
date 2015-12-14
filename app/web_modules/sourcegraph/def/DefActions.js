export class WantDef {
	constructor(url) {
		this.url = url;
	}
}

export class DefFetched {
	constructor(url, def) {
		this.url = url;
		this.def = def;
	}
}

export class SelectDef {
	constructor(url) {
		this.url = url;
	}
}

export class SelectMultipleDefs {
	constructor(urls, left, top) {
		this.urls = urls;
		this.left = left;
		this.top = top;
	}
}

export class HighlightDef {
	constructor(url) {
		this.url = url;
	}
}

export class WantExample {
	constructor(defURL, index) {
		this.defURL = defURL;
		this.index = index;
	}
}

export class ExampleFetched {
	constructor(defURL, index, example) {
		this.defURL = defURL;
		this.index = index;
		this.example = example;
	}
}

export class NoExampleAvailable {
	constructor(defURL, index) {
		this.defURL = defURL;
		this.index = index;
	}
}