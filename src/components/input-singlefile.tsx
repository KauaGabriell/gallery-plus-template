import { tv, type VariantProps } from "tailwind-variants";
import UploadIcon from "../assets/icons/upload-file.svg?react";
import Icon from "./icon";
import Text from "./text";

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
		Omit<React.ComponentProps<"input">, "size"> {}

export function InputSingleFile({ size }: SingleFileProps) {
	return (
		<div>
			<div className="w-full relative group cursor-pointer">
				<input
					type="file"
					className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
				/>
				<div className={inputSingleFileVariants({ size })}>
					<Icon svg={UploadIcon} className="fill-accent-span w-8 h-8" />
					<Text variant="label-medium" className="text-placeholder">
						Arraste o Arquivo aqui <br /> ou clique para selecionar
					</Text>
				</div>
			</div>
		</div>
	);
}
