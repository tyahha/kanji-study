import { Canvas } from "fabric"

let canvas: Canvas | null = null
export const setCanvas = (c: Canvas | null) => {
  canvas = c
}

export const getCanvas = () => canvas
