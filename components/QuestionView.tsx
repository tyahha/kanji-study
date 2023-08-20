import { KanjiQuestion } from "@/components/KanjiQuestion"
import { useAppContext } from "@/context"

export const QuestionView = () => {
  const { index, setMode, setIndex, questions } = useAppContext()
  const returnTitle = () => setMode("title")

  const goToNext = () => {
    const nextIndex = index + 1
    if (nextIndex >= questions.length) {
      returnTitle()
    } else {
      setIndex(nextIndex)
    }
  }
  const goToPrev = () => {
    const nextIndex = index - 1
    if (nextIndex < 0) {
      returnTitle()
    } else {
      setIndex(nextIndex)
    }
  }

  return (
    <KanjiQuestion
      data={questions[index]}
      onPrev={goToPrev}
      onNext={goToNext}
      onReturnTitle={returnTitle}
    />
  )
}
