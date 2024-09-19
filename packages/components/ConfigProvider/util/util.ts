import { ref, getCurrentInstance, inject, computed, provide, unref, watch } from 'vue';
import type { MaybeRef, Ref, App } from 'vue';
import { type ConfigProviderContext, ConfigProviderContextKey } from '../constants';
import { createI18n, i18nSymbol } from 'vue3-i18n';
import type { TranslatePair } from '@yovy-ui/locale';
import English from '@yovy-ui/locale/lang/en';
import { merge } from 'lodash-es';
import { debugWarn } from '@yovy-ui/utils';

// 全局语言配置(该值的初始值为空, 需要手动切换语言才会有值)
const globalConfig = ref<ConfigProviderContext>()

/**
 * @param key 语言的key
 * @param defaultValue 默认语言
 */
export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(key: K, defaultValue?: D): Ref<Exclude<ConfigProviderContext[K], void>>

/**
 * 
 */
export function useGlobalConfig(): Ref<ConfigProviderContext>

/**
 * 使用全局语言配置
 * @param key 语言的key
 * @param defaultValue 默认语言
 * @returns 如果需要变更语言, 则key有值, 因此返回key; 若不变更语言, 则key无值, 返回默认配置
 */
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = void 0) {
	const config = getCurrentInstance() ? inject(ConfigProviderContextKey, globalConfig) : globalConfig

	return key ? computed(() => config.value?.[key] ?? defaultValue): config
}

/**
 * 利用配置上下文, 获取旧配置和新配置的语言.
 * @param options 上下文(旧配置和新配置的合并对象)
 * @returns 返回一个i18n实例
 */
const _createI18n = (options?: ConfigProviderContext) => {
	// 合并语言包
	const mergeMessage = (message: TranslatePair) => merge(message, options?.extendsI18nMessage ?? {})

	// 如果没有配置语言包, 则使用默认语言包
	if (!options?.locale) {
		return createI18n({
			locale: 'en',
			messages: mergeMessage({
				en: English.el
			})
		})
	}

	return createI18n({
		locale: options.locale?.name || 'en',
		messages: mergeMessage({
			en: English.el,
			[options.locale?.name]: options.locale?.el ?? {}
		})
	})
}

/**
 * 提供全局配置. 
 * @param config 上下文(旧配置和新配置的合并对象)
 * @param app vue的App实例
 * @param global 是否为全局配置(默认为false)
 */
export function provideGloabalConfig(
	config: MaybeRef<ConfigProviderContext> = { locale: English },
	app?: App,
	global = false
) {
	// 获取当前组件实例
	const instance = getCurrentInstance()
	// 更新配置
	const oldConfig = instance ? useGlobalConfig() : void 0
	// 获取app根组件中的provide函数(若没有, 则改为获取instance上的provide函数)
	const provideFn = app?.provide ?? (instance ? provide : void 0)
	console.log('provideFn: ', provideFn);
	// function provideFn<T>(key: InjectionKey<T>, value: T): void {
	// 	provide(key, value)
	// }
	console.log('app2: ', app);
	// 如果provideFn不存在, 则报错
	if (!provideFn) {
		console.log('app: ', app);
		debugWarn('provideGloabalConfig', 'provideGloabalConfig() can only be used inside setup()')
		return
	}

	// 获取上下文(该上下文由旧配置和新配置组成)
	// const context = computed(() => {
	// 	const newConfig = unref(config)
	// 	if (!oldConfig?.value) return newConfig
	// 	return merge(oldConfig.value, newConfig)
	// })
	const context = ref(unref(config))
	watch(
		() => config,
		value => {
			const newConfig = unref(value)
			if (!oldConfig?.value) return newConfig
			context.value = merge(oldConfig.value, newConfig)
		},
		{ deep: true }
	)

	// const i18n = computed(() => _createI18n(context.value))
	const i18n = ref(_createI18n(context.value))
	watch(
		() => context.value,
		value => (i18n.value = _createI18n(value)),
		{ deep: true }
	)

	provideFn(ConfigProviderContextKey, context)
	provideFn(i18nSymbol, i18n)

	// 如果是全局挂载, 则需要用use()
	if (app) app.use(i18n.value)
	// 如果是全局配置或globalConfig不存在, 则将上下文赋值给globalConfig
	if (global || !globalConfig.value) globalConfig.value = context.value

	return context
}