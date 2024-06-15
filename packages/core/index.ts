import { makeInstaller } from '@yovy-ui/utils';
<<<<<<< HEAD
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import '@yovy-ui/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)

// 按需引入
export * from "../components"
=======
import components from './components';
import '@yovy-ui/theme/index.css'

const installer = makeInstaller(components)

// 按需引入
export * from "@yovy-ui/components"
>>>>>>> cfac2cb25c3cd0797e12721fe950de9ff98d6ff9
// 全局引入
export default installer