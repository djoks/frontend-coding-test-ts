export default interface Card {
  id: number
  x: number
  y: number
  flipped: boolean
  revealed: boolean
  image: HTMLImageElement | null
  animating: boolean
  animationProgress: number
}
