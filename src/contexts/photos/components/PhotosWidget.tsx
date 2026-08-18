import { Link } from "react-router";
import imgTest from "../../../assets/images/enchanted-forest-fantasy-background.jpg";
import Badge from "../../../components/Badge";
import { buttonTextVariants, buttonVariants } from "../../../components/Button";
import { ImagePreview } from "../../../components/ImagePreview";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import type { Photo } from "../models/photo";

const skeletonAlbumIds = ["skeleton-0", "skeleton-1"];

interface PhotoWidgetProps {
	photo: Photo;
	loading?: boolean;
}

export function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
	return (
		<div className="flex flex-col gap-4">
			{!loading ? (
				<ImagePreview
					src={imgTest}
					title={photo.title}
					className="w-[10.875rem] h-[10.875rem] rounded-lg"
				/>
			) : (
				<Skeleton className="max-w-[10.875rem] h-[10.875rem] rounded-lg" />
			)}

			<div className="flex flex-col gap-2">
				{!loading ? (
					<Text variant="paragraph-large" className="truncate">
						{photo.title}
					</Text>
				) : (
					<Skeleton className="w-full h-6" />
				)}
				<div className="flex felx-col gap-1 min-h-5">
					{!loading ? (
						<>
							{photo.album.slice(0, 1).map((album) => (
								<Badge className="truncate" size="xs" key={album.id}>
									{album.title}
								</Badge>
							))}
							{photo.album.length > 1 && (
								<Badge size="xs">+{photo.album.length - 1}</Badge>
							)}
						</>
					) : (
						skeletonAlbumIds.map((skeletonId) => (
							<Skeleton className="w-full h-4 rounded-sm" key={skeletonId} />
						))
					)}
				</div>
			</div>
			{!loading ? (
				<Link
					to={`/fotos/${photo.id}`}
					className={buttonVariants({
						variant: "secondary",
						className: "px-2 py-2",
					})}
				>
					<Text
						variant="label-medium"
						className={buttonTextVariants({ variant: "secondary", size: "sm" })}
					>
						Detalhes da Imagem
					</Text>
				</Link>
			) : (
				<Skeleton className="w-full h-10" />
			)}
		</div>
	);
}
