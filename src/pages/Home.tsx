import Container from "../components/Container";
import { PhotoWidget } from "../contexts/photos/components/PhotoWidget";

export function Home() {
	return (
		<Container>
			<div className="grid grid-cols-5 gap-9">
				<PhotoWidget
					photo={{
						id: "1",
						title: "Foto",
						imgId: "enchanted-forest-fantasy-background.jpg",
						album: [{ id: "2", title: "Natureza" }],
					}}
				/>
				<PhotoWidget
					loading
					photo={{
						id: "1",
						title: "Foto",
						imgId: "enchanted-forest-fantasy-background.jpg",
						album: [{ id: "2", title: "Natureza" }],
					}}
				/>
				<PhotoWidget
					loading
					photo={{
						id: "1",
						title: "Foto",
						imgId: "enchanted-forest-fantasy-background.jpg",
						album: [{ id: "2", title: "Natureza" }],
					}}
				/>
				<PhotoWidget
					photo={{
						id: "1",
						title: "Foto",
						imgId: "enchanted-forest-fantasy-background.jpg",
						album: [{ id: "2", title: "Natureza" }],
					}}
				/>
			</div>
		</Container>
	);
}
