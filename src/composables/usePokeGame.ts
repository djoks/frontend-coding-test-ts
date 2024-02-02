import {
  ref,
  onBeforeUnmount,
  reactive,
  Ref,
  watchEffect,
  watch,
  nextTick,
} from 'vue'
import placeholderImageDarkSrc from '@/assets/pokeball-dark.png'
import placeholderImageLightSrc from '@/assets/pokeball-light.png'
import { Card, Pokemon } from '@/types'

export default function usePokeGame(pokemons: Ref<Pokemon[]>) {
  const canvas: Ref<HTMLCanvasElement | null> = ref(null)
  const ctx: Ref<CanvasRenderingContext2D | null> = ref(null)
  const loading: Ref<boolean> = ref(true)
  const status = ref('')

  const cardCount = 9
  const cards: Ref<Card[]> = ref([])
  const pokemonImages: Ref<HTMLImageElement[]> = ref([])

  const cardWidth = 120
  const cardHeight = 120
  let placeholderImage: HTMLImageElement
  let isDarkMode = false

  const loadPlaceholderImage = () => {
    return new Promise((resolve, reject) => {
      placeholderImage = new Image()
      placeholderImage.onload = resolve
      placeholderImage.onerror = reject
      placeholderImage.src = isDarkMode
        ? placeholderImageDarkSrc
        : placeholderImageLightSrc
    })
  }

  const createCard = (
    id: number,
    cardWidth: number,
    cardHeight: number,
    spacing: number,
  ): Card => {
    return {
      id,
      x: (id % 3) * (cardWidth + spacing),
      y: Math.floor(id / 3) * (cardHeight + spacing),
      flipped: false,
      revealed: false,
      image: null,
      animating: false,
      animationProgress: 0,
    }
  }

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) => {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)
    ctx.closePath()
    ctx.fill()
  }

  const drawCardFront = (
    ctx: CanvasRenderingContext2D,
    card: Card,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    ctx.drawImage(placeholderImage, x, y, width, height)
  }

  const drawCardBack = (
    ctx: CanvasRenderingContext2D,
    card: Card,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    if (card.image) {
      ctx.save()
      ctx.scale(1, -1)
      ctx.drawImage(card.image, x, -y - height, width, height)
      ctx.restore()
    }
  }

  const drawCard = (
    ctx: CanvasRenderingContext2D,
    card: Card,
    cardWidth: number,
    cardHeight: number,
    startX: number,
    startY: number,
  ) => {
    const row = Math.floor(card.id / 3)
    const col = card.id % 3

    card.x = startX + col * (cardWidth + 10)
    card.y = startY + row * (cardHeight + 10)

    const flipProgress = card.animating
      ? card.animationProgress
      : card.flipped
      ? 1
      : 0

    ctx.save()
    ctx.translate(card.x + cardWidth / 2, card.y + cardHeight / 2)

    let scaleY = 1
    if (card.animating) {
      scaleY =
        flipProgress < 0.5
          ? 1 - flipProgress * 2
          : -1 + (flipProgress - 0.5) * 2
    } else if (card.flipped) {
      scaleY = -1
    }
    ctx.scale(1, scaleY)

    ctx.fillStyle = isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(230, 231, 235)'
    ctx.shadowBlur = 2
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'

    drawRoundedRect(
      ctx,
      -cardWidth / 2,
      -cardHeight / 2,
      cardWidth,
      cardHeight,
      10,
    )

    if (scaleY === -1) {
      drawCardBack(
        ctx,
        card,
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth,
        cardHeight,
      )
    } else {
      drawCardFront(
        ctx,
        card,
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth,
        cardHeight,
      )
    }

    ctx.restore()
  }

  const drawCards = async (ctx: CanvasRenderingContext2D) => {
    if (!placeholderImage) {
      await loadPlaceholderImage()
    }

    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

    const totalWidth = cardWidth * 3 + 10 * 2
    const totalHeight = cardHeight * 3 + 10 * 2
    const startX = (canvas.value!.width - totalWidth) / 2
    const startY = (canvas.value!.height - totalHeight) / 2

    cards.value.forEach((card) =>
      drawCard(ctx, card, cardWidth, cardHeight, startX, startY),
    )
  }

  const animateCardFlip = (card: Card, onComplete: () => void) => {
    const duration = 100 // 1 second
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      card.animationProgress = elapsed / duration

      if (card.animationProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        card.animating = false
        onComplete() // Execute the callback
      }

      // Redraw the canvas with the animation progress
      if (ctx.value) {
        drawCards(ctx.value)
      }
    }

    requestAnimationFrame(animate)
  }

  const isMouseOverCard = (mouseX: number, mouseY: number) => {
    return cards.value.some((card) => {
      return (
        mouseX >= card.x &&
        mouseX <= card.x + cardWidth &&
        mouseY >= card.y &&
        mouseY <= card.y + cardHeight
      )
    })
  }

  const preloadPokemonImages = async () => {
    loading.value = true
    const loadedImages = await Promise.all(
      pokemons.value.map((pokemon) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = pokemon.artwork
        })
      }),
    )
    pokemonImages.value = loadedImages
    loading.value = false
  }

  const setupCanvasAndCards = () => {
    if (!canvas.value || !canvas.value.parentElement) {
      return
    }

    const { parentElement } = canvas.value
    const size = Math.min(parentElement.clientWidth, parentElement.clientHeight)

    canvas.value.width = size
    canvas.value.height = size

    // Calculate card dimensions
    const padding = 20 // Total padding for the grid
    const spacing = 10 // Spacing between cards
    const spaceForCards = size - padding
    const sizePerCard = spaceForCards / 3 - spacing

    // Only populate cards if they haven't been loaded from state
    if (cards.value.length === 0) {
      for (let i = 0; i < cardCount; i++) {
        cards.value.push(createCard(i, sizePerCard, sizePerCard, spacing))
      }
    }

    // Draw cards if context is available
    if (ctx.value) {
      drawCards(ctx.value)
    }
  }

  const checkGameStatus = () => {
    const hasWon = checkForWin()
    const allFlipped = cards.value.every((card) => card.flipped)

    if (hasWon) {
      status.value = 'won'
    } else if (allFlipped) {
      status.value = 'lost'
    }

    if (status.value === 'won' || status.value === 'lost') {
      clearState()
    }
  }

  const checkForWin = () => {
    if (cards.value.length < 3) return false

    for (let i = 0; i <= cards.value.length - 3; i++) {
      const currentCardImage = cards.value[i].image?.src
      const nextCardImage = cards.value[i + 1].image?.src
      const nextNextCardImage = cards.value[i + 2].image?.src

      if (
        currentCardImage &&
        currentCardImage === nextCardImage &&
        currentCardImage === nextNextCardImage
      ) {
        return true
      }
    }

    return false
  }

  const saveState = () => {
    const state = {
      cards: cards.value.map((card) => ({
        ...card,
        image: card.image ? card.image.src : null,
      })),
      status: status.value,
      pokemons: pokemonImages.value.map((img) => img.src),
    }

    localStorage.setItem('pokemon-game', JSON.stringify(state))
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const loadState = async () => {
    const savedData = localStorage.getItem('pokemon-game')
    if (!savedData) return

    const {
      cards: savedCards,
      status: savedStatus,
      pokemons: savedPokemons,
    } = JSON.parse(savedData)
    status.value = savedStatus

    // Load pokemon images asynchronously
    const pokemonImagePromises = savedPokemons.map((src: string) =>
      loadImage(src),
    )
    pokemonImages.value = await Promise.all(pokemonImagePromises)

    // Load card images asynchronously
    const cardPromises = savedCards.map(async (cardData: any) => {
      const card = { ...cardData }
      if (card.image) {
        const img = await loadImage(card.image)
        card.image = img
      }
      return card
    })
    cards.value = await Promise.all(cardPromises)

    // Now that all images are loaded, proceed to draw the cards
    nextTick(() => {
      if (ctx.value) drawCards(ctx.value)
    })
  }

  const clearState = () => {
    localStorage.removeItem('pokemon-game')
  }

  const handleCanvasClick = (event: MouseEvent) => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    handleCardClick(mouseX, mouseY)
  }

  const handleCanvasMouseMove = (event: MouseEvent) => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const isOverCard = isMouseOverCard(mouseX, mouseY)
    canvas.value.style.cursor = isOverCard ? 'pointer' : 'default'
  }

  const handleCardClick = (mouseX: number, mouseY: number) => {
    const clickedCard = cards.value.find((card) => {
      return (
        mouseX >= card.x &&
        mouseX <= card.x + cardWidth &&
        mouseY >= card.y &&
        mouseY <= card.y + cardHeight
      )
    })

    if (clickedCard) {
      if (!clickedCard.flipped && !clickedCard.animating) {
        clickedCard.animating = true
        clickedCard.animationProgress = 0
        animateCardFlip(clickedCard, () => {
          clickedCard.flipped = !clickedCard.flipped
          clickedCard.revealed = true
          const randomIndex = Math.floor(
            Math.random() * pokemonImages.value.length,
          )
          clickedCard.image = pokemonImages.value[randomIndex]

          if (ctx.value) {
            drawCards(ctx.value)
            checkGameStatus()
            saveState()
          }
        })
      }
    }
  }

  const initialize = async (darkMode: boolean) => {
    isDarkMode = darkMode

    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d')
      await loadState()
      setupCanvasAndCards()
      addEventListeners()
    }
  }

  const start = () => {
    clearState()
    // Reset game status
    status.value = 'playing'

    // Reset cards to their initial state
    cards.value = cards.value.map((card) => ({
      ...card,
      flipped: false,
      revealed: false,
      image: null,
      animating: false,
      animationProgress: 0,
    }))

    // Optionally, shuffle the pokemons or reset any game logic if needed

    // Redraw the canvas with the reset cards
    nextTick(() => {
      if (ctx.value) {
        drawCards(ctx.value)
      }
    })
  }

  const addEventListeners = (): void => {
    window.addEventListener('resize', setupCanvasAndCards)

    if (canvas.value) {
      canvas.value.addEventListener('click', handleCanvasClick)
      canvas.value.addEventListener('mousemove', handleCanvasMouseMove)
    }
  }

  const removeEventListeners = (): void => {
    window.removeEventListener('resize', setupCanvasAndCards)

    if (canvas.value) {
      canvas.value.removeEventListener('click', handleCanvasClick)
      canvas.value.removeEventListener('mousemove', handleCanvasMouseMove)
    }
  }

  watch(
    pokemons,
    (newPokemons) => {
      if (newPokemons && newPokemons.length > 0) {
        preloadPokemonImages()
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    removeEventListeners()
  })

  return {
    canvas,
    cards,
    loading,
    status,
    initialize,
    start,
    check: checkGameStatus,
    save: saveState,
  }
}
