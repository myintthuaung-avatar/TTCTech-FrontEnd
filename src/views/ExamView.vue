<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/store/examStore'
import QuestionCard from '@/components/QuestionCard.vue'

const store = useExamStore()
const router = useRouter()

const attemptedSubmit = ref(false)
const nameRules = [(v) => !!v?.trim() || 'กรุณากรอกชื่อ-สกุล']

function handleSubmit() {
  attemptedSubmit.value = true
  if (!store.isComplete) return

  store.submitExam()
  router.push({ name: 'result' })
}
</script>

<template>
  <v-card elevation="2">
    <v-toolbar color="success" flat density="comfortable">
      <v-toolbar-title class="font-weight-medium">IT 10-1</v-toolbar-title>
    </v-toolbar>

    <v-card-text class="pa-6">
      <v-text-field
        v-model="store.fullName"
        label="ชื่อ-สกุล"
        variant="outlined"
        density="comfortable"
        :rules="attemptedSubmit ? nameRules : []"
        class="mb-4"
      />

      <QuestionCard
        v-for="(q, i) in store.questions"
        :key="q.id"
        :question="q"
        :index="i + 1"
        :model-value="store.answers[q.id] ?? null"
        @update:model-value="store.setAnswer(q.id, $event)"
      />

      <v-alert
        v-if="attemptedSubmit && !store.isComplete"
        type="error"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        กรุณากรอกชื่อ-สกุล และตอบคำถามให้ครบทุกข้อ
      </v-alert>

      <v-btn color="primary" size="large" block @click="handleSubmit">
        ส่งข้อสอบ
      </v-btn>
    </v-card-text>
  </v-card>
</template>
