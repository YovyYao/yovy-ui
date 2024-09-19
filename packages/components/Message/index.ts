import { message } from './util/index';

import { globalMountWithInstall } from '@yovy-ui/utils';

export const YoMessage = globalMountWithInstall(message, '$message')

export * from './types'