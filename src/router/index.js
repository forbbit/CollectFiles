import VueRouter from "vue-router";
//import Index from "@/components/Index"
import IndexContent from "@/pages/IndexContent";
import About from "@/pages/About";
import HandIn from "@/pages/HandIn";
import Collect from "@/pages/Collect";

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'IndexContent',
            component: IndexContent
        },
        {
            path:'/about',
            name:'About',
            component:About
        },
        {
            path:'/handIn',
            name:'HandIn',
            component:HandIn
        },
        {
            path:'/collect',
            name:'Collect',
            component:Collect,

        }
    ]
})