import { useParams } from "react-router";
import Container from "../components/Container";
import Skeleton from "../components/Skeleton";
import Text from "../components/Text";
import { PhotosNavigator } from "../contexts/photos/components/PhotosNavigator";
import type { Photo } from "../contexts/photos/models/photo";

export function PhotoDetails() {
	const { id } = useParams();

	const isLoadingPhoto = false;
	const photo = {} as Photo;
	return (
		<Container>
			<header className="flex items-center justify-between gap-8 mb-8">
				{!isLoadingPhoto ? (
					<Text>{photo?.title}</Text>
				) : (
					<Skeleton className="w-48 h-8" />
				)}
				<PhotosNavigator loading={isLoadingPhoto} />
			</header>
		</Container>
	);
}
