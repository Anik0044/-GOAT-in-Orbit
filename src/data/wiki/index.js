import { championsLeagueQuestions } from './championsLeague';
import { worldCupQuestions } from './worldCup';
import { barcelonaQuestions } from './barcelona';
import { psgQuestions } from './psg';
import { interMiamiQuestions } from './interMiami';
import { argentinaQuestions } from './argentina';
import { goalsStatsQuestions } from './goalsStats';
import { freeKicksQuestions } from './freeKicks';
import { trophiesAwardsQuestions } from './trophiesAwards';
import { recordsQuestions } from './records';
import { personalLifeQuestions } from './personalLife';
import { messiVsRonaldoQuestions } from './messiVsRonaldo';

export const CATEGORIES = [
  {
    id: 'champions-league',
    slug: 'champions-league',
    title: 'Champions League',
    name: 'Champions League',
    emoji: '🏆',
    questionsCount: championsLeagueQuestions.length,
    description: 'মেসির ৪টি উয়েফা চ্যাম্পিয়ন্স লিগ ট্রফি, স্মরণীয় ফাইনাল গোল ও অবাস্তব ১২৯ গোলের ইতিহাস।',
    color: 'from-blue-600 to-indigo-800',
    borderColor: 'border-blue-500/40',
    data: championsLeagueQuestions,
  },
  {
    id: 'world-cup',
    slug: 'world-cup',
    title: 'World Cup',
    name: 'World Cup',
    emoji: '🌍',
    questionsCount: worldCupQuestions.length,
    description: 'কাতারে ফুটবলের সর্বোচ্চ মুকুট জয় এবং মেসির জোড়া গোল্ডেন বল জয়ের রূপকথা।',
    color: 'from-sky-400 to-blue-600',
    borderColor: 'border-sky-400/40',
    data: worldCupQuestions,
  },
  {
    id: 'fc-barcelona',
    slug: 'fc-barcelona',
    title: 'FC Barcelona',
    name: 'FC Barcelona',
    emoji: '🏟️',
    questionsCount: barcelonaQuestions.length,
    description: 'লা মাসিয়া থেকে দীর্ঘ ২১ বছরের ক্যারিয়ার, ৩৫টি ট্রফি ও ৬৭২ গোলের স্মরণীয় স্বর্ণযুগ।',
    color: 'from-blue-700 to-rose-700',
    borderColor: 'border-blue-600/40',
    data: barcelonaQuestions,
  },
  {
    id: 'psg',
    slug: 'psg',
    title: 'PSG',
    name: 'PSG',
    emoji: '🇫🇷',
    questionsCount: psgQuestions.length,
    description: 'প্যারিস সেন্ট-জার্মেইতে ২ বছর, ২টি লিগ ১ শিরোপা এবং ৩০ নম্বর জার্সির ইতিহাস।',
    color: 'from-blue-900 to-red-700',
    borderColor: 'border-blue-800/40',
    data: psgQuestions,
  },
  {
    id: 'inter-miami',
    slug: 'inter-miami',
    title: 'Inter Miami',
    name: 'Inter Miami',
    emoji: '🇺🇸',
    questionsCount: interMiamiQuestions.length,
    description: 'মেজর লিগ সকারে যুক্তরাষ্ট্রের ফুটবলে মেসির নতুন বিপ্লব ও প্রথম ট্রফি জয়।',
    color: 'from-pink-600 to-rose-600',
    borderColor: 'border-pink-500/40',
    data: interMiamiQuestions,
  },
  {
    id: 'argentina',
    slug: 'argentina',
    title: 'Argentina',
    name: 'Argentina',
    emoji: '🇦🇷',
    questionsCount: argentinaQuestions.length,
    description: 'আর্জেন্টিনার জার্সি গায়ে কোপা আমেরিকা, ফিনালিসিমা ও বিশ্বকাপ জয়ের মহাকাব্য।',
    color: 'from-sky-400 to-gold',
    borderColor: 'border-sky-400/40',
    data: argentinaQuestions,
  },
  {
    id: 'goals-stats',
    slug: 'goals-stats',
    title: 'Goals & Stats',
    name: 'Goals & Stats',
    emoji: '⚽',
    questionsCount: goalsStatsQuestions.length,
    description: '৮০০+ ক্যারিয়ার গোল, ৯১ গোলের বর্ষসেরা রেকর্ড এবং অ্যাসিস্ট পরিসংখ্যান।',
    color: 'from-amber-500 to-emerald-600',
    borderColor: 'border-amber-500/40',
    data: goalsStatsQuestions,
  },
  {
    id: 'free-kicks',
    slug: 'free-kicks',
    title: 'Free Kicks',
    name: 'Free Kicks',
    emoji: '🎯',
    questionsCount: freeKicksQuestions.length,
    description: '৬৫+ সরাসরি ডিরেক্ট ফ্রি-কিক গোল এবং নিখুঁত ফ্রি-কিক কার্ভের গোপন রসায়ন।',
    color: 'from-amber-400 to-yellow-600',
    borderColor: 'border-yellow-400/40',
    data: freeKicksQuestions,
  },
  {
    id: 'trophies-awards',
    slug: 'trophies-awards',
    title: 'Trophies & Awards',
    name: 'Trophies & Awards',
    emoji: '🏅',
    questionsCount: trophiesAwardsQuestions.length,
    description: '৮টি ব্যলন ডি অর, ৬টি গোল্ডেন শু এবং সর্বকালের সর্বোচ্চ ৪৬টি ট্রফির রেকর্ড।',
    color: 'from-gold to-amber-600',
    borderColor: 'border-gold/40',
    data: trophiesAwardsQuestions,
  },
  {
    id: 'records',
    slug: 'records',
    title: 'Records',
    name: 'Records',
    emoji: '📊',
    questionsCount: recordsQuestions.length,
    description: 'ফুটবল ইতিহাসের গিনেস বুক ও আন্তর্জাতিক রেকর্ডসমূহের সম্পূর্ণ বিবরণ।',
    color: 'from-purple-600 to-indigo-700',
    borderColor: 'border-purple-500/40',
    data: recordsQuestions,
  },
  {
    id: 'personal-life',
    slug: 'personal-life',
    title: 'Personal Life',
    name: 'Personal Life',
    emoji: '👤',
    questionsCount: personalLifeQuestions.length,
    description: 'মেসির শৈশব, রোসারিওর দিনগুলি, পরিবার, স্ত্রী আন্তোনেলা এবং ৩ সন্তান।',
    color: 'from-teal-500 to-emerald-700',
    borderColor: 'border-teal-400/40',
    data: personalLifeQuestions,
  },
  {
    id: 'messi-vs-ronaldo',
    slug: 'messi-vs-ronaldo',
    title: 'Messi vs Ronaldo',
    name: 'Messi vs Ronaldo',
    emoji: '🆚',
    questionsCount: messiVsRonaldoQuestions.length,
    description: 'ফুটবল ইতিহাসের শ্রেষ্ঠ দুই মহাতারকার মুখোমুখি পরিসংখ্যান ও ট্রফি তুলনা।',
    color: 'from-red-600 to-amber-500',
    borderColor: 'border-red-500/40',
    data: messiVsRonaldoQuestions,
  },
];

