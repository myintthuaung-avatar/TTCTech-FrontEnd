// Mock data standing in for a real exam-questions table.
// Each question has a single correct choice (single-select).
export const questions = [
  {
    id: 1,
    text: 'ข้อใดต่างจากข้ออื่น',
    choices: [
      { id: 'a', label: '3' },
      { id: 'b', label: '5' },
      { id: 'c', label: '9' },
      { id: 'd', label: '11' }
    ],
    correctChoiceId: 'c'
  },
  {
    id: 2,
    text: 'X + 2 = 4  จงหาค่า X',
    choices: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' }
    ],
    correctChoiceId: 'b'
  }
]
