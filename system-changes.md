# System Changes

## 2026-05-31 — Todo アプリ構築・デプロイ

### 構築内容

React + TypeScript + Vite で Todo アプリを新規作成。

**主な機能**
- Todo の追加（Enter キー）
- チェックで完了/未完了の切り替え
- ダブルクリックで編集（Enter 確定 / Esc キャンセル）
- 削除ボタン（ホバーで表示）
- 全件完了/未完了の一括切り替え
- すべて・未完了・完了済みのフィルター
- 完了済みを一括削除
- localStorage への自動保存

**ファイル構成**
```
src/
  types/todo.ts          # Todo型・FilterType型
  hooks/useTodos.ts      # 状態管理 + localStorage永続化
  components/
    TodoInput.tsx        # 入力フォーム・全件完了ボタン
    TodoItem.tsx         # 個別Todo（チェック・編集・削除）
    TodoList.tsx         # Todo一覧
    TodoFooter.tsx       # フィルター・件数・完了済み削除
  App.tsx
  index.css
```

---

### 不具合修正

#### 1. HTTP アクセス時に Todo 追加で画面が真っ白になる

- **原因**：`crypto.randomUUID()` は HTTPS または localhost 以外では使用不可
- **対応**：`src/hooks/useTodos.ts` の ID 生成を独自関数に変更

```ts
// 変更前
id: crypto.randomUUID()

// 変更後
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
id: generateId()
```

#### 2. 日本語入力の変換確定 Enter でタスクが追加されてしまう

- **原因**：IME の変換確定 Enter と送信 Enter を区別していなかった
- **対応**：`src/components/TodoInput.tsx` で `e.nativeEvent.isComposing` を確認

```ts
// 変更前
if (e.key === 'Enter') { ... }

// 変更後
if (e.key === 'Enter' && !e.nativeEvent.isComposing) { ... }
```

---

### デプロイ設定

#### GitHub Pages

- リポジトリを public に変更（無料プランで Pages を使うため）
- `.github/workflows/deploy.yml` を作成（GitHub Actions で自動ビルド＆デプロイ）
- `vite.config.ts` の `base` を環境変数 `VITE_BASE` で切り替え可能にし、Pages ビルド時は `/claude-project/` を指定

**URL**：`https://tsune-ue.github.io/claude-project/`（現在は停止中）

#### Vercel

- Vercel CLI をインストールしてデプロイ
- `@types/node` を追加（`process.env` の TypeScript 型解決のため）
- Vercel ではルート(`/`)から配信されるため `VITE_BASE` は未設定（デフォルト `/`）

**URL**：`https://claude-project-topaz.vercel.app`（現在は一時停止中）

---

### サービス状態

| サービス | 状態 | 再開方法 |
|---|---|---|
| GitHub Pages | 停止 | `gh api repos/tsune-ue/claude-project/pages --method POST -f build_type=workflow` → `git push` |
| Vercel | 一時停止 | `vercel resume` |
| 開発サーバー | 停止 | `npm run dev -- --host`（ネットワーク公開する場合） |
