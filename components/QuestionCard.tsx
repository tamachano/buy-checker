'use client'
type Answer = 1 | 0 | -1 | -2 | null

interface Option {
  label: string
  score: 1 | 0 | -1 | -2
}

interface QuestionCardProps {
  question: string
  index: number
  answer: Answer
  options: Option[]
  onAnswer: (score: 1 | 0 | -1 | -2) => void
}

export default function QuestionCard({
  question,
  index,
  answer,
  options,
  onAnswer,
}: QuestionCardProps) {
  const getButtonColor = (score: number): { border: string; bg: string; text: string } => {
    if (score === 1) return { border: '#3498db', bg: '#ebf5fb', text: '#3498db' }
    if (score === 0) return { border: '#95a5a6', bg: '#f8f9fa', text: '#5a6c7d' }
    if (score === -1) return { border: '#e67e22', bg: '#fef5e7', text: '#e67e22' }
    return { border: '#e74c3c', bg: '#fadbd8', text: '#e74c3c' }
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '28px 24px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          color: '#95a5a6',
          paddingLeft:'10px',
          marginBottom: '12px',
          fontWeight: '500',
        }}
      >
         {index + 1}問目
      </div>
      <div
        style={{
          fontSize: '17px',
          color: '#2c3e50',
          marginBottom: '24px',
          fontWeight: '500',
          lineHeight: '1.6',
          textAlign:'center',
        }}
      >
        {question}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {options.map((option, idx) => {
          const isSelected = answer === option.score
          const colors = getButtonColor(option.score)
          
          return (
            <button
              key={idx}
              onClick={() => onAnswer(option.score)}
              style={{
                padding: '14px 20px',
                fontSize: '15px',
                border: isSelected ? `2px solid ${colors.border}` : '2px solid #ecf0f1',
                borderRadius: '12px',
                background: 'white',
                minWidth:'400px',
                color: isSelected ? colors.text : '#95a5a6',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: isSelected ? '600' : '500',
              }}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}