import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Share2, HelpCircle, AlertCircle, CheckCircle2, XCircle, Trophy, Sparkles, Shuffle } from 'lucide-react';
import { getRandomQuiz } from '../utils/getRandomQuiz';
import TimerRing from './TimerRing';
import Leaderboard from './Leaderboard';
import GlassButton from './GlassButton';

export default function QuizSection() {
  const [gameState, setGameState] = useState('START'); // 'START' | 'QUIZ' | 'RESULT'
  const [userName, setUserName] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10); // 10 seconds per question
  const [leaderboard, setLeaderboard] = useState([]);
  const [particles, setParticles] = useState([]);
  const timerRef = useRef(null);

  // Load Leaderboard from localStorage on mount
  useEffect(() => {
    // BACKEND HOOK: Replace localStorage with API call here
    const savedScores = localStorage.getItem('goat_in_orbit_leaderboard');
    if (savedScores) {
      try {
        setLeaderboard(JSON.parse(savedScores));
      } catch (e) {
        console.error('Failed to parse leaderboard', e);
      }
    }
  }, []);

  // Timer countdown loop when in 'QUIZ' state (10 seconds countdown)
  useEffect(() => {
    if (gameState !== 'QUIZ' || isAnswerLocked || quizQuestions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, currentQuestionIndex, isAnswerLocked, quizQuestions]);

  // Handle Start Quiz - Draws 10 fresh random questions from Wiki pool!
  const handleStartQuiz = (e) => {
    if (e) e.preventDefault();
    if (!userName.trim()) return;

    // Draw 10 randomized questions with shuffled options
    const newRandomQuestions = getRandomQuiz(10);
    setQuizQuestions(newRandomQuestions);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setTimeRemaining(10);
    setGameState('QUIZ');
  };

  // Handle Option Click
  const handleOptionSelect = (option) => {
    if (isAnswerLocked || quizQuestions.length === 0) return;
    clearInterval(timerRef.current);
    setSelectedOption(option);
    setIsAnswerLocked(true);

    const currentQ = quizQuestions[currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Spawn floating green particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -100 - 50,
      }));
      setParticles(newParticles);
    }

    // Auto advance after 1.2 seconds
    setTimeout(() => {
      advanceToNextQuestion();
    }, 1200);
  };

  // Handle Timeout (10 seconds reached)
  const handleTimeOut = () => {
    setIsAnswerLocked(true);
    setTimeout(() => {
      advanceToNextQuestion();
    }, 1200);
  };

  // Advance to next question or result screen
  const advanceToNextQuestion = () => {
    setParticles([]);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
      setTimeRemaining(10);
    } else {
      finishQuiz();
    }
  };

  // Finish Quiz and save score
  const finishQuiz = () => {
    setGameState('RESULT');
    const finalScore = score + (selectedOption === quizQuestions[currentQuestionIndex]?.correctAnswer ? 1 : 0);
    
    // Trigger confetti if score >= 8
    if (finalScore >= 8) {
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#75AADB', '#FFD700', '#ffffff'],
        });
      } catch (err) {
        console.log('Confetti failed to launch', err);
      }
    }

    // Save score to leaderboard
    const newEntry = {
      name: userName || 'Anonymous GOAT Fan',
      score: finalScore,
      date: new Date().toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' }),
    };

    // BACKEND HOOK: Replace localStorage with API call here
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('goat_in_orbit_leaderboard', JSON.stringify(updatedLeaderboard));
  };

  // Get Personalized message based on score bracket with placeholders replaced
  const getPersonalizedMessage = (scoreValue) => {
    const name = userName.trim() || 'Messi Fan';

    if (scoreValue === 10) {
      return `🐐 ${name}, তুমি তো Messi-র আত্মার সাথী!\n\n১০/১০? এত perfect কেউ হয় না!\nতোমার রক্তে হয়তো Argentina-র নীল-সাদা রঙ মিশে আছে! 🇦🇷\n\nMessi নিজে তোমাকে jersey gift করবে! 🎁\nতুমি সত্যিকারের GOAT-Level fan! 👑`;
    } else if (scoreValue === 9 || scoreValue === 8) {
      return `💙 দারুণ ${name}! তুমি সত্যিকারের Messi fan!\n\nতোমার ঘরে নিশ্চয়ই Messi-র poster আছে? 🐐\nআর phone-এর wallpaper-ও Messi-র ছবি? 📱\n\nকিন্তু ১০/১০ পেতে আরেকটু প্র্যাকটিস দরকার!\nGOAT-এর সম্মান রক্ষা করো! 🔥`;
    } else if (scoreValue === 7) {
      return `😊 ওহে ${name}! তুমি তো 'Seasonal Fan'!\n\nমানে — World Cup-এর সময় Messi fan,\nবাকি সময়... যেখানে wind blows! 🌬️\n\nMessi-কে চেনো, কিন্তু গভীরে যাও নি!\nআরেকটু পড়াশোনা করো, তারপর আসো! 📚`;
    } else if (scoreValue === 6) {
      return `🚨 ধরা পড়ে গেছো ${name}!\n\nমাত্র ৬/১০? এটা তো exactly সেই score\nযে score একজন Ronaldo fan পায়! 😂\n\nসত্যি বলো — তুমি কি গোপনে CR7-এর fan?\nনাকি শুধু 'SIUUU' দেখে মুগ্ধ হয়েছিলে? 👀\n\nচিন্তা করো না, CR7-ও ভালো player...\nMessi-র তুলনায় না, কিন্তু ভালো! 🐐>👑`;
    } else {
      return `💀 ${name}, তুমি তো legend!\n\n${scoreValue}/১০? এত খারাপ কেউ হতে পারে\nযে Messi-কে চেনে! 😭\n\nতোমার জন্য special message:\n'Messi-কে না চেনা তোমার অপরাধ নয়,\nRonaldo-র fan হওয়াটাই তোমার শাস্তি!' 😂\n\nএখন চুপচাপ CR7-এর highlight দেখতে যাও! 🎬\nআবার চেষ্টা করো, GOAT-এর সম্মান বাঁচাও! 🐐`;
    }
  };

  // Get Styling properties for the floating result card based on score
  const getResultCardStyle = (scoreValue) => {
    if (scoreValue === 10) {
      return {
        cardClass: 'glass-panel-gold border-gold/50 shadow-glow-gold',
        badge: '🏆 PERFECT GOAT SCORE',
        badgeClass: 'bg-gold/25 border-gold/60 text-gold',
        floatingEmoji: '🐐✨',
      };
    } else if (scoreValue >= 8) {
      return {
        cardClass: 'glass-panel-glow border-argentina/50 shadow-glow-blue',
        badge: '💙 TRUE MESSI FAN',
        badgeClass: 'bg-argentina/20 border-argentina/50 text-argentina-light',
        floatingEmoji: '⭐',
      };
    } else if (scoreValue === 7) {
      return {
        cardClass: 'glass-panel border-white/20 shadow-lg',
        badge: '🌬️ SEASONAL FAN',
        badgeClass: 'bg-white/10 border-white/20 text-gray-300',
        floatingEmoji: '📚',
      };
    } else if (scoreValue === 6) {
      return {
        cardClass: 'glass-panel border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.4)]',
        badge: '🚨 CR7 SUSPECT DETECTED',
        badgeClass: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
        floatingEmoji: '👀',
      };
    } else {
      return {
        cardClass: 'glass-panel border-red-500/50 shadow-glow-red animate-shake',
        badge: '💀 LEGENDARY FAILS',
        badgeClass: 'bg-red-500/20 border-red-500/50 text-red-300',
        floatingEmoji: '😂',
      };
    }
  };

  // Share score on WhatsApp including the full personalized funny message
  const handleShareWhatsApp = () => {
    const messageText = getPersonalizedMessage(score);
    const text = encodeURIComponent(
      `🏆 "GOAT in Orbit" Messi Quiz Result:\n\n${messageText}\n\nতুমি কি লিওনেল মেসি সম্পর্কে আমার চেয়ে বেশি জানো? কুইজ খেলে প্রমাণ করো!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const currentQ = quizQuestions[currentQuestionIndex];
  const finalScore = score + (selectedOption === quizQuestions[currentQuestionIndex]?.correctAnswer ? 1 : 0);
  const resultCardMeta = getResultCardStyle(finalScore);

  return (
    <section id="quiz" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Quiz Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold">
          <HelpCircle className="w-3.5 h-3.5" />
          Interactive Trivia Challenge
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Prove You Know the <span className="text-gradient-gold">GOAT</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Dynamic Wiki Pool: Every time you play, 10 random fresh questions are generated!
        </p>
      </div>

      {/* START SCREEN */}
      {gameState === 'START' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-glow-gold text-center relative overflow-hidden backdrop-blur-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Sparkles className="w-8 h-8 text-gold animate-spin-slow" />
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            প্রস্তুত তো? কুইজ শুরু করো!
          </h3>
          <p className="text-gray-300 text-sm mb-8">
            তোমার নাম লিখে "Start Quiz" বাটনে ক্লিক করো। প্রতিবার নতুন ১০টি র্যান্ডম প্রশ্ন থাকবে! 🎲
          </p>

          <form onSubmit={handleStartQuiz} className="max-w-md mx-auto space-y-6">
            <div>
              <label className="block text-left text-xs font-mono text-gold uppercase mb-2">
                User Name / তোমার নাম:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="তোমার নাম লেখো..."
                required
                className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all font-body text-base"
              />
            </div>

            <GlassButton
              type="submit"
              variant="gold"
              size="lg"
              className="w-full py-4 text-base font-bold shadow-glow-gold"
              icon={Play}
            >
              Start Quiz
            </GlassButton>
          </form>

          {/* Rules List */}
          <div className="mt-10 pt-8 border-t border-white/10 text-left max-w-md mx-auto">
            <div className="text-xs font-mono text-argentina-light uppercase mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              কুইজের নিয়মাবলী (Rules):
            </div>
            <ul className="space-y-2 text-xs text-gray-300 font-body">
              <li className="flex items-center gap-2">
                <Shuffle className="w-3.5 h-3.5 text-gold shrink-0" />
                ১০টি সম্পূর্ণ নতুন র্যান্ডম প্রশ্ন (Randomized Wiki Pool)।
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                প্রতিটি প্রশ্নের জন্য ১০ সেকেন্ড সময় পাবেন।
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                সময় শেষ হলে স্বয়ংক্রিয়ভাবে ভুল উত্তর (Unanswered = wrong)।
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                পিছনে যাওয়ার কোনো সুযোগ নেই (No going back!)
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* QUESTION SCREEN (5s Countdown Timer) */}
      {gameState === 'QUIZ' && currentQ && (
        <motion.div
          key={currentQ.id + '-' + currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-argentina/40 shadow-glow-blue relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Top Info Bar: Progress & 5s Countdown Timer */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                  {currentQ.category}
                </span>
              </div>
              <div className="font-heading font-extrabold text-lg text-white">
                Question <span className="text-gold">{currentQuestionIndex + 1}</span> of {quizQuestions.length}
              </div>
            </div>

            {/* Circular Countdown Timer (10s) */}
            <TimerRing timeRemaining={timeRemaining} totalTime={10} />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-argentina to-gold h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
            {currentQ.question}
          </h3>

          {/* 4 Answer Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.correctAnswer;
              
              let buttonStyle = 'glass-button text-gray-200 hover:text-white border-white/20';

              if (isAnswerLocked) {
                if (isCorrect) {
                  buttonStyle = 'bg-green-500/20 border-green-500 text-green-300 shadow-glow-green font-bold';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-red-500/20 border-red-500 text-red-300 shadow-glow-red animate-shake';
                } else {
                  buttonStyle = 'opacity-40 border-white/10';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswerLocked}
                  className={`p-4 sm:p-5 rounded-2xl border text-left font-body text-base transition-all duration-300 min-h-[56px] flex items-center justify-between cursor-pointer relative overflow-hidden ${buttonStyle}`}
                >
                  <span className="font-medium">{option}</span>

                  {/* Icon status feedback */}
                  {isAnswerLocked && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  )}
                  {isAnswerLocked && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}

            {/* Floating Green Particles for Correct Answer */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{ opacity: 0, x: p.x, y: p.y }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-green-400 pointer-events-none shadow-glow-green"
              />
            ))}
          </div>

          {/* Answer Explanation hint when locked */}
          {isAnswerLocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-start gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gold">তথ্য: </span>
                {currentQ.explanation}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* RESULT SCREEN */}
      {gameState === 'RESULT' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden backdrop-blur-2xl transition-all duration-500 ${resultCardMeta.cardClass}`}
        >
          {/* Floating Emoji Indicator */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 text-4xl shadow-xl"
          >
            {resultCardMeta.floatingEmoji}
          </motion.div>

          {/* Tier Badge */}
          <div className="inline-block mb-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${resultCardMeta.badgeClass}`}>
              {resultCardMeta.badge}
            </span>
          </div>
          
          {/* Score Display */}
          <div className="font-heading text-5xl sm:text-6xl font-extrabold text-white mb-6">
            <span className="text-gradient-gold">{score}</span>
            <span className="text-2xl text-gray-400 font-normal"> / 10</span>
          </div>

          {/* Personalized Message Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15 text-white font-body text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed whitespace-pre-line text-center shadow-inner"
          >
            {getPersonalizedMessage(score)}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <GlassButton
              variant="gold"
              size="md"
              onClick={() => {
                // Re-draw 10 brand new random questions
                const newRandomQuestions = getRandomQuiz(10);
                setQuizQuestions(newRandomQuestions);
                setScore(0);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setIsAnswerLocked(false);
                setTimeRemaining(10);
                setGameState('QUIZ');
              }}
              className="w-full sm:w-auto shadow-glow-gold"
              icon={RotateCcw}
            >
              Play Again (New Questions)
            </GlassButton>

            <GlassButton
              variant="blue"
              size="md"
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto"
              icon={Share2}
            >
              Share Score
            </GlassButton>
          </div>

          {/* Leaderboard Table */}
          <Leaderboard scores={leaderboard} />
        </motion.div>
      )}

    </section>
  );
}
