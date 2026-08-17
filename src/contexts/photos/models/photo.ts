import type { Album } from "../../albums/models/album";

export interface Photo {
	id: string;
	title: string;
	imgId: string;
	album: Album[];
}
