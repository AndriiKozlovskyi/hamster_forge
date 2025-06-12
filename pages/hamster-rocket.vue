<template>
    <div class="min-h-screen bg-gray-100">
        <main class="container mx-auto p-4">
            <!-- Game Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Hamster Rocket</h1>
                <div class="text-xl font-bold text-green-600">
                    Points: {{ points }}
                </div>
            </div>

            <!-- Game Area -->
            <div 
                class="bg-gray-800 rounded-xl p-4 mb-6 transition-colors duration-1000"
                :class="{ 'bg-gray-900': isLaunched }"
            >
                <!-- Multiplier Display -->
               

                <!-- Rocket Animation -->
                <div class="relative h-100 bg-gray-900 rounded-lg overflow-hidden transition-colors duration-1000"
                :style="{ backgroundImage: `url(${background})` }"
                :class="{ 'background-scroll': isLaunched }"
            >
                <!-- Separate multiplier display -->
                <div class="absolute top-4 left-0 right-0 z-30">
                    <div class="text-center text-white">
                        <span 
                            class="text-4xl font-bold multiplier-text"
                            :class="{ 'multiplier-pulse': isLaunched }"
                            :style="[multiplierStyle, { '--multiplier': currentMultiplier }]"
                        >
                            {{ currentMultiplier.toFixed(2) }}x
                        </span>
                    </div>
                </div>

                <!-- Rocket and explosion container -->
                <div 
                    :class="{
                        'pre-launch': isFlying && !isLaunched,
                        'launching': isFlying && !isLaunched,
                        'flying': isLaunched && !isExploding,
                        'shake-animation': isLaunched && !isExploding,
                    }"
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                >
                <div 
                    v-show="showWinning"
                    class="absolute inset-0 flex items-center justify-center z-40"
                >
                    <span class="winning-text text-green-500 font-bold">
                        +{{ winningAmount }}
                    </span>
                </div>
                <div 
                    v-if="showWinning || showLosing"
                    class="absolute inset-0 flex items-center justify-center z-40"
                >
                    <span 
                        :class="{
                            'winning-text': showWinning,
                            'losing-text': showLosing,
                            'text-green-500': showWinning,
                            'text-red-500': showLosing,
                            'font-bold': true
                        }"
                    >
                        {{ showWinning ? '+' : '-' }}{{ winningAmount }}
                    </span>
                </div>
                    <Rocket v-show="!isExploding"/>
                    <div v-show="isExploding" class="explosion"></div>
                </div>

                <!-- Add the centered Play button here -->
                <div class="absolute inset-0 flex items-center justify-center z-20" v-if="!isFlying">
                    <button 
                        @click="startGame"
                        :disabled="!canPlay"
                        class="rounded-full p-4 bg-[#9affab] hover:bg-green-600 transition-colors disabled:opacity-50 text-white"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            class="w-12 h-12"
                        >
                            <path 
                                fill-rule="evenodd" 
                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
                                clip-rule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Add winning amount display inside the game area -->
        
            </div>

            <!-- Game Controls -->
            <div class="flex flex-row bg-gray-900 gap-4 mb-2">
                <div class="flex flex-col text-white rounded-lg justify-center items-center gap-2">
                    <label class="block text-sm font-medium mb-2">
                        Bet Amount
                    </label>
                    <div class="flex flex-row">
                    <button 
                    @click="adjustBet(-100)"
                    :disabled="isFlying"
                    class="px-3 py-2  rounded-lg text-2xl hover:bg-gray-300 disabled:opacity-50"
                >
                    -
                </button>
                <input 
                    type="number" 
                    v-model="betAmount"
                    :disabled="isFlying"
                    class="w-full px-3 py-2 border rounded-lg"
                    :max="points"
                    min="0"
                >
                <button 
                    @click="adjustBet(100)"
                    :disabled="isFlying"
                    class="px-3 py-2 rounded-lg text-2xl disabled:opacity-50"
                >
                    +
                </button>
            </div>
                </div>
                <div class="bg-gray-900 p-4 flex flex-col text-white items-center rounded-lg shadow">
                    <label class="block text-sm font-medium mb-2">
                        Limit Multiplier
                    </label>
                    <div class="flex flex-row w-full">
                        <button 
                            @click="adjustMultiplier(-0.1)"
                            :disabled="isFlying"
                            class="px-3 py-2 rounded-lg text-2xl hover:bg-gray-300 disabled:opacity-50"
                        >
                            -
                        </button>
                        <input 
                            type="number" 
                            v-model="targetMultiplier"
                            :disabled="isFlying"
                            class="w-full px-3 py-2 border rounded-lg"
                            min="1.1"
                            max="3"
                            step="0.1"
                        >
                        <button 
                            @click="adjustMultiplier(0.1)"
                            :disabled="isFlying"
                            class="px-3 py-2 rounded-lg text-2xl hover:bg-gray-300 disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <!-- Winning Amount Display -->
            <!-- <div v-if="showWinning" class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-black bg-opacity-75 rounded-lg p-6 max-w-sm mx-auto text-center">
                    <h2 class="text-2xl font-bold text-white mb-4">Congratulations!</h2>
                    <p class="text-lg text-white mb-4">
                        You won <span class="text-green-400 font-bold">{{ winningAmount }}</span> points!
                    </p>
                    <button 
                        @click="showWinning = false"
                        class="mt-4 px-4 py-2 rounded-lg bg-[#9affab] hover:bg-green-600 transition-colors text-white"
                    >
                        OK
                    </button>
                </div>
            </div> -->
            
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const { useWebAppPopup } = await import('vue-tg')
import background from '../assets/background1.png'
import frame1 from '../assets/frame_1.png'
import frame2 from '../assets/frame_2.png'
import frame3 from '../assets/frame_3.png'
import frame4 from '../assets/frame_4.png'
import frame5 from '../assets/frame_5.png'
import frame6 from '../assets/frame_6.png'
import frame7 from '../assets/frame_7.png'
import frame8 from '../assets/frame_8.png'
import frame9 from '../assets/frame_9.png'
import frame10 from '../assets/frame_10.png'

