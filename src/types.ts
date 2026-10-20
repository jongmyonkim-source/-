export interface QuizQuestion {
  id: number;
  tag: string;
  categoryEmoji: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  shortReaction: {
    correct: string;
    incorrect: string;
  };
  explanation: {
    coreReason: string;
    sciencePrinciple: string;
    everydayTip: string;
  };
  keyMicrobe: {
    koreanName: string;
    scientificName: string;
    action: string;
  };
}

export interface StudentInfo {
  studentId: string;
  studentName: string;
}

export interface UserAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  answeredAt: number;
}
