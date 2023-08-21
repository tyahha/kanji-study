import { useEffect, useRef } from "react"
import { Canvas, PencilBrush } from "fabric"
import { getCanvas, setCanvas } from "@/logics/canvas"

export const DrawArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const undoHistory = useRef<string[]>([])
  const historyIndex = useRef(0)
  const isLockHistory = useRef(false)

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
    undoHistory.current.push(JSON.stringify(canvas))

    const historyAdd = () => {
      if (isLockHistory.current) return
      historyIndex.current++
      undoHistory.current = [
        ...undoHistory.current.slice(0, historyIndex.current),
        JSON.stringify(canvas),
      ]
    }

    canvas.on("object:added", historyAdd)
    canvas.on("object:modified", historyAdd)

    setCanvas(canvas)
    return () => {
      canvas.dispose()
      setCanvas(null)
      undoHistory.current = []
    }
  }, [])

  const clearCanvas = () => {
    getCanvas()?.clear()
  }

  const loadHistoryByIndex = async (index: number) => {
    if (index < 0 || undoHistory.current.length <= index) return

    const canvas = getCanvas()
    if (!canvas) return

    historyIndex.current = index
    const content = undoHistory.current[historyIndex.current]
    isLockHistory.current = true

    await canvas.loadFromJSON(content)

    isLockHistory.current = false
    canvas.renderAll()
  }

  const undo = async () => {
    await loadHistoryByIndex(historyIndex.current - 1)
  }

  const redo = async () => {
    await loadHistoryByIndex(historyIndex.current + 1)
  }

  return (
    <div className="relative w-full">
      <canvas ref={canvasRef} />
      <div className="flex gap-2 absolute top-2 right-2">
        <button className="px-2 py-1 rounded bg-gray-300 text-red-700 text-4xl" onClick={undo}>
          ←
        </button>
        <button className="px-2 py-1 rounded bg-gray-300 text-red-700 text-4xl" onClick={redo}>
          →
        </button>
        <button
          className="px-2 py-1 rounded bg-gray-300 text-red-700 text-4xl"
          onClick={clearCanvas}
        >
          ✖
        </button>
      </div>
    </div>
  )
}
