export const clickOutside = {
    beforeMount: function (el: any, binding: any, vnode: any) {
        binding.event = function (event: any) {
            if (!(el === event.target || el.contains(event.target))) {
                if (binding.value instanceof Function) {
                    binding.value(event)
                }
            }
        }
        document.body.addEventListener('click', binding.event)
    },
    unmounted: function (el: any, binding: any, vnode: any) {
        document.body.removeEventListener('click', binding.event)
    }
}