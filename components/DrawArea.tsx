import { useEffect, useRef } from "react"
import { Canvas, PencilBrush } from "fabric"

export const DrawArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = useRef<Canvas | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    canvas.current = new Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: window.innerWidth - 176,
      height: 200,
    })
    const brash = new PencilBrush(canvas.current)
    brash.width = 3
    brash.color = "#666"
    canvas.current.freeDrawingBrush = brash
    return () => {
      if (!canvas.current) return
      canvas.current.dispose()
      canvas.current = null
    }
  }, [])

  const clearCanvas = () => {
    canvas.current?.clear()
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
