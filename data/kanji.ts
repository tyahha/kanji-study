import { KanjiData1 } from "@/data/kanji001"
import { KanjiData2 } from "@/data/kanji002"

type QuestionType = "read" | "write"

export type Kanji = {
  id: string
  sentence: string
  kanji: string
  kana: string
  questionType: QuestionType
}

export const KanjiData: Kanji[] = [...KanjiData1, ...KanjiData2]
