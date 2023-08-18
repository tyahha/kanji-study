"use client"

import {KanjiData} from "@/data/kanji"
import {useRouter} from "next/navigation"
import {KanjiQuestion} from "@/components/KanjiQuestion"

export default function KanjiPage({params: { index }}: {params: {index: string}}) {
  const router = useRouter();
  const i = Number(index) - 1
  const data = KanjiData[i];
  if (!data) {
    router.replace('/')
    return;
  }

  return <KanjiQuestion data={data} index={i} />
}