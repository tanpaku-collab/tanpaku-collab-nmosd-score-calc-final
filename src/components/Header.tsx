import { TARGET_SCORE } from '../constants'

interface HeaderProps {
  total: number
}

export function Header({ total }: HeaderProps) {
  const pct = Math.min(100, (total / TARGET_SCORE) * 100)
  const achieved = total >= TARGET_SCORE
  const copay = Math.floor(total * 10 * 0.2)
  const remain = Math.max(0, TARGET_SCORE - total)

  const barColor = achieved ? '#0e9f6e' : pct > 70 ? '#f59e0b' : '#3b82f6'

  return (
    <header className="app-header">
      {/* ══ モバイル：2段レイアウト ／ デスクトップ：1段レイアウト ══ */}
      <div className="app-header-inner">

        {/* ─ Row 1（常時）: タイトル ＋ デスクトップのみスコアブロック ─ */}
        <div className="app-header-row1">
          {/* タイトルブロック */}
          <div className="app-header-title-block">
            <div className="app-header-title-row">
              <span className="app-header-title">NMOSD 外来点数</span>
              <span className="app-header-badge">軽症高額特例</span>
            </div>
            <div className="app-header-sub">医療費総額33,330円超の診療セット</div>
          </div>

          {/* デスクトップ専用スコアブロック（モバイルは Row2 で表示） */}
          <div className="header-score-block header-score-desktop">
            <div className="header-score-nums">
              <div className="header-score-main">
                <span className="header-score-value">{total.toLocaleString()}</span>
                <span className="header-score-unit">点</span>
                {achieved && (
                  <span className="header-score-achieved">🎯 達成！</span>
                )}
              </div>
              <div className="header-score-sub-row">
                <span className="header-score-sub">¥{copay.toLocaleString()}</span>
                <span className="header-score-divider">·</span>
                <span
                  className="header-score-remain"
                  style={{ color: achieved ? '#6ee7b7' : '#fca5a5' }}
                >
                  {achieved ? '条件クリア' : `あと ${remain.toLocaleString()}点`}
                </span>
              </div>
            </div>
            <div className="header-bar-wrap">
              <div className="header-bar-bg">
                <div
                  className="header-bar-fill"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
              <div className="header-bar-pct" style={{ color: barColor }}>
                {Math.round(pct)}%
              </div>
            </div>
          </div>
        </div>

        {/* ─ Row 2（モバイル専用）: スコア ＋ バー ─ */}
        <div className="header-score-mobile">
          <div className="header-mobile-score-row">
            {/* 左：点数 */}
            <div className="header-mobile-score-left">
              <span className="header-mobile-score-value">
                {total.toLocaleString()}
              </span>
              <span className="header-mobile-score-unit">点</span>
              {achieved && (
                <span className="header-mobile-achieved">🎯 達成！</span>
              )}
            </div>
            {/* 右：残り / 自己負担 */}
            <div className="header-mobile-score-right">
              <span
                className="header-mobile-remain"
                style={{ color: achieved ? '#6ee7b7' : '#fca5a5' }}
              >
                {achieved ? '条件クリア' : `あと ${remain.toLocaleString()}点`}
              </span>
              <span className="header-mobile-copay">
                ¥{copay.toLocaleString()}
              </span>
            </div>
          </div>
          {/* プログレスバー */}
          <div className="header-bar-wrap" style={{ marginTop: 4 }}>
            <div className="header-bar-bg">
              <div
                className="header-bar-fill"
                style={{ width: `${pct}%`, background: barColor }}
              />
            </div>
            <div className="header-bar-pct" style={{ color: barColor }}>
              {Math.round(pct)}%
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}
