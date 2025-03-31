import { createRouter, createWebHistory } from 'vue-router'; // ต้องใช้ createRouter แทน VueRouter

import StudentInfo from '@/components/StudentInfo.vue';
import EditStudent from '@/components/EditStudent.vue';
import CourseInfo from '@/components/CourseInfo.vue';

const routes = [
  {
    path: '/',
    name: 'StudentInfo',
    component: StudentInfo,
  },
  {
    path: '/edit',
    name: 'EditStudent',
    component: EditStudent,
  },
  {
    path: '/course',
    name: 'CourseInfo',
    component: CourseInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // ใช้ createWebHistory
  routes,
});

export default router;
