import { Kanji } from "@/data/kanji"
import { useMemo, useState } from "react"
import { saveHistory, saveHistoryAtReview } from "@/logics/history"
import { useAppContext } from "@/context"
import { Histories } from "@/components/Histories"
import { DrawArea } from "@/components/DrawArea"

type Props = {
  data: Kanji
  onPrev: () => void
  onNext: () => void
  onReturnTitle: () => void
}
export const KanjiQuestion = ({ data, onPrev, onNext, onReturnTitle }: Props) => {
  const { mode } = useAppContext()

  const [s1, s2] = data.sentence.split(data.kanji)
  const [status, setStatus] = useState<"thinking" | "result">("thinking")
  const word = useMemo(() => {
    return status === "thinking"
      ? data.questionType === "write"
        ? data.kana
        : data.kanji
      : data.questionType === "write"
      ? data.kanji
      : data.kana
  }, [status, data])

  const saveResult = (isCollect: boolean) => {
    if (mode === "review") {
      saveHistoryAtReview(data, isCollect)
    } else {
      saveHistory(data, isCollect)
    }
    setStatus("thinking")
    onNext()
  }

  const { questions } = useAppContext()
  const index = useMemo(() => questions.findIndex((q) => q.id === data.id), [data, questions])

  return (
    <main className="flex justify-center">
      <section className="w-11/12 text-center">
        <h2 className="text-center text-6xl my-4">
          問題{data.id}({index + 1}/{questions.length})
        </h2>
        <p className="bg-gray-100 text-center py-16">
          <span className="text-6xl">{s1} </span>
          <span className="font-bold underline text-6xl">{word}</span>
          <span className="text-6xl"> {s2}</span>
        </p>
        <div className="flex justify-center mt-4 bg-white">
          <DrawArea />
        </div>
        <div className="mt-4">
          <button
            className={`bg-blue-500 text-white font-bold py-4 rounded text-4xl w-1/2 ${
              status === "thinking" ? "hover:bg-blue-700" : "opacity-50"
            }`}
            onClick={() => setStatus("result")}
            disabled={status !== "thinking"}
          >
            答えを見る
          </button>
          <div className="flex gap-4 justify-center mt-4">
            <button
              disabled={status !== "result"}
              className={`bg-green-500 text-white font-bold py-4 w-1/2 text-4xl rounded ${
                status === "result" ? "hover:bg-green-700" : "opacity-50"
              }`}
              onClick={() => saveResult(true)}
            >
              ◎あたった
            </button>
            <button
              disabled={status !== "result"}
              className={`bg-red-500 text-white font-bold py-4 w-1/2 text-4xl rounded ${
                status === "result" ? "hover:bg-red-700" : "opacity-50"
              }`}
              onClick={() => saveResult(false)}
            >
              ✖はずれた
            </button>
          </div>
        </div>
        <div className="mt-4"></div>
        <div className="mt-4 flex gap-8 justify-center">
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => {
              setStatus("thinking")
              onPrev()
            }}
          >
            ＜＜＜前に戻る
          </button>
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={onReturnTitle}
          >
            タイトルに戻る
          </button>
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => {
              setStatus("thinking")
              onNext()
            }}
          >
            次に進む＞＞＞
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md mt-8 w-fit m-auto min-w-8">
          <Histories kanji={data} />
        </div>
      </section>
    </main>
  )
}
