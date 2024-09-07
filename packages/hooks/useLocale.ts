import { inject, type Ref } from 'vue';
import { omit } from 'lodash-es';
import { createI18n, i18nSymbol, type I18nInstance } from 'vue3-i18n';
import type { Language } from '@yovy-ui/locale';
import English from '@yovy-ui/locale/lang/en';

/**
 * 将语言对象注入到组件实例中(再vue3-i18n的包中, 所返回的I18nInstance对象里有install, 但不需要, 所以返回实例对象时排除)
 * @param localeOverride 需要注入的语言对象
 * @returns i18n组件实例或组件实例对象
 */
export function useLocale(localeOverride?: Ref<Language>) {
	// 如果没有语言更换的需求
	if (!localeOverride) {
		// 则返回一个I18n组件实例, 一个没有'install'函数的实例对象(因为vue的自定义组件实例对象一般都会有install函数)
		// 所返回的实例对象注入了English语言
		return omit(
			<I18nInstance>(
				inject(
					i18nSymbol,
					createI18n({
						locale: English.name, messages: { en: English.el }
					})
				)
			),
			'install'
		)
	}

	// 如果有语言更换的需求
	return omit(
		// 则返回一个用i18n创造的对象
		createI18n({
			locale: localeOverride.value.name,
			messages: {
				en: English.el,
				[localeOverride.value.name]: localeOverride.value.el
			}
		}),
		'install'
	)
}