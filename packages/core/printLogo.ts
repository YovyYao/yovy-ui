/**
 * 打印个人Logo
 */
export default function () {
	if (PROD) {
		const logo = `
		________________________________________________________
		_____.___.                             ____ ___.___ 
		\\__  |   | _______  _____.__.         |    |   \\   |
		 /   |   |/  _ \\  \\/ <   |  |  ______ |    |   /   |
		 \\____   (  <_> )   / \\___  | /_____/ |    |  /|   |
		 / ______|\\____/ \\_/  / ____|         |______/ |___|
		 \\/                   \\/                            
		________________________________________________________
												author: Yovy
		`
		const rainbowGradient = `
			background: linear-gradient(90deg, #60f005, #91a1ba, #7d4cd7, #067ddf, #4b0082, #9400d3);
			background-clip: text;
			color: transparent;
			font-size: 14px;
			line-height: 1.5;
			font-weight: 700;
			font-family: 'Courier New', Courier, monospace;
		`

		console.info(`%c${logo}`, rainbowGradient)
	} else if (DEV) {
		console.log("[YovyUI]:dev mode...")
	}
}