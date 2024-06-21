import { makeInstaller } from '@yovy-ui/utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import printLogo from './printLogo'
import '@yovy-ui/theme/index.css'

// 打印个人logo
printLogo()

library.add(fas)
const installer = makeInstaller(components)

// 按需引入
export * from "@yovy-ui/components"
// 全局引入
export default installer