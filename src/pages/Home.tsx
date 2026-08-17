import Container from "../components/Container";
import { PhotoList } from "../contexts/photos/components/PhotoList";
import type { Photo } from "../contexts/photos/models/photo";

const homePhotos: Photo[] = [
	{
		id: "1",
		title: "Foto",
		imgId: "enchanted-forest-fantasy-background.jpg",
		album: [{ id: "2", title: "Natureza" }],
	},
	{
		id: "2",
		title: "Foto",
		imgId: "enchanted-forest-fantasy-background.jpg",
		album: [{ id: "2", title: "Natureza" }],
	},
	{
		id: "3",
		title: "Foto",
		imgId: "enchanted-forest-fantasy-background.jpg",
		album: [{ id: "2", title: "Natureza" }],
	},
	{
		id: "4",
		title: "Foto",
		imgId: "enchanted-forest-fantasy-background.jpg",
		album: [{ id: "2", title: "Natureza" }],
	},
	{
		id: "5",
		title: "Foto",
		imgId: "enchanted-forest-fantasy-background.jpg",
		album: [{ id: "2", title: "Natureza" }],
	},
];

export function Home() {
	return (
		<Container>
			<PhotoList photos={homePhotos} />
		</Container>
	);
}
