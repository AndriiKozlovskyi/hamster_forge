<template>
    <div class="min-h-screen bg-gray-100">
        <main class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">Games</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Hamster Rocker Game Card -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="relative">
                        <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-500 to-pink-500">
                            <!-- Hamster Rocker Icon -->
                            <svg class="w-24 h-24 mx-auto my-8" viewBox="0 0 24 24" fill="none">
                                <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" 
                                      stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <path d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" 
                                      fill="white"/>
                                <path d="M17 14L12 12L7 14" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="p-4">
                            <h3 class="text-xl font-bold mb-2">Hamster Rocker</h3>
                            <p class="text-gray-600 mb-4">Rock your hamster to earn rewards!</p>
                            <button @click="startGame('hamster-rocker')"
                                    class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Guess the Gift Game Card -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="relative">
                        <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500 to-green-500">
                            <!-- Gift Icon -->
                            <svg class="w-24 h-24 mx-auto my-8" viewBox="0 0 24 24" fill="none">
                                <path d="M20 12V22H4V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 7H2V12H22V7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 22V7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" 
                                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" 
                                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="p-4">
                            <h3 class="text-xl font-bold mb-2">Guess the Gift</h3>
                            <p class="text-gray-600 mb-4">Test your luck and guess what's inside!</p>
                            <button @click="startGame('guess-gift')"
                                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const { useWebAppPopup } = await import('vue-tg');

const router = useRouter()
const { showAlert } = useWebAppPopup()

const startGame = async (gameId: string) => {
    try {
        switch (gameId) {
            case 'hamster-rocker':
                router.push('/hamster-rocket')
                break
            case 'guess-gift':
                router.push('/games/guess-gift')
                break
            default:
                showAlert('Game not available')
        }
    } catch (error) {
        console.error('Failed to start game:', error)
        showAlert('Failed to start game')
    }
}
</script>