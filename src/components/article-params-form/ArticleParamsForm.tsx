import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useState, useEffect, useRef } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClickOutside } from 'src/hooks/useClickOutside';

interface FormProps {
	currentStyle: ArticleStateType;
	onSet: (newStyle: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	currentStyle,
	onSet
}: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentStyle);
	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		setFormState(currentStyle);
	}, [currentStyle]);

	useClickOutside(formRef, () => setIsOpen(false), isOpen);
	
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSet(formState);
	};

	const handleFormClear = (e: React.FormEvent) => {
		e.preventDefault();
		onSet(defaultArticleState);
	};

	const handleParamChange =
		<K extends keyof ArticleStateType>(key: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prevState) => ({
				...prevState,
				[key]: value,
			}));
		};

	const formClassNameChange = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside ref={formRef} className={formClassNameChange}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormClear}>
					<Text
						as='h2'
						size={31}
						weight={800}
						family='open-sans'
						fontStyle='normal'
						align='left'
						uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleParamChange('fontFamilyOption')}
						onClose={() => {}}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleParamChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleParamChange('fontColor')}
						onClose={() => {}}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleParamChange('backgroundColor')}
						onClose={() => {}}
					/>

					<Select
						title='Ширина контента'
						placeholder='Выберите ширину контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleParamChange('contentWidth')}
						onClose={() => {}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
