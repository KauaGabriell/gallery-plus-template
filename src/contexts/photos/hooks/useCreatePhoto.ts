import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../schemas";

export function useCreatePhoto() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: createPhoto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["photos"] });
		},
	});

	async function createPhoto(payload: PhotoNewFormSchema) {
		const { data: photo } = await api.post<Photo>("/photos", {
			title: payload.title,
		});

		await api.post(
			`/photos/${photo.id}/image`,
			{
				file: payload.file,
			},
			{ headers: { "Content-Type": "multipart/form-data" } },
		);

		if (payload.albumsIds && payload.albumsIds.length > 0) {
			await api.put(`/photos/${photo.id}/albums`, {
				albumsIds: payload.albumsIds,
			});
		}
	}

	return mutation;
}
