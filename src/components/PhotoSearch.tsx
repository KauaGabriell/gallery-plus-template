import SearchIcon from "../assets/icons/search.svg?react";
import { InputText } from "./InputText";

export function PhotoSearch() {
	return (
		<InputText
			icon={SearchIcon}
			placeholder="Buscar Fotos"
			className="flex-1"
		/>
	);
}
