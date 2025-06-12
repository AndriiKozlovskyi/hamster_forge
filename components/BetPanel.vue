<template>
    <div class="bg-[#2b0a3d] rounded-xl p-4 w-full max-w-md mx-auto text-white shadow-lg">
      <div class="flex justify-between mb-4">
        <div class="flex gap-2 text-sm items-center">
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" v-model="autoBet" class="accent-purple-500" />
            Автоставка
          </label>
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" v-model="autoExit" class="accent-purple-500" />
            Автовыход
          </label>
        </div>
        <div class="text-right font-semibold opacity-80">
          × {{ multiplier.toFixed(2) }}
        </div>
      </div>
  
      <div class="flex flex-col sm:flex-row space-y-2 items-center justify-between bg-[#3a0a4f] rounded-lg px-3 py-2">
        <div class="flex items-center gap-2">
          <button @click="adjustBet(-100)" class="text-xl px-2 hover:text-purple-400">−</button>
          <input
            type="number"
            v-model.number="bet"
            class="bg-transparent border-none w-20 text-center text-white font-bold text-lg focus:outline-none"
          />
          <button @click="adjustBet(100)" class="text-xl px-2 hover:text-purple-400">+</button>
        </div>
  
        <div class="flex gap-2 text-xs text-white font-semibold">
          <button @click="adjustBet(50)" class="bg-[#5e2c91] px-2 py-1 rounded hover:bg-purple-600">+50</button>
          <button @click="adjustBet(100)" class="bg-[#5e2c91] px-2 py-1 rounded hover:bg-purple-600">+100</button>
          <button @click="adjustBet(200)" class="bg-[#5e2c91] px-2 py-1 rounded hover:bg-purple-600">+200</button>
          <button @click="adjustBet(500)" class="bg-[#5e2c91] px-2 py-1 rounded hover:bg-purple-600">+500</button>
        </div>
      </div>
  
      <button
        @click="handleBet"
        :disabled="!canBet"
        class="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold py-3 rounded-lg hover:from-purple-500 hover:to-pink-400 transition disabled:opacity-50"
      >
        СТАВКА
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  
  // Props
  const props = defineProps<{
    points: number
    isFlying: boolean
  }>()
  
  // Emits
  const emit = defineEmits<{
    'update:betAmount': [value: number]
    'update:targetMultiplier': [value: number]
    'start-game': []
  }>()
  
  const autoBet = ref(false)
  const autoExit = ref(true)
  const bet = ref(1000)
  const multiplier = ref(1.3)
  
  // Computed
  const canBet = computed(() => {
    return bet.value > 0 && 
           bet.value <= props.points && 
           multiplier.value >= 1.1 && 
           multiplier.value <= 3 &&
           !props.isFlying
  })
  
  // Methods
  function adjustBet(amount: number) {
    const newBet = Math.max(0, bet.value + amount)
    bet.value = Math.min(newBet, props.points)
    emit('update:betAmount', bet.value)
  }
  
  function handleBet() {
    if (!canBet.value) return
    emit('update:betAmount', bet.value)
    emit('update:targetMultiplier', multiplier.value)
    emit('start-game')
  }
  
  // Watch for changes
  watch(bet, (newValue) => {
    emit('update:betAmount', newValue)
  })
  
  watch(multiplier, (newValue) => {
    emit('update:targetMultiplier', newValue)
  })
  </script>