/**
 * Returns all wiki questions combined into a single flat array
 */
export function getAllWikiQuestions() {
  return [
    ...championsLeagueQuestions,
    ...worldCupQuestions,
    ...barcelonaQuestions,
    ...psgQuestions,
    ...interMiamiQuestions,
    ...argentinaQuestions,
    ...goalsStatsQuestions,
    ...freeKicksQuestions,
    ...trophiesAwardsQuestions,
    ...recordsQuestions,
    ...personalLifeQuestions,
    ...messiVsRonaldoQuestions,
  ];
}

/**
 * Get Category by URL Slug
 */
export function getCategoryBySlug(slug) {
  return CATEGORIES.find((cat) => cat.slug === slug || cat.id === slug);
}

/**
 * Search Wiki Questions by Query
 */
export function searchWiki(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const all = getAllWikiQuestions();

  return all.filter((item) => {
    const inQuestion = item.question.toLowerCase().includes(q);
    const inAnswer = item.answer.toLowerCase().includes(q);
    const inCategory = item.category.toLowerCase().includes(q);
    const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
    return inQuestion || inAnswer || inCategory || inTags;
  });
}

/**
 * Get Question by ID
 */
export function getQuestionById(id) {
  const all = getAllWikiQuestions();
  return all.find((q) => q.id === id);
}

/**
 * Get Related Questions by matching tags or category
 */
export function getRelatedQuestions(currentQuestion, count = 4) {
  if (!currentQuestion) return [];
  const all = getAllWikiQuestions();
  
  return all
    .filter((q) => q.id !== currentQuestion.id && (
      q.category === currentQuestion.category ||
      q.tags.some((t) => currentQuestion.tags.includes(t))
    ))
    .slice(0, count);
}
