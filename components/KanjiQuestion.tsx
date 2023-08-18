import {Kanji, KanjiData} from "@/data/kanji"
import Link from "next/link"
import {Button} from "@/components/Button"
import {useMemo, useState} from "react"

type Props = {
  data: Kanji;
  index: number;
}
export const KanjiQuestion = ({data, index}: Props) => {
  const [s1, s2] = data.sentence.split("*");
  const [isThinking, setIsThinking] = useState(true)
  const toggleThinking = () => setIsThinking(!isThinking);
  const word = useMemo(() => {
    return isThinking ? data.questionType === "write" ? data.kana : data.kanji : data.questionType === "write" ? data.kanji : data.kana
  }, [isThinking, data])
  const nextIndex = index + 2;

  return <main className="flex justify-center">
    <section className="w-11/12 text-center">
      <h2 className="text-left text-xl">問題{index + 1}：</h2>
      <p className="bg-white text-center py-4">
        <span className="text-3xl">{s1} </span>
        <span className="font-bold underline text-3xl">{word}</span>
        <span className="text-3xl"> {s2}</span>
      </p>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleThinking}
        >
          {isThinking ? '答えを見る' : '問題に戻る'}
        </button>
      </div>
      <div className="mt-4">
        <h2>答え合わせ結果</h2>
        <div className="flex gap-4 justify-center">
        <button
          disabled={isThinking}
          className={`bg-green-500 text-white font-bold py-2 px-4 rounded ${isThinking ? "opacity-30" : 'hover:bg-green-700'}`}
          onClick={toggleThinking}
        >
          ◎あたり
        </button>
        <button
          disabled={isThinking}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${isThinking ? "opacity-30" : 'hover:bg-green-700'}`}
          onClick={toggleThinking}
        >
          ✖はずれ
        </button>
        </div>
      </div>
      <div className="mt-4">
        <Link className="bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded" href={"/kanji/" + nextIndex}>次に進む</Link>
      </div>
      <div className="mt-4">
        <Link href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">タイトルに戻る</Link>
      </div>
    </section>
  </main>
}