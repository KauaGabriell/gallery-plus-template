import { useParams } from "react-router";
import ImageIcon from "../assets/icons/image.svg?react";
import Button from "../components/Button";
import Container from "../components/Container";
import Icon from "../components/Icon";
import { ImagePreview } from "../components/ImagePreview";
import Skeleton from "../components/Skeleton";
import Text from "../components/Text";
import { AlbunsListSelected } from "../contexts/albums/components/AlbunsListSelected";
import { useAlbuns } from "../contexts/albums/hooks/useAlbuns";
import { PhotosNavigator } from "../contexts/photos/components/PhotosNavigator";
import { usePhoto } from "../contexts/photos/hooks/usePhoto";

export function PhotoDetails() {
	const { id } = useParams();
	const { albuns, isLoadingAlbuns } = useAlbuns();

	const {
		photo,
		nextPhotoId,
		previousPhotoId,
		errorStatus,
		isErrorPhotos,
		isLoadingPhotos,
		refetchPhotos,
	} = usePhoto(id);

	if (isLoadingPhotos) {
		return (
			<Container>
				<Skeleton className="h-[31rem] rounded-lg" />
			</Container>
		);
	}

	if (isErrorPhotos && errorStatus !== 404) {
		return (
			<Container>
				<section className="flex min-h-[31rem] flex-col items-center justify-center rounded-lg border border-dashed border-border-primary bg-background-secondary/10 px-6 text-center">
					<div className="mb-5 flex w-14 h-14 items-center justify-center rounded-full border border-accent-red/30 bg-accent-red/10">
						<Icon svg={ImageIcon} className="w-7 h-7 fill-accent-red" />
					</div>
					<Text as="h1" variant="heading-medium">
						Não foi possível carregar a foto
					</Text>
					<Text variant="paragraph-medium" className="mt-2 text-accent-span">
						Verifique sua conexão e tente novamente.
					</Text>
					<Button
						variant="secondary"
						className="mt-5"
						onClick={() => refetchPhotos()}
					>
						Tentar novamente
					</Button>
				</section>
			</Container>
		);
	}

	if (errorStatus === 404 || !photo) {
		return (
			<Container>
				<section className="flex min-h-[31rem] flex-col items-center justify-center rounded-lg border border-dashed border-border-primary bg-background-secondary/10 px-6 text-center">
					<div className="mb-5 flex w-14 h-14 items-center justify-center rounded-full border border-accent-brand/30 bg-accent-brand/10">
						<Icon svg={ImageIcon} className="w-7 h-7 fill-accent-brand" />
					</div>
					<Text as="h1" variant="heading-medium">
						Foto não encontrada
					</Text>
					<Text variant="paragraph-medium" className="mt-2 text-accent-span">
						A foto que você procura não existe ou foi removida.
					</Text>
				</section>
			</Container>
		);
	}

	return (
		<Container>
			<header className="flex items-center justify-between gap-8 mb-8">
				{!isLoadingPhotos ? (
					<Text variant="heading-large">{photo?.title}</Text>
				) : (
					<Skeleton className="w-48 h-8" />
				)}
				<PhotosNavigator
					nextPhotoId={nextPhotoId}
					previousPhotoId={previousPhotoId}
					loading={isLoadingPhotos}
				/>
			</header>
			<div className="grid grid-cols-[21rem_1fr] gap-24">
				<div className="space-y-3">
					{!isLoadingPhotos ? (
						<ImagePreview
							src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
							title={photo?.title}
							className="h-[21rem]"
						/>
					) : (
						<Skeleton className="h-[21rem]" />
					)}
					{!isLoadingPhotos ? (
						<Button variant="destructive">Excluir</Button>
					) : (
						<Skeleton className="w-20 h-10" />
					)}
				</div>
				<div className="p-3">
					<Text variant="heading-medium">Albuns</Text>
					<AlbunsListSelected
						albuns={albuns}
						photo={photo}
						loading={isLoadingAlbuns}
					/>
				</div>
			</div>
		</Container>
	);
}
