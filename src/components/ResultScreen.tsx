import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Copy,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { QuizQuestion, StudentInfo, UserAnswer } from '../types';
import { COURSE_INFO, REVIEW_CHEAT_SHEET } from '../data/quizData';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface ResultScreenProps {
  questions: QuizQuestion[];
  answers: Record<number, UserAnswer>;
  studentInfo: StudentInfo;
  onRestart: () => void;
  onChangeUser: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  questions,
  answers,
  studentInfo,
  onRestart,
  onChangeUser,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');
  const [copiedToast, setCopiedToast] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  // Calculate score
  const totalCount = questions.length;
  const correctCount = questions.filter((q) => answers[q.id]?.isCorrect).length;
  const score = Math.round((correctCount / totalCount) * 100);

  // Trigger celebration confetti on mount if score >= 80
  useEffect(() => {
    if (score >= 80) {
      triggerCelebrationConfetti();
    }
  }, [score]);

  // Score feedback message tailored for non-majors
  const getFeedbackMessage = () => {
    if (score === 100) {
      return {
        title: '완벽한 발효 마스터! 💯',
        badge: '발효 과학자 등급',
        comment: '모든 미생물의 작용 원리를 완벽하게 꿰뚫고 계시네요! 7주차 중간/기말고사 A+는 따놓은 당상입니다.',
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-950',
      };
    } else if (score >= 80) {
      return {
        title: '아주 훌륭해요! 👏',
        badge: '발효 우등생 등급',
        comment: '일상 발효 식품의 미생물 원리를 탄탄하게 이해하셨습니다! 틀린 1문제 해설만 콕 집어 복습해보세요.',
        bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      };
    } else if (score >= 60) {
      return {
        title: '기본기가 좋아요! 👍',
        badge: '발효 탐험가 등급',
        comment: '미생물의 일상 역할을 잘 파악하고 계십니다. 헷갈렸던 균들의 작용 원리 해설을 확인하면 완벽해집니다!',
        bg: 'bg-amber-50 border-amber-200 text-amber-950',
      };
    } else {
      return {
        title: '복습으로 실력 쑥쑥! 🌱',
        badge: '새싹 연구원 등급',
        comment: '비전공자에게 생소할 수 있는 미생물 이름들이지만, 아래 해설과 요점정리를 읽어보면 금방 이해됩니다!',
        bg: 'bg-stone-100 border-stone-200 text-stone-900',
      };
    }
  };

  const feedback = getFeedbackMessage();

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const isCorrect = answers[q.id]?.isCorrect;
    if (filterMode === 'wrong') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  // Copy result summary to clipboard for submission or verification
  const handleCopyResult = async () => {
    const text = `[«${COURSE_INFO.courseName}» ${COURSE_INFO.weekNumber}주차 복습 퀴즈 결과]\n수강생: ${studentInfo.studentName} (${studentInfo.studentId})\n점수: ${score}점 (${correctCount}/${totalCount}문제 정답)\n완료 일시: ${new Date().toLocaleDateString('ko-KR')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // Fallback
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col min-h-screen">
      {/* Top Banner / Student Identity */}
      <div className="text-xs text-stone-500 mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
        <span>«{COURSE_INFO.courseName}» {COURSE_INFO.weekNumber}주차</span>
        <span className="font-semibold text-stone-800">
          {studentInfo.studentName} ({studentInfo.studentId})
        </span>
      </div>

      {/* Primary Score Board Card */}
      <div className={`rounded-2xl border p-5 mb-5 shadow-sm ${feedback.bg}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/70 text-stone-700 border border-stone-200/50">
            {feedback.badge}
          </span>
          <span className="text-xs text-stone-500 font-medium">
            정답률 {Math.round((correctCount / totalCount) * 100)}%
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-extrabold text-stone-900 tracking-tight">{score}</span>
          <span className="text-lg font-bold text-stone-500">/ 100점</span>
        </div>

        <div className="text-sm font-bold text-stone-800 mb-1">{feedback.title}</div>
        <p className="text-xs text-stone-600 leading-relaxed mb-3">
          {totalCount}문제 중 <strong className="text-emerald-700 font-bold">{correctCount}문제</strong>를 맞혔습니다! {feedback.comment}
        </p>

        {/* Action button row */}
        <div className="flex gap-2 pt-2 border-t border-stone-200/50">
          <button
            type="button"
            onClick={handleCopyResult}
            className="flex-1 py-2 px-3 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-stone-500" />
            <span>{copiedToast ? '결과 복사 완료!' : '결과 복사 (제출용)'}</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>다시 풀기</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs for Questions */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-stone-900">문항별 상세 해설</h2>
          <span className="text-xs text-stone-400">카드를 누르면 상세 과학 원리 확인</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-stone-100 p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              filterMode === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            전체 ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('wrong')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              filterMode === 'wrong'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-stone-500 hover:text-rose-600'
            }`}
          >
            틀린 문제 ({totalCount - correctCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('correct')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              filterMode === 'correct'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-500 hover:text-emerald-700'
            }`}
          >
            맞힌 문제 ({correctCount})
          </button>
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-3 mb-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-xs text-stone-400">
            해당 조건의 문제가 없습니다.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer?.isCorrect;
            const isExpanded = expandedQuestionId === q.id || filterMode === 'wrong';

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Header click toggles accordion */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-4 cursor-pointer hover:bg-stone-50/60 transition-colors flex items-start gap-3"
                >
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-bold text-stone-900">문제 {q.id}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-emerald-800 font-medium">{q.tag}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug line-clamp-2">
                      {q.question}
                    </p>
                  </div>

                  <div className="text-stone-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Answers Comparison & Detailed Pedagogical Explanation */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-stone-100 bg-stone-50/40 text-xs space-y-3">
                    {/* User Selection vs Correct Answer */}
                    <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-stone-500 w-16 shrink-0">내 선택:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {userAnswer ? q.options[userAnswer.selectedIndex] : '미응답'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-start gap-2 pt-1 border-t border-stone-100">
                          <span className="font-semibold text-emerald-700 w-16 shrink-0">실제 정답:</span>
                          <span className="font-bold text-emerald-900">
                            {q.options[q.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Key Microbe Identity Box */}
                    <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-950">
                      <div className="font-bold text-emerald-900 flex items-center gap-1 mb-1">
                        <span>🦠 핵심 미생물:</span>
                        <span>{q.keyMicrobe.koreanName}</span>
                        <span className="text-[11px] font-normal text-emerald-700 italic">
                          ({q.keyMicrobe.scientificName})
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-800">{q.keyMicrobe.action}</div>
                    </div>

                    {/* Detailed Explanation Breakdown */}
                    <div className="space-y-2 text-stone-700">
                      <div>
                        <div className="font-bold text-stone-900 mb-0.5">📌 정답인 이유</div>
                        <p className="leading-relaxed text-stone-600">{q.explanation.coreReason}</p>
                      </div>

                      <div>
                        <div className="font-bold text-stone-900 mb-0.5">🔬 과학 작용 원리</div>
                        <p className="leading-relaxed text-stone-600">{q.explanation.sciencePrinciple}</p>
                      </div>

                      <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-lg">
                        <div className="font-bold text-amber-900 mb-0.5">💡 일상 상식 팁</div>
                        <p className="leading-relaxed text-amber-800 text-[11px]">{q.explanation.everydayTip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Week 7 Key Summary Cheat Sheet */}
      <div className="rounded-xl border border-stone-200 bg-white p-4 mb-6">
        <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5 mb-3">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>7주차 발효 미생물 요점정리 노트</span>
        </h3>

        <div className="divide-y divide-stone-100 text-xs">
          {REVIEW_CHEAT_SHEET.map((item, idx) => (
            <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5">
              <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>{item.food}</span>
                  <span className="text-[11px] font-medium text-emerald-800">{item.microbe}</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{item.keyRole}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Switch Student & Replay Actions */}
      <div className="space-y-2 text-center pb-8 mt-auto">
        <button
          type="button"
          onClick={onChangeUser}
          className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
        >
          다른 학생 정보로 다시 시작하기
        </button>
      </div>
    </div>
  );
};
