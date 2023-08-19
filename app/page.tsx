'use client'

import {useRouter} from "next/navigation";
import {TitleView} from "@/components/Title"
import {useState} from "react"
import {QuestionView} from "@/components/QuestionView"
import {KanjiData} from "@/data/kanji"

export default function Home() {

  const [mode, setMode] = useState<'title' | 'question'>('title');


  return mode === 'title' ? (
    <TitleView
      onStartFromBeginning={() => setMode('question')}
      onStartFromContinue={() => setMode('question')}
    />
  ) : (
    <QuestionView questions={KanjiData} onReturnTitle={() => setMode('title')} />
  )
}
