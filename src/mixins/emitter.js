export default {
    methods: {
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            console.log(this.$parent)
            var name = parent.$options.componentName;
            console.log(name)
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }

        }
    }
}