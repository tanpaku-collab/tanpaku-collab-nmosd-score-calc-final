import type { MedicalCategory } from './types'

// ─────────────────────────────────────────
// 軽症高額特例の目標点数（自己負担 10,000円超）
// ─────────────────────────────────────────
export const TARGET_SCORE = 3_334

// ─────────────────────────────────────────
// LocalStorage キー
// ─────────────────────────────────────────
export const STORAGE_KEY = 'nmosd_score_presets_v1'

// ─────────────────────────────────────────
// 診療項目マスタ
// ※ score を変更することで点数を随時調整可能
// ─────────────────────────────────────────
export const CATEGORIES: MedicalCategory[] = [
  {
    id: 'basic',
    name: '基本・管理料',
    color: '#3b82f6',
    items: [
      { id: 'saiken',       name: '再診料',               sub: '外来（通常）',                   score: 73,  qty: false },
      { id: 'gairaishinsatsu', name: '外来診療料',         sub: '200床以上の病院',                score: 74,  qty: false },
      { id: 'tokutei',      name: '特定疾患管理料',         sub: '主病が厚生労働大臣指定疾患',     score: 225, qty: false },
      { id: 'nanbyo',       name: '難病外来指導管理料',     sub: '指定難病の患者（月1回）',        score: 270, qty: false },
      { id: 'shoho',        name: '処方箋料（特定疾患）',   sub: '特定疾患処方管理加算含む',       score: 68,  qty: false },
      { id: 'shoho_long',   name: '処方箋料（長期処方加算）', sub: '28日以上の処方',              score: 65,  qty: false },
    ],
  },
  {
    id: 'mri',
    name: 'MRI 検査',
    color: '#8b5cf6',
    items: [
      { id: 'mri_15_1',    name: 'MRI撮影（1.5T以上・1部位）', sub: '脳・脊髄など単独部位',      score: 1_330, qty: true },
      { id: 'mri_3t_1',    name: 'MRI撮影（3T以上・1部位）',   sub: '高磁場MRI',                 score: 1_600, qty: true },
      { id: 'mri_contrast',name: '造影剤使用加算',              sub: 'ガドリニウム系造影剤',       score: 500,   qty: true },
      { id: 'mri_eimage',  name: '電子画像管理加算（MRI）',     sub: '撮影1回につき',              score: 120,   qty: true },
      { id: 'mri_2site',   name: 'MRI 2部位目（同日）',         sub: '1部位追加ごと',              score: 330,   qty: true },
      { id: 'ct_1',        name: 'CT撮影（64列以上マルチスライス）', sub: '1部位',                 score: 1_020, qty: true },
      { id: 'ct_eimage',   name: '電子画像管理加算（CT）',      sub: '撮影1回につき',              score: 120,   qty: true },
    ],
  },
  {
    id: 'lab',
    name: '血液・検査',
    color: '#0e9f6e',
    items: [
      { id: 'aqp4',          name: '抗アクアポリン4抗体測定',   sub: 'NMOSD特異的バイオマーカー', score: 620, qty: false },
      { id: 'mog',           name: '抗MOG抗体測定',             sub: 'MOGAD鑑別',                 score: 480, qty: false },
      { id: 'cbc',           name: '血液一般（末梢血）',         sub: '末梢血液一般検査',          score: 21,  qty: false },
      { id: 'biochem',       name: '生化学（基本パネル）',       sub: 'Cre/ALT/AST/BUN等 7項目',  score: 99,  qty: false },
      { id: 'biochem_plus',  name: '生化学（拡張パネル）',       sub: '10〜12項目',                score: 144, qty: false },
      { id: 'immunoglobulin',name: '免疫グロブリン測定（IgG等）', sub: 'IgG/IgA/IgM',             score: 116, qty: false },
      { id: 'lymphocyte',    name: 'リンパ球サブセット',         sub: 'CD4/CD8/CD19',              score: 260, qty: false },
      { id: 'crp',           name: 'CRP（定量）',                sub: '炎症マーカー',              score: 16,  qty: false },
      { id: 'urine',         name: '尿一般検査',                 sub: '定性・沈渣',                score: 26,  qty: false },
    ],
  },
  {
    id: 'drug',
    name: '薬剤処方',
    color: '#f59e0b',
    items: [
      { id: 'psl',      name: 'プレドニゾロン（PSL）',              sub: '経口ステロイド（30日分・目安）',   score: 30,    qty: false },
      { id: 'aza',      name: 'アザチオプリン（イムラン）',          sub: '免疫抑制剤（30日分・目安）',      score: 430,   qty: false },
      { id: 'mmf',      name: 'ミコフェノール酸モフェチル',          sub: 'セルセプト（30日分・目安）',      score: 1_860, qty: false },
      { id: 'tacro',    name: 'タクロリムス（プログラフ）',          sub: '免疫抑制剤（30日分・目安）',      score: 1_420, qty: false },
      { id: 'rtx_prep', name: 'リツキシマブ前投薬一式',              sub: '抗ヒスタミン＋ステロイド点滴等',  score: 310,   qty: false },
      { id: 'vitd',     name: 'ビタミンD製剤',                      sub: 'エルデカルシトール等（30日分）',   score: 120,   qty: false },
      { id: 'ppi',      name: 'PPI（プロトンポンプ阻害薬）',         sub: '消化管保護（30日分）',             score: 65,    qty: false },
    ],
  },
  {
    id: 'rehab',
    name: 'リハビリ・処置',
    color: '#ef4444',
    items: [
      { id: 'rehab_neuro',  name: '神経系疾患リハビリⅠ（個別）', sub: '20分×1単位', score: 245, qty: true },
      { id: 'rehab_motion', name: '運動器リハビリⅠ（個別）',     sub: '20分×1単位', score: 185, qty: true },
      { id: 'visual_field', name: '視野検査（動的）',             sub: 'ゴールドマン視野計', score: 195, qty: false },
      { id: 'oct',          name: 'OCT（光干渉断層計）',          sub: '網膜神経線維層解析', score: 200, qty: false },
      { id: 'vep',          name: '視覚誘発電位（VEP）',          sub: '神経伝導速度含む',   score: 320, qty: false },
    ],
  },
]