const { showAlert } = useWebAppPopup()

// Game state
const points = ref(10000)
const betAmount = ref(100)
const targetMultiplier = ref(1.5)
const currentMultiplier = ref(1.00)
const isFlying = ref(false)
const isLaunched = ref(false)
const rocketStyle = ref({})

// Add new ref for explosion state
const isExploding = ref(false)

// Add to script section with other refs
const winningAmount = ref(0)
const showWinning = ref(false)
const showLosing = ref(false)

// Computed properties
const canPlay = computed(() => {
    return betAmount.value > 0 && 
           betAmount.value <= points.value && 
           targetMultiplier.value >= 1.1 &&
           targetMultiplier.value <= 3
})

// Casino algorithm using theory of large numbers
function calculateCrashPoint(): number {
    const e = Math.random() * 0.5 + 0.5 // Random factor between 0.5 and 1
    return Math.max(1, (Math.random() * e * 3)) // Max multiplier is 3x
}

// Game logic
let gameInterval: NodeJS.Timer | null = null
let crashPoint: number = 1

function adjustBet(amount: number) {
    const newBet = betAmount.value + amount
    if (newBet >= 0 && newBet <= points.value) {
        betAmount.value = newBet
    }
}

function adjustMultiplier(amount: number) {
    const newMultiplier = +(targetMultiplier.value + amount).toFixed(1)
    if (newMultiplier >= 1.1 && newMultiplier <= 3) {
        targetMultiplier.value = newMultiplier
    }
}

function startGame() {
    if (!canPlay.value) return

    isFlying.value = true
    points.value -= betAmount.value
    crashPoint = calculateCrashPoint()
    currentMultiplier.value = 1.00

    // Start the launch sequence after 1 second
    setTimeout(() => {
        isLaunched.value = true
        let lastMultiplier = currentMultiplier.value
        
        // Start the multiplier increment after launch
        gameInterval = setInterval(() => {
            const speed = Math.min(0.05, 0.01 * (1 + currentMultiplier.value / 2))
            currentMultiplier.value += speed
            
            // Trigger animation when multiplier increases by 0.1
            if (Math.floor(currentMultiplier.value * 10) > Math.floor(lastMultiplier * 10)) {
                const el = document.querySelector('.multiplier-text')
                el?.classList.remove('multiplier-pulse')
                void el?.offsetWidth // Trigger reflow
                el?.classList.add('multiplier-pulse')
            }
            
            lastMultiplier = currentMultiplier.value
            
            if (currentMultiplier.value >= crashPoint) {
                if (currentMultiplier.value >= targetMultiplier.value) {
                    const amount = Math.floor(betAmount.value * targetMultiplier.value)
                    points.value += amount
                    winningAmount.value = amount
                    showWinning.value = true
                    setTimeout(() => {
                        showWinning.value = false
                    }, 2000)
                }
                endGame(false)
            }
        }, 100)
    }, 1000)
}

function endGame(voluntary: boolean) {
    if (gameInterval) {
        clearInterval(gameInterval)
        gameInterval = null
    }
    
    if (!voluntary && currentMultiplier.value < targetMultiplier.value) {
        showLosing.value = true
        winningAmount.value = betAmount.value
        setTimeout(() => {
            showLosing.value = false
        }, 2000)
    }
    
    isExploding.value = true
    
    setTimeout(() => {
        isFlying.value = false
        isLaunched.value = false
        currentMultiplier.value = 1.00
        isExploding.value = false
    }, 2000)
}

