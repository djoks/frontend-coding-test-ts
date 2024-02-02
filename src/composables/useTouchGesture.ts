import { ref } from 'vue'

const useTouchGesture = (onSwipeDown: () => void) => {
  const startY = ref(0)
  const currentY = ref(0)
  const touching = ref(false)

  const handleTouchStart = (e: TouchEvent) => {
    startY.value = e.touches[0].clientY
    currentY.value = startY.value
    touching.value = true
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.currentTarget) {
      const target = e.currentTarget as HTMLElement

      currentY.value = e.touches[0].clientY
      const deltaY = currentY.value - startY.value

      if (deltaY > 0) {
        target.style.transform = `translateY(${deltaY}px)`
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.currentTarget) {
      const target = e.currentTarget as HTMLElement

      touching.value = false
      const deltaY = currentY.value - startY.value
      if (deltaY > 100) {
        onSwipeDown()
      }

      target.style.transform = ''
    }
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    touching,
  }
}

export default useTouchGesture
