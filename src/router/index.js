import { createRouter, createWebHistory } from 'vue-router'
import { useExamStore } from '@/store/examStore'

const routes = [
  {
    path: '/',
    name: 'exam',
    component: () => import('@/views/ExamView.vue'),
    meta: { title: 'IT 10-1 · ทำข้อสอบ' }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/ResultView.vue'),
    meta: { title: 'IT 10-2 · ผลสอบ' },
    beforeEnter: () => {
      const store = useExamStore()
      if (!store.lastResult) return { name: 'exam' }
      return true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
