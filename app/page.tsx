'use client'

import { useState, useEffect } from 'react'
import QuestionCard from '../components/QuestionCard'
import Result from '../components/Result'

type Answer = 1 | 0 | -1 | -2 | null
type GameState = 'start' | 'answering' | 'result'

interface Option {
  label: string
  score: 1 | 0 | -1 | -2
}

interface Question {
  text: string
  options: Option[]
}

const ALL_QUESTIONS: Question[] = [
  {
    text: 'それ、今じゃなきゃダメ?',
    options: [
      { label: '今すぐ必要', score: 1 },
      { label: 'できれば今', score: 0 },
      { label: '別に急がない', score: -1 },
      { label: '待てる', score: -2 },
    ],
  },
  {
    text: '買ったあと、どんな気分になってそう?',
    options: [
      { label: 'すごく嬉しい', score: 1 },
      { label: 'まあ満足', score: 0 },
      { label: 'どうだろう', score: -1 },
      { label: '後悔しそう', score: -2 },
    ],
  },
  {
    text: '同じ金額で、もっと満足する選択肢ある?',
    options: [
      { label: 'ない', score: 1 },
      { label: 'たぶんない', score: 0 },
      { label: 'あるかも', score: -1 },
      { label: '絶対ある', score: -2 },
    ],
  },
  {
    text: '不安や焦りで選ぼうとしてない?',
    options: [
      { label: '全然そんなことない', score: 1 },
      { label: 'そうでもない', score: 0 },
      { label: 'ちょっとある', score: -1 },
      { label: 'かなりある', score: -2 },
    ],
  },
  {
    text: '今の生活で置き場所・使う場面、想像できる?',
    options: [
      { label: 'はっきり想像できる', score: 1 },
      { label: 'だいたい分かる', score: 0 },
      { label: 'あいまい', score: -1 },
      { label: '想像できない', score: -2 },
    ],
  },
  {
    text: '来週の自分も欲しいと言いそう?',
    options: [
      { label: '絶対言う', score: 1 },
      { label: 'たぶん言う', score: 0 },
      { label: '分からない', score: -1 },
      { label: '言わなそう', score: -2 },
    ],
  },
  {
    text: '買うことで、守ろうとしてる価値観がある?',
    options: [
      { label: '明確にある', score: 1 },
      { label: 'なんとなくある', score: 0 },
      { label: 'よく分からない', score: -1 },
      { label: '何も守ってない', score: -2 },
    ],
  },
  {
    text: '買わない場合のデメリットは本当にある?',
    options: [
      { label: '確実にある', score: 1 },
      { label: 'ありそう', score: 0 },
      { label: 'ないかも', score: -1 },
      { label: 'ない', score: -2 },
    ],
  },
]

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([null, null, null])

  const startGame = () => {
    const shuffled = shuffleArray(ALL_QUESTIONS)
    setQuestions(shuffled.slice(0, 3))
    setAnswers([null, null, null])
    setGameState('answering')
  }

  const handleAnswer = (index: number, score: 1 | 0 | -1 | -2) => {
    const newAnswers = [...answers]
    newAnswers[index] = score
    setAnswers(newAnswers)
  }

  const answeredCount = answers.filter((a) => a !== null).length
  const allAnswered = answeredCount === 3

  useEffect(() => {
    if (allAnswered && gameState === 'answering') {
      setTimeout(() => {
        setGameState('result')
      }, 300)
    }
  }, [allAnswered, gameState])

  const totalScore = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0)

  const handleRestart = () => {
    setGameState('start')
  }

  const currentQuestionIndex = answers.findIndex((a) => a === null)

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px 20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {gameState === 'start' && (
          <>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '12px',
                color: '#2c3e50',
                letterSpacing: '0.02em',
              }}
            >
              それ、買うbuy?
            </h1>
            <p
              style={{
                fontSize: '14px',
                textAlign: 'center',
                color: '#95a5a6',
                marginBottom: '40px',
                fontWeight: '500',
              }}
            >
              満足度の高い買い物を増やしませんか？
            </p>
            <div
              style={{
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#5a6c7d',
                  marginBottom: '10px',
                  lineHeight: '1.8',
                }}
              >
                簡単なランダムな3つの質問をします
              </div>
              <button
                onClick={startGame}
                style={{
                  padding: '16px 48px',
                  fontSize: '17px',
                  fontWeight: '600',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.96)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                はじめる
              </button>
            </div>
          </>
        )}

        {gameState === 'answering' && currentQuestionIndex !== -1 && (
          <>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#95a5a6',
                fontWeight: '600',
              }}
            >
              {answeredCount} / 3 回答完了
            </div>
            <QuestionCard
              question={questions[currentQuestionIndex].text}
              index={currentQuestionIndex}
              answer={answers[currentQuestionIndex]}
              options={questions[currentQuestionIndex].options}
              onAnswer={(score) => handleAnswer(currentQuestionIndex, score)}
            />
          </>
        )}

        {gameState === 'result' && (
          <Result totalScore={totalScore} onRestart={handleRestart} />
        )}
      </div>
    </main>
  )
}