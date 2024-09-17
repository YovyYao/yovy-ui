import Message from './Message.vue';

import { globalMountWithInstall } from '@yovy-ui/utils';

export const YoMessage = globalMountWithInstall(Message, '$message')

export * from './types'