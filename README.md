# Bext Teste - Projeto Vue 3 + Vite

Este é um projeto de teste utilizando **Vue 3**, **Vite 8**, **TypeScript**, **Vue Router**, e estrutura clean para páginas e componentes.  

O projeto inclui a tela de login e a estrutura básica de páginas, serviços e stores.

---

## 🚀 Tecnologias utilizadas

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite 8](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- Pinia (opcional, para estado global)
- Oxlint/ESLint (opcional, para linting)
- Estrutura clean de pastas:

src/
├─ pages/
│ └─ (auth)/
│ └─ LoginPage.vue
│ └─ HomePage.vue
├─ components/
├─ services/
├─ stores/
├─ App.vue
└─ main.ts


---

## ⚡ Configurações principais

### Vite (vite.config.ts)
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
plugins: [vue(), vueDevTools()],
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
})


{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

git clone <URL_DO_REPO>

cd bext-teste

npm install

npm run dev

http://localhost:5173/

