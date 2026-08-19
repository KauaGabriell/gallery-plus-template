import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../helpers/api";
import type { Photo } from "../../photos/models/photo";
import type { Album } from "../models/album";
import type { AlbumNewFormSchema } from "../schema";

type CreateAlbumVariables = {
	payload: AlbumNewFormSchema;
	photos: Photo[];
};

export function useCreateAlbum() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: ({ payload, photos }: CreateAlbumVariables) =>
			createAlbum(payload, photos),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["album"] });
			queryClient.invalidateQueries({ queryKey: ["photos"] });
		},
	});

	async function createAlbum(payload: AlbumNewFormSchema, photos: Photo[]) {
		const { data: album } = await api.post<Album>("/albums", {
			title: payload.title,
		});

		const selectedPhotos = photos.filter((photo) =>
			payload.photosIds?.includes(photo.id),
		);

		await Promise.all(
			selectedPhotos.map((photo) =>
				api.put(`/photos/${photo.id}/albums`, {
					albumsIds: [...photo.albums.map((album) => album.id), album.id],
				}),
			),
		);

		return album;
	}
	return mutation;
}
