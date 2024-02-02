import { ref, onBeforeUnmount, Ref, watch, nextTick } from 'vue'
import placeholderImageDarkSrc from '@/assets/pokeball-dark.png'
import placeholderImageLightSrc from '@/assets/pokeball-light.png'
import { Card, Pokemon } from '@/types'

/**
 * A composition function to handle the logic of rendering a simple Pokémon card matching game.
 *
 * @param pokemons - A ref array of Pokemon objects to be used in the game.
 * @returns An object containing various refs and functions to interact with the game.
 */
export default function usePokeGame(pokemons: Ref<Pokemon[]>) {
  const canvas: Ref<HTMLCanvasElement | null> = ref(null)
  const ctx: Ref<CanvasRenderingContext2D | null> = ref(null)
  const loading: Ref<boolean> = ref(true)
  const status = ref('')

  const cardCount = 9
  const cards: Ref<Card[]> = ref([])
  const pokemonImages: Ref<HTMLImageElement[]> = ref([])
  const revealedCards: Ref<string[]> = ref([])

  const cardWidth = 120
  const cardHeight = 120

  let placeholderImage: HTMLImageElement
  let isDarkMode = false

  /**
   * Loads the placeholder image based on the current theme mode.
   *
   * @returns A promise that resolves when the image is loaded.
   */
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

  /**
   * Clears the game state from local storage.
   */
  const clearState = () => {
    localStorage.removeItem('pokemon-game')
  }

  /**
   * Checks if the win condition is met.
   *
   * @returns true if the win condition is met, false otherwise.
   */
  const checkForWin = () => {
    if (revealedCards.value.length < 3) return false

    // Get the last three revealed cards
    const lastThreeReveals = revealedCards.value.slice(-3)

    // Check if all three are the same
    if (new Set(lastThreeReveals).size === 1) {
      return true // Win condition met
    }

    return false
  }

  /**
   * Checks the game status and updates it accordingly.
   */
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

  /**
   * Creates a card object with specified dimensions and positioning.
   *
   * @param id - The ID of the card.
   * @param cardWidth - The width of the card.
   * @param cardHeight - The height of the card.
   * @param spacing - The spacing between cards.
   * @returns A Card object.
   */
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

  /**
   * Draws a rounded rectangle on the canvas.
   *
   * @param ctx - The canvas rendering context.
   * @param x - The x-coordinate of the rectangle's starting point.
   * @param y - The y-coordinate of the rectangle's starting point.
   * @param width - The width of the rectangle.
   * @param height - The height of the rectangle.
   * @param radius - The border radius of the rectangle.
   */
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

  /**
   * Draws the front side of a card.
   *
   * @param ctx - The canvas rendering context.
   * @param card - The card to draw.
   * @param x - The x-coordinate of the card's position.
   * @param y - The y-coordinate of the card's position.
   * @param width - The width of the card.
   * @param height - The height of the card.
   */
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

  /**
   * Draws the back side of a card.
   *
   * @param ctx - The canvas rendering context.
   * @param card - The card to draw.
   * @param x - The x-coordinate of the card's position.
   * @param y - The y-coordinate of the card's position.
   * @param width - The width of the card.
   * @param height - The height of the card.
   */
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

  /**
   * Draws a card on the canvas, handling its flipping animation.
   *
   * @param ctx - The canvas rendering context.
   * @param card - The card to draw.
   * @param cardWidth - The width of the card.
   * @param cardHeight - The height of the card.
   * @param startX - The starting x-coordinate for drawing.
   * @param startY - The starting y-coordinate for drawing.
   */
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

    let flipProgress = 0

    if (card.animating) {
      flipProgress = card.animationProgress
    } else if (card.flipped) {
      flipProgress = 1
    }

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

  /**
   * Draws all cards on the canvas.
   *
   * @param ctx - The canvas rendering context.
   */
  const drawCards = async (ctx: CanvasRenderingContext2D) => {
    if (!canvas.value) return

    if (!placeholderImage) {
      await loadPlaceholderImage()
    }

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    const totalWidth = cardWidth * 3 + 10 * 2
    const totalHeight = cardHeight * 3 + 10 * 2
    const startX = (canvas.value.width - totalWidth) / 2
    const startY = (canvas.value.height - totalHeight) / 2

    cards.value.forEach((card) =>
      drawCard(ctx, card, cardWidth, cardHeight, startX, startY),
    )
  }

  /**
   * Animates the flipping of a card and updates the game state upon completion.
   *
   * @param card - The card to animate.
   * @param onComplete - A callback function to execute upon completion of the flip animation.
   */
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
        checkGameStatus()
      }
    }

    requestAnimationFrame(animate)
  }

  /**
   * Checks if the mouse is over a card.
   *
   * @param mouseX - The x-coordinate of the mouse position.
   * @param mouseY - The y-coordinate of the mouse position.
   * @returns true if the mouse is over a card, false otherwise.
   */
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

  /**
   * Preloads images of all pokemons used in the game.
   */
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

  /**
   * Sets up the canvas and cards for a new game or upon resizing.
   */
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
      for (let i = 0; i < cardCount; i += 1) {
        cards.value.push(createCard(i, sizePerCard, sizePerCard, spacing))
      }
    }

    // Draw cards if context is available
    if (ctx.value) {
      drawCards(ctx.value)
    }
  }

  /**
   * Saves the current game state to local storage.
   */
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

  /**
   * Loads an image asynchronously.
   *
   * @param src - The source URL of the image.
   * @returns A Promise that resolves with the loaded image.
   */
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  /**
   * Loads the game state from local storage.
   */
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

  /**
   * Handles a click on the card.
   *
   * @param event - The mouse event.
   */
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
          revealedCards.value.push(clickedCard.image.src)

          if (ctx.value) {
            drawCards(ctx.value)
            saveState()
          }
        })
      }
    }
  }

  /**
   * Handles a click on the canvas, determining if a card was clicked.
   *
   * @param event - The mouse event.
   */
  const handleCanvasClick = (event: MouseEvent) => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    handleCardClick(mouseX, mouseY)
  }

  /**
   * Handles mouse movement over the canvas, updating cursor style if over a card.
   *
   * @param event - The mouse event.
   */
  const handleCanvasMouseMove = (event: MouseEvent) => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const isOverCard = isMouseOverCard(mouseX, mouseY)
    canvas.value.style.cursor = isOverCard ? 'pointer' : 'default'
  }

  /**
   * Resets the game to its initial state and starts a new game session.
   */
  const start = () => {
    clearState()
    // Reset game status
    status.value = 'playing'
    revealedCards.value = []
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

  /**
   * Resets the game to its initial state and starts a new game session.
   */
  const addEventListeners = (): void => {
    window.addEventListener('resize', setupCanvasAndCards)

    if (canvas.value) {
      canvas.value.addEventListener('click', handleCanvasClick)
      canvas.value.addEventListener('mousemove', handleCanvasMouseMove)
    }
  }

  /**
   * Resets the game to its initial state and starts a new game session.
   */
  const removeEventListeners = (): void => {
    window.removeEventListener('resize', setupCanvasAndCards)

    if (canvas.value) {
      canvas.value.removeEventListener('click', handleCanvasClick)
      canvas.value.removeEventListener('mousemove', handleCanvasMouseMove)
    }
  }

  /**
   * Initializes the game, setting up the canvas and loading the game state.
   *
   * @param darkMode - Indicates if the dark mode is enabled.
   */
  const initialize = async (darkMode: boolean) => {
    isDarkMode = darkMode

    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d')
      await loadState()
      setupCanvasAndCards()
      addEventListeners()
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
