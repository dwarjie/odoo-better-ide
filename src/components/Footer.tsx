import { GitHubLogoIcon, HeartIcon, ReaderIcon } from '@radix-ui/react-icons';
import pkg from '@/../package.json';

export default function Footer() {
	return (
		<footer className="border-base-300 mt-auto flex items-center justify-between border-t px-4 py-3">
			<span className="text-base-content/30 font-mono text-xs">{`v${pkg.version}`}</span>

			<div className="flex items-center gap-1">
				<a
					href="https://github.com/dwarjie/odoo-better-ide"
					target="_blank"
					rel="noopener noreferrer"
					title="View source on GitHub"
					className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content gap-1.5"
				>
					<GitHubLogoIcon className="h-3.5 w-3.5" />
					<span className="text-xs">GitHub</span>
				</a>

				<a
					href="https://ko-fi.com/dwarjie"
					target="_blank"
					rel="noopener noreferrer"
					title="Support the project"
					className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content gap-1.5"
				>
					<HeartIcon className="h-3.5 w-3.5" />
					<span className="text-xs">Support</span>
				</a>
				{/* 
				<a
					href="https://your-docs-site.com"
					target="_blank"
					rel="noopener noreferrer"
					title="Official documentation"
					className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content gap-1.5"
				>
					<ReaderIcon className="h-3.5 w-3.5" />
					<span className="text-xs">Docs</span>
				</a> */}
			</div>
		</footer>
	);
}
