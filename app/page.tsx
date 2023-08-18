'use client'

import {useRouter} from "next/navigation"

export default function Home() {
  const router = useRouter();
  const startAtFirst = () => {
    router.push("/kanji/1")
  }
  return (
    <main>
      <h1 className="text-9xl text-center">漢字の勉強</h1>
      <button className="bg-gray-400 hover:bg-gray-600 py-2 px-4 rounded" onClick={startAtFirst}>初めから</button>
    </main>
  )
}
