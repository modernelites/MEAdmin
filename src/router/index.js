import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/home'
import banner from '@/components/banner/banner';
import about from '@/components/about/about';
import course from '@/components/course/course';
import ideaFeedback from '@/components/ideaFeedback/ideaFeedback';
import lecturerManage from '@/components/lecturerManage/lecturerManage';
import moreFile from '@/components/moreFile/moreFile';
import publicNumber from '@/components/publicNumber/publicNumber';
import recommendCourse from '@/components/Course/recommendCourse';
import service from '@/components/service/service';
import organization from '@/components/organization/organization';
import management from '@/components/management/management';
import administration from '@/components/administration/administration';
import teaching from '@/components/teaching/teaching';
import wonderfulImage from '@/components/wonderfulImage/wonderfulImage'
import wonderfulImageDetail from '../components/wonderfulImage/wonderfulImageDetail.vue'
import $ from 'jquery'
Vue.use(Router)

export default new Router({

  routes: [{
      path: '/',
      name: 'index',
      redirect:'/index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path:'/administration',
      name:'administration',
      component:administration,
      // children:[{}]
    },
    {
      path:'/teaching',
      name:'teaching',
      component:teaching,
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      children: [{
          path: 'banner',
          component: banner
        },
        {
          path: 'about',
          component: about
        },
        {
          path: 'course',
          component: course
        },
        {
          path: 'ideaFeedback',
          component: ideaFeedback
        },
        {
          path: 'lecturerManage',
          component: lecturerManage
        },
        {
          path: 'moreFile',
          component: moreFile
        },
        {
          path: 'publicNumber',
          component: publicNumber
        },
        {
          path: 'recommendCourse',
          component: recommendCourse
        },
        {
          path: 'service',
          component: service
        }, {
          path: 'organization',
          component: organization
        },{
          path:'wonderfulImage',
name:'wonderfulImage',
          component:wonderfulImage
        }
        ,{
          path:'wonderfulImage/detail/:id',
          component:wonderfulImageDetail
        }
      ]
    }
  ]
})
