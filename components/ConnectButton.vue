<template>
    <div class="flex items-center gap-4">
        <!-- Balance Display -->
        <div v-if="isConnected && balance" class="flex flex-col items-end">
            <span class="text-sm font-medium">{{ formatBalance }} TON</span>
            <span class="text-xs text-gray-400">{{ shortenAddress }}</span>
        </div>
        <!-- Connect Button -->
        <div id="ton-connect-button">
    
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { TonConnectUI } from '@tonconnect/ui'

const isConnected = ref(false)
const balance = ref('0')
const address = ref('')
let tonConnectUI: TonConnectUI | null = null

// Format balance to show only 2 decimal places
const formatBalance = computed(() => {
    return (Number(balance.value) / 1e9).toFixed(2)
})

// Shorten wallet address for display
const shortenAddress = computed(() => {
    if (!address.value) return ''
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
})

// Update wallet info
async function updateWalletInfo(wallet: any) {
    if (wallet) {
        address.value = wallet.account.address
        try {
            const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`)
            const data = await response.json()
            balance.value = data.result || '0'
        } catch (error) {
            console.error('Error fetching balance:', error)
            balance.value = '0'
        }
    } else {
        address.value = ''
        balance.value = '0'
    }
}

onMounted(async () => {
    const manifestUrl = `${window.location.origin}/tonconnect-manifest.json`
    
    tonConnectUI = new TonConnectUI({
        manifestUrl,
        buttonRootId: 'ton-connect-button'
    })

    isConnected.value = tonConnectUI.connected
    
    if (isConnected.value) {
        const wallet = await tonConnectUI.account
        await updateWalletInfo(wallet)
    }

    tonConnectUI.onStatusChange(async (wallet) => {
        isConnected.value = !!wallet
        await updateWalletInfo(wallet)
    })
})

const connectWallet = async () => {
    if (!tonConnectUI) return
    try {
        if (!isConnected.value) {
            await tonConnectUI.connectWallet()
        } else {
            await tonConnectUI.disconnect()
        }
    } catch (error) {
        console.error('Wallet connection error:', error)
    }
}
</script>