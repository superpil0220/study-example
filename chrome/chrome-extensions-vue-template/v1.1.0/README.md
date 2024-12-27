## 업데이트 내용
1. esList, prettier 추가
2. 자동빌드 설정

## 사용법
### 디렉토리 구조
1. <u>기존 vue 프로젝트 디렉토리</u>는 popup 역할
2. <u>src/content</u> 는 content script 역할
3. <u>src/background</u> 는 background script 역할

## 빌드
### vite.config.js

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function buildRole(mode) {
  console.log('Build Mode is ', mode);
  return mode === 'content' || mode === 'background'
    ? {
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: `./src/${mode}/${mode}main.js`,
          output: {
            entryFileNames: `${mode}/[name].js`,
            chunkFileNames: `${mode}/[name]-[hash].js`,
            assetFileNames: `${mode}/[name][extname]`
          }
        },
        emptyOutDir: false // 빌드 시 기존 빌드된 파일 지우지 않음, vue빌드는 dist파일을 삭제하고 다시 새롭게 빌드 생성
      },
      resolve: {
        alias: {
          '~@': resolve(__dirname, 'src')
        }
      },
      publicDir: false
    }
    : {
      plugins: [vue()],
      resolve: {
        alias: {
          '~@': resolve(__dirname, 'src')
        }
      }
    };
}

export default defineConfig(({ mode }) => {
  return buildRole(mode);
});
```

### package.json
```json
{
  "scripts": {
    "watch": "npx chokidar \"src/**\" -c \"npm run build\"",
    "build": "vite build && vite build --mode content && vite build --mode background",
    "preview": "vite preview"
  }
}
```

### 단일 빌드
```json
npm run build
```
* 정상 빌드 후 dist파일이 생성된다.

### 자동 빌드
```json
npm run watch
```
* src 하위 파일 내용이 변경 시 자동빌드된다.
* 개발 시 자동빌드하면 편의성 좋다.

## 주의사항
1. scr/content/contentMain 디렉토리 경로 변경불가능(변경 시 vite.config.js 수정필수)
2. src/background/BackgroundMain.js 디렉토리 경로 변경 불가능(변경 시 vite.config.js 수정필수)
3. BackgroundMain,js ContentMain.js 파일 필수, 파일명 변경 불가능(변경 시 vite.config.js 수정필수)
4. 모든 경로는 빌드 후 dist파일에 있는 manifest.json 기준으로 판단하기
5. import되지 않는 파일은 빌드 시 누락됨. 예를들어 src/assets에 icon16.png가 있고 import되어 사용되지 않는다면 빌드에서 누락됨, 필요하다면 빌드 후 dist파일 원하는 경로에 추가하기
6. ContentStyle.css는 빌드 후 ContentMain.js 파일 이름과 동일하게 변경됩니다. 만약, ContentScript.js로 변경했다면 css파일도 ContentScript.css로 변경됩니다.(ContentMain.js파일 변경 시 vite.config.js 수정필수)

## 참고
```text
https://github.com/superpil0220/super-screen-wizard
```
* 실제 chrome-extensions-vue-template 사용 사례는 위 링크를 참고해주세요.
