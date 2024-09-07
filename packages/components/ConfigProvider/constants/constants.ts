import type { ConfigProviderProps } from '../types';
import type { InjectionKey, Ref } from 'vue';

export type ConfigProviderContext = Partial<ConfigProviderProps>

export const ConfigProviderContextKey: InjectionKey<Ref<ConfigProviderContext>> = Symbol()