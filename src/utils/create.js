import Vue from 'vue';
export default function createComponent(Component, props) {
    // 创建组件实例
    const vm = new Vue({
        render(h) {
            return h(Component, { props })
        }
    }).$mount()
    console.log(vm.$root);
    const comp = vm.$children[0];
    document.body.appendChild(comp.$el);
    comp.remove = () => {
        document.body.removeChild(comp.$el);
        vm.$destroy();
    }
}