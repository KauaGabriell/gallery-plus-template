import cx from "classnames";
import type React from "react";
import Button from "../../../components/Button";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import { usePhotos } from "../../photos/hooks/usePhotos";
import type { Album } from "../models/album";

const skeletonAlbumIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);

interface AlbunsFilterProps extends React.ComponentProps<"div"> {
	albums: Album[];
	loading?: boolean;
}

export function AlbunsFilter({
	albums,
	loading,
	className,
	...props
}: AlbunsFilterProps) {
	const { filters } = usePhotos();

	return (
		<div
			className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
			{...props}
		>
			<Text variant="heading-small">Álbuns</Text>
			<div className="flex items-center gap-3">
				{loading ? (
					skeletonAlbumIds.map((skeletonId) => (
						<Skeleton key={skeletonId} className="w-16 h-6" />
					))
				) : (
					<>
						<Button
							variant={filters.albumId === null ? "primary" : "ghost"}
							size="sm"
							onClick={() => filters.setAlbumId(null)}
						>
							Todos
						</Button>
						{albums.map((album) => (
							<Button
								variant={filters.albumId === album.id ? "primary" : "ghost"}
								size="sm"
								key={album.id}
								onClick={() => filters.setAlbumId(album.id)}
							>
								{album.title}
							</Button>
						))}
					</>
				)}
			</div>
		</div>
	);
}
