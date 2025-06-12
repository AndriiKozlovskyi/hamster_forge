<template>
    <div class="min-h-screen bg-gray-100">
        <main class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">Guess the Gift</h1>
            <!-- Game content will go here -->
            <div class="text-center">
                <p class="text-gray-600 mb-4">Game under development</p>
                <button @click="router.back()" 
                        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Back to Games
                </button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>