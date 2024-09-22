import { notification } from './util';
import { globalMountWithInstall } from '@yovy-ui/utils';

export const YoNotification = globalMountWithInstall(notification, '$notification')

export * from './types'