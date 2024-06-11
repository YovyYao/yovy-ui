import { makeInstaller } from '@yovy-ui/utils';
import components from './components';
import '@yovy-ui/theme/index.css'

const installer = makeInstaller(components)

// 按需引入
export * from "@yovy-ui/components"
// 全局引入
export default installer