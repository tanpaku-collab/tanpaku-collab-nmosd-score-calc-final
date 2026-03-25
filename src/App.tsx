import { useState, useCallback, useRef } from 'react'
import type { CheckedMap, QtyMap, FreeItem } from './types'
import { CATEGORIES } from './constants'
import { calcTotal } from './utils'
import { Header } from './components/Header'
import { CategorySection } from './components/CategorySection'
import { ScoreMeter } from './components/ScoreMeter'
import { SavePanel } from './components/SavePanel'
import { Toast } from './components/Toast'

// ─────────────────────────────────────────
// FreeInputSection（自由入力セクション）
// ─────────────────────────────────────────
interface FreeInputSectionProps {
  items: FreeItem[]
  onAdd: () => void
  onDelete: (id: string) => void
  onChange: (id: string, field: 'name' | 'score', value: string) => void
}

function FreeInputSection({ items, onAdd, onDelete, onChange }: FreeInputSectionProps) {
  return (
    <div className="cat-section">
      <div className="cat-header" style={{ cursor: 'default', userSelect: 'none' }}>
        <span className="cat-dot" style={{ background: '#94a3b8' }} />
        <span className="cat-name" style={{ color: '#64748b' }}>その他（自由入力）</span>
      </div>

      <div className="free-item-list">
        {items.map((item) => {
          const scoreNum = parseInt(item.score, 10)
          const hasScore = !isNaN(scoreNum) && scoreNum > 0
          return (
            <div key={item.id} className="free-item-row">
              <input
                className="free-input free-input-name"
                type="text"
                placeholder="項目名（例：特定薬剤処方）"
                value={item.name}
                onChange={(e) => onChange(item.id, 'name', e.target.value)}
              />
              <div className="free-input-score-wrap">
                <input
                  className={`free-input free-input-score${hasScore ? ' has-value' : ''}`}
                  type="number"
                  min="0"
                  placeholder="点数"
                  value={item.score}
                  onChange={(e) => onChange(item.id, 'score', e.target.value)}
                />
                <span className="free-input-unit">点</span>
              </div>
              <button
                className="free-delete-btn"
                onClick={() => onDelete(item.id)}
                title="この行を削除"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          )
        })}

        <button className="free-add-btn" onClick={onAdd}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          行を追加
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// 自由入力の合計点数を計算
// ─────────────────────────────────────────
function calcFreeTotal(items: FreeItem[]): number {
  return items.reduce((acc, item) => {
    const n = parseInt(item.score, 10)
    return acc + (isNaN(n) || n < 0 ? 0 : n)
  }, 0)
}

let freeIdCounter = 0
function newFreeItem(): FreeItem {
  return { id: `free-${++freeIdCounter}`, name: '', score: '' }
}

// ─────────────────────────────────────────
// Main App
// ─────────────────────────────────────────
export default function App() {
  const [checked, setChecked] = useState<CheckedMap>({})
  const [qtys, setQtys] = useState<QtyMap>({})
  const [freeItems, setFreeItems] = useState<FreeItem[]>([newFreeItem()])
  const [toast, setToast] = useState({ msg: '', show: false })
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 合計 = チェック項目 + 自由入力
  const total = calcTotal(checked, qtys) + calcFreeTotal(freeItems)

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

  // リセット：チェック・数量・自由入力すべてクリア
  const handleReset = () => {
    setChecked({})
    setQtys({})
    setFreeItems([newFreeItem()])
    showToast('リセットしました')
  }

  const handleLoad = (c: CheckedMap, q: QtyMap) => {
    setChecked(c)
    setQtys(q)
  }

  // 自由入力ハンドラ
  const handleFreeAdd = () => {
    setFreeItems((prev) => [...prev, newFreeItem()])
  }

  const handleFreeDelete = (id: string) => {
    setFreeItems((prev) => {
      const next = prev.filter((item) => item.id !== id)
      return next.length === 0 ? [newFreeItem()] : next
    })
  }

  const handleFreeChange = (id: string, field: 'name' | 'score', value: string) => {
    setFreeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
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
                <div key={cat.id}>
                  {i > 0 && <div className="sep" />}
                  <CategorySection
                    cat={cat}
                    checked={checked}
                    qtys={qtys}
                    onToggle={handleToggle}
                    onQty={handleQty}
                  />
                </div>
              ))}

              {/* 自由入力セクション */}
              <div className="sep" />
              <FreeInputSection
                items={freeItems}
                onAdd={handleFreeAdd}
                onDelete={handleFreeDelete}
                onChange={handleFreeChange}
              />
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
