import { useEffect, RefObject } from 'react';

export const useClickOutside = (
	elementRef: RefObject<HTMLElement>,
	onOutsideClick: () => void,
	isEnabled: boolean = true
) => {
	useEffect(() => {
		if (!isEnabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				elementRef.current &&
				!elementRef.current.contains(e.target as Node)
			) {
				onOutsideClick();
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [elementRef, onOutsideClick, isEnabled]);
};