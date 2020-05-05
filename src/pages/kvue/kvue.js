class KVue {
  constructor(options) {
    console.log(options);
    //保存选项
    this.$options = options;
    //传入的data
    this.$data = options.data;
    //响应式处理
    this.observe(this.$data);

    // new Watcher(this,'foo');
    // this.foo;
    // new Watcher(this,'bar.mua');
    // this.bar.mua;
    new Compile(options.el, this);
    if(options.created){
        options.created.call(this)
    }
  }

  observe(value) {
    //传入的必须是对象
    if (!value || typeof value !== "object") {
      return;
    }
    //遍历value
    Object.keys(value).forEach((key) => {
      //响应式处理
      this.defineReactive(value, key, value[key]);
      //   代理data的属性到vue根上
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    //递归遍历
    this.observe(val);
    //定义了一个Dep
    const dep = new Dep(); //每个dep实例和每个key有一一对应关系
    //定义拦截
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newval) {
        if (newval !== val) {
          val = newval;
          dep.notify();
          //   console.log(key, "更新了");
        }
      },
    });
  }
  proxyData(key) {
    //this指向kvue的实例
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newval) {
        this.$data[key] = newval;
      },
    });
  }
}

// export default kvue;

//创建watcher,保存data中数值和页面中的挂钩关系
class Watcher {
  constructor(vm, key, cb) {
    //   创建实例时立即将该实例指向Dep.target,便于依赖收集

    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.vm[this.key]; //触发依赖收集
    Dep.target = null;
  }

  update() {
    console.log(this.key, "更新了");
    this.cb.call(this.vm,this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}
