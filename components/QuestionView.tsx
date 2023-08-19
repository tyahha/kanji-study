import {Kanji} from "@/data/kanji"
import {useEffect, useState} from "react"
import {KanjiQuestion} from "@/components/KanjiQuestion"

type Props = {
  questions: Kanji[];
  onReturnTitle: () => void;
}
export const QuestionView = ({questions, onReturnTitle}: Props) => {
  const [index, setIndex] = useState(0);
  const goToNext = () => {
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      onReturnTitle();
    } else {
      setIndex(nextIndex);
    }
  }
  const goToPrev = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      onReturnTitle();
    } else {
      setIndex(nextIndex);
    }
  }

  return <KanjiQuestion data={questions[index]} onPrev={goToPrev} onNext={goToNext} onReturnTitle={onReturnTitle} />
}