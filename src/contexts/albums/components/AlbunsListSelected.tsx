import Divider from "../../../components/Divider";
import { InputCheckbox } from "../../../components/InputCheckbox";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import type { Photo } from "../../photos/models/photo";
import type { Album } from "../models/album";

const skeletonAlbumIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);

interface AlbunsListSelectedProps {
	loading?: boolean;
	albuns: Album[];
	photo: Photo;
}

export function AlbunsListSelected({
	loading,
	albuns,
	photo,
}: AlbunsListSelectedProps) {
	function isChecked(albumId: string) {
		const teste = photo.album.some((album) => album.id === albumId);
		return teste;
	}

	function handlePhotoOnAlbum(albumId: string) {
		let albunsIds: string[] = [];

		if (isChecked(albumId)) {
			albunsIds = photo.album
				.filter((album) => album.id !== albumId)
				.map((album) => album.id);
		} else {
			albunsIds = [...photo.album.map((album) => album.id), albumId];
		}
		console.log(albunsIds);
	}

	return (
		<ul className="flex flex-col gap-4 mt-4">
			{!loading ? (
				<div>
					{albuns.map((album, index) => (
						<li key={album.id}>
							<div className="flex items-center justify-between">
								<Text variant="paragraph-medium">{album.title}</Text>
								<InputCheckbox
									defaultChecked={isChecked(album.id)}
									onClick={() => handlePhotoOnAlbum(album.id)}
								/>
							</div>
							{index !== albuns.length - 1 && <Divider className="my-4" />}
						</li>
					))}
				</div>
			) : (
				skeletonAlbumIds.map((skeletonId) => (
					<Skeleton className="h-[2.5rem]" key={skeletonId} />
				))
			)}
		</ul>
	);
}
