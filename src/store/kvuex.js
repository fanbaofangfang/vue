
//维护状态state
//修改状态mutation
//业务逻辑控制dispatch
//状态派发getter
//实现响应式

let Vue;

function install(_Vue, storeName = "$store") {
    Vue = _Vue;
    //混入，把store选项指定到Vue原型上
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype[storeName] = this.$options.store;
            }
        }
    })

}

class Store {
    constructor(options = {}) {
        //利用vue数据的响应式
        this.state = new Vue({
            data: options.state
        });
        //初始化mutations
        console.log(options)
        this.mutations = options.mutations || {}
    }
    //触发mutations，需要实现commit
    commit = (type, args) => {
        //this指向store实例
        const fn = this.mutations[type];
        fn(this.state, args)
    }
}

export default { Store, install }
