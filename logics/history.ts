"use client"

import { Kanji } from "@/data/kanji"

const key = "kanji-study-history"

type CorrectHistory = {
  isCorrect: boolean
  datetime: number
}

type KanjiCorrectHistory = {
  kanji: Kanji
  history: CorrectHistory[]
}

export const saveHistory = (kanji: Kanji, isCorrect: boolean) => {
  const histories = loadHistories()
  const index = histories.findIndex((k) => k.kanji.kanji === kanji.kanji)
  const history =
    index >= 0
      ? histories[index]
      : {
          kanji,
          history: [],
        }
  history.history.push({ isCorrect, datetime: Date.now() })
  if (index < 0) {
    histories.push(history)
  }
  localStorage.setItem(key, JSON.stringify(histories))
}

let histories: KanjiCorrectHistory[] | undefined
export const loadHistories = (): KanjiCorrectHistory[] => {
  if (histories) return histories

  const str = localStorage.getItem(key)
  histories = (str ? JSON.parse(str) : []) as KanjiCorrectHistory[]
  return histories
}

export const getHistory = (kanji: Kanji): KanjiCorrectHistory => {
  const current = loadHistories()
  return (
    current.find((k) => k.kanji.kanji === kanji.kanji) || {
      kanji,
      history: [],
    }
  )
}
