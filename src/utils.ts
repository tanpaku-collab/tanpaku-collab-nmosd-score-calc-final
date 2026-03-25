import { CATEGORIES, STORAGE_KEY } from './constants'
import type { CheckedMap, QtyMap, Preset } from './types'

/** チェック済みアイテムの合計点数を計算する */
export function calcTotal(checked: CheckedMap, qtys: QtyMap): number {
  return CATEGORIES.reduce((total, cat) => {
    return (
      total +
      cat.items.reduce((acc, item) => {
        if (!checked[item.id]) return acc
        const q = item.qty ? (qtys[item.id] ?? 1) : 1
        return acc + item.score * q
      }, 0)
    )
  }, 0)
}

/** LocalStorage からプリセット一覧を読み込む */
export function loadPresets(): Preset[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Preset[]
  } catch {
    return []
  }
}

/** LocalStorage にプリセット一覧を書き込む */
export function savePresets(presets: Preset[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets))
}
