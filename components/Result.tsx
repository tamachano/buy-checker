'use client'

interface ResultProps {
  totalScore: number
  onRestart: () => void
}

export default function Result({ totalScore, onRestart }: ResultProps) {
  // スコア範囲: -6 〜 +3 (4択 × 3問)
  // 正規化: (score + 6) / 9 * 100
  const goDegree = Math.round(((totalScore + 6) / 9) * 100)
  const seeMeDegree = 100 - goDegree

  // スコアに応じたメッセージ
  const getMessage = (): string => {
    if (totalScore >= 2) {
      return '前向きですね、買っても後悔はしなさそうです!'
    } else if (totalScore >= 0) {
      return '少し時間を置いて、それでも欲しいと思えば買ってみてはいかがですか。'
    } else if (totalScore >= -3) {
      return '引っかかる部分が多いので、一度時間を置いて考えてみましょう。'
    } else {
      return '今回は見送ったほうがいいかもしれません'
    }
  }

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px 28px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '15px',
            color: '#95a5a6',
            marginBottom: '32px',
            fontWeight: '500',
          }}
        >
          購入おすすめ度
        </div>

        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: '#e67e22',
                fontWeight: '600',
              }}
            >
              GO!
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#3498db',
                fontWeight: '600',
              }}
            >
              見送り
            </span>
          </div>

          <div
            style={{
              height: '32px',
              background: '#ecf0f1',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: `${goDegree}%`,
                background: 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)',
                transition: 'width 0.8s ease',
              }}
            />
            <div
              style={{
                width: `${seeMeDegree}%`,
                background: 'linear-gradient(90deg, #3498db 0%, #5dade2 100%)',
                transition: 'width 0.8s ease',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: '#e67e22',
                fontWeight: '700',
              }}
            >
              {goDegree}%
            </span>
            <span
              style={{
                fontSize: '24px',
                color: '#3498db',
                fontWeight: '700',
              }}
            >
              {seeMeDegree}%
            </span>
          </div>
        </div>

        <div
          style={{
            padding: '24px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              color: '#5a6c7d',
              lineHeight: '1.8',
              margin: 0,
            }}
          >
            {getMessage()}
          </p>
        </div>

        <button
          onClick={onRestart}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          もう一回
        </button>
      </div>
    </div>
  )
}

