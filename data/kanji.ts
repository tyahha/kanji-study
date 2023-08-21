import { KanjiData1, KanjiData1Title } from "@/data/kanji001"
import { KanjiData2, KanjiData2Title } from "@/data/kanji002"
import { KanjiData3, KanjiData3Title } from "@/data/kanji003"
import { KanjiData4, KanjiData4Title } from "@/data/kanji004"

type QuestionType = "read" | "write"

export type Kanji = {
  id: string
  sentence: string
  kanji: string
  kana: string
  questionType: QuestionType
}

export const KanjiDataTitles = [KanjiData1Title, KanjiData2Title, KanjiData3Title, KanjiData4Title]

export const KanjiData: Kanji[] = [...KanjiData1, ...KanjiData2, ...KanjiData3, ...KanjiData4]