// Update the multiplierStyle computed property
const multiplierStyle = computed(() => {
    // Calculate color transition from yellow to green
    const progress = (currentMultiplier.value - 1) / 2 // normalize between 0 and 1
    const hue = 60 + (progress * 60) // transition from 60 (yellow) to 120 (green)
    const saturation = 80
    const lightness = 50
    
    return {
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        transition: 'color 0.3s ease, transform 0.3s ease',
        textShadow: `0 0 10px hsl(${hue}, ${saturation}%, ${lightness}%, 0.5)`
    }
})
</script>

<style scoped>
.pre-launch {
    transition: transform 0.04s ease-in-out;
}

.launching {
    animation: launch-shake 0.07s ease-in-out infinite;
}

.flying {
    animation: fly-up-with-shake 0.5s ease-in-out forwards, post-launch-shake 0.05s ease-in-out infinite 1s;
}

.background-scroll {
    animation: scroll-background 2s linear infinite;
}


.explosion {
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    animation: explode 1s steps(10) forwards;
    /* Position explosion at rocket's final position */
    transform: translate(-5%, -80%);
    left: 50%;
}

@keyframes explode {
    0% { background-image: url(@/assets/frame_1.png); }
    10% { background-image: url(@/assets/frame_2.png); }
    20% { background-image: url(@/assets/frame_3.png); }
    30% { background-image: url(@/assets/frame_4.png); }
    40% { background-image: url(@/assets/frame_5.png); }
    50% { background-image: url(@/assets/frame_6.png); }
    60% { background-image: url(@/assets/frame_7.png); }
    70% { background-image: url(@/assets/frame_8.png); }
    80% { background-image: url(@/assets/frame_9.png); }
    90% { background-image: url(@/assets/frame_10.png); }
    100% { background-image: none; opacity: 0; }

}

@keyframes fly-up-with-shake {
    0% {
        transform: translate(-1%, 0);
    }
    10% {
        transform: translate(-2%, -8%);
    }
    20% {
        transform: translate(0%, -16%);
    }
    30% {
        transform: translate(-3%, -24%);
    }
    40% {
        transform: translate(-1%, -32%);
    }
    50% {
        transform: translate(-4%, -40%);
    }
    60% {
        transform: translate(-2%, -48%);
    }
    70% {
        transform: translate(-5%, -56%);
    }
    80% {
        transform: translate(-3%, -64%);
    }
    90% {
        transform: translate(-6%, -72%);
    }
    100% {
        transform: translate(-5%, -80%);
    }
}

@keyframes launch-shake {
    0%, 100% { 
        transform: translateY(0) translateX(0);
    }
    25% { 
        transform: translateY(0) translateX(-2px);
    }
    75% { 
        transform: translateY(0) translateX(1px);
    }
}

@keyframes post-launch-shake {
    0%, 100% { 
        transform: translateY(-80%) translateX(-5%);
    }
    25% { 
        transform: translateY(-80%) translateX(-7%);
    }
    75% { 
        transform: translateY(-80%) translateX(-3%);
    }
}


@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

@keyframes scroll-background {
    0% {
        background-position: 50% 100%;
    }
    100% {
        background-position: 50% 0%;
    }
}

.multiplier-text {
    display: inline-block;
    transition: transform 0.15s ease-out;
}

.multiplier-pulse {
    animation: size-pulse 0.15s ease-out;
    animation-iteration-count: 1;
}

@keyframes size-pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.winning-text {
    animation: win-animation 2s ease-out forwards;
    font-size: 2rem;
}

@keyframes win-animation {
    0% {
        transform: scale(0.5) translateY(0);
        opacity: 0;
    }
    20% {
        transform: scale(2) translateY(0);
        opacity: 1;
    }
    40% {
        transform: scale(1.5) translateY(0);
        opacity: 1;
    }
    60% {
        transform: scale(1.5) translateY(-20px);
        opacity: 0.8;
    }
    100% {
        transform: scale(1) translateY(-50px);
        opacity: 0;
    }
}

.losing-text {
    animation: lose-animation 2s ease-out forwards;
    font-size: 2rem;
}

@keyframes lose-animation {
    0% {
        transform: scale(0.5) translateY(0);
        opacity: 0;
    }
    20% {
        transform: scale(2) translateY(0);
        opacity: 1;
    }
    40% {
        transform: scale(1.5) translateY(0);
        opacity: 1;
    }
    60% {
        transform: scale(1.5) translateY(-20px);
        opacity: 0.8;
    }
    100% {
        transform: scale(1) translateY(-50px);
        opacity: 0;
    }
}
</style>