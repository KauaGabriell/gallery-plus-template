import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

interface PhotoDetailsResponse extends Photo {
	nextPhotoId?: string;
	previousPhotoId?: string;
}

export function usePhoto(id?: string) {
	const { data, error, isError, isLoading, refetch } =
		useQuery<PhotoDetailsResponse>({
			queryKey: ["photo", id],
			queryFn: async () => fetcher(`/photos/${id}`),
			enabled: !!id,
		});

	return {
		photo: data,
		errorPhotos: error,
		errorStatus: isAxiosError(error) ? error.response?.status : undefined,
		isErrorPhotos: isError,
		isLoadingPhotos: isLoading,
		nextPhotoId: data?.nextPhotoId,
		previousPhotoId: data?.previousPhotoId,
		refetchPhotos: refetch,
	};
}
