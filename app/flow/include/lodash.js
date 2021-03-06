declare module "lodash/function/debounce" {
	declare function debounce(func: (...args: any) => any, wait: ?number, options: {leading: boolean, trailing: boolean}): (...args: any) => any;
	declare var exports: typeof debounce;
}

declare module "lodash/function/throttle" {
	declare function throttle(func: (...args: any) => any, wait: ?number, options?: {leading: boolean, trailing: boolean}): (...args: any) => any;
	declare var exports: typeof throttle;
}

declare module "lodash/string/trimLeft" {
	declare function trimLeft(string: string, chars: ?string): string
	declare var exports: typeof trimLeft;
}

declare module "lodash/array/last" {
	declare function last(array: Array<any>): any;
	declare var exports: typeof last;
}

declare module "lodash/number/random" {
	declare function random(lower: number, upper: ?number, floating: ?boolean): any;
	declare var exports: typeof random;
}
