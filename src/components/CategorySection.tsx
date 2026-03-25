import { useState } from 'react'
import type { MedicalCategory, CheckedMap, QtyMap } from '../types'
import { ItemRow } from './ItemRow'

interface CategorySectionProps {
  cat: MedicalCategory
  checked: CheckedMap
  qtys: QtyMap
  onToggle: (id: string) => void
  onQty: (id: string, val: number) => void
}

export function CategorySection({
  cat,
  checked,
  qtys,
  onToggle,
  onQty,
}: CategorySectionProps) {
  const [open, setOpen] = useState(true)

  const catTotal = cat.items.reduce((acc, item) => {
    if (!checked[item.id]) return acc
    const q = item.qty ? (qtys[item.id] ?? 1) : 1
    return acc + item.score * q
  }, 0)

  return (
    <div className="cat-section">
      <div className="cat-header" onClick={() => setOpen((o) => !o)}>
        <span className="cat-dot" style={{ background: cat.color }} />
        <span className="cat-name" style={{ color: cat.color }}>
          {cat.name}
        </span>
        {catTotal > 0 && (
          <span className="cat-total">+{catTotal.toLocaleString()}点</span>
        )}
        <span className={`cat-chevron${open ? ' open' : ''}`}>▶</span>
      </div>

      {open && (
        <div className="item-list">
          {cat.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              checked={!!checked[item.id]}
              qty={qtys[item.id] ?? 1}
              onToggle={onToggle}
              onQty={onQty}
            />
          ))}
        </div>
      )}
    </div>
  )
}
