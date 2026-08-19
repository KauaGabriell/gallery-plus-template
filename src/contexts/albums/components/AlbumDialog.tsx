import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { InputText } from "../../../components/InputText";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import { PhotoImageSelectable } from "../../photos/components/PhotoImageSelectable";
import { usePhotos } from "../../photos/hooks/usePhotos";
import { useCreateAlbum } from "../hooks/useCreateAlbum";
import { type AlbumNewFormSchema, albumNewFormSchema } from "../schema";

interface AlbumDialogProps {
	trigger: React.ReactNode;
}

const skeletonPhotosIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);
export function AlbumDialog({ trigger }: AlbumDialogProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const { photos, isLoadingPhotos } = usePhotos();
	const { mutate } = useCreateAlbum();
	const form = useForm<AlbumNewFormSchema>({
		resolver: zodResolver(albumNewFormSchema),
	});

	function handleSubmit(payload: AlbumNewFormSchema) {
		mutate(
			{ payload, photos },
			{
				onSuccess: () => {
					toast.success("Álbum criado com sucesso!");
					setModalOpen(false);
				},
				onError: () => {
					toast.error("Erro ao criar álbum!");
				},
			},
		);
	}

	function handleTogglePhoto(selected: boolean, photoId: string) {
		const photosIds = form.getValues("photosIds") || [];

		if (selected) {
			form.setValue("photosIds", [...photosIds, photoId]);
			return;
		}

		form.setValue(
			"photosIds",
			photosIds.filter((id) => id !== photoId),
		);
	}

	useEffect(() => {
		if (!modalOpen) {
			form.reset();
		}
	}, [modalOpen, form]);

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<DialogHeader>
						<Text variant="heading-medium">Criar Álbum</Text>
					</DialogHeader>
					<DialogBody className="flex flex-col gap-7">
						<InputText
							error={form.formState.errors.title?.message}
							placeholder="Adicione um título"
							{...form.register("title")}
						/>
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
											<PhotoImageSelectable
												key={photo.id}
												src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
												onSelectImage={(selected) =>
													handleTogglePhoto(selected, photo.id)
												}
											/>
										))}
									</div>
								)}

								{isLoadingPhotos && (
									<div className="flex gap-3">
										{skeletonPhotosIds.map((skeleton) => (
											<Skeleton
												key={skeleton}
												className="w-20 h-20 rounded-lg"
											/>
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
						<Button type="submit">Criar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
