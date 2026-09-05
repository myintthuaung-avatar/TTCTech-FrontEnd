import { defineStore } from 'pinia'
import { questions } from '@/mock/questions'
import { examDb } from '@/mock/examDb'

export const useExamStore = defineStore('exam', {
  state: () => ({
    questions,
    fullName: '',
    // answers[questionId] = choiceId
    answers: {},
    lastResult: null // { fullName, score, total, answers, submittedAt }
  }),

  getters: {
    isComplete(state) {
      return (
        state.fullName.trim().length > 0 &&
        state.questions.every((q) => state.answers[q.id])
      )
    }
  },

  actions: {
    setAnswer(questionId, choiceId) {
      this.answers[questionId] = choiceId
    },

    /**
     * Grade the current answers, persist the submission via the mock DB
     * layer, and store the result for the results page to render.
     */
    submitExam() {
      const detailedAnswers = this.questions.map((q) => {
        const selectedChoiceId = this.answers[q.id] ?? null
        return {
          questionId: q.id,
          text: q.text,
          selectedChoiceId,
          correctChoiceId: q.correctChoiceId,
          isCorrect: selectedChoiceId === q.correctChoiceId
        }
      })

      const score = detailedAnswers.filter((a) => a.isCorrect).length

      const submission = {
        fullName: this.fullName.trim(),
        score,
        total: this.questions.length,
        answers: detailedAnswers
      }

      examDb.saveSubmission(submission)
      this.lastResult = submission
      return submission
    },

    /** Clear all state and start a fresh exam attempt. */
    resetExam() {
      this.fullName = ''
      this.answers = {}
      this.lastResult = null
    }
  }
})
