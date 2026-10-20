import { QuizQuestion } from '../types';

export const COURSE_INFO = {
  courseName: '생활 속 미생물',
  semester: '2026학년도 교양과정',
  target: '1학년 비전공 수강생',
  weekNumber: 7,
  topic: '발효 식품과 미생물',
  subtopic: '젖산균 · 효모 · 누룩곰팡이 · 초산균과 발효의 원리',
  totalQuestions: 5,
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    tag: '김치 & 요거트의 주역',
    categoryEmoji: '🥬',
    question: '김치가 알맞게 익으며 감칠맛 나는 새콤한 맛을 내고, 우유를 걸쭉한 요거트로 변화시키는 핵심 미생물은 무엇일까요?',
    context: '냉장고 속 김치와 아침에 먹는 그릭 요거트에는 모두 같은 원리의 발효가 일어납니다.',
    options: [
      '젖산균 (유산균 / Lactobacillus 등)',
      '효모 (Yeast / Saccharomyces)',
      '초산균 (Acetobacter)',
      '푸른곰팡이 (Penicillium)',
    ],
    correctIndex: 0,
    shortReaction: {
      correct: '정답입니다! 젖산(Lactic acid)이 새콤한 맛과 보존성을 높여줍니다.',
      incorrect: '아쉬워요! 김치와 요거트의 새콤한 맛은 ‘젖산균(유산균)’의 작품입니다.',
    },
    explanation: {
      coreReason: '젖산균은 채소나 우유에 든 당(포도당, 젖당)을 먹고 ‘젖산(Lactic acid)’을 만들어냅니다.',
      sciencePrinciple: '젖산이 축적되면 주변 산도(pH)가 낮아져 산성 환경이 됩니다. 이 산성 환경 덕분에 식중독균이나 부패균이 자라지 못해 음식을 오래 보관할 수 있습니다.',
      everydayTip: '김치찌개를 끓일 때 묵은지에서 나는 특유의 깊은 신맛이 바로 젖산균이 오랜 시간 만든 젖산의 맛입니다!',
    },
    keyMicrobe: {
      koreanName: '젖산균 (유산균)',
      scientificName: 'Lactobacillus, Leuconostoc 등',
      action: '당류 분해 ➔ 젖산(Lactic acid) 생성으로 산미 부여 및 잡균 억제',
    },
  },
  {
    id: 2,
    tag: '빵 & 맥주의 마법사',
    categoryEmoji: '🍞',
    question: '퇴근길 맥주의 시원한 탄산과 알코올, 그리고 갓 구운 빵의 폭신폭신한 숨구멍을 공통으로 만들어내는 미생물은?',
    context: '베이킹할 때 넣는 ‘이스트(Yeast)’가 바로 이 미생물입니다.',
    options: [
      '바실러스균 (Bacillus subtilis)',
      '효모 (Saccharomyces cerevisiae)',
      '누룩곰팡이 (Aspergillus oryzae)',
      '메탄생성균 (Methanogen)',
    ],
    correctIndex: 1,
    shortReaction: {
      correct: '정답입니다! 효모의 알코올 발효로 에탄올과 이산화탄소(CO₂)가 탄생합니다.',
      incorrect: '아쉬워요! 빵과 맥주의 숨은 주인공은 ‘효모(Yeast)’입니다.',
    },
    explanation: {
      coreReason: '효모는 산소가 부족한 환경에서 포도당을 분해해 에탄올(알코올)과 이산화탄소(CO₂) 가스를 배출합니다.',
      sciencePrinciple: '빵 반죽에서는 이산화탄소 가스가 글루텐 그물망에 갇히며 반죽을 부풀리고(오븐에서 알코올은 증발), 맥주나 와인에서는 알코올과 톡 쏘는 탄산으로 남습니다.',
      everydayTip: '식빵을 잘랐을 때 보이는 수많은 기포 구멍은 오븐에 굽기 전 효모가 내뿜은 이산화탄소 가스 방울의 흔적입니다.',
    },
    keyMicrobe: {
      koreanName: '효모 (출아효모)',
      scientificName: 'Saccharomyces cerevisiae',
      action: '당류 ➔ 에탄올(알코올) + 이산화탄소(CO₂) 가스 생성 (알코올 발효)',
    },
  },
  {
    id: 3,
    tag: '전통 장류 & 누룩의 비밀',
    categoryEmoji: '🏺',
    question: '우리나라 전통 된장·간장을 담그거나 막걸리를 빚을 때 메주와 누룩에서 콩 단백질과 쌀 전분을 잘게 분해해주는 핵심 미생물은?',
    context: '단단한 콩과 쌀이 구수한 감칠맛과 달콤한 맛으로 변하는 비밀입니다.',
    options: [
      '대장균 (Escherichia coli)',
      '누룩곰팡이 (Aspergillus oryzae)',
      '보툴리누스균 (Clostridium botulinum)',
      '스피룰리나 (Spirulina)',
    ],
    correctIndex: 1,
    shortReaction: {
      correct: '정답입니다! 누룩곰팡이의 강력한 소화 효소가 감칠맛 아미노산을 만듭니다.',
      incorrect: '아쉬워요! 전통 발효장의 마스터는 ‘누룩곰팡이(황국균 등)’입니다.',
    },
    explanation: {
      coreReason: '누룩곰팡이는 아밀라아제(전분 분해 효소)와 프로테아제(단백질 분해 효소)를 다량 분비합니다.',
      sciencePrinciple: '효모는 전분(녹말)처럼 큰 덩어리의 탄수화물을 직접 먹지 못합니다. 누룩곰팡이가 먼저 전분을 포도당으로, 콩 단백질을 감칠맛 나는 아미노산(글루탐산 등)으로 분해해 주어야 비로소 맛있는 장과 술이 됩니다.',
      everydayTip: '된장찌개가 조미료 없이도 깊은 감칠맛을 내는 이유는 누룩곰팡이가 콩 단백질을 잘게 쪼개어 천연 아미노산을 듬뿍 만들어 두었기 때문입니다.',
    },
    keyMicrobe: {
      koreanName: '누룩곰팡이 (황국균)',
      scientificName: 'Aspergillus oryzae',
      action: '강력한 효소(아밀라아제, 프로테아제) 분비로 전분과 단백질 당화·분해',
    },
  },
  {
    id: 4,
    tag: '새콤한 식초의 탄생',
    categoryEmoji: '🍾',
    question: '사과술이나 와인을 공기 중에 뚜껑을 열어둔 채 오래 방치하면 술맛이 사라지고 톡 쏘는 식초가 됩니다. 이때 알코올을 산화시키는 미생물은?',
    context: '‘술(Wine)이 시어졌다(Aigre)’는 프랑스어에서 유래한 비네거(Vinegar, 식초)의 과학입니다.',
    options: [
      '초산균 (아세토박터 / Acetobacter)',
      '젖산균 (Lactobacillus)',
      '푸른곰팡이 (Penicillium)',
      '파상풍균 (Clostridium tetani)',
    ],
    correctIndex: 0,
    shortReaction: {
      correct: '정답입니다! 초산균이 산소를 이용해 알코올을 초산(아세트산)으로 바꿉니다.',
      incorrect: '아쉬워요! 식초의 강렬한 신맛 성분인 초산을 만드는 균은 ‘초산균’입니다.',
    },
    explanation: {
      coreReason: '초산균은 술에 들어 있는 알코올(에탄올)을 먹고 ‘초산(아세트산, Acetic acid)’을 생산합니다.',
      sciencePrinciple: '젖산균이나 효모의 주요 발효와 달리 초산균은 산소(O₂)를 매우 필요로 하는 ‘호기성(Aerobic) 세균’입니다. 따라서 공기(산소)와 접촉할 때 활발히 초산 발효를 진행합니다.',
      everydayTip: '먹다 남은 와인병을 코르크 마개 없이 공기 중에 방치하면 며칠 뒤 와인 식초 냄새가 나는 이유가 바로 공기 중의 초산균 때문입니다.',
    },
    keyMicrobe: {
      koreanName: '초산균 (아세트산균)',
      scientificName: 'Acetobacter aceti 등',
      action: '호기성 환경에서 알코올을 산화시켜 초산(Acetic acid) 생성',
    },
  },
  {
    id: 5,
    tag: '발효 vs 부패의 과학',
    categoryEmoji: '🔬',
    question: '미생물학적 관점에서 ‘발효(Fermentation)’와 ‘부패(Spoilage)’를 구별하는 가장 정확한 설명은 무엇일까요?',
    context: '미생물 입장에서는 둘 다 똑같이 살아남기 위해 밥을 먹는 과정일 뿐입니다.',
    options: [
      '발효를 일으키는 미생물과 부패를 일으키는 미생물은 유전적으로 완전히 다른 외계 생물이다.',
      '미생물이 유기물을 분해하는 원리는 같으나, 결과물이 인간에게 유익하면 발효, 유해하거나 악취를 내면 부패라고 부른다.',
      '발효는 오직 0도 이하의 얼음 속에서만 일어나고, 부패는 100도 이상 끓는 물에서만 일어난다.',
      '발효는 세균만 할 수 있고, 부패는 오직 바이러스만 일으킬 수 있다.',
    ],
    correctIndex: 1,
    shortReaction: {
      correct: '완벽합니다! 미생물의 분해 작용 중 인간 관점에서 유익한 가치를 갖는 것이 ‘발효’입니다.',
      incorrect: '아쉬워요! 생화학적 분해 작용은 동일하나 인간에게 유익한지(발효) 유해한지(부패)로 구분합니다.',
    },
    explanation: {
      coreReason: '미생물의 관점에서 발효와 부패는 모두 유기물을 분해하여 살아가는 데 필요한 에너지를 얻는 대사 과정입니다.',
      sciencePrinciple: '그 분해 생성물이 인간에게 영양가 있고 안전하며 풍미가 좋으면 ‘발효(Fermentation)’라 부르고, 유해 물질, 독소, 또는 심한 악취를 풍기면 ‘부패(Spoilage/Putrefaction)’라고 부르는 ‘인간 중심적(Human-centric)’ 분류입니다.',
      everydayTip: '예를 들어 상한 우유는 유해균이 번식해 배탈을 일으키므로 부패이지만, 같은 우유를 젖산균으로 안전하게 발효시킨 요거트는 몸에 이로운 발효 식품이 됩니다.',
    },
    keyMicrobe: {
      koreanName: '미생물 대사 원리',
      scientificName: 'Fermentation vs Spoilage',
      action: '동일한 유기물 분해 대사이나 인간 기준 안전성·유익성에 따른 인문학적/실용적 구분',
    },
  },
];

