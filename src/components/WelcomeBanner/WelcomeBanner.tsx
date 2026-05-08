import { EditorConfig } from '@/types/Config.types';
import './index.css';

interface Props {
	config: EditorConfig;
	onDismiss: () => void;
}

export default function WelcomeBanner({ config, onDismiss }: Props) {
	return (
		<div className="odoo-ide-banner" style={{ fontFamily: config.fontFamily }}>
			<div className="odoo-ide-banner__content">
				<div className="odoo-ide-banner__text">
					<strong>NOTE!</strong>
					<br />
					<span className="odoo-ide-banner__note">
						Make sure to set the Model field, save your record, and reload the
						page if the completion doesn't work.
					</span>
				</div>
			</div>
			<button
				className="odoo-ide-banner__dismiss"
				onClick={onDismiss}
				aria-label="Dismiss"
			>
				✕
			</button>
		</div>
	);
}
