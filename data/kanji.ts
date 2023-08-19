import { KanjiData1 } from "@/data/kanji001"

type QuestionType = "read" | "write"

export type Kanji = {
  sentence: string
  kanji: string
  kana: string
  questionType: QuestionType
}

export const KanjiData: Kanji[] = [...KanjiData1]
