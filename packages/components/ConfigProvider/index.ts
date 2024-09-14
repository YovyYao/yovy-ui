import ConfigProvider from './ConfigProvider.vue';

import { withInstall } from '@yovy-ui/utils';

export const YoConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './util'