<template>
    <main>
        <ClientOnly>
          
            <slot/>
        </ClientOnly>
    </main>

</template>
<script setup lang="ts">
useHead({
    script: [
        {   
            src: 'https://telegram.org/js/telegram-web-app.js',
            defer: true
        }   
    ]
})
</script>