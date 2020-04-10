
import Vue from 'vue';
import Foo from '../pages/Foo';
import Home from '../pages/Home';
import VueRouter from './krouter';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
        },
        {
            path: "/foo",
            component: Foo
        }]
});

export default router;