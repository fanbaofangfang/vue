import VueRouter from 'vue-router';
import Foo from './pages/Foo';
import Home from './pages/Home';
import List from './pages/List'
import Detail from './pages/Detail';
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Home,
            children: [
                {
                    path: "/",
                    component: List
                },
                {
                    path: "/detail/:id",
                    component: Detail,
                    props: true
                }
            ]
        },
        {
            path: "/foo",
            component: Foo
        }]
});

export default router