import VueRouter from "vue-router";
//import Index from "@/components/Index"
import IndexContent from "@/pages/IndexContent";
import About from "@/pages/About";
import HandIn from "@/pages/HandIn";
import Collect from "@/pages/Collect";
import CollectingList from "@/components/CollectingList";
import CollectCompleteList from "@/components/CollectCompleteList";
import CreateCollect from "@/components/CreateCollect";
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
            children:[
                {
                    path:'collecting',
                    name:'Collenting',
                    component:CollectingList
                },
                {
                    path:'collected',
                    name:'Collected',
                    component:CollectCompleteList
                },
                {
                    path:'create',
                    name:'Create',
                    component:CreateCollect
                }
            ]


        }
    ]
})