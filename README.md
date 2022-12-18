# 概要
Next.js +α の自分用テンプレート
* Next.js
* Tailwind CSS
* daisyUI
* GitHub Actions による CI/CD
* GitHub Pages
* ESLint
* husky / lint-staged


# 環境構築
https://qiita.com/torippy/private/68e3bd542694a6a24e67

# 使い方
* [import repository](https://github.com/new/import)で本リポジトリ(https://github.com/hiroto-toriyama/web-template)をimport
* Actionsの設定で「Allow all actions and reusable workflows」を選択
* Pagesの設定で「GitHub Action」「Enforce HTTPS」を選択
* ローカルにclone
* nextjsにcheckout
* vite.config.tsのbasePathの`web-template`をリポジトリ名に変更
```javascript:next.config.js
  basePath: process.env.GITHUB_ACTIONS ? '/web-template' : '',
```
* push毎にtestが走るようになっているので該当箇所を削除
```typescript
// test.yml
push:
  branches:
    - '**'
```
* commit & push
* masterにpull request
