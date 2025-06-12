<template>
    <div class="min-h-screen bg-gray-100">
        <main class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">My Telegram Gifts</h1>
            
            <!-- Gift Grid -->
            <div class="grid grid-cols-2 gap-4">
                <div v-for="gift in gifts" 
                     :key="gift.id" 
                     class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                    <img :src="gift.image" 
                         :alt="gift.name"
                         class="w-24 h-24 object-contain mb-3" />
                    <h3 class="font-medium text-gray-800">{{ gift.name }}</h3>
                    <p class="text-sm text-gray-500 mb-2">{{ gift.description }}</p>
                    <button 
                        @click="claimGift(gift)"
                        class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
                    >
                        Claim Gift
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && gifts.length === 0" class="text-center py-10">
                <p class="text-gray-500">No gifts available at the moment</p>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { useWebApp, useWebAppPopup } = await import('vue-tg')

const { initDataUnsafe } = useWebApp()
const { showAlert } = useWebAppPopup()

interface Gift {
    id: number
    name: string
    description: string
    image: string
    claimed: boolean
}

const gifts = ref<Gift[]>([])
const loading = ref(true)

// Mock data - replace with actual API call
const mockGifts = [
    {
        id: 1,
        name: "Premium Sticker Pack",
        description: "Exclusive animated stickers",
        image: "/gifts/stickers.png",
        claimed: false
    },
    {
        id: 2,
        name: "Custom Background",
        description: "Unique chat background",
        image: "/gifts/background.png",
        claimed: false
    },
    {
        id: 3,
        name: "Reaction Pack",
        description: "Special message reactions",
        image: "/gifts/reactions.png",
        claimed: false
    },
    {
        id: 4,
        name: "Premium Badge",
        description: "Exclusive profile badge",
        image: "/gifts/badge.png",
        claimed: false
    }
]

// Simulate API call
onMounted(async () => {
    try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        gifts.value = mockGifts
    } catch (error) {
        console.error('Failed to fetch gifts:', error)
        showAlert('Failed to load gifts')
    } finally {
        loading.value = false
    }
})

const claimGift = async (gift: Gift) => {
    try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500))
        gift.claimed = true
        showAlert(`Successfully claimed ${gift.name}!`)
    } catch (error) {
        console.error('Failed to claim gift:', error)
        showAlert('Failed to claim gift')
    }
}
</script>