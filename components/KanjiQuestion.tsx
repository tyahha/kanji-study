import {Kanji, KanjiData} from "@/data/kanji"

type Props = {
  data: Kanji;
}
export const KanjiQuestion = ({data}: Props) => {
  const sentence = data.sentence.replace("{}", data.questionType === "write" ? data.kana : data.kanji)

  return <main>{sentence}</main>
}