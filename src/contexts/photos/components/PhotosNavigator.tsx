import cx from "classnames";
import type React from "react";
import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import Button from "../../../components/Button";
import ButtonIcon from "../../../components/ButtonIcon";
import Skeleton from "../../../components/Skeleton";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
	nextPhotoId?: string;
	previousPhotoId?: string;
	loading?: boolean;
}

export function PhotosNavigator({
	nextPhotoId,
	previousPhotoId,
	loading,
	className,
	...props
}: PhotosNavigatorProps) {
	const navigate = useNavigate();

	return (
		<div className={cx("flex gap-2", className)} {...props}>
			{!loading ? (
				<>
					<ButtonIcon
						variant="secondary"
						icon={ArrowLeftIcon}
						disabled={!previousPhotoId}
						onClick={() => navigate(`/fotos/${previousPhotoId}`)}
						aria-label="Previous"
					/>

					<Button
						variant="secondary"
						icon={ArrowRightIcon}
						disabled={!nextPhotoId}
						onClick={() => navigate(`/fotos/${nextPhotoId}`)}
					>
						Próxima Imagem
					</Button>
				</>
			) : (
				<>
					<Skeleton className="w-10 h-10" />
					<Skeleton className="w-35 h-10" />
				</>
			)}
		</div>
	);
}
