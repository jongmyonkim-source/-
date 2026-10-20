import React, { useState } from 'react';
import { BookOpen, Sparkles, User, GraduationCap, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { COURSE_INFO, REVIEW_CHEAT_SHEET } from '../data/quizData';
import { StudentInfo } from '../types';

interface IntroScreenProps {
  onStartQuiz: (info: StudentInfo) => void;
  initialInfo: StudentInfo;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartQuiz, initialInfo }) => {
  const [studentId, setStudentId] = useState(initialInfo.studentId);
  const [studentName, setStudentName] = useState(initialInfo.studentName);
  const [errorMsg, setErrorMsg] = useState('');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = studentId.trim();
    const cleanName = studentName.trim();

    if (!cleanId) {
      setErrorMsg('학번을 입력해주세요.');
      return;
    }
    if (!cleanName) {
      setErrorMsg('이름을 입력해주세요.');
      return;
    }

    setErrorMsg('');
    onStartQuiz({
      studentId: cleanId,
      studentName: cleanName,
    });
  };

  const fillQuickDemo = () => {
    setStudentId('20261042');
    setStudentName('김민서');
    setErrorMsg('');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-10 flex flex-col min-h-screen justify-between">
      {/* Top Header & Badge */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 pb-2 border-b border-stone-200">
          <span className="font-medium tracking-wide text-emerald-800">{COURSE_INFO.courseName}</span>
          <span>{COURSE_INFO.semester}</span>
        </div>

        {/* Hero Title Area */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{COURSE_INFO.weekNumber}주차 주간 복습 퀴즈</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight mb-2">
            발효 식품과 미생물
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            김치, 요거트, 맥주, 빵, 식초 속에 살아 숨 쉬는 미생물의 비밀! 비전공 1학년 학생을 위한 핵심 5문항 숏퀴즈입니다.
          </p>
        </div>

        {/* Quiz Specs Highlights */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-stone-100 rounded-xl mb-6 text-center text-xs">
          <div className="flex flex-col items-center justify-center p-1">
            <span className="text-stone-400 font-medium">문항수</span>
            <span className="text-stone-800 font-bold text-sm mt-0.5">5문항 (4지선다)</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 border-x border-stone-200">
            <span className="text-stone-400 font-medium">소요 시간</span>
            <span className="text-stone-800 font-bold text-sm mt-0.5">약 3~5분</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1">
            <span className="text-stone-400 font-medium">채점 방식</span>
            <span className="text-emerald-700 font-bold text-sm mt-0.5">실시간 즉시 해설</span>
          </div>
        </div>

        {/* Student Entry Form Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>학생 본인 확인</span>
            </h2>
            <button
              type="button"
              onClick={fillQuickDemo}
              className="text-xs text-stone-500 hover:text-emerald-700 underline decoration-dotted transition-colors"
            >
              예시 정보 입력
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="studentId" className="block text-xs font-semibold text-stone-700 mb-1">
                학번
              </label>
              <div className="relative">
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="예: 20261234"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="studentName" className="block text-xs font-semibold text-stone-700 mb-1">
                이름
              </label>
              <div className="relative">
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="예: 홍길동"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer text-base active:scale-[0.99]"
            >
              <span>퀴즈 시작하기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Collapsible Key Concept Preview Drawer */}
        <div className="rounded-xl border border-stone-200 bg-white overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="w-full px-4 py-3 flex items-center justify-between text-left text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>7주차 핵심 발효 미생물 미리보기</span>
            </span>
            <span className="text-stone-400 text-xs font-normal">
              {showCheatSheet ? '닫기 ▲' : '열기 ▼'}
            </span>
          </button>

          {showCheatSheet && (
            <div className="p-4 bg-stone-50/70 border-t border-stone-100 space-y-2.5">
              {REVIEW_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-2.5">
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-bold text-stone-900 text-xs">{item.food}</div>
                    <div className="text-emerald-700 font-medium text-[11px]">{item.microbe}</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">{item.keyRole}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-stone-400 pb-4">
        «생활 속 미생물» 7주차 학습 점검 · 성적 반영 없는 자율 복습용
      </footer>
    </div>
  );
};
