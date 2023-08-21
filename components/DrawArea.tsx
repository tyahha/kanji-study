import { useEffect, useRef } from "react"
import { Canvas, PencilBrush } from "fabric"
import { getCanvas, setCanvas } from "@/logics/canvas"

export const DrawArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: window.innerWidth - 176,
      height: 200,
    })
    const brash = new PencilBrush(canvas)
    brash.width = 3
    brash.color = "#666"
    canvas.freeDrawingBrush = brash
    setCanvas(canvas)
    return () => {
      canvas.dispose()
      setCanvas(null)
    }
  }, [])

  const clearCanvas = () => {
    getCanvas()?.clear()
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} />
      <button
        className="absolute top-2 right-2 px-2 py-1 rounded bg-gray-300 text-red-700 text-4xl"
        onClick={clearCanvas}
      >
        ✖
      </button>
    </div>
  )
}
