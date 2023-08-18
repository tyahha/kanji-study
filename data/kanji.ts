type QuestionType = 'read' | 'write';

export type Kanji = {
  sentence: string;
  kana: string;
  kanji: string;
  questionType: QuestionType;
}

export const KanjiData: Kanji[] = [
  {
    sentence: "はじめての{}",
    kana: "モンダイ",
    kanji: "問題",
    questionType: "write",
  }
]