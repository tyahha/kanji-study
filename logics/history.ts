"use client"

import { Kanji } from "@/data/kanji"

const answerHistoryKey = "kanji-study-history"

type CorrectHistory = {
  isCorrect: boolean
  datetime: number
}

type KanjiCorrectHistory = {
  kanji: Kanji
  history: CorrectHistory[]
}

type KanjiCorrectHistories = Record<string, KanjiCorrectHistory>

export const saveHistory = (kanji: Kanji, isCorrect: boolean) => {
  const histories = loadHistories()
  const history = histories[kanji.id] || {
    kanji,
    history: [],
  }
  history.history.push({ isCorrect, datetime: Date.now() })
  histories[kanji.id] = history
  localStorage.setItem(answerHistoryKey, JSON.stringify(histories))
}

let histories: KanjiCorrectHistories | undefined
export const loadHistories = (): KanjiCorrectHistories => {
  if (histories) return histories

  const str = localStorage.getItem(answerHistoryKey)
  histories = (str ? JSON.parse(str) : {}) as KanjiCorrectHistories
  return histories
}

export const getHistory = (kanji: Kanji): KanjiCorrectHistory => {
  const current = loadHistories()
  return (
    current[kanji.id] || {
      kanji,
      history: [],
    }
  )
}
