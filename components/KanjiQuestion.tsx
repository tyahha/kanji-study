import { Kanji } from "@/data/kanji"
import { useMemo, useState } from "react"
import { getHistory, saveHistory } from "@/logics/history"
import { useRouter } from "next/navigation"

type Props = {
  data: Kanji
  onPrev: () => void
  onNext: () => void
  onReturnTitle: () => void
}
export const KanjiQuestion = ({ data, onPrev, onNext, onReturnTitle }: Props) => {
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

  const router = useRouter()
  const saveResult = (isCollect: boolean) => {
    saveHistory(data, isCollect)
    setStatus("thinking")
    onNext()
  }

  const history = useMemo(() => getHistory(data), [data])

  return (
    <main className="flex justify-center">
      <section className="w-11/12 text-center">
        <h2 className="text-left text-4xl">問題：</h2>
        <p className="bg-white text-center py-16">
          <span className="text-6xl">{s1} </span>
          <span className="font-bold underline text-6xl">{word}</span>
          <span className="text-6xl"> {s2}</span>
        </p>
        <div className="mt-4">
          {status === "thinking" ? (
            <button
              className={`bg-blue-500 text-white font-bold py-4 rounded hover:bg-blue-700 text-4xl w-1/2`}
              onClick={() => setStatus("result")}
              disabled={status !== "thinking"}
            >
              答えを見る
            </button>
          ) : (
            <div className="flex gap-4 justify-center">
              <button
                disabled={status !== "result"}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-6 w-1/2 text-4xl rounded`}
                onClick={() => saveResult(true)}
              >
                ◎あたった
              </button>
              <button
                disabled={status !== "result"}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-6 w-1/2 text-4xl rounded'`}
                onClick={() => saveResult(false)}
              >
                ✖はずれた
              </button>
            </div>
          )}
        </div>
        <div className="mt-4"></div>
        <div className="mt-4 flex gap-8 justify-center">
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={onPrev}
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
            onClick={onNext}
          >
            次に進む＞＞＞
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md mt-8 w-fit m-auto min-w-8">
          <table className="text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  履歴
                </th>
                <th scope="col" className="px-6 py-3">
                  ◎✖
                </th>
              </tr>
            </thead>
            <tbody>
              {history.history.map((h) => {
                const date = new Date(h.datetime)
                const str =
                  date.getFullYear() +
                  "/" +
                  ("0" + (date.getMonth() + 1)).slice(-2) +
                  "/" +
                  ("0" + date.getDate()).slice(-2)
                return (
                  <tr
                    key={h.datetime}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {str}
                    </th>
                    <td className="px-6 py-4">{h.isCorrect ? "◎" : "✖"}</td>
                  </tr>
                )
              })}
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  合計
                </th>
                <td className="px-6 py-4">
                  ◎：{history.history.filter((h) => h.isCorrect).length}, ✖：
                  {history.history.filter((h) => !h.isCorrect).length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
