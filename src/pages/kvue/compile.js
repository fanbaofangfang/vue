//文本替换
class Compile {
  //el待编译的模板，vm Vue实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    //把模板中的内容移到片段操作
    this.$fragment = this.node2Fragment(this.$el);
    // 执行编译
    this.compile(this.$fragment);
    // 放回$el中
    this.$el.appendChild(this.$fragment);
  }
  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  //文本替换
  compileText(node) {
    console.log(this.$vm, "$1");
    node.textContent = this.$vm[RegExp.$1];
    const exp = RegExp.$1;
    this.update(node, exp, "text");
  }
  update(node, exp, dir) {
    const updator = this[dir + "Updator"];
    updator && updator(node, this.$vm[exp]);
    //创建watcher实例，依赖收集完成
    new Watcher(this.$vm, exp, function(value) {
      updator && updator(node, value);
    });
  }
  textUpdator(node, value) {
    node.textContent = value;
  }

  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      const attrName = attr.name;
      const exp = attr.value;

      if (attrName.indexOf("k-") == 0) {
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
    });
  }
  text(node, exp) {
    this.update(node, exp, "text");
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (node.nodeType == 1) {
        console.log("编译元素" + node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log("编译差值文本", node);
        this.compileText(node);
      }
      if (node.children && node.childNodes.length > 0) {
        //递归遍历
        this.compile(node);
      }
    });
  }
  isInter(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}
