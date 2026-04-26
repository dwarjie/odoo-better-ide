import EditorConfig from '@/components/EditorConfig';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Popup() {
	return (
		<div className="bg-base-100 flex min-h-screen w-full flex-col">
			<Header />
			<main className="flex flex-1 flex-col gap-4 p-4">
				<EditorConfig />
			</main>
			<Footer />
		</div>
	);
}
