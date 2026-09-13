export default {
	install(Vue) {
		Vue.directive('preventClick', {
			inserted(button, bind) {
				button.addEventListener('click', () => {
					if (!button.disabled) {
						button.disabled = true;
						setTimeout(() => {
							but.disabled = false
						}, 2000)
					}
				})
			}
		})
	}
}