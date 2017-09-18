import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
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
import $ from 'jquery'
Vue.use(Router)

export default new Router({

  routes: [{
      path: '/',
      name: 'home',
      redirect:'/home/banner',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home,
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
        }
      ]
    }
  ]
})
