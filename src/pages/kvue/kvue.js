class KVue {
    constructor(options) {
        console.log(options)
        this.$options = options;
        this.$data = options.data;
        new compile(options.el, this)
    }

    observe(value) {
        if (!value || typeof value !== 'object') {
            return;
        }
        //遍历value
        Object.keys(value).forEach(key => {
            //响应式处理
            this.defineReactive(value, key, value[key]);
            //代理data的属性到vue根上
            this.proxyData(key);
        });
    }

    defineReactive(obj, key, val) {
        //递归遍历
        this.observe(val);
        //定义了一个Dep
    }
}

// export default kvue;

//创建watcher,保存data中数值和页面中的挂钩关系
class Watcher {
    constructor(vm, key) {

    }
}