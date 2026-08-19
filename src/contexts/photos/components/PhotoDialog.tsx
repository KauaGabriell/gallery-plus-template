import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Alert from "../../../components/Alert";
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
import { InputSingleFile } from "../../../components/InputSingleFile";
import { InputText } from "../../../components/InputText";
import Skeleton from "../../../components/Skeleton";
import Text from "../../../components/Text";
import { useAlbuns } from "../../albums/hooks/useAlbuns";
import { useCreatePhoto } from "../hooks/useCreatePhoto";
import { type PhotoNewFormSchema, photoNewFormSchema } from "../schemas";

interface PhotoDialogProps {
	trigger: React.ReactNode;
	loading?: boolean;
}

const skeletonAlbunsIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);

export function PhotoDialog({ trigger }: PhotoDialogProps) {
	const [urlFile, setUrlFile] = useState<string | undefined>();
	const { albuns, isLoadingAlbuns } = useAlbuns();
	const { mutate, isPending } = useCreatePhoto();
	const [modalOpen, setModalOpen] = useState(false);

	const form = useForm<PhotoNewFormSchema>({
		resolver: zodResolver(photoNewFormSchema),
	});
	const file = form.watch("file");
	const albunsIds = form.watch("albumsIds");

	function handleSubmit(payload: PhotoNewFormSchema) {
		mutate(payload, {
			onSuccess: () => {
				toast.success("Foto criada com sucesso!");
				setModalOpen(false);
			},
			onError: () => {
				toast.error("Erro ao criar foto");
			},
		});
	}

	function handleToggleAlbum(albumId: string) {
		const albumsIds = form.getValues("albumsIds") || [];
		const albunsSet = new Set(albumsIds);

		if (albunsSet.has(albumId)) {
			albunsSet.delete(albumId);
		} else {
			albunsSet.add(albumId);
		}
		form.setValue("albumsIds", Array.from(albunsSet));
	}

	useEffect(() => {
		if (!modalOpen) {
			form.reset();
		}
	}, [form, modalOpen]);

	useEffect(() => {
		const selectedFile = file?.[0];

		if (!selectedFile) {
			setUrlFile(undefined);
			return;
		}

		const newUrl = URL.createObjectURL(selectedFile);
		setUrlFile(newUrl);

		return () => {
			URL.revokeObjectURL(newUrl);
		};
	}, [file]);

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent cardSize="md" className="max-h-[calc(100dvh-3rem)]">
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<DialogHeader>Adicionar Foto</DialogHeader>
					<DialogBody className="flex flex-col gap-5 mt-7">
						<InputText
							placeholder="Adicione um título"
							maxLength={255}
							{...form.register("title")}
							error={form.formState.errors.title?.message}
						/>
						<Alert>
							Tamanho Máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG.
						</Alert>
						<InputSingleFile
							error={form.formState.errors.file?.message}
							allowedExtensions={["png", "jpg", "jpeg"]}
							form={form}
							maxFileSizeInMB={50}
							replaceBy={
								<ImagePreview
									src={urlFile}
									className="w-full h-[clamp(7rem,calc(100dvh-35rem),12rem)]"
								/>
							}
							{...form.register("file")}
						/>
						<div className="flex flex-col gap-3">
							<Text variant="label-small">Selecionar Álbum</Text>
							{!isLoadingAlbuns ? (
								<div className="flex gap-3">
									{albuns.map((album) => (
										<Button
											variant={
												albunsIds?.includes(album.id) ? "primary" : "ghost"
											}
											key={album.id}
											size="sm"
											className="truncate"
											onClick={() => handleToggleAlbum(album.id)}
										>
											{album.title}
										</Button>
									))}
								</div>
							) : (
								<div className="flex gap-3">
									{skeletonAlbunsIds.map((skeleton) => (
										<Skeleton key={skeleton} className="w-16 h-7" />
									))}
								</div>
							)}
						</div>
					</DialogBody>
					<DialogFooter>
						<DialogClose asChild>
							<Button disabled={isPending} variant="secondary">
								Cancelar
							</Button>
						</DialogClose>
						<Button disabled={isPending} type="submit" variant="primary">
							{isPending ? "Adicionando..." : "Adicionar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
