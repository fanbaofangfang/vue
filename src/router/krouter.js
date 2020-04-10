let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;
        //创建一个路由path和route映射
        this.routerMap = {};
        //将来当前路径需要使用current
        this.app = new Vue({
            data: { current: "/" }
        })
    }

    init() {
        //绑定浏览器事件
        this.bindEvents();
        //解析路由配置
        this.createRouteMap(this.$options);
        //创建router-link和router-view
        this.initComponent();
    }
    bindEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));
    }

    onHashChange() {
        console.log(this.app)
        this.app.current = window.location.hash.slice(1) || '/';
    }
    createRouteMap($options) {
        $options.routes.forEach(item => {
            this.routerMap[item.path] = item;
        })
    }
    initComponent() { //声明两个全局组件
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                //渲染a标签
                return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
                // return <a href={this.to}>{this.$slots.default}</a>
            }
        })
        Vue.component('router-view', {
            //箭头函数保留this指向，这里指向vueRouter实例，用来获取当前组件
            render: (h) => {
                const comp = this.routerMap[this.app.current].component;
                return h(comp);

            }
        })

    }
}
//把vueRouter变为插件
VueRouter.install = function (_Vue) {
    Vue = _Vue; //这里保存
    //混入任务
    Vue.mixin({
        beforeCreate() { //这里的代码将来在外面初始化的时候调用，这样实现了vue的扩展
            //这里只希望root组件执行
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    })
}

export default VueRouter
