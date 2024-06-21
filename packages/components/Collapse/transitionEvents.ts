// Collapse的动画效果
const _setHeightZero = (el: HTMLElement) => (el.style.height = '0px')
const _setHeightScroll = (el: HTMLElement) => (el.style.height = `${el.scrollHeight}px`)
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = '')
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = 'hidden')
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = '')
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
	beforeEnter(el: HTMLElement) {
		_setHeightZero(el)
		_setOverflowHidden(el)
	},
	enter: (el: HTMLElement) => _setHeightScroll(el),
	afterEnter(el: HTMLElement) {
		_setHeightEmpty(el)
		_setOverflowEmpty(el)
	},
	beforeLeave(el: HTMLElement) {
		_setHeightScroll(el)
		_setOverflowHidden(el)
	},
	leave: (el) => _setHeightZero(el),
	afterLeave(el: HTMLElement) {
		_setHeightEmpty(el)
		_setOverflowEmpty(el)
	},
}

export default transitionEvents