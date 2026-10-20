import React, { useState, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { QUIZ_QUESTIONS } from './data/quizData';
import { StudentInfo, UserAnswer } from './types';

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem('microbio_student_info');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { studentId: '', studentName: '' };
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});

  // Save student info when updated
  const handleStartQuiz = (info: StudentInfo) => {
    setStudentInfo(info);
    try {
      localStorage.setItem('microbio_student_info', JSON.stringify(info));
    } catch {}
    setAnswers({});
    setCurrentIndex(0);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerQuestion = (questionId: number, selectedIndex: number, isCorrect: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedIndex,
        isCorrect,
        answeredAt: Date.now(),
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishQuiz = () => {
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeUser = () => {
    setAnswers({});
    setCurrentIndex(0);
    setScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-start">
      {screen === 'intro' && (
        <IntroScreen onStartQuiz={handleStartQuiz} initialInfo={studentInfo} />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          questions={QUIZ_QUESTIONS}
          currentIndex={currentIndex}
          studentInfo={studentInfo}
          onAnswerQuestion={handleAnswerQuestion}
          onNextQuestion={handleNextQuestion}
          onFinishQuiz={handleFinishQuiz}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          questions={QUIZ_QUESTIONS}
          answers={answers}
          studentInfo={studentInfo}
          onRestart={handleRestart}
          onChangeUser={handleChangeUser}
        />
      )}
    </main>
  );
}
