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
// ※ 薬剤点数はすべて「30日分（1ヶ月分）」ベース
//    （プラリアのみ「1回投与分」として記載）
// ■ 2026年4月薬価改定 適用
// ─────────────────────────────────────────
export const CATEGORIES: MedicalCategory[] = [
  {
    id: 'basic',
    name: '基本・管理料',
    color: '#3b82f6',
    items: [
      { id: 'saiken',          name: '再診料',                   sub: '外来（通常）',                   score: 73,  qty: false },
      { id: 'gairaishinsatsu', name: '外来診療料',               sub: '200床以上の病院',                score: 74,  qty: false },
      { id: 'tokutei',         name: '特定疾患管理料',           sub: '主病が厚生労働大臣指定疾患',     score: 225, qty: false },
      { id: 'nanbyo',          name: '難病外来指導管理料',       sub: '指定難病の患者（月1回）',        score: 270, qty: false },
      { id: 'shoho',           name: '処方箋料（特定疾患）',     sub: '特定疾患処方管理加算含む',       score: 68,  qty: false },
      { id: 'shoho_long',      name: '処方箋料（長期処方加算）', sub: '28日以上の処方',                 score: 65,  qty: false },
    ],
  },
  {
    id: 'mri',
    name: 'MRI 検査',
    color: '#8b5cf6',
    items: [
      { id: 'mri_15_1',     name: 'MRI撮影（1.5T以上・1部位）',     sub: '脳・脊髄など単独部位',  score: 1_330, qty: true },
      { id: 'mri_3t_1',     name: 'MRI撮影（3T以上・1部位）',       sub: '高磁場MRI',              score: 1_600, qty: true },
      { id: 'mri_contrast', name: '造影剤使用加算',                  sub: 'ガドリニウム系造影剤',   score: 500,   qty: true },
      { id: 'mri_eimage',   name: '電子画像管理加算（MRI）',         sub: '撮影1回につき',           score: 120,   qty: true },
      { id: 'mri_2site',    name: 'MRI 2部位目（同日）',             sub: '1部位追加ごと',           score: 330,   qty: true },
      { id: 'ct_1',         name: 'CT撮影（64列以上マルチスライス）', sub: '1部位',                  score: 1_020, qty: true },
      { id: 'ct_eimage',    name: '電子画像管理加算（CT）',          sub: '撮影1回につき',           score: 120,   qty: true },
    ],
  },
  {
    id: 'lab',
    name: '血液・検査',
    color: '#0e9f6e',
    items: [
      // 抗MOG抗体測定は削除（2026年4月改定対応）
      { id: 'aqp4',          name: '抗アクアポリン4抗体測定',      sub: 'NMOSD特異的バイオマーカー', score: 620, qty: false },
      { id: 'cbc',           name: '血液一般（末梢血）',            sub: '末梢血液一般検査',          score: 21,  qty: false },
      { id: 'biochem',       name: '生化学（基本パネル）',          sub: 'Cre/ALT/AST/BUN等 7項目',  score: 99,  qty: false },
      { id: 'biochem_plus',  name: '生化学（拡張パネル）',          sub: '10〜12項目',                score: 144, qty: false },
      { id: 'immunoglobulin', name: '免疫グロブリン測定（IgG等）', sub: 'IgG/IgA/IgM',              score: 116, qty: false },
      { id: 'lymphocyte',    name: 'リンパ球サブセット',            sub: 'CD4/CD8/CD19',              score: 260, qty: false },
      { id: 'crp',           name: 'CRP（定量）',                   sub: '炎症マーカー',              score: 16,  qty: false },
      { id: 'urine',         name: '尿一般検査',                    sub: '定性・沈渣',                score: 26,  qty: false },
    ],
  },
  {
    id: 'drug',
    name: '薬剤処方',
    color: '#f59e0b',
    items: [
      // ── 免疫抑制薬・ステロイド（2026年4月薬価改定対応・30日分） ──
      {
        id: 'psl',
        name: 'プレドニゾロン（PSL）',
        // 5mg錠 約9.8円/錠 × 1錠/日 × 30日 ≈ 294円 → 29点
        sub: '5mg×1錠/日 30日分（2026年4月薬価）',
        score: 29,
        qty: false,
      },
      {
        id: 'aza',
        name: 'アザチオプリン（イムラン）',
        // 50mg錠 69円/錠 × 1錠/日 × 30日 = 2,070円 → 207点
        sub: '50mg×1錠/日 30日分（2026年4月薬価）',
        score: 207,
        qty: false,
      },
      // ミコフェノール酸モフェチルは削除（2026年4月改定対応）
      // リツキシマブ前投薬一式は削除（2026年4月改定対応）
      {
        id: 'tacro',
        name: 'タクロリムス（プログラフ）1mg',
        // 305.4円/日 × 30日 = 9,162円 → 916点
        sub: '1mg/日 30日分（2026年4月薬価）',
        score: 916,
        qty: false,
      },
      { id: 'vitd', name: 'ビタミンD製剤',          sub: 'エルデカルシトール等（30日分）',   score: 120, qty: false },
      { id: 'ppi',  name: 'PPI（プロトンポンプ阻害薬）', sub: '消化管保護（30日分）',         score: 65,  qty: false },

      // ── 骨粗鬆症治療薬（2026年4月薬価改定対応） ──
      {
        id: 'pralia',
        name: 'プラリア皮下注60mg',
        // 24,939円/筒（6か月に1回投与）→ 2,494点
        sub: '1筒分・1回投与（デノスマブ、2026年4月薬価）',
        score: 2_494,
        qty: false,
      },
      {
        id: 'alendronate',
        name: 'アレンドロン酸（ボナロン/フォサマック）35mg',
        // 先発品平均 ≈ 210円/錠 × 週1回 × 4週 ≈ 840円 → 84点
        // ボナロン218.9円×4=875円→88点 / フォサマック202.1円×4=808円→81点 → 先発代表値 88点
        sub: '35mg 週1回×4回/月 30日分（2026年4月薬価）',
        score: 88,
        qty: false,
      },
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

