import pkg from "../../package.json";

export class Logger {
	private static PREFIX = `[${pkg.displayName ?? pkg.name}]`;

	static info(...message: unknown[]) {
		console.info(this.PREFIX, ...message);
	}

	static log(...message: unknown[]) {
		console.log(this.PREFIX, ...message);
	}

	static warn(...message: unknown[]) {
		console.warn(this.PREFIX, ...message);
	}

	static error(...message: unknown[]) {
		console.error(this.PREFIX, ...message);
	}
}
