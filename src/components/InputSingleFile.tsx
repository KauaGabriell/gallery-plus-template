import type React from "react";
import type { ReactNode } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";
import ImageIcon from "../assets/icons/image.svg?react";
import UploadIcon from "../assets/icons/upload-file.svg?react";
import Icon from "./Icon";
import Text from "./Text";

export const inputSingleFileVariants = tv({
	base: "flex flex-col items-center justify-center w-full border border-solid border-border-primary group-hover:border-border-active rounded-lg gap-1 transition",
	variants: {
		size: {
			md: "px-5 py-6",
		},
	},
	defaultVariants: { size: "md" },
});

interface SingleFileProps
	extends VariantProps<typeof inputSingleFileVariants>,
		Omit<React.ComponentProps<"input">, "size" | "form"> {
	form: UseFormReturn;
	error?: React.ReactNode;
	allowedExtensions: string[];
	replaceBy: ReactNode;
	maxFileSizeInMB: number;
}

export function InputSingleFile({
	size,
	error,
	form,
	allowedExtensions,
	replaceBy,
	maxFileSizeInMB,
	...props
}: SingleFileProps) {
	const name = props.name || "";
	const formValues = useWatch({ control: form.control, name: name });
	const formFile: File | undefined = formValues?.[0];
	const fileExtension = formFile?.name?.split(".")?.pop()?.toLocaleLowerCase();
	const fileSize = formFile?.size || 0;

	function isValidExtension() {
		if (!fileExtension) {
			return false;
		}
		return allowedExtensions.includes(fileExtension);
	}

	function isValidMaxSize() {
		return fileSize <= maxFileSizeInMB * 1024 * 1024;
	}

	function isValidFile() {
		return isValidExtension() && isValidMaxSize();
	}

	function handleRemoveFile() {
		form.setValue(name, undefined);
	}

	return (
		<div>
			{!formFile || !isValidFile() ? (
				<div className="w-full relative group cursor-pointer">
					<input
						type="file"
						className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
						{...props}
					/>
					<div className={inputSingleFileVariants({ size })}>
						<Icon svg={UploadIcon} className="fill-accent-span w-8 h-8" />
						<Text variant="label-medium" className="text-placeholder">
							Arraste o Arquivo aqui <br /> ou clique para selecionar
						</Text>
					</div>
				</div>
			) : (
				<>
					{replaceBy}
					<div className="flex items-center gap-3 border-2 border-border-primary rounded p-3 mt-5">
						<Icon svg={ImageIcon} className="w-6 h-6 fill-white" />
						<div className="flex flex-col w-full items-start">
							<Text variant="label-medium" className="text-placeholder">
								{formFile.name}
							</Text>
							<button
								type="button"
								className="text-accent-red hover:underline cursor-pointer"
								onClick={handleRemoveFile}
							>
								Remover
							</button>
						</div>
					</div>
				</>
			)}
			{formFile && !isValidExtension() && (
				<Text variant="label-small" className="text-accent-red">
					Tipo do arquivo inválido
				</Text>
			)}
			{formFile && !isValidMaxSize() && (
				<Text variant="label-small" className="text-accent-red">
					Tamanho do arquivo ultrapassa o limite: {maxFileSizeInMB}MB
				</Text>
			)}
			{error && (
				<Text variant="label-small" className="text-accent-red">
					{error}
				</Text>
			)}
		</div>
	);
}
