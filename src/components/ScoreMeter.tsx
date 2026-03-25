import { TARGET_SCORE } from '../constants'

interface ScoreMeterProps {
  total: number
}

export function ScoreMeter({ total }: ScoreMeterProps) {
  const pct = Math.min(100, (total / TARGET_SCORE) * 100)
  const achieved = total >= TARGET_SCORE

  const barColor = achieved
    ? '#0e9f6e'
    : pct > 70
    ? '#f59e0b'
    : '#3b82f6'

  return (
    <div className="meter-wrap">
      <div className="meter-label">月間合計点数</div>

      <div>
        <span className="meter-score">{total.toLocaleString()}</span>
        <span className="meter-unit">点</span>
      </div>
      <div className="meter-target">目標: {TARGET_SCORE.toLocaleString()}点</div>

      <div className="meter-bar-bg">
        <div
          className="meter-bar-fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="progress-pips">
        {[25, 50, 75, 100].map((p) => (
          <div
            key={p}
            className={`pip${pct >= p ? ' filled' : pct >= p - 25 ? ' partial' : ''}`}
          />
        ))}
      </div>

      {achieved && (
        <div className="achievement" key={total}>
          <div className="achievement-emoji">🎯</div>
          <div className="achievement-title">1回分クリア！</div>
          <div className="achievement-sub">自己負担10,000円超 達成</div>
        </div>
      )}
    </div>
  )
}
