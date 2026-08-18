import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../helpers/api";
import type { Album } from "../models/album";

export function useAlbuns() {
	const { data, isLoading } = useQuery<Album[]>({
		queryKey: ["album"],
		queryFn: () => fetcher("/albums"),
	});

	return {
		albuns: data || [],
		isLoadingAlbuns: isLoading,
	};
}
