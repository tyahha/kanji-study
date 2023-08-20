"use client"

import { Kanji } from "@/data/kanji"

const answerHistoryKey = "kanji-study-history-v2"
const lastAnswerKey = "kanji-study-last-answer"

type CorrectHistory = {
  isCorrect: boolean
  datetime: number
}

type KanjiCorrectHistories = Record<string, CorrectHistory[]>

export const saveHistory = (kanji: Kanji, isCorrect: boolean) => {
  const histories = loadHistories()
  const history = histories[kanji.id] || []
  history.push({ isCorrect, datetime: Date.now() })
  histories[kanji.id] = history
  localStorage.setItem(answerHistoryKey, JSON.stringify(histories))
  localStorage.setItem(lastAnswerKey, kanji.id)
}

let histories: KanjiCorrectHistories | undefined
export const loadHistories = (): KanjiCorrectHistories => {
  if (histories) return histories

  const str = localStorage.getItem(answerHistoryKey)
  histories = (str ? JSON.parse(str) : {}) as KanjiCorrectHistories
  return histories
}

export const getHistory = (kanji: Kanji): CorrectHistory[] => {
  const current = loadHistories()
  return current[kanji.id] || []
}

export const loadLastAnsweredId = (): string | null => {
  return localStorage.getItem(lastAnswerKey)
}
