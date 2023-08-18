"use client"

import {KanjiData} from "@/data/kanji"
import {useRouter} from "next/navigation"
import {KanjiQuestion} from "@/components/KanjiQuestion"

export default function KanjiPage({params: { index }}: {params: {index: string}}) {
  const router = useRouter();
  const data = KanjiData[Number(index) - 1];
  if (!data) {
    router.replace('/')
    return;
  }

  return <KanjiQuestion data={data} />
}