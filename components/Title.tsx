import { useAppContext } from "@/context"
import { KanjiData } from "@/data/kanji"

export const TitleView = () => {
  const { setMode, setQuestions, setIndex } = useAppContext()
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
            setIndex(0)
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
