import Container from "../components/Container";
import { AlbunsFilter } from "../contexts/albums/components/AlbunsList";
import type { Album } from "../contexts/albums/models/album";
import { PhotoList } from "../contexts/photos/components/PhotosList";
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

const homeAlbums: Album[] = [
	{ id: "1", title: "Natureza" },
	{ id: "2", title: "Viagem" },
	{ id: "3", title: "Gastronomia" },
	{ id: "4", title: "Fotografia" },
	{ id: "5", title: "Pets" },
];

export function Home() {
	return (
		<Container>
			<AlbunsFilter albums={homeAlbums} />
			<PhotoList photos={homePhotos} />
		</Container>
	);
}
