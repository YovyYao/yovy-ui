import type { Language, TranslatePair } from '@yovy-ui/locale';

export interface ConfigProviderProps {
	// 哪种语言
	locale?: Language
	// 对应语言的翻译
	extendsI18nMessage?: TranslatePair
}