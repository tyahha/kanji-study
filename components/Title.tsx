import { useAppContext } from "@/context"
import { Kanji, KanjiData } from "@/data/kanji"
import { useMemo } from "react"
import { loadHistories, loadLastAnsweredId } from "@/logics/history"
import dayjs from "dayjs"

const pickWrongs = (day: dayjs.Dayjs) => {
  const histories = loadHistories()
  const ret: Kanji[] = []
  const baseDay = day.format("YYYYMMDD")
  Object.entries(histories).forEach(([id, history]) => {
    const kanji = KanjiData.find((k) => k.id === id)
    if (
      kanji &&
      history.find((h) => !h.isCorrect && dayjs(h.datetime).format("YYYYMMDD") === baseDay)
    ) {
      ret.push(kanji)
    }
  })
  return ret
}

export const TitleView = () => {
  const { setMode, setQuestions, setIndex } = useAppContext()
  const indexForContinue = useMemo(() => {
    const id = loadLastAnsweredId() || KanjiData[0].id
    const index = KanjiData.findIndex((k) => k.id === id) || 0
    const continueIndex = index + 1
    return continueIndex >= KanjiData.length ? 0 : continueIndex
  }, [])

  const todayWrongs = useMemo(() => pickWrongs(dayjs()), [])
  const yesterdayWrongs = useMemo(() => pickWrongs(dayjs().subtract(1, "day")), [])

  return (
    <main className="mt-16">
      <h1 className="text-9xl text-center">漢字の勉強</h1>
      <h2 className="text-center mt-16 text-4xl">毎日の学習</h2>
      <div className="flex justify-center gap-1 mt-4">
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
      <h2 className="text-center mt-16 text-4xl">復習</h2>
      <div className="flex justify-center gap-1 mt-4">
        <button
          disabled={todayWrongs.length === 0}
          onClick={() => {
            setQuestions(todayWrongs)
            setIndex(0)
            setMode("review")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-4xl w-1/4 ${
            todayWrongs.length === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          今日間違えたところ
        </button>
      </div>
      <div className="flex justify-center gap-1 mt-4">
        <button
          disabled={yesterdayWrongs.length === 0}
          onClick={() => {
            setQuestions(yesterdayWrongs)
            setIndex(0)
            setMode("review")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-4xl w-1/4 ${
            yesterdayWrongs.length === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          昨日間違えたところ
        </button>
      </div>
    </main>
  )
}
