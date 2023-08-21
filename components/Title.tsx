import { useAppContext } from "@/context"
import { Kanji, KanjiData, KanjiDataCategories } from "@/data/kanji"
import { useEffect, useState } from "react"
import { getTodayStudyCount, loadHistories, loadLastAnsweredId } from "@/logics/history"
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

const pickRecentWrongs = (day: dayjs.Dayjs) => {
  const histories = loadHistories()
  const ret: Kanji[] = []
  const baseDay = day.format("YYYYMMDD")
  Object.entries(histories).forEach(([id, history]) => {
    const kanji = KanjiData.find((k) => k.id === id)
    if (
      kanji &&
      history.length > 0 &&
      !history[history.length - 1].isCorrect &&
      baseDay === dayjs(history[history.length - 1].datetime).format("YYYYMMDD")
    ) {
      ret.push(kanji)
    }
  })
  return ret
}

export const TitleView = () => {
  const { setMode, setQuestions, setIndex } = useAppContext()
  const [
    {
      indexForContinue,
      recentWrongs,
      todayWrongs,
      yesterdayWrongs,
      twoDaysAgoWrongs,
      todayStudyCount,
    },
    setState,
  ] = useState<{
    indexForContinue: number
    recentWrongs: Kanji[]
    todayWrongs: Kanji[]
    yesterdayWrongs: Kanji[]
    twoDaysAgoWrongs: Kanji[]
    todayStudyCount: number
  }>({
    indexForContinue: 0,
    recentWrongs: [],
    todayWrongs: [],
    yesterdayWrongs: [],
    twoDaysAgoWrongs: [],
    todayStudyCount: 0,
  })
  useEffect(() => {
    const id = loadLastAnsweredId() || KanjiData[0].id
    const index = KanjiData.findIndex((k) => k.id === id) || -1
    const continueIndex = index + 1
    setState({
      indexForContinue: KanjiData.length <= continueIndex ? 0 : continueIndex,
      recentWrongs: pickRecentWrongs(dayjs()),
      todayWrongs: pickWrongs(dayjs()),
      yesterdayWrongs: pickWrongs(dayjs().subtract(1, "day")),
      twoDaysAgoWrongs: pickWrongs(dayjs().subtract(2, "day")),
      todayStudyCount: getTodayStudyCount(),
    })
  }, [])
  const [categoryIndex, setCategoryIndex] = useState(0)

  return (
    <main className="mt-16">
      <h1 className="text-9xl text-center">漢字の勉強</h1>
      <h2 className="text-center mt-12 text-4xl">
        毎日の学習(本日勉強した漢字の数：{todayStudyCount})
      </h2>
      <div className="flex justify-center gap-1 mt-4">
        <button
          onClick={() => {
            setQuestions(KanjiData)
            setIndex(0)
            setMode("question")
          }}
          className="bg-blue-500 text-white font-bold py-4 rounded hover:bg-blue-700 text-2xl w-1/4"
        >
          初めから
        </button>
        <button
          onClick={() => {
            setQuestions(KanjiData)
            setIndex(indexForContinue)
            setMode("question")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
            indexForContinue === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          続きから
        </button>
      </div>
      <div className="flex justify-center gap-1 mt-4">
        <button
          onClick={() => {
            const category = KanjiDataCategories[categoryIndex]
            const idToFind = `${category.idPrefix}-1`
            const index = KanjiData.findIndex((k) => k.id === idToFind)
            setQuestions(KanjiData)
            setIndex(index < 0 ? 0 : index)
            setMode("question")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
            indexForContinue === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          選んで始める
        </button>
        <select
          className="text-xl text-center w-1/4"
          value={categoryIndex}
          onChange={(e) => setCategoryIndex(Number(e.target.value))}
        >
          {KanjiDataCategories.map((c, index) => (
            <option key={c.idPrefix} value={index}>
              {c.idPrefix}. {c.title}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-center mt-12 text-4xl">復習</h2>
      <div className="flex justify-center gap-1 mt-4">
        <button
          disabled={recentWrongs.length === 0}
          onClick={() => {
            setQuestions(recentWrongs)
            setIndex(0)
            setMode("review")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
            recentWrongs.length === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          直前に間違えたところ
        </button>
        <button
          disabled={todayWrongs.length === 0}
          onClick={() => {
            setQuestions(todayWrongs)
            setIndex(0)
            setMode("review")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
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
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
            yesterdayWrongs.length === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          昨日間違えたところ
        </button>
        <button
          disabled={twoDaysAgoWrongs.length === 0}
          onClick={() => {
            setQuestions(twoDaysAgoWrongs)
            setIndex(0)
            setMode("review")
          }}
          className={`bg-green-500 text-white font-bold py-4 rounded text-2xl w-1/4 ${
            twoDaysAgoWrongs.length === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          一昨日間違えたところ
        </button>
      </div>
    </main>
  )
}
