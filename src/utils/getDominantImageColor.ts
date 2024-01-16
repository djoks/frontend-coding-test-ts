import { Color } from "@/types/color";

/**
 * Retrieves the second most dominant color from an image, lightened by 45%.
 *
 * @param {HTMLImageElement} img - The image element to analyze.
 * @returns {string} The lightened second dominant color as an RGB string, or '#ffffff' if not found.
 */
export const getDominantImageColor = (img: HTMLImageElement): Color => {
  let defaultColor: string = 'rgb(255, 255, 255)';

  try {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Canvas context not available')
    }

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    const colorMap = createColorMap(imageData)
    const secondDominantColor = findSecondDominantColor(colorMap)

    defaultColor = secondDominantColor ? `rgb(${secondDominantColor})` : defaultColor;
    const lightColor = secondDominantColor ? lightenColor(secondDominantColor, 45) : defaultColor;
    const darkColor = secondDominantColor ? darkenColor(secondDominantColor, 15) : defaultColor;

    return {
      default: defaultColor,
      light: lightColor,
      dark: darkColor,
    };
  } catch (error) {
    console.error('Error getting dominant color:', error)
    return {
      default: defaultColor,
      light: defaultColor,
      dark: defaultColor,
    };
  }
}

/**
 * Creates a map of colors and their weights based on pixel data.
 *
 * @param {Uint8ClampedArray} imageData - The raw pixel data from an image.
 * @returns {Map<string, number>} A map where keys are RGB strings and values are their weights.
 */
const createColorMap = (imageData: Uint8ClampedArray): Map<string, number> => {
  const colorMap = new Map<string, number>()

  for (let i = 0; i < imageData.length; i += 4) {
    const alpha = imageData[i + 3]
    if (alpha !== 0) {
      const rgb = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`
      const weight = alpha / 255
      const existingWeight = colorMap.get(rgb) || 0
      colorMap.set(rgb, existingWeight + weight)
    }
  }

  return colorMap
}

/**
 * Finds the second most dominant color in a color map. Mainly because the first dominant color is usually white or transparent.
 *
 * @param {Map<string, number>} colorMap - A map of colors and their weights.
 * @returns {string | undefined} The RGB string of the second dominant color, or undefined if not found.
 */
const findSecondDominantColor = (
  colorMap: Map<string, number>,
): string | undefined => {
  let firstDominantColor = ''
  let secondDominantColor = ''
  let maxWeight = 0
  let secondMaxWeight = 0

  colorMap.forEach((weight, rgb) => {
    if (weight > maxWeight) {
      secondDominantColor = firstDominantColor
      secondMaxWeight = maxWeight
      firstDominantColor = rgb
      maxWeight = weight
    } else if (weight > secondMaxWeight) {
      secondDominantColor = rgb
      secondMaxWeight = weight
    }
  })

  return secondDominantColor
}

/**
 * Lightens a given RGB color by a specified percentage.
 *
 * @param {string} rgb - The RGB color string to lighten.
 * @param {number} percent - The percentage to lighten the color by.
 * @returns {string} The lightened RGB color string.
 */
const lightenColor = (rgb: string, percent: number): string => {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
  const increase = (value: number) =>
    Math.min(255, Math.floor(value + (255 - value) * (percent / 100)))

  return `rgb(${increase(r)}, ${increase(g)}, ${increase(b)})`
}

/**
 * Darkens a given RGB color by a specified percentage.
 *
 * @param {string} rgb - The RGB color string to darken.
 * @param {number} percent - The percentage to darken the color by.
 * @returns {string} The darkened RGB color string.
 */
const darkenColor = (rgb: string, percent: number): string => {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  const decrease = (value: number) =>
    Math.max(0, Math.floor(value - (value * (percent / 100))));

  return `rgb(${decrease(r)}, ${decrease(g)}, ${decrease(b)})`;
};