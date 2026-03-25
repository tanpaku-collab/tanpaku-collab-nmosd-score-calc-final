import type { MedicalItem } from '../types'

interface ItemRowProps {
  item: MedicalItem
  checked: boolean
  qty: number
  onToggle: (id: string) => void
  onQty: (id: string, val: number) => void
}

function Checkmark() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <polyline
        points="2,6 5,9 10,3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ItemRow({ item, checked, qty, onToggle, onQty }: ItemRowProps) {
  const effectiveQty = qty || 1
  const total = item.score * (item.qty ? effectiveQty : 1)

  return (
    <div
      className={`item-row${checked ? ' checked' : ''}`}
      onClick={() => onToggle(item.id)}
    >
      <div className="item-checkbox">
        {checked && <Checkmark />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="item-name">{item.name}</div>
        {item.sub && <div className="item-sub">{item.sub}</div>}
      </div>

      {item.qty && checked && (
        <div
          className="qty-ctrl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="qty-btn"
            onClick={() => onQty(item.id, Math.max(1, effectiveQty - 1))}
          >
            −
          </button>
          <span className="qty-val">{effectiveQty}</span>
          <button
            className="qty-btn"
            onClick={() => onQty(item.id, effectiveQty + 1)}
          >
            +
          </button>
        </div>
      )}

      <div className="item-score">
        {item.qty && checked && effectiveQty > 1
          ? `${total.toLocaleString()}点`
          : `${item.score.toLocaleString()}点`}
      </div>
    </div>
  )
}
