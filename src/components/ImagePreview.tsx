import type React from "react";
import { tv } from "tailwind-variants";

const ImagePreviewWrapperVariants = tv({
	base: "rounded-lg overflow-hidden",
});

const ImagePreviewVariants = tv({
	base: "w-full h-full object-cover",
});

interface ImagePreviewProps extends React.ComponentProps<"img"> {
	imgSource?: string;
}

export function ImagePreview({
	imgSource,
	className,
	...props
}: ImagePreviewProps) {
	return (
		<div className={ImagePreviewWrapperVariants()}>
			<img
				className={ImagePreviewVariants({ className })}
				src={imgSource}
				alt="Imagem"
				{...props}
			/>
		</div>
	);
}
