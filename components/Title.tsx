import { useAppContext } from "@/context"
import { KanjiData } from "@/data/kanji"
import { useMemo } from "react"
import { loadLastAnsweredId } from "@/logics/history"

export const TitleView = () => {
  const { setMode, setQuestions, setIndex } = useAppContext()
  const indexForContinue = useMemo(() => {
    const id = loadLastAnsweredId() || KanjiData[0].id
    const index = KanjiData.findIndex((k) => k.id === id) || 0
    const continueIndex = index + 1
    return continueIndex >= KanjiData.length ? 0 : continueIndex
  }, [])
  return (
    <main className="mt-16">
      <h1 className="text-9xl text-center">漢字の勉強</h1>
      <div className="flex justify-center gap-1 mt-8">
        <button
          onClick={() => {
            setQuestions(KanjiData)
            setIndex(0)
            setMode("question")
          }}
          className="bg-blue-500 text-white font-bold py-4 rounded hover:bg-blue-700 text-4xl w-1/4"
        >
          初めから
        </button>
        <button
          onClick={() => {
            setQuestions(KanjiData)
            setIndex(indexForContinue)
            setMode("question")
          }}
          className="bg-green-500 text-white font-bold py-4 rounded hover:bg-green-700 text-4xl w-1/4"
        >
          続きから
        </button>
      </div>
    </main>
  )
}
