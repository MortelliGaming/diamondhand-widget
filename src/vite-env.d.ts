/// <reference types="vite/client" />

import type { StoreDefinition } from "pinia" 

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}