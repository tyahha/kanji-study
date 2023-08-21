import { KanjiData1, KanjiData1Category } from "@/data/kanji001"
import { KanjiData2, KanjiData2Category } from "@/data/kanji002"
import { KanjiData3, KanjiData3Category } from "@/data/kanji003"
import { KanjiData4, KanjiData4Category } from "@/data/kanji004"
import { KanjiDataB1_2, KanjiDataB1_2Category } from "@/data/kanjiB001-2"
import { KanjiDataB1_1, KanjiDataB1_1Category } from "@/data/kanjiB001-1"

type QuestionType = "read" | "write"

export type Kanji = {
  id: string
  sentence: string
  kanji: string
  kana: string
  questionType: QuestionType
}

export const KanjiDataCategories = [
  KanjiData1Category,
  KanjiData2Category,
  KanjiData3Category,
  KanjiData4Category,
  KanjiDataB1_1Category,
  KanjiDataB1_2Category,
]

export const KanjiData: Kanji[] = [
  ...KanjiData1,
  ...KanjiData2,
  ...KanjiData3,
  ...KanjiData4,
  ...KanjiDataB1_1,
  ...KanjiDataB1_2,
]
