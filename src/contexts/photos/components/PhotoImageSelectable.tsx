import type React from "react";
import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import { ImagePreview } from "../../../components/ImagePreview";
import { InputCheckbox } from "../../../components/InputCheckbox";

export const PhotoImageSelectableVariants = tv({
	base: "relative block w-20 h-20 overflow-hidden rounded-lg cursor-pointer",
	variants: {
		select: {
			true: "outline-2 outline-accent-brand",
		},
	},
});

export interface PhotoImageSelectableProps
	extends React.ComponentProps<typeof ImagePreview> {
	selected?: boolean;
	onSelectImage?: (selected: boolean) => void;
}

export function PhotoImageSelectable({
	className,
	selected,
	onSelectImage,
	...props
}: PhotoImageSelectableProps) {
	const checkboxId = useId();
	const [isSelected, setIsSelected] = useState(selected ?? false);

	function handleSelect() {
		const newValue = !isSelected;

		setIsSelected(newValue);
		onSelectImage?.(newValue);
	}

	return (
		<label
			htmlFor={checkboxId}
			className={PhotoImageSelectableVariants({
				className,
				select: isSelected,
			})}
		>
			<InputCheckbox
				id={checkboxId}
				size="sm"
				defaultChecked={isSelected}
				onChange={handleSelect}
				wrapperClassName="absolute z-10 top-1 left-1"
			/>
			<ImagePreview className="w-full h-full" {...props} />
		</label>
	);
}
