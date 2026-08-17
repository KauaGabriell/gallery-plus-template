import { useParams } from "react-router";
import Button from "../components/Button";
import Container from "../components/Container";
import { ImagePreview } from "../components/ImagePreview";
import Skeleton from "../components/Skeleton";
import Text from "../components/Text";
import { AlbunsListSelected } from "../contexts/albums/components/AlbunsListSelected";
import { PhotosNavigator } from "../contexts/photos/components/PhotosNavigator";
import type { Photo } from "../contexts/photos/models/photo";

export function PhotoDetails() {
	const { id } = useParams();

	const isLoadingPhoto = false;
	const photo = {
		id: "1",
		title: "Foto",
		imgId: "wide-cafeteria.png",
		album: [
			{
				id: "1",
				title: "Espaços",
			},
			{
				id: "2",
				title: "Viagens",
			},
			{
				id: "3",
				title: "Pets",
			},
		],
	} as Photo;
	return (
		<Container>
			<header className="flex items-center justify-between gap-8 mb-8">
				{!isLoadingPhoto ? (
					<Text variant="heading-large">{photo?.title}</Text>
				) : (
					<Skeleton className="w-48 h-8" />
				)}
				<PhotosNavigator loading={isLoadingPhoto} />
			</header>
			<div className="grid grid-cols-[21rem_1fr] gap-24">
				<div className="space-y-3">
					{!isLoadingPhoto ? (
						<ImagePreview
							src={`/images/${photo?.imgId}`}
							title={photo?.title}
							className="h-[21rem]"
						/>
					) : (
						<Skeleton className="h-[21rem]" />
					)}
					{!isLoadingPhoto ? (
						<Button variant="destructive">Excluir</Button>
					) : (
						<Skeleton className="w-20 h-10" />
					)}
				</div>
				<div className="p-3">
					<Text variant="heading-medium">Albuns</Text>
					<AlbunsListSelected
						albuns={[
							{ id: "1", title: "Album 1" },
							{ id: "2", title: "Album 2" },
							{ id: "3", title: "Album 3" },
							{ id: "4", title: "Album 4" },
						]}
						photo={photo}
						loading={isLoadingPhoto}
					/>
				</div>
			</div>
		</Container>
	);
}
