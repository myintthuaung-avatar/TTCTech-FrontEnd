<script setup>
import { useRouter } from 'vue-router'
import { useExamStore } from '@/store/examStore'

const store = useExamStore()
const router = useRouter()
const result = store.lastResult

function choiceLabel(question, choiceId) {
  return question.choices.find((c) => c.id === choiceId)?.label ?? '-'
}

function handleRetake() {
  store.resetExam()
  router.push({ name: 'exam' })
}
</script>

<template>
  <v-card v-if="result" elevation="2">
    <v-toolbar color="success" flat density="comfortable">
      <v-toolbar-title class="font-weight-medium">IT 10-2</v-toolbar-title>
    </v-toolbar>

    <v-card-text class="pa-6">
      <p class="text-subtitle-1 mb-4">
        <span class="font-weight-medium">ชื่อ-สกุล:</span> {{ result.fullName }}
      </p>

      <v-card
        v-for="(a, i) in result.answers"
        :key="a.questionId"
        variant="outlined"
        class="pa-4 mb-4"
      >
        <div class="d-flex align-center justify-space-between mb-2">
          <p class="text-subtitle-1 font-weight-medium mb-0">
            {{ i + 1 }}. {{ a.text }}
          </p>
          <v-icon
            :icon="a.isCorrect ? 'mdi-check-circle' : 'mdi-close-circle'"
            :color="a.isCorrect ? 'success' : 'error'"
          />
        </div>

        <p class="text-body-2 mb-1">
          คำตอบของคุณ:
          <span :class="a.isCorrect ? 'text-success' : 'text-error'" class="font-weight-medium">
            {{ choiceLabel(store.questions[i], a.selectedChoiceId) }}
          </span>
        </p>
        <p v-if="!a.isCorrect" class="text-body-2 text-medium-emphasis mb-0">
          คำตอบที่ถูกต้อง: {{ choiceLabel(store.questions[i], a.correctChoiceId) }}
        </p>
      </v-card>

      <v-divider class="mb-4" />

      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <v-btn color="primary" size="large" @click="handleRetake">
          สอบอีกครั้ง
        </v-btn>

        <p class="text-subtitle-1 font-weight-medium mb-0">
          คุณ {{ result.fullName }} สอบได้คะแนน : {{ result.score }}/{{ result.total }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
