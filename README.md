# TTCTech Company — IT Exam (Frontend)

Vue frontend for a single-choice IT exam application, consuming the
`ExampleCompany.Exam.Api` backend.

## Screens

### IT 10-1 — Take the exam
- Examinee enters their **name**.
- Each question is shown in its own card with **radio-button** choices —
  only one answer can be selected per question.
- **SUBMIT AN EXAM** posts the name and selected answers to the backend for
  grading.

### IT 10-2 — Result
- Shows **Name** and, per question, the examinee's answer alongside a
  ✅ / ❌ indicator.
  - Correct answers: green check, answer shown in green.
  - Incorrect answers: red X, the submitted answer in red plus the
    **Correct Answer** shown underneath for reference.
- Displays the final **score** (e.g. `Score: 1/2`).
- **EXAM AGAIN** clears the current state and returns to IT 10-1 for a fresh
  attempt.

> The scoring and "which answer was correct" data displayed here comes
> straight from the backend's grading response — the frontend never
> calculates or stores the correct answer itself.

## Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** as the dev server / build tool
- **Vue Router** — navigation between the exam (IT 10-1) and result (IT 10-2) views
- **Axios** (or `fetch`) for calling the backend API

> If this project was actually scaffolded with Vue CLI instead of Vite,
> swap the run commands below for `npm run serve` and adjust
> `vue.config.js` accordingly — the rest of this document still applies.

## Project structure

```
src/
  assets/                 Global styles, theme colors (teal header/buttons)
  components/
    QuestionCard.vue       One question + its radio-button choices (IT 10-1)
    ResultQuestionCard.vue  One question + correct/incorrect indicator (IT 10-2)
  views/
    ExamView.vue            IT 10-1 — name input, question list, submit
    ResultView.vue           IT 10-2 — name, per-question review, score, "Exam again"
  services/
    examApi.js               Thin wrapper around the backend endpoints
  router/
    index.js                 /exam -> ExamView, /result/:attemptId -> ResultView
  App.vue
  main.js
.env.development
.env.production
index.html
vite.config.js
package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- The backend API running locally (see the backend README) — default
  `http://localhost:5080`

## Setup

```bash
npm install
```

Create an environment file so the app knows where the API lives:

**.env.development**
```
VITE_API_BASE_URL=http://localhost:5080/api
```

## Running locally

```bash
npm run dev
```

By default Vite serves the app at `http://localhost:5173`, which is already
whitelisted in the backend's CORS policy.

## Building for production

```bash
npm run build
```

Outputs static assets to `dist/`. Update `VITE_API_BASE_URL` in
`.env.production` to point at the deployed API before building.

## API integration

| Screen    | Calls                          | Purpose                                                |
|-----------|----------------------------------|---------------------------------------------------------|
| IT 10-1   | `GET /api/exams/{id}`            | Loads the exam paper (questions + choices) on page load |
| IT 10-1   | `POST /api/exams/{id}/submit`    | Submits `{ examineeName, answers }`; navigates to IT 10-2 with the returned result |
| IT 10-2   | `GET /api/attempts/{id}`         | Re-fetches a saved result (e.g. on page refresh)         |

### Submit payload

```json
{
  "examineeName": "Myint",
  "answers": [
    { "questionId": 1, "choiceId": 2 },
    { "questionId": 2, "choiceId": 6 }
  ]
}
```

### Result response (drives the IT 10-2 screen)

```json
{
  "attemptId": 1,
  "examineeName": "Myint",
  "score": 1,
  "totalQuestions": 2,
  "answerReview": [
    {
      "questionId": 1,
      "questionText": "Which is different from the others?",
      "selectedChoiceText": "5",
      "isCorrect": false,
      "correctChoiceText": "9"
    },
    {
      "questionId": 2,
      "questionText": "X + 2 = 4 Find the value of X.",
      "selectedChoiceText": "2",
      "isCorrect": true,
      "correctChoiceText": "2"
    }
  ]
}
```

## Behavior notes

- **Single-select enforcement**: each question renders as a radio group
  (`name="question-{id}"`), so only one choice per question can be active —
  matching IT 10-1.
- **Exam again**: resets local component state (name, selected answers) and
  routes back to `/exam`, requesting a fresh exam paper rather than reusing
  cached data, so a new attempt always starts clean.
- **Validation**: the submit button should stay disabled (or show a message)
  until the name field is filled in and every question has a selection —
  mirroring the backend's own validation of `examineeName`.
