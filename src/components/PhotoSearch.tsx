import React, { useState } from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import { usePhotos } from "../contexts/photos/hooks/usePhotos";
import { debounce } from "../utils/debounce";
import { InputText } from "./InputText";

export function PhotoSearch() {
	const [searchValue, setSearchValue] = useState("");
	const { filters } = usePhotos();

	const debouncedSetValue = React.useCallback(
		debounce((value: string) => filters.setQ(value), 500),
		[],
	);

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setSearchValue(value);
		debouncedSetValue(value);
	}

	return (
		<InputText
			icon={SearchIcon}
			placeholder="Buscar Fotos"
			className="flex-1"
			value={searchValue}
			onChange={handleOnChange}
		/>
	);
}
