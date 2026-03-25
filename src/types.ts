// ─────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────

export interface MedicalItem {
  id: string
  name: string
  sub?: string
  score: number
  /** true の場合、数量を ± ボタンで変更できる */
  qty: boolean
}

export interface MedicalCategory {
  id: string
  name: string
  color: string
  items: MedicalItem[]
}

// ─────────────────────────────────────────
// State types
// ─────────────────────────────────────────

/** item.id → チェック状態 */
export type CheckedMap = Record<string, boolean>

/** item.id → 数量（qty=true の item のみ使用） */
export type QtyMap = Record<string, number>

// ─────────────────────────────────────────
// LocalStorage preset
// ─────────────────────────────────────────

export interface Preset {
  id: number
  name: string
  total: number
  checked: CheckedMap
  qtys: QtyMap
  savedAt: string
}