export const REVIEW_CHEAT_SHEET = [
  {
    food: '김치 · 요거트 · 치즈',
    microbe: '젖산균 (유산균)',
    keyRole: '젖산 생성 ➔ 새콤한 맛 + 부패균 침투 억제 (보존성 강화)',
    icon: '🥛',
  },
  {
    food: '빵 · 맥주 · 와인 · 막걸리',
    microbe: '효모 (Yeast)',
    keyRole: '알코올 발효 ➔ 에탄올(주류) + 이산화탄소(빵 부풂 / 탄산 기포)',
    icon: '🍺',
  },
  {
    food: '된장 · 간장 · 전통 누룩',
    microbe: '누룩곰팡이 (황국균 등)',
    keyRole: '소화효소(아밀라아제, 프로테아제) 분비 ➔ 구수한 감칠맛(아미노산) 형성',
    icon: '🏺',
  },
  {
    food: '식초 (과일식초, 쌀식초)',
    microbe: '초산균 (아세토박터)',
    keyRole: '호기성 산화 ➔ 알코올을 산화시켜 톡 쏘는 아세트산(초산) 생성',
    icon: '🍾',
  },
  {
    food: '발효 vs 부패 개념',
    microbe: '미생물 분해 대사',
    keyRole: '작용 원리는 같으나 결과물이 인간에게 유익·안전하면 발효, 유해하면 부패',
    icon: '💡',
  },
];
