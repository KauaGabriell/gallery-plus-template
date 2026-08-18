import Button from "../components/Button";
import Container from "../components/Container";
import Text from "../components/Text";
import { AlbunsFilter } from "../contexts/albums/components/AlbunsList";
import { useAlbuns } from "../contexts/albums/hooks/useAlbuns";
import { PhotoList } from "../contexts/photos/components/PhotosList";
import { usePhotos } from "../contexts/photos/hooks/usePhotos";

export function Home() {
	const { albuns } = useAlbuns();
	const { photos, isErrorPhotos, isLoadingPhotos, refetchPhotos } = usePhotos();

	return (
		<Container>
			<AlbunsFilter albums={albuns} />
			{isErrorPhotos ? (
				<section className="flex flex-col items-center gap-3 py-16 text-center">
					<Text variant="heading-medium">
						Não foi possível carregar as fotos
					</Text>
					<Text variant="paragraph-medium" className="text-accent-span">
						Verifique sua conexão e tente novamente.
					</Text>
					<Button variant="secondary" onClick={() => refetchPhotos()}>
						Tentar novamente
					</Button>
				</section>
			) : (
				<PhotoList photos={photos} loading={isLoadingPhotos} />
			)}
		</Container>
	);
}
