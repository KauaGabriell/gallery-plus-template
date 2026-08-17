export function debounce<TArgs extends unknown[]>(
	func: (...args: TArgs) => void,
	wait: number,
) {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (...args: TArgs): void => {
		const later = () => {
			timeout = null;
			func(...args);
		};
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(later, wait);
	};
}
