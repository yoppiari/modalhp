import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'ModalHP',
        short_name: 'ModalHP',
        description: 'Kelola Usaha Cuma Modal HP. Kasir, Pembukuan & Marketing Tools.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Cache version for invalidation - increment to force cache clear on new deploy
        cacheId: 'modalhp-v2.2',
        // Exclude tool JS chunks from initial precache (downloaded on-demand)
        // CSS is NOT excluded — it's small and needed for offline rendering
        globIgnores: ['**/assets/tool_*.js'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [
          /^\/blog/ // Prevent SW from intercepting Astro blog pages
        ],
        // Cache tool JS when visited/requested + Google Fonts for offline
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('tool_'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'umkm-tools',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core Views
          if (id.includes('src/views/Home.vue')) return 'core-home';
          if (id.includes('src/views/Dashboard.vue')) return 'core-dashboard';
          if (id.includes('src/views/Login.vue')) return 'core-login';

          // Tools -> Separate Chunks
          if (id.includes('src/views/')) {
            const name = id.split('src/views/')[1].replace(/\//g, '_').replace(/\.vue$/, '');
            return `tool_${name}`;
          }
        }
      }
    }
  },
  server: {
    port: 8082,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false,
      },
      '/webhooks': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
