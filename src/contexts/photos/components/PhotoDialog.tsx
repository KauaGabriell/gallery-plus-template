import type React from "react";
import { useForm } from "react-hook-form";
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

interface PhotoDialogProps {
	trigger: React.ReactNode;
	loading?: boolean;
}

const skeletonAlbunsIds = Array.from(
	{ length: 5 },
	(_, index) => `skeleton-${index}`,
);

export function PhotoDialog({ trigger }: PhotoDialogProps) {
	const form = useForm();
	const isLoadingPhotoDialog = true;
	const albuns = [
		{ id: "1", title: "Espaços" },
		{ id: "2", title: "Viagens" },
		{ id: "3", title: "Pets" },
	];
	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Adicionar Foto</DialogHeader>
				<DialogBody className="flex flex-col gap-5 mt-7">
					<InputText placeholder="Adicione um título" maxLength={255} />
					<Alert>
						Tamanho Máximo: 50MB
						<br />
						Você pode selecionar arquivos em PNG, JPG, JPEG.
					</Alert>
					<InputSingleFile
						allowedExtensions={["png", "jpg", "jpeg"]}
						form={form}
						maxFileSizeInMB={50}
						replaceBy={<ImagePreview className="w-full h-56" />}
					/>
					<div className="flex flex-col gap-3">
						<Text variant="label-small">Selecionar Álbum</Text>
						{!isLoadingPhotoDialog ? (
							<div className="flex gap-3">
								{albuns.map((album) => (
									<Button variant="ghost" key={album.id}>
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
					<DialogClose>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button variant="primary">Adicionar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
