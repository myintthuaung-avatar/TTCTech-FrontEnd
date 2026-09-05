// Mock "database" for exam submissions.
// Swap this module for a real API client (fetch/axios to example.com/api/...)
// without touching any component code - the store only calls saveSubmission().

const STORAGE_KEY = 'exam_submissions'

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function writeAll(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

export const examDb = {
  /**
   * Persist one exam submission.
   * @param {{ fullName: string, score: number, total: number, answers: Array }} submission
   * @returns {{ id: number }} the saved row's generated id
   */
  saveSubmission(submission) {
    const rows = readAll()
    const row = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      ...submission
    }
    rows.push(row)
    writeAll(rows)
    return { id: row.id }
  },

  getAllSubmissions() {
    return readAll()
  },

  getLatestSubmission() {
    const rows = readAll()
    return rows.length ? rows[rows.length - 1] : null
  }
}
