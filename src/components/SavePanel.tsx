import { useState } from 'react'
import type { CheckedMap, QtyMap, Preset } from '../types'
import { loadPresets, savePresets } from '../utils'

interface SavePanelProps {
  checked: CheckedMap
  qtys: QtyMap
  total: number
  onLoad: (checked: CheckedMap, qtys: QtyMap) => void
  showToast: (msg: string) => void
}

export function SavePanel({
  checked,
  qtys,
  total,
  onLoad,
  showToast,
}: SavePanelProps) {
  const [name, setName] = useState('')
  const [presets, setPresets] = useState<Preset[]>(loadPresets)
  // 呼び出し中パターンのID（null = 新規モード）
  const [activeId, setActiveId] = useState<number | null>(null)

  const isOverwrite = activeId !== null

  const handleSave = () => {
    const n = name.trim()
    if (!n) {
      showToast('パターン名を入力してください')
      return
    }

    if (isOverwrite) {
      // ── 上書き保存：同IDのデータを更新 ──
      const next = presets.map((p) =>
        p.id === activeId
          ? {
              ...p,
              name: n,
              total,
              checked: { ...checked },
              qtys: { ...qtys },
              savedAt: new Date().toLocaleDateString('ja-JP'),
            }
          : p,
      )
      setPresets(next)
      savePresets(next)
      // 名前は維持、activeId も維持（引き続き上書きモード）
      showToast(`「${n}」を上書き保存しました`)
    } else {
      // ── 新規保存 ──
      const entry: Preset = {
        id: Date.now(),
        name: n,
        total,
        checked: { ...checked },
        qtys: { ...qtys },
        savedAt: new Date().toLocaleDateString('ja-JP'),
      }
      const next = [entry, ...presets]
      setPresets(next)
      savePresets(next)
      // 新規保存後はそのIDを activeId にセット（続けて上書き可能に）
      setActiveId(entry.id)
      showToast(`「${n}」を保存しました`)
    }
  }

  const handleDelete = (id: number) => {
    const next = presets.filter((p) => p.id !== id)
    setPresets(next)
    savePresets(next)
    // 削除したのが呼び出し中パターンなら新規モードに戻す
    if (id === activeId) {
      setActiveId(null)
      setName('')
    }
    showToast('削除しました')
  }

  const handleLoad = (preset: Preset) => {
    onLoad(preset.checked, preset.qtys)
    // パターン名を入力欄にセットし、上書きモードに切り替え
    setName(preset.name)
    setActiveId(preset.id)
    showToast(`「${preset.name}」を読み込みました`)
  }

  const handleNewMode = () => {
    setActiveId(null)
    setName('')
  }

  return (
    <div className="card" style={{ marginTop: 0 }}>
      <div className="card-header">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
        >
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        <span className="card-title">パターン保存 / 呼び出し</span>
      </div>

      <div className="card-body">
        {/* 上書きモード時のインジケーター */}
        {isOverwrite && (
          <div className="overwrite-indicator">
            <span className="overwrite-label">✏️ 上書きモード</span>
            <button className="overwrite-cancel" onClick={handleNewMode}>
              新規に切替
            </button>
          </div>
        )}

        <div className="save-row">
          <input
            className={`input-field${isOverwrite ? ' input-overwrite' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="パターン名（例: MRI月）"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button className="btn btn-primary" onClick={handleSave}>
            {isOverwrite ? '上書き' : '保存'}
          </button>
        </div>

        {presets.length > 0 ? (
          <div className="preset-list" style={{ marginTop: 12 }}>
            {presets.map((p) => (
              <div
                className={`preset-card${p.id === activeId ? ' preset-card-active' : ''}`}
                key={p.id}
              >
                <div
                  className="preset-card-row"
                  onClick={() => handleLoad(p)}
                >
                  <div>
                    <div className="preset-name">{p.name}</div>
                    <div className="preset-meta">
                      {p.total.toLocaleString()}点 · {p.savedAt}
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <div className="preset-actions">
                  <button
                    className="btn btn-danger-ghost"
                    onClick={() => handleDelete(p.id)}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-light)',
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            保存済みパターンはありません
          </div>
        )}
      </div>
    </div>
  )
}


  return (
    <div className="card" style={{ marginTop: 0 }}>
      <div className="card-header">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
        >
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        <span className="card-title">パターン保存 / 呼び出し</span>
      </div>

      <div className="card-body">
        <div className="save-row">
          <input
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="パターン名（例: MRI月）"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button className="btn btn-primary" onClick={handleSave}>
            保存
          </button>
        </div>

        {presets.length > 0 ? (
          <div className="preset-list" style={{ marginTop: 12 }}>
            {presets.map((p) => (
              <div className="preset-card" key={p.id}>
                <div
                  className="preset-card-row"
                  onClick={() => handleLoad(p)}
                >
                  <div>
                    <div className="preset-name">{p.name}</div>
                    <div className="preset-meta">
                      {p.total.toLocaleString()}点 · {p.savedAt}
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <div className="preset-actions">
                  <button
                    className="btn btn-danger-ghost"
                    onClick={() => handleDelete(p.id)}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-light)',
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            保存済みパターンはありません
          </div>
        )}
      </div>
    </div>
  )
}
