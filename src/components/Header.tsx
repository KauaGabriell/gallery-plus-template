import cx from "classnames";
import { Link } from "react-router";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { AlbumDialog } from "../contexts/albums/components/AlbumDialog";
import { PhotoDialog } from "../contexts/photos/components/PhotoDialog";
import Button from "./Button";
import Container from "./Container";
import Divider from "./Divider";
import { PhotoSearch } from "./PhotoSearch";

export function MainHeader({
	className,
	...props
}: React.ComponentProps<typeof Container>) {
	return (
		<Container
			as="header"
			className={cx("flex items-center justify-between gap-10", className)}
			{...props}
		>
			<Link to={"/"}>
				<Logo />
			</Link>
			<PhotoSearch />
			<Divider orientation="vertical" className="h-10" />
			<div className="flex gap-3">
				<PhotoDialog trigger={<Button>Nova Foto</Button>} />
				<AlbumDialog
					trigger={<Button variant="secondary">Criar álbum</Button>}
				/>
			</div>
		</Container>
	);
}
