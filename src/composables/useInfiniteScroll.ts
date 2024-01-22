import { onMounted, onUnmounted, ref, Ref } from 'vue'

export default function useInfiniteScroll(loadMore: () => void): {
  sentinel: Ref<HTMLElement | null>
} {
  const sentinel = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver

  const observeSentinel = () => {
    if (sentinel.value) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            loadMore()
          }
        },
        {
          rootMargin: '100px', // Adjust as needed
        },
      )

      observer.observe(sentinel.value)
    }
  }

  onMounted(observeSentinel)

  onUnmounted(() => {
    if (observer && sentinel.value) {
      observer.unobserve(sentinel.value)
    }
  })

  return { sentinel }
}
