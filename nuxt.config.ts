// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  // Add server configuration
  server: {
    host: '0.0.0.0', // Required for external access
  },
  vite: {
    server: {
      hmr: {
        clientPort: 443,
        port: 24678
      },
      // Add allowed hosts
      allowedHosts: [
        'f85-2a00-f41-702e-99b1-8aad-9dfc-5c7a-1cbe.ngrok-free.app',
        '.ngrok-free.app'  // This allows any ngrok-free.app subdomain
      ]
    }
  }
})
