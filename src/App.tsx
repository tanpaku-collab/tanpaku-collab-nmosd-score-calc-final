import { useState, useCallback, useRef } from 'react'
import type { CheckedMap, QtyMap } from './types'
import { CATEGORIES } from './constants'
import { calcTotal } from './utils'
import { Header } from './components/Header'
import { CategorySection } from './components/CategorySection'
import { ScoreMeter } from './components/ScoreMeter'
import { SavePanel } from './components/SavePanel'
import { Toast } from './components/Toast'

export default function App() {
  const [checked, setChecked] = useState<CheckedMap>({})
  const [qtys, setQtys] = useState<QtyMap>({})
  const [toast, setToast] = useState({ msg: '', show: false })
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = calcTotal(checked, qtys)

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ msg, show: true })
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2200,
    )
  }, [])

  const handleToggle = (id: string) => {
    setChecked((c) => ({ ...c, [id]: !c[id] }))
  }

  const handleQty = (id: string, val: number) => {
    setQtys((q) => ({ ...q, [id]: val }))
  }

  const handleReset = () => {
    setChecked({})
    setQtys({})
    showToast('リセットしました')
  }

  const handleLoad = (c: CheckedMap, q: QtyMap) => {
    setChecked(c)
    setQtys(q)
  }

  return (
    <>
      <Header total={total} />

      <div className="layout">
        {/* ── チェックリスト（メインカラム） ── */}
        <div>
          <div className="card">
            <div className="card-header">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span className="card-title">診療項目チェックリスト</span>
            </div>

            <div className="card-body" style={{ padding: '8px 12px' }}>
              {CATEGORIES.map((cat, i) => (
                <>
                  {i > 0 && <div key={`sep-${cat.id}`} className="sep" />}
                  <CategorySection
                    key={cat.id}
                    cat={cat}
                    checked={checked}
                    qtys={qtys}
                    onToggle={handleToggle}
                    onQty={handleQty}
                  />
                </>
              ))}
            </div>
          </div>

          <div className="reset-row">
            <button className="btn btn-ghost btn-sm" onClick={handleReset}>
              ↺ リセット
            </button>
          </div>
        </div>

        {/* ── サイドバー ── */}
        <div
          className="sidebar"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {/* デスクトップのみ表示：モバイルはヘッダー固定バーで代替 */}
          <div className="sidebar-meter-desktop">
            <ScoreMeter total={total} />
          </div>
          <SavePanel
            checked={checked}
            qtys={qtys}
            total={total}
            onLoad={handleLoad}
            showToast={showToast}
          />
        </div>
      </div>

      <Toast message={toast.msg} show={toast.show} />
    </>
  )
}
