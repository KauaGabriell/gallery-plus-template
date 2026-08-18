import type React from "react";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Button from "../../../components/Button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "../../../components/Dialog";
import { ImagePreview } from "../../../components/ImagePreview";
import { InputText } from "../../../components/InputText";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import type { Photo } from "../../photos/models/photo";

interface AlbumDialogProps {
	trigger: React.ReactNode;
}

const skeletonPhotosIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);
export function AlbumDialog({ trigger }: AlbumDialogProps) {
	const photos: Photo[] = []; //API FUTURA
	const isLoadingPhotos = false;

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<Text variant="heading-medium">Criar Álbum</Text>
				</DialogHeader>
				<DialogBody className="flex flex-col gap-7">
					<InputText placeholder="Adicione um título" />
					<div className="flex flex-col space-y-3">
						<Text>Fotos Cadastradas</Text>
						{!isLoadingPhotos && photos.length === 0 && (
							<div className="flex flex-col items-center gap-2">
								<SelectCheckboxIllustration />
								<Text variant="paragraph-medium" className="text-center">
									Nenhuma foto disponível para seleção
								</Text>
							</div>
						)}
						<div className="flex gap-3">
							{!isLoadingPhotos && photos.length > 0 && (
								<div className="flex gap-3 flex-wrap">
									{photos.map((photo) => (
										<ImagePreview
											key={photo.id}
											className="w-20 h-20 rounded-lg"
											src={`/images/${photo.imgId}`}
										/>
									))}
								</div>
							)}

							{isLoadingPhotos && (
								<div className="flex gap-3">
									{skeletonPhotosIds.map((skeleton) => (
										<Skeleton key={skeleton} className="w-20 h-20 rounded-lg" />
									))}
								</div>
							)}
						</div>
					</div>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button>Criar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
