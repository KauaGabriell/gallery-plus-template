import cx from "classnames";
import type React from "react";
import Button from "../../../components/Button";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
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
						<Button variant="ghost" size="sm">
							Todos
						</Button>
						{albums.map((album) => (
							<Button variant="ghost" size="sm" key={album.id}>
								{album.title}
							</Button>
						))}
					</>
				)}
			</div>
		</div>
	);
}
