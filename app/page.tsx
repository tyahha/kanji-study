'use client'

import {useRouter} from "next/navigation"
import {Button} from "@/components/Button"

export default function Home() {
  const router = useRouter();
  const startAtFirst = () => {
    router.push("/kanji/1")
  }
  return (
    <main>
      <h1 className="text-9xl text-center">漢字の勉強</h1>
      <div className="flex justify-center gap-1">
        <Button onClick={startAtFirst}>初めから</Button>
        <Button onClick={startAtFirst}>続きから</Button>
      </div>
    </main>
  )
}
