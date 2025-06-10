<template>
    <div>
        <AppHeader />
        <main class="container mx-auto p-4">

        </main>
    </div>
</template>

<script setup lang="ts">   
const { useWebApp, MainButton, useWebAppPopup } = await import('vue-tg')
const { initDataUnsafe } = useWebApp()
const {showAlert} = useWebAppPopup()
</script>