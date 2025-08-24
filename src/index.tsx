import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentStyle, setCurrentStyle] =
		useState<ArticleStateType>(defaultArticleState);

	const setStyle = (newStyle: ArticleStateType) => {
		setCurrentStyle(newStyle);
	};
	const clearStyle = () => {
		setCurrentStyle(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStyle.fontFamilyOption.value,
					'--font-size': currentStyle.fontSizeOption.value,
					'--font-color': currentStyle.fontColor.value,
					'--container-width': currentStyle.contentWidth.value,
					'--bg-color': currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentStyle={currentStyle}
				onSet={setStyle}
				onClear={clearStyle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
