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
	src,
	className,
	...props
}: ImagePreviewProps) {
	return (
		<div className={ImagePreviewWrapperVariants({ className })}>
			<img
				className={ImagePreviewVariants()}
				src={src ?? imgSource}
				alt="Imagem"
				{...props}
			/>
		</div>
	);
}
