const routes = [
  //不作为main主组件的子组件写在这
  {
    path: '/login',
    name: 'login',
    meta:{
      noAuth:true
    },
    component: resolve => {
      require(['@/views/login.vue'], resolve);
    }
  },
  
  {
    path: '/*',
    name: 'main',
    component: resolve => {
      require(['@/views/main.vue'], resolve);
    },
    children:[
      //作为main组件的子组件写在这
      /*{
        path: '/survey_list',
        name: 'survey_index',
        component: resolve => {
          require(['@/views/survey/survey_index.vue'], resolve);
        }
      }*/
    ]
  }
]

export default routes