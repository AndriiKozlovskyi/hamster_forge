<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="flex flex-row justify-between items-center">
      <!-- User Info Section -->
      <div v-if="initDataUnsafe.user" class="user-info">
            <img 
                v-if="initDataUnsafe.user.photo_url" 
                :src="initDataUnsafe.user.photo_url" 
                :alt="initDataUnsafe.user.username"
                class="user-photo"
            />
        </div>

      <!-- Wallet Section -->
      <ConnectButton></ConnectButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const { useWebApp, MainButton, useWebAppPopup } = await import('vue-tg')
const { initDataUnsafe } = useWebApp()

</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
}

.user-photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
</style>