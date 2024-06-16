import { makeInstaller } from '@yovy-ui/utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import '@yovy-ui/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)

// 按需引入
export * from "../components"
// 全局引入
export default installer