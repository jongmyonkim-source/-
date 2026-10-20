import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { QuizQuestion, StudentInfo } from '../types';

interface QuizScreenProps {
  questions: QuizQuestion[];
  currentIndex: number;
  studentInfo: StudentInfo;
  onAnswerQuestion: (questionId: number, selectedIndex: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onFinishQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentIndex,
  studentInfo,
  onAnswerQuestion,
  onNextQuestion,
  onFinishQuiz,
}) => {
  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Local state for the current question interaction
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // When clicking an option
  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return; // Prevent double taps

    const isCorrect = idx === currentQ.correctIndex;
    setSelectedOption(idx);
    setHasAnswered(true);
    onAnswerQuestion(currentQ.id, idx, isCorrect);
  };

  const handleProceed = () => {
    if (isLastQuestion) {
      onFinishQuiz();
    } else {
      setSelectedOption(null);
      setHasAnswered(false);
      onNextQuestion();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-5 flex flex-col min-h-screen justify-between select-none">
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-stone-400">수강생</span>
            <span className="font-semibold text-stone-800">
              {studentInfo.studentName} ({studentInfo.studentId})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-700 font-bold text-sm">{currentIndex + 1}</span>
            <span className="text-stone-400 font-normal">/ {questions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Area */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-800">
            <span className="text-base">{currentQ.categoryEmoji}</span>
            <span>{currentQ.tag}</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug tracking-tight mb-2">
            {currentQ.question}
          </h2>

          <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-100">
            {currentQ.context}
          </p>
        </div>

        {/* 4 Multiple Choice Option Buttons */}
        <div className="space-y-2.5 mb-4" role="radiogroup" aria-label="객관식 보기">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQ.correctIndex;

            // Compute styling states
            let buttonClasses =
              'w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 active:scale-[0.99] cursor-pointer min-h-[54px]';

            if (!hasAnswered) {
              buttonClasses +=
                ' bg-white border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-stone-800 shadow-xs';
            } else {
              if (isSelected && isCorrectAnswer) {
                // User picked correct answer
                buttonClasses += ' bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-400';
              } else if (isSelected && !isCorrectAnswer) {
                // User picked wrong answer
                buttonClasses += ' bg-rose-50 border-rose-400 text-rose-900 shadow-sm';
              } else if (!isSelected && isCorrectAnswer) {
                // Reveal correct answer if user got it wrong
                buttonClasses += ' bg-emerald-50/70 border-emerald-400 text-emerald-800 border-dashed';
              } else {
                // Unselected other choices
                buttonClasses += ' bg-stone-50 border-stone-200 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={buttonClasses}
              >
                {/* Number or State Icon */}
                <div className="shrink-0 mt-0.5">
                  {!hasAnswered ? (
                    <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  ) : isSelected && isCorrectAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : isSelected && !isCorrectAnswer ? (
                    <XCircle className="w-6 h-6 text-rose-600 fill-rose-100" />
                  ) : !isSelected && isCorrectAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600/80" />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-400 text-xs font-medium flex items-center justify-center">
                      {idx + 1}
                    </span>
                  )}
                </div>

                <span className="flex-1 leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Card (Shows instantly upon answering) */}
        {hasAnswered && (
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/90 border-rose-200 text-rose-900'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>정답입니다! 🎉</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>아쉬워요! 💡 정답은 {currentQ.correctIndex + 1}번</span>
                </>
              )}
            </div>
            <p className="mt-0.5 text-stone-700">
              {selectedOption === currentQ.correctIndex
                ? currentQ.shortReaction.correct
                : currentQ.shortReaction.incorrect}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Area (Always visible when answered) */}
      <div className="pt-4 pb-2">
        {hasAnswered ? (
          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-3.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] text-base"
          >
            <span>{isLastQuestion ? '결과 및 해설 확인하기' : '다음 문제로'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <p className="text-center text-xs text-stone-400 py-3">
            보기 중 하나를 터치하면 즉시 정답 여부를 확인합니다.
          </p>
        )}
      </div>
    </div>
  );
};
