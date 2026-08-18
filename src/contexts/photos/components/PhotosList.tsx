import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import type { Photo } from "../models/photo";
import { PhotoWidget } from "./PhotosWidget";

const skeletonPhotos = Array.from(
	{ length: 10 },
	(_, index) => `skeleton-${index}`,
);
const skeletonPhoto: Photo = { id: "", title: "", imageId: "", albums: [] };

interface PhotoListProps {
	photos: Photo[];
	loading?: boolean;
}

export function PhotoList({ photos, loading }: PhotoListProps) {
	return (
		<div className="space-y-6">
			{loading ? (
				<div className="flex items-center justify-end">
					<Skeleton className="w-14 h-6" />
				</div>
			) : (
				<Text
					as="div"
					variant="paragraph-large"
					className="flex items-center justify-end text-accent-span gap-1"
				>
					Total: {photos.length}
				</Text>
			)}
			{loading ? (
				<div className="grid grid-cols-5 gap-9">
					{skeletonPhotos.map((skeletonId) => (
						<PhotoWidget key={skeletonId} photo={skeletonPhoto} loading />
					))}
				</div>
			) : photos.length > 0 ? (
				<div className="grid grid-cols-5 gap-9">
					{photos.map((photo) => (
						<PhotoWidget key={photo.id} photo={photo} />
					))}
				</div>
			) : (
				<Text variant="label-medium">Nenhuma foto encontrada</Text>
			)}
		</div>
	);
}
