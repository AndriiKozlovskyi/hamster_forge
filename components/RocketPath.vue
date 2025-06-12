<template>
    <canvas ref="canvas" class="w-full h-[500px] bg-black" />
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import rocket from '../assets/rocket.png'
  const canvas = ref<HTMLCanvasElement | null>(null)
  const rocketImg = new Image()
  rocketImg.src = rocket // Добавь свой путь к ракете (или замени на рисование круга)
  
  onMounted(() => {
    const ctx = canvas.value?.getContext('2d')
    if (!ctx || !canvas.value) return
  
    const width = canvas.value.width = canvas.value.clientWidth
    const height = canvas.value.height = canvas.value.clientHeight
  
    let x = 0
    const scale = 30 // масштаб для визуального соответствия
    const speed = 0.1 // шаг x
    const points: { x: number, y: number }[] = []
  
    function drawRocket(x: number, y: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.atan(2 * y/x)) // наклон ракеты по касательной
      ctx.drawImage(rocketImg, -50, -50 , 100, 100)
      ctx.restore()
    }
    
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
  
      const px = x * scale
      const py = height - (0.02 * x * x + 5) * scale // переворачиваем ось Y
  
      points.push({ x: px, y: py })
  
      // рисуем хвост
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.8)'
      ctx.lineWidth = 2
      for (let i = 0; i < points.length - 10; i++) {
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[i + 1].x, points[i + 1].y)
      }
      ctx.stroke()
  
      // ракета
      drawRocket(px, py)
  
      x += speed
      if (py > 0 && px < width) {
        requestAnimationFrame(animate)
      }
    }
  
    rocketImg.onload = () => animate()
  })
  </script>
  