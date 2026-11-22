import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Generate a versioned offline cache from the actual production bundle.
function offlineShell() {
  return { name: 'offline-shell', generateBundle(_, bundle) {
    const files = Object.keys(bundle).filter(name => /\.(js|css)$/.test(name)).map(name => '/' + name)
    const version = Date.now().toString(36)
    this.emitFile({ type: 'asset', fileName: 'sw.js', source: `const CACHE='otoshield-${version}';const FILES=${JSON.stringify(['/', '/index.html', '/manifest.webmanifest', '/icon.svg', ...files])};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('otoshield-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)))});` })
  }}
}
export default defineConfig({plugins:[vue(),offlineShell()],server:{host:'0.0.0.0',allowedHosts:['.e2b.app']}})
