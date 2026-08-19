import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "classnames";
import type React from "react";
import xIcon from "../assets/icons/x.svg?react";
import ButtonIcon from "./ButtonIcon";
import Card from "./Card";
import Divider from "./Divider";
import Text from "./Text";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogDescription = DialogPrimitive.Description;
export const DialogTitle = DialogPrimitive.Title;

export function DialogHeader({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<>
			<header
				className={cn("flex items-center justify-between", className)}
				{...props}
			>
				<DialogPrimitive.Title>
					<Text variant="heading-medium" className="flex-1">
						{children}
					</Text>
				</DialogPrimitive.Title>
				<DialogClose asChild>
					<ButtonIcon icon={xIcon} variant="ghost" />
				</DialogClose>
			</header>
			<Divider className="mt-1.5 mb-5" />
		</>
	);
}

export function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				"fixed inset-0 z-50 bg-background-secondary/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogContent({
	className,
	cardSize = "lg",
	children,
	ref,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	cardSize?: "none" | "md" | "lg";
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed top-1/2 left-1/2 z-[60] w-full max-w-[32rem] -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-[48%]",
					className,
				)}
				{...props}
			>
				<Card size={cardSize} variant="primary">
					{children}
				</Card>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

export function DialogBody({
	children,
	...props
}: React.ComponentProps<"div">) {
	return <div {...props}>{children}</div>;
}

export function DialogFooter({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<>
			<Divider className="mt-5 mb-3" />
			<div
				className={cn("flex items-center justify-end gap-3", className)}
				{...props}
			>
				{children}
			</div>
		</>
	);
}
