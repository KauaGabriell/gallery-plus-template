import { useQuery } from "@tanstack/react-query";
import { createSerializer, parseAsString, useQueryState } from "nuqs";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

const toSearchParams = createSerializer({
	albumId: parseAsString,
	q: parseAsString,
});

export function usePhotos() {
	const [albumId, setAlbumId] = useQueryState("albumId");
	const [q, setQ] = useQueryState("q");

	const { data, error, isError, isLoading, refetch } = useQuery<Photo[]>({
		queryKey: ["photos", albumId, q],
		queryFn: async () => fetcher(`/photos${toSearchParams({ albumId, q })}`),
	});

	return {
		photos: data ?? [],
		errorPhotos: error,
		isErrorPhotos: isError,
		isLoadingPhotos: isLoading,
		refetchPhotos: refetch,
		filters: { albumId, setAlbumId, q, setQ },
	};
}
