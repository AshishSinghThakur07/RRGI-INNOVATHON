import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Lenis from 'lenis';
import {
  Users, Zap, Trophy, ChevronDown, Rocket,
  MapPin, Calendar, Clock, ArrowRight, Instagram, Linkedin, Twitter, Globe, Info, Gift, Lightbulb, UserPlus, Fingerprint, Code, Smartphone,
  Coffee, Utensils, Mic, Play, Pause, Award, PartyPopper, Sun, Moon, Sunrise, ChevronLeft, ChevronRight, Hammer, Presentation, MessageSquare, Star
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Components
const FloatingShape = ({ color, size, top, left, delay = 0, duration = 10, blur = 'blur-2xl' }) => (
  <motion.div
    className={`absolute rounded-full animate-floating parallax-element ${color} ${size} ${blur} opacity-40 mix-blend-multiply -z-10`}
    style={{ top, left }}
    data-speed={Math.random() * 2 + 0.5}
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      rotate: [0, 90, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  />
);

const FloatingCircuit = ({ top, left, right, bottom, scale = 1, delay = 0, color = 'text-blue-500/20' }) => (
  <motion.div
    className={`absolute pointer-events-none parallax-element -z-10 ${color}`}
    style={{ top, left, right, bottom, transform: `scale(${scale})` }}
    data-speed={Math.random() * 1.5 + 0.2}
    animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10l30 30h40l30-30" stroke="currentColor" strokeWidth="2" strokeOpacity="1" />
      <circle cx="40" cy="40" r="4" fill="currentColor" fillOpacity="1" />
      <circle cx="80" cy="40" r="4" fill="currentColor" fillOpacity="1" />
      <path d="M40 40v30l-20 20 M80 40v30l20 20 M60 70v40" stroke="currentColor" strokeWidth="2" strokeOpacity="1" />
      <circle cx="20" cy="90" r="3" fill="currentColor" fillOpacity="1" />
      <circle cx="100" cy="90" r="3" fill="currentColor" fillOpacity="1" />
      <circle cx="60" cy="110" r="5" fill="currentColor" fillOpacity="1" />
      <path d="M0 60h20l10 10 M120 60h-20l-10 10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
    </svg>
  </motion.div>
);

const RevealText = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass-card rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center shadow-sm">
        <div className="font-display font-extrabold text-lg sm:text-2xl tracking-tight">
          <span className="text-red-600 font-black">RRGI</span> <span className="text-blue-600 font-black">Innovathon</span> <span className="text-xs sm:text-sm font-medium text-gray-600">2026</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
          <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
          <a href="#prizes" className="hover:text-blue-500 transition-colors">Prizes</a>
          <a href="#themes" className="hover:text-blue-500 transition-colors">Themes</a>
          <a href="#faq" className="hover:text-blue-500 transition-colors">FAQs</a>
        </div>
        <a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="skeu-btn-primary px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
          Register <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </a>
      </div>
    </motion.nav>
  );
};

const TimerCard = ({ label, value, gradient, textHoverColor, delayIndex = 0 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const scramblingRef = useRef(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px", once: false });

  const triggerScramble = (isHover = false) => {
    if (scramblingRef.current) return;
    scramblingRef.current = true;

    // Apply a cascading delay if it's an auto-trigger (not a direct user hover)
    const startDelay = isHover ? 0 : delayIndex * 150;

    setTimeout(() => {
      let count = 0;
      const maxJumps = 12;

      // Slower interval for a smooth, lazy shuffling effect
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 100).toString().padStart(2, '0'));
        count++;

        if (count > maxJumps) {
          clearInterval(interval);
          // Snap perfectly to factual numerical time
          setDisplayValue(value);
          setTimeout(() => { scramblingRef.current = false; }, 100);
        }
      }, 75); // Slowed down from 35ms to 75ms
    }, startDelay);
  };

  useEffect(() => {
    if (isInView) {
      triggerScramble(false);
    }
  }, [isInView]);

  useEffect(() => {
    // Keep display synced with actual time ticking unless we are actively scrambling
    if (!scramblingRef.current) {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center group cursor-default"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => triggerScramble(true)}
    >
      <motion.div
        whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-[4.5rem] sm:w-20 md:w-32 h-24 sm:h-28 md:h-40 rounded-2xl sm:rounded-3xl relative overflow-hidden backdrop-blur-2xl border border-white/60 flex items-center justify-center bg-white/20"
        style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.7)' }}
      >
        {/* Pulsing Gradient Base */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className={`absolute -inset-[50%] bg-gradient-to-br ${gradient} opacity-50 blur-2xl z-0`}
        />

        {/* Glossy Top Reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent rounded-t-3xl z-10 pointer-events-none"></div>

        {/* LED Dot Glow */}
        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] z-10 hidden md:block"></div>

        {/* Sliding Numbers */}
        <div className="relative z-20 h-20 w-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 30, opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ y: -30, opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute text-4xl sm:text-5xl md:text-7xl font-display font-black text-slate-800 tracking-tighter drop-shadow-md tabular-nums"
            >
              {displayValue}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <span className={`text-[8px] sm:text-[10px] md:text-xs uppercase font-extrabold tracking-[0.15em] sm:tracking-[0.2em] mt-3 sm:mt-5 text-gray-400 group-hover:${textHoverColor} transition-colors duration-300`}>
        {label}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Countdown timer logic - targeting April 16, 2026 at 10:00 AM IST
  const getTimeLeft = () => {
    const target = new Date('2026-04-16T10:00:00+05:30');
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex items-center justify-center pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-hidden" id="hero">
      <FloatingShape color="bg-pastelBlue" size="w-96 h-96" top="10%" left="10%" duration={15} />
      <FloatingShape color="bg-pastelPink" size="w-[30rem] h-[30rem]" top="40%" left="60%" duration={20} blur="blur-3xl" />
      <FloatingShape color="bg-pastelGreen" size="w-64 h-64" top="60%" left="15%" delay={2} duration={12} />

      <FloatingCircuit top="20%" right="15%" scale={1.2} delay={0} color="text-blue-500/30" />
      <FloatingCircuit bottom="10%" left="20%" scale={0.8} delay={1} color="text-purple-500/30" />

      <div className="parallax-element max-w-7xl mx-auto px-4 sm:px-6 z-10 text-center relative w-full flex flex-col items-center" data-speed="1.5">
        <motion.div style={{ y: y2 }}>
          <RevealText>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-3 sm:px-5 rounded-full bg-white/50 border border-white/60 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase mb-6 sm:mb-8 shadow-sm backdrop-blur-sm mx-auto w-max">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400"></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400"></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400"></span>
              <span className="ml-1 sm:ml-2"><span className="text-red-600 font-black">RRGI</span> ORGANIZES</span>
            </div>
          </RevealText>

          <RevealText delay={0.05}>
            <div className="mx-auto w-max px-2 sm:px-4 mb-4 sm:mb-6">
              <div className="p-1.5 sm:p-2 bg-white/70 backdrop-blur-md rounded-[0.75rem] sm:rounded-[1rem] border border-white/80 shadow-md flex items-center justify-center">
                <img
                  src="/banner.png"
                  alt="RRGI Innovathon 2026 Banner"
                  className="h-12 sm:h-20 w-auto rounded-[0.5rem] sm:rounded-[0.75rem] object-contain"
                />
              </div>
            </div>
          </RevealText>

          <RevealText delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-3 sm:mb-6 drop-shadow-xl text-center w-full" style={{ fontFamily: "'Syne', sans-serif", lineHeight: '1.3', letterSpacing: '-0.01em' }}>
              <span className="text-red-600">RRGI</span>{" "}
              <span className="text-black">Innova</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">thon</span>
            </h1>
            <div className="flex items-center justify-center mb-4 sm:mb-6 drop-shadow-sm overflow-hidden py-2 sm:py-4">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black text-[#E88E73] transform scale-x-[1.5] sm:scale-x-[2] inline-block tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                2026
              </span>
            </div>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="max-w-2xl mx-auto text-center text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed px-4 sm:px-2">
              Lucknow's Biggest Student Hackathon is Here! The ultimate Pan-Lucknow Inter-College Hackathon.
              <br /><span className="text-blue-500 font-bold">Hours of building, breaking, and creating the future.</span>
            </p>
          </RevealText>

          <RevealText delay={0.3}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-16 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs border border-blue-100 shadow-sm">
                <Calendar size={12} className="sm:w-3.5 sm:h-3.5" /> 16,17,18 April
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-yellow-50 text-orange-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs border border-orange-100 shadow-sm">
                <MapPin size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="text-red-600 font-bold">RRGI</span>, Lucknow
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-green-50 text-green-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs border border-green-100 shadow-sm">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5" /> Rs. 100/- Registration
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-pink-50 text-pink-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs border border-pink-100 shadow-sm">
                <Users size={12} className="sm:w-3.5 sm:h-3.5" /> Open to All Colleges
              </div>
            </div>
          </RevealText>

          <RevealText delay={0.35}>
            <motion.a
              href="#about"
              className="flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 transition-colors mb-6 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold mb-2">Scroll</span>
              <ChevronDown size={18} />
            </motion.a>
          </RevealText>

          <RevealText delay={0.4}>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 mb-4 sm:mb-6 uppercase text-center">Hackathon Starts In</p>
            <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-6 mb-6 relative z-30 w-full max-w-lg mx-auto">
              <TimerCard delayIndex={0} label="Days" value={timeLeft.days} gradient="from-blue-400 via-cyan-300 to-indigo-500" textHoverColor="text-blue-500" />
              <div className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-600 mb-8">:</div>
              <TimerCard delayIndex={1} label="Hours" value={timeLeft.hours} gradient="from-orange-400 via-amber-300 to-rose-500" textHoverColor="text-orange-500" />
              <div className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-600 mb-8">:</div>
              <TimerCard delayIndex={2} label="Minutes" value={timeLeft.minutes} gradient="from-green-400 via-emerald-300 to-teal-500" textHoverColor="text-green-500" />
              <div className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-600 mb-8">:</div>
              <TimerCard delayIndex={3} label="Seconds" value={timeLeft.seconds} gradient="from-pink-400 via-fuchsia-300 to-purple-500" textHoverColor="text-pink-500" />
            </div>
          </RevealText>

          <RevealText delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 px-6 sm:px-4 w-full max-w-md sm:max-w-none mx-auto">
              <a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="skeu-btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto justify-center">
                Register Now <ArrowRight size={18} />
              </a>
              <a href="#about" className="skeu-btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto justify-center">
                <Info size={18} /> Learn More
              </a>
            </div>
          </RevealText>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const stats = [
    { value: '4', label: 'Tech Themes', bg: 'bg-blue-200', text: 'text-blue-600', glow: 'from-blue-500 to-blue-300' },
    { value: '1 to 4', label: 'Team Members', bg: 'bg-orange-200', text: 'text-orange-600', glow: 'from-orange-500 to-orange-300' },
    { value: '₹100', label: 'Reg. / Team', bg: 'bg-green-200', text: 'text-green-700', glow: 'from-green-500 to-green-300' },
    { value: '₹50k+', label: 'Prize Pool', bg: 'bg-pink-200', text: 'text-pink-600', glow: 'from-pink-500 to-pink-300' }
  ];

  return (
    <section className="py-16 sm:py-24 relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 relative">
          <RevealText>
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-orange-50/80 backdrop-blur-sm text-orange-600 px-5 py-2.5 rounded-full font-bold text-sm border border-orange-100/50 shadow-sm w-max">
                <Info size={18} className="text-orange-500" />
                What's It?
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight text-slate-800">About <span className="text-blue-600">RRGI Innovathon</span></h2>
          </RevealText>
          <RevealText delay={0.1}>
            <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium px-2">
              The RR Group of Institutions, Lucknow proudly presents RRGI Innovathon 2026—the ultimate Pan-Lucknow Inter-College Hackathon designed for the visionaries of tomorrow. Whether you're an AI enthusiast, a web wizard, or a cybersecurity sentinel, this is your stage to build, compete, and innovate.
              <br /><br />
              We are inviting the brightest student developers and problem-solvers to step up and build technology solutions for real-world challenges. Innovation isn't just about thinking—it's about doing. 🛠️
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 relative z-10">
          {stats.map((stat, idx) => (
            <RevealText key={idx} delay={0.1 * idx}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-4 sm:p-8 flex flex-col items-center justify-center text-center h-full ${stat.bg} bg-opacity-70 hover:shadow-xl transition-all duration-300 relative overflow-hidden backdrop-blur-xl border border-white/60 shadow-sm rounded-2xl sm:rounded-3xl`}
              >
                {/* Vibrant top edge */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${stat.glow} opacity-90`}></div>

                {/* Subtle top right dot from image */}
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-r ${stat.glow}`}></div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black mb-1 sm:mb-2 text-slate-800 drop-shadow-sm tracking-tight">{stat.value}</h3>
                <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${stat.text}`}>{stat.label}</p>
              </motion.div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Explore Tech\nDomains",
      desc: [
        "Artificial Intelligence",
        "Cyber Security",
        "Web Development & Mobile Apps"
      ],
      tag: "DIVERSE TRACKS",
      dotColor: "bg-blue-400",
      cardBg: "bg-blue-100",
      dotIndicator: "bg-blue-300",
      textColor: "text-blue-500",
      bulletColor: "bg-blue-400",
      featured: false,
    },
    {
      title: "Open\nCollaboration",
      desc: [
        "Work individually or team up",
        "Teams of up to 4 members",
        "Cross-college networking"
      ],
      tag: "TEAM UP",
      dotColor: "bg-orange-400",
      cardBg: "bg-orange-100",
      dotIndicator: "bg-orange-300",
      textColor: "text-orange-500",
      bulletColor: "bg-orange-400",
      featured: true,
    },
    {
      title: "Real World\nImpact",
      desc: [
        "Build innovative tech solutions",
        "Solve real-world problems",
        "Turn conceptual ideas into digital reality"
      ],
      tag: "MAKE AN IMPACT",
      dotColor: "bg-green-400",
      cardBg: "bg-green-100",
      dotIndicator: "bg-green-300",
      textColor: "text-green-600",
      bulletColor: "bg-green-400",
      featured: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="features">
      <FloatingShape color="bg-pastelBlue" size="w-[500px] h-[500px]" top="10%" left="-10%" duration={25} />
      <FloatingCircuit top="30%" right="5%" scale={0.9} delay={2} color="text-blue-400/30" />
      <FloatingCircuit bottom="10%" left="5%" scale={1.1} delay={3} color="text-blue-600/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <RevealText>
            <span className="inline-block py-1.5 px-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-xs font-bold tracking-widest text-blue-700 uppercase mb-4 shadow-md backdrop-blur-sm">
              Event Highlights
            </span>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {features.map((feature, idx) => (
            <RevealText key={idx} delay={0.1 * idx}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`relative rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 flex flex-col overflow-hidden border border-white/50 shadow-md ${feature.cardBg} ${feature.featured ? 'md:-mt-6 md:pb-10 md:pt-10 shadow-xl' : ''}`}
              >
                {/* Corner dot indicator */}
                <div className={`absolute top-5 right-5 w-2.5 h-2.5 rounded-full ${feature.dotIndicator}`}></div>

                {/* Grid texture overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-[2rem]"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Tag badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-2 h-2 rounded-full ${feature.dotColor} animate-pulse`}></div>
                    <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-gray-600">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl sm:text-3xl font-black leading-tight mb-4 sm:mb-6 text-slate-800 whitespace-pre-line`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    {feature.title}
                  </h3>

                  {/* Bullet list */}
                  <ul className="space-y-3 flex-1">
                    {feature.desc.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${feature.bulletColor}`}></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScratchCardPrize = () => {
  const canvasRef = useRef(null);
  const sparkleCanvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [displayPrize, setDisplayPrize] = useState("50,000+");

  useEffect(() => {
    if (isRevealed) {
      let count = 0;
      const maxJumps = 15;
      const interval = setInterval(() => {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        setDisplayPrize(randomNum.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ","));
        count++;
        if (count > maxJumps) {
          clearInterval(interval);
          setDisplayPrize("50,000");
        }
      }, 75);
    }
  }, [isRevealed]);

  // Sparkle particle system
  useEffect(() => {
    const sparkleCanvas = sparkleCanvasRef.current;
    if (!sparkleCanvas) return;
    const sCtx = sparkleCanvas.getContext('2d');
    let particles = [];
    let animId;

    const sparkleColors = ['#fbbf24', '#f59e0b', '#ffffff', '#fde68a', '#60a5fa', '#a78bfa'];

    const animate = () => {
      sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

      particles = particles.filter(p => p.life > 0);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life -= 0.025;
        p.size *= 0.97;
        p.rotation += p.rotationSpeed;

        sCtx.save();
        sCtx.translate(p.x, p.y);
        sCtx.rotate(p.rotation);
        sCtx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'star') {
          // Draw a tiny star/sparkle shape
          sCtx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            sCtx.moveTo(0, 0);
            sCtx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size);
          }
          sCtx.strokeStyle = p.color;
          sCtx.lineWidth = 1.5;
          sCtx.stroke();
        } else {
          // Draw a glowing dot
          sCtx.beginPath();
          sCtx.arc(0, 0, p.size, 0, Math.PI * 2);
          sCtx.fillStyle = p.color;
          sCtx.shadowBlur = 6;
          sCtx.shadowColor = p.color;
          sCtx.fill();
        }

        sCtx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    // Expose emitter on the canvas element
    sparkleCanvas._emitSparkles = (x, y) => {
      const count = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 2 + Math.random() * 4,
          life: 0.6 + Math.random() * 0.4,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          type: Math.random() > 0.5 ? 'star' : 'dot',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Metallic gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#151e2b');
    gradient.addColorStop(0.5, '#2a3b4c');
    gradient.addColorStop(1, '#151e2b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle star dust pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Large Faint Watermark
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 12);
    ctx.font = '900 80px "Arial Black", Impact, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PRIZE POOL', 0, 0);
    ctx.restore();

    // Foreground Text
    ctx.font = '900 28px "Outfit", system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✦ Scratch to Reveal ✦', canvas.width / 2, canvas.height / 2 - 15);

    ctx.font = '600 13px "Inter", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('drag your finger or mouse anywhere', canvas.width / 2, canvas.height / 2 + 25);

    let isDrawing = false;
    let points = []; // Store points for smooth curve
    let scratchCount = 0;

    const getCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
        rawX: clientX - rect.left,
        rawY: clientY - rect.top
      };
    };

    const startDrawing = (e) => {
      isDrawing = true;
      setIsScratching(true);
      const { x, y } = getCoordinates(e);
      points = [{ x, y }];
    };

    const stopDrawing = () => {
      isDrawing = false;
      points = [];
      setIsScratching(false);
      checkReveal();
    };

    const scratch = (e) => {
      if (!isDrawing) return;

      const { x, y, rawX, rawY } = getCoordinates(e);
      points.push({ x, y });

      // Keep only the last few points for the smooth curve
      if (points.length > 5) points.shift();

      ctx.globalCompositeOperation = 'destination-out';

      if (points.length >= 3) {
        // Draw smooth quadratic curve through points
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        ctx.lineWidth = 65;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Also paint a radial gradient circle at current point for soft edges
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, 35);
      radGrad.addColorStop(0, 'rgba(0,0,0,1)');
      radGrad.addColorStop(0.6, 'rgba(0,0,0,0.8)');
      radGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(x - 35, y - 35, 70, 70);

      // Emit sparkle particles at the scratch point
      scratchCount++;
      if (scratchCount % 2 === 0) {
        const sparkleCanvas = sparkleCanvasRef.current;
        if (sparkleCanvas && sparkleCanvas._emitSparkles) {
          sparkleCanvas._emitSparkles(rawX, rawY);
        }
      }

      // Check reveal periodically while scratching
      if (scratchCount % 20 === 0) {
        checkReveal();
      }
    };

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
      }

      const totalPixels = pixels.length / 4;
      const clearPercentage = (transparentPixels / totalPixels) * 100;

      if (clearPercentage > 50 && !isRevealed) {
        setIsRevealed(true);
        setIsScratching(false);
        canvas.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        canvas.style.opacity = '0';
        canvas.style.transform = 'scale(1.1)';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 600);
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isRevealed]);

  return (
    <div
      className="relative w-full h-[160px] md:h-[180px] bg-white shadow-2xl mx-auto rounded-[2rem] overflow-hidden glass-card border border-white/40"
      style={{ maxWidth: '800px' }}
    >
      {/* Hidden Reward - Green Card Style */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 bg-green-200/50 backdrop-blur-xl">
        {/* Vibrant top edge */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-300 opacity-90 z-10"></div>
        {/* Subtle top right dot */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300 z-10"></div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={isRevealed ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 10 }}
          transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
          className="text-center relative z-20"
        >
          <Gift className="w-8 h-8 md:w-10 md:h-10 text-green-600 mx-auto mb-1 md:mb-2" strokeWidth={2} />
          <h3 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-0 drop-shadow-sm tracking-tighter tabular-nums">
            ₹{displayPrize}
          </h3>
          <p className="text-green-700 font-extrabold uppercase tracking-[0.2em] text-[9px] md:text-xs mt-1 md:mt-2">Total Prize Pool</p>
        </motion.div>
      </div>

      {/* Sparkle overlay canvas */}
      <canvas
        ref={sparkleCanvasRef}
        width={800}
        height={180}
        className="absolute inset-0 w-full h-full pointer-events-none z-40"
      />

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        width={800}
        height={180}
        className={`scratch-canvas absolute inset-0 w-full h-full z-30 ${isScratching ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

const PrizeSection = () => {
  const prizes = [
    {
      title: "First Place",
      lock: "₹21000",
      cardBg: "bg-orange-100/60",
      topStrip: "bg-[#F49A62]",
      dot: "bg-[#F49A62]",
      textColor: "text-slate-800",
      subtextColor: "text-[#DD6C26] drop-shadow-sm",
    },
    {
      title: "Second Place",
      lock: "₹8100",
      cardBg: "bg-green-100/60",
      topStrip: "bg-[#4ADE80]",
      dot: "bg-[#4ADE80]",
      textColor: "text-slate-800",
      subtextColor: "text-[#16A34A] drop-shadow-sm",
    },
    {
      title: "Third Place",
      lock: "₹3100",
      cardBg: "bg-pink-100/60",
      topStrip: "bg-[#F472B6]",
      dot: "bg-[#F472B6]",
      textColor: "text-slate-800",
      subtextColor: "text-[#DB2777] drop-shadow-sm",
    }
  ];

  return (
    <section className="py-16 sm:py-24 relative" id="prizes">
      <FloatingShape color="bg-pastelYellow" size="w-64 h-64" top="20%" right="10%" duration={18} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-16 mb-24 cursor-default">
          {/* Left Column: Heading and Text */}
          <div className="w-full xl:w-5/12 text-left shrink-0">
            <RevealText>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-4 sm:mb-6 tracking-tight text-slate-800">Prize <span className="text-blue-600">Money</span></h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-4 sm:mb-6">
                Scratch the digital ticket on the right to manually reveal the grand prize pool waiting for you at the finish line!
              </p>
              <span className="text-blue-600 font-bold border-l-4 border-blue-500 pl-4 py-1 inline-block uppercase tracking-widest text-xs">Prove your excellence. Claim your reward.</span>
            </RevealText>
          </div>

          {/* Right Column: Scratch Card */}
          <div className="w-full xl:w-7/12 flex justify-center xl:justify-end">
            <RevealText delay={0.2} className="w-full flex justify-center xl:justify-end">
              <ScratchCardPrize />
            </RevealText>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white/50 border border-gray-200 text-xs font-semibold tracking-widest text-gray-600 uppercase shadow-sm">
            Prize Breakdown
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-4">
          {prizes.map((prize, idx) => (
            <RevealText key={idx} delay={0.1 * idx}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-5 sm:p-8 flex flex-col items-center justify-center text-center w-full md:w-[22rem] h-44 sm:h-56 rounded-[1.5rem] sm:rounded-[2rem] ${prize.cardBg} shadow-sm border border-white/50 relative overflow-hidden backdrop-blur-md`}
              >
                {/* Top Border Strip */}
                <div className={`absolute top-0 left-0 right-0 h-2.5 ${prize.topStrip}`}></div>

                {/* Corner Dot */}
                <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${prize.dot}`}></div>

                {/* Main Text (Big) */}
                <h3 className={`text-4xl sm:text-6xl md:text-[4.5rem] tracking-tighter font-black ${prize.textColor} mb-2 sm:mb-3 drop-shadow-sm`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {prize.lock}
                </h3>

                {/* Subtitle (Small) */}
                <span className={`text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase ${prize.subtextColor}`}>
                  {prize.title}
                </span>
              </motion.div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
};

const ThemesSection = () => {
  const [activeTheme, setActiveTheme] = useState(0);
  const themes = [
    { name: "Artificial Intelligence", icon: <Zap />, desc: "Build intelligent systems that learn, analyze and augment human capabilities using machine learning and generative AI.", bg: "bg-blue-50", cardBg: "bg-blue-50/80", iconBg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
    { name: "Cyber Security", icon: <Fingerprint />, desc: "Develop advanced tools, protocols, and safeguards to protect against cyber threats and secure digital infrastructures.", bg: "bg-rose-50", cardBg: "bg-rose-50/80", iconBg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200" },
    { name: "Web Development", icon: <Code />, desc: "Design immersive frontend architectures and robust backend services to solve real-world problems over the internet.", bg: "bg-purple-50", cardBg: "bg-purple-50/80", iconBg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
    { name: "Mobile Applications", icon: <Smartphone />, desc: "Create seamless mobile experiences and cross-platform apps that bring essential services directly to the palm of the user.", bg: "bg-emerald-50", cardBg: "bg-emerald-50/80", iconBg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
    { name: "Open Innovation", icon: <Globe />, desc: "Unleash your creativity without boundaries. Build solutions targeting emerging fields, sustainability, or unique cross-disciplinary challenges.", bg: "bg-orange-50", cardBg: "bg-orange-50/80", iconBg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" }
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="themes">
      <FloatingShape color="bg-pastelPink" size="w-96 h-96" top="-10%" left="40%" duration={30} blur="blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <RevealText>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">Innovative <span className="text-orange-500">Themes</span></h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto">Build innovative technology solutions that solve real-world problems.</p>
          </RevealText>
        </div>

        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center justify-center">
          <div className="w-full md:w-1/3 flex flex-col gap-2.5 sm:gap-4">
            {themes.map((theme, idx) => (
              <RevealText key={idx} delay={0.05 * idx}>
                <button
                  onClick={() => setActiveTheme(idx)}
                  className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 sm:gap-4 border domain-tab ${activeTheme === idx
                    ? `domain-active text-slate-900 border-white/50 ${theme.bg}`
                    : "text-slate-500 border-gray-100"
                    }`}
                >
                  <span className={`domain-icon flex items-center justify-center w-8 h-8 rounded-full ${activeTheme === idx ? `${theme.text} ${theme.iconBg}` : "text-slate-400"}`}>
                    {React.cloneElement(theme.icon, { size: 18, strokeWidth: activeTheme === idx ? 2.5 : 2 })}
                  </span>
                  {theme.name}
                </button>
              </RevealText>
            ))}
          </div>

          <div className="w-full md:w-1/2 relative min-h-[240px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`w-full h-full glass-card border p-6 sm:p-12 flex flex-col items-center justify-center text-center rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-float-subtle ${themes[activeTheme].cardBg} ${themes[activeTheme].border}`}
              >
                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-sm ${themes[activeTheme].iconBg} ${themes[activeTheme].text}`}>
                  {React.cloneElement(themes[activeTheme].icon, { size: 28, strokeWidth: 2, className: 'sm:w-9 sm:h-9' })}
                </div>
                <h3 className={`text-2xl sm:text-3xl font-display font-black mb-2 sm:mb-3 tracking-tight ${themes[activeTheme].text}`}>
                  {themes[activeTheme].name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-sm">
                  {themes[activeTheme].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const faqColors = [
  { strip: 'bg-orange-400', btn: 'border-orange-300 text-orange-500 bg-orange-50', activeBg: 'bg-blue-50/60 border-blue-200', number: 'text-orange-400' },
  { strip: 'bg-green-400', btn: 'border-green-300 text-green-500 bg-green-50', activeBg: 'bg-blue-50/60 border-blue-200', number: 'text-green-500' },
  { strip: 'bg-pink-400', btn: 'border-pink-300 text-pink-500 bg-pink-50', activeBg: 'bg-blue-50/60 border-blue-200', number: 'text-pink-400' },
  { strip: 'bg-yellow-400', btn: 'border-yellow-300 text-yellow-500 bg-yellow-50', activeBg: 'bg-blue-50/60 border-blue-200', number: 'text-yellow-500' },
  { strip: 'bg-purple-400', btn: 'border-purple-300 text-purple-500 bg-purple-50', activeBg: 'bg-blue-50/60 border-blue-200', number: 'text-purple-500' },
];

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: "Who can participate and what are the team requirements?", a: "Any enrolled college student can participate. Teams must be between 1-4 members. The hackathon is Pan-Lucknow Inter-College, so cross-college teams are totally welcome!" },
    { q: "How much is the registration fee?", a: "The registration fee is Rs. 100/- per team." },
    { q: "Where is the event taking place?", a: <><span className="text-red-600 font-bold">RRGI</span> Innovathon 2026 will be held physically at R.R. Institute of Modern Technology, Lucknow.</> },
    { q: "What should I bring to the event?", a: "Bring your laptop, chargers, any specific hardware you need for your project, a valid college ID, and lots of enthusiasm!" },
    { q: "Will all the students be certified?", a: "Absolutely! All the students will be certified and acknowledged." }
  ];

  return (
    <section className="py-16 sm:py-24 relative" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <RevealText>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-4">Frequently <span className="text-blue-500">Asked</span><br /><span className="text-orange-400">Questions</span></h2>
            <p className="text-gray-600 font-medium mt-4">Everything you need to know before you build.</p>
          </RevealText>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const fc = faqColors[idx % faqColors.length];
            const isOpen = openIdx === idx;
            return (
              <RevealText key={idx} delay={0.05 * idx}>
                <motion.div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                    ? `${fc.activeBg} shadow-md`
                    : 'bg-white/60 border-gray-100 hover:border-gray-200 hover:bg-white/80 shadow-sm'
                    }`}
                >
                  {/* Left colored strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${fc.strip}`} />

                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full text-left pl-5 sm:pl-7 pr-4 sm:pr-6 py-4 sm:py-5 flex items-center justify-between focus:outline-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-5">
                      <span className={`text-xs sm:text-sm font-extrabold tracking-widest ${fc.number}`}>{String(idx + 1).padStart(2, '0')}</span>
                      <h4 className={`font-bold text-sm sm:text-base md:text-lg ${isOpen ? 'text-slate-800' : 'text-gray-700'}`}>{faq.q}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4 text-base sm:text-lg font-bold leading-none ${isOpen ? fc.btn : 'border-gray-200 text-gray-400 bg-white'
                        }`}
                    >
                      +
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pl-10 sm:pl-[3.75rem] pr-4 sm:pr-6 pb-4 sm:pb-5 text-gray-600 font-medium leading-relaxed text-xs sm:text-sm md:text-base"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </RevealText>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Ready to Innovate?</p>
          <a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all shadow-md">
            Register for Rs. 100/- Only
          </a>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const coreOrganisers = [
    { name: "Ashutosh Mishra", role: "Lead Organiser", color: "bg-blue-100", dotColor: "bg-blue-400", textColor: "text-blue-600", initials: "AM" },
    { name: "Aditya Verma", role: "Tech Lead", color: "bg-purple-100", dotColor: "bg-purple-400", textColor: "text-purple-600", initials: "AV" },
    { name: "Priya Singh", role: "Design Head", color: "bg-pink-100", dotColor: "bg-pink-400", textColor: "text-pink-600", initials: "PS" },
  ];

  const hackerlanceTeam = [
    { name: "Rahul Kumar", role: "Operations", color: "bg-orange-100", dotColor: "bg-orange-400", textColor: "text-orange-600", initials: "RK" },
    { name: "Sneha Gupta", role: "Marketing", color: "bg-green-100", dotColor: "bg-green-400", textColor: "text-green-600", initials: "SG" },
    { name: "Vikas Pandey", role: "Sponsorships", color: "bg-cyan-100", dotColor: "bg-cyan-400", textColor: "text-cyan-600", initials: "VP" },
  ];

  const MemberCard = ({ member, idx }) => (
    <RevealText key={idx} delay={0.08 * idx}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`relative rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center overflow-hidden border border-white/50 shadow-md ${member.color}`}
      >
        {/* Corner dot */}
        <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${member.dotColor}`}></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-[2rem]"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar circle with initials */}
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-white/80 ${member.color}`}>
            <span className={`text-2xl md:text-3xl font-black ${member.textColor}`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
              {member.initials}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base md:text-xl font-black text-slate-800 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {member.name}
          </h3>

          {/* Role badge */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${member.dotColor} animate-pulse`}></div>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-600">
              {member.role}
            </span>
          </div>

          {/* Social links */}
          <div className="flex gap-2 mt-4">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:shadow-md transition-all border border-gray-100/50">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </RevealText>
  );

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="team">
      <FloatingShape color="bg-pastelBlue" size="w-72 h-72" top="20%" left="-5%" duration={18} blur="blur-3xl" />
      <FloatingShape color="bg-pastelPink" size="w-80 h-80" top="50%" left="85%" duration={22} blur="blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <RevealText>
            <p className="text-xs font-extrabold tracking-[0.25em] uppercase text-gray-400 mb-4">The People Behind It</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black mb-6 sm:mb-8 tracking-tight">
              Meet the <span className="text-blue-500">Organisers</span>
            </h2>
            <div className="flex items-center justify-center gap-2 py-2 px-5 rounded-full bg-white/70 border border-gray-100 shadow-sm w-max mx-auto">
              <div className="flex -space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
              </div>
              <span className="text-xs font-extrabold tracking-[0.15em] uppercase text-gray-600 ml-1">The Team</span>
            </div>
          </RevealText>
        </div>

        {/* Core Organisers */}
        <div className="mb-20">
          <RevealText>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-blue-300"></div>
              <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold tracking-[0.2em] uppercase text-blue-600 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Core Organisers
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
          </RevealText>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
            {coreOrganisers.map((member, idx) => (
              <MemberCard key={idx} member={member} idx={idx} />
            ))}
          </div>
        </div>

        {/* HackerLance Team */}
        <div>
          <RevealText>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-orange-300"></div>
              <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-orange-50 border border-orange-200 text-xs font-extrabold tracking-[0.2em] uppercase text-orange-600 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                HackerLance Team
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-orange-300"></div>
            </div>
          </RevealText>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
            {hackerlanceTeam.map((member, idx) => (
              <MemberCard key={idx} member={member} idx={idx + coreOrganisers.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ EVENT TIMELINE SECTION ============
const EventTimelineSection = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);

  const days = [
    {
      label: 'Day 1',
      date: '16 April',
      tagline: 'Kickoff & Present',
      color: 'blue',
      events: [
        { time: '10:00 AM', title: 'Registration & Check-in', duration: '30 min', icon: <UserPlus size={22} />, desc: 'Teams arrive, complete on-site registration, collect ID badges, swag kits, and get settled at their designated workstations.', category: 'Registration' },
        { time: '10:30 AM', title: 'Inauguration Ceremony & Releasing PSIDs', duration: '45 min', icon: <Mic size={22} />, desc: 'Welcome address, rules briefing, sponsor highlights, and the official reveal of problem statements across all domains. Teams select their challenge!', category: 'Ceremony' },
        { time: '11:15 AM', title: 'Brainstorming & PPT Preparation', duration: '2.25 hrs', icon: <Presentation size={22} />, desc: 'Teams dive deep into research, strategise their approach, and craft presentation decks. Mentors are available for guidance.', category: 'Hacking' },
        { time: '01:30 PM', title: 'Snacks & Networking Break', duration: '45 min', icon: <Utensils size={22} />, desc: 'Take a well-deserved break! Grab snacks and refreshments, network with fellow participants, and clear your mind.', category: 'Break' },
        { time: '02:15 PM', title: 'PPT Polishing and Submission', duration: '2.25 hrs', icon: <Award size={22} />, desc: 'Teams present their solution approach to the panel and face Q&A. Judges evaluate based on innovation, feasibility, and technical depth.', category: 'Evaluation' },
        { time: '04:30 PM', title: 'Group Photo & Wrap-up', duration: '30 min', icon: <PartyPopper size={22} />, desc: 'Day 1 results are announced. End the day with a group photo of all participants, organisers, and judges. See you tomorrow!', category: 'Closing' },
      ]
    },
    {
      label: 'Day 2',
      date: '17 April',
      tagline: 'Build & Iterate',
      color: 'purple',
      events: [
        { time: '10:00 AM', title: 'Arrival & Setup (Shortlisted Teams)', duration: '30 min', icon: <UserPlus size={22} />, desc: 'Teams shortlisted from Day 1 report back. Power up your laptops, grab a coffee, and prepare for an intense day of coding.', category: 'Check-in' },
        { time: '10:30 AM', title: 'Hacking Begins: Core Building', duration: '3 hrs', icon: <Hammer size={22} />, desc: 'The main development window! Teams start building their models, creating the UI, and developing the core functionality of their projects.', category: 'Hacking' },
        { time: '01:30 PM', title: 'Lunch & Networking Break', duration: '45 min', icon: <Utensils size={22} />, desc: 'Take a breather to refuel. A perfect time to stretch your legs, eat, and discuss technical roadblocks with peers.', category: 'Meal' },
        { time: '02:15 PM', title: 'Mentorship & Progress Check', duration: '1 hr', icon: <Users size={22} />, desc: 'Mentors visit each team to review architectural choices, resolve technical bugs, and ensure the project is on the right track.', category: 'Mentoring' },
        { time: '03:15 PM', title: 'Final Sprint & Deployment', duration: '1.75 hrs', icon: <Rocket size={22} />, desc: 'The final stretch. Teams fix last-minute bugs, polish the UI, and begin deploying their projects to live hosting services.', category: 'Hacking' },
        { time: '05:00 PM', title: 'Documentation & Pre-Submission', duration: '30 min', icon: <Code size={22} />, desc: 'Teams prepare their GitHub README files, clean up their codebases, and ensure their live links are fully functioning.', category: 'Prep' },
        { time: '05:30 PM', title: 'Project Submission (Code Freeze)', duration: '30 min', icon: <Globe size={22} />, desc: 'All coding stops! Teams submit their final GitHub repository links and live website URLs to the portal. Day 2 wraps up!', category: 'Submission' },
      ]
    },
    {
      label: 'Day 3',
      date: '18 April',
      tagline: 'Win & Celebrate',
      color: 'orange',
      events: [
        { time: '10:00 AM', title: 'Arrival & Demo Prep', duration: '30 min', icon: <UserPlus size={22} />, desc: 'Teams arrive and set up their final demos. This is the time for last-minute health checks on live links before facing the jury.', category: 'Preparation' },
        { time: '10:30 AM', title: 'Live Model Presentations', duration: '2.5 hrs', icon: <Presentation size={22} />, desc: 'The ultimate showdown! Teams shortlisted from Day 2 present their fully functioning applications and models to the expert judging panel.', category: 'Judging' },
        { time: '01:00 PM', title: 'Lunch & Deliberation', duration: '1.5 hrs', icon: <Utensils size={22} />, desc: 'Enjoy the final hackathon lunch while the judges deliberate. A great time to network with sponsors and explore other teams\' builds.', category: 'Meal' },
        { time: '02:30 PM', title: 'Awards & Certification Ceremony', duration: '1 hr', icon: <Award size={22} />, desc: 'The moment of truth! Announcement of winners, domain-specific prizes, and certificate distribution for all participants.', category: 'Ceremony' },
        { time: '03:30 PM', title: 'Swags & Closing Remarks', duration: '30 min', icon: <Gift size={22} />, desc: 'Collect your exclusive Innovathon swag kits and goodies. A final vote of thanks and the official end to the hackathon.', category: 'Closing' },
        { time: '04:00 PM', title: 'Celebration & Group Photos', duration: '30 min', icon: <PartyPopper size={22} />, desc: 'Celebrate your achievements! Take final photos with the judges, organisers, and your newly made friends before heading home.', category: 'Wrap-up' },
      ]
    }
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', dot: 'bg-blue-500', line: 'bg-blue-300', tab: 'bg-blue-500', tabHover: 'hover:bg-blue-50', badge: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', dot: 'bg-purple-500', line: 'bg-purple-300', tab: 'bg-purple-500', tabHover: 'hover:bg-purple-50', badge: 'bg-purple-100 text-purple-700', iconBg: 'bg-purple-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', dot: 'bg-orange-500', line: 'bg-orange-300', tab: 'bg-orange-500', tabHover: 'hover:bg-orange-50', badge: 'bg-orange-100 text-orange-700', iconBg: 'bg-orange-100' },
  };

  const currentDay = days[activeDay];
  const colors = colorMap[currentDay.color];
  const currentEvent = currentDay.events[activeEvent];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="timeline">
      <FloatingShape color="bg-pastelYellow" size="w-80 h-80" top="10%" left="80%" duration={20} blur="blur-3xl" />
      <FloatingShape color="bg-pastelBlue" size="w-64 h-64" top="60%" left="-5%" duration={16} blur="blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <RevealText>
            <p className="text-xs font-extrabold tracking-[0.25em] uppercase text-gray-400 mb-4">3-Day Schedule</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black mb-4 sm:mb-6 tracking-tight">
              Event <span className={colors.text}>Timeline</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-xl mx-auto">Click any day to explore the full schedule. Navigate events using the timeline bar.</p>
          </RevealText>
        </div>

        {/* Day Switcher Tabs */}
        <RevealText>
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-14">
            {days.map((day, idx) => {
              const dColors = colorMap[day.color];
              const isActive = activeDay === idx;
              return (
                <button
                  key={idx}
                  onClick={() => { setActiveDay(idx); setActiveEvent(0); }}
                  className={`relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${isActive
                    ? `${dColors.bg} ${dColors.border} ${dColors.text} shadow-md scale-105`
                    : `bg-white/50 border-gray-100 text-gray-400 ${dColors.tabHover} hover:text-gray-600 hover:border-gray-200`
                    }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full transition-all ${isActive ? `${dColors.dot} animate-pulse` : 'bg-gray-300'
                    }`}></span>
                  <span className="hidden md:inline">{day.label} — </span>
                  <span className="md:hidden">{day.label}</span>
                  <span className="hidden md:inline text-xs font-extrabold tracking-wider uppercase opacity-70">{day.tagline}</span>
                </button>
              );
            })}
          </div>
        </RevealText>

        {/* Timeline Content */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">

          {/* Left: Vertical Timeline Bar */}
          <div className="w-full lg:w-[420px] shrink-0 relative">
            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-[18px] top-0 bottom-0 w-0.5 ${colors.line} opacity-30 rounded-full`}></div>

              <motion.div
                key={activeDay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                {currentDay.events.map((event, idx) => {
                  const isActive = activeEvent === idx;
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setActiveEvent(idx)}
                      className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl text-left transition-all duration-300 relative ${isActive
                        ? `${colors.bg} shadow-sm`
                        : 'hover:bg-white/50'
                        }`}
                    >
                      {/* Timeline dot */}
                      <div className={`relative z-10 w-[10px] h-[10px] rounded-full border-2 transition-all flex-shrink-0 ${isActive
                        ? `${colors.dot} border-transparent scale-125`
                        : `bg-white border-gray-300`
                        }`}>
                        {isActive && (
                          <motion.div
                            layoutId="timelinePulse"
                            className={`absolute -inset-1.5 rounded-full ${colors.dot} opacity-20`}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Event info */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? colors.text : 'text-gray-400'
                          }`}>{event.time}</p>
                        <p className={`text-sm font-bold truncate ${isActive ? 'text-slate-800' : 'text-gray-600'
                          }`}>{event.title}</p>
                      </div>

                      {/* Duration badge */}
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase flex-shrink-0 ${isActive ? colors.badge : 'bg-gray-100 text-gray-400'
                        }`}>{event.duration}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right: Active Event Detail Card */}
          <div className="flex-1 min-w-0 lg:sticky lg:top-24">
            <motion.div
              key={`${activeDay}-${activeEvent}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-10 border-2 ${colors.border} bg-blue-50/50 backdrop-blur-md shadow-lg relative overflow-hidden flex flex-col justify-between h-max`}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-[2rem]"></div>
              {/* Corner dot */}
              <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${colors.dot}`}></div>

              <div className="relative z-10">
                {/* Category + Day badge */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-extrabold tracking-[0.15em] uppercase ${colors.badge} border ${colors.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                    {currentEvent.category}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-extrabold tracking-[0.15em] uppercase bg-white/60 text-gray-600 border border-gray-200`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    {currentDay.label}
                  </span>
                </div>

                {/* Icon + Title Row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center ${colors.text} shadow-sm border border-white/80 flex-shrink-0`}>
                    {currentEvent.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-extrabold tracking-[0.2em] uppercase ${colors.text} mb-1`}>{currentEvent.time}</p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-800 tracking-tight leading-tight">
                      {currentEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-px flex-1 ${colors.line} opacity-30`}></div>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-extrabold tracking-[0.15em] uppercase ${colors.badge} border ${colors.border}`}>
                    <Clock size={10} className="inline mr-1 -mt-0.5" />{currentEvent.duration}
                  </span>
                  <div className={`h-px flex-1 ${colors.line} opacity-30`}></div>
                </div>

                {/* Description */}
                <p className="text-gray-600 font-medium leading-relaxed text-base">
                  {currentEvent.desc}
                </p>
              </div>

              {/* Footer: Navigation + Counter */}
              <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-gray-200/40">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gray-400">
                  Event {activeEvent + 1} of {currentDay.events.length} · {currentDay.tagline}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveEvent(Math.max(0, activeEvent - 1))}
                    disabled={activeEvent === 0}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${activeEvent === 0
                      ? 'border-gray-200 text-gray-600 cursor-not-allowed'
                      : `${colors.border} ${colors.text} hover:${colors.bg} hover:shadow-sm`
                      }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveEvent(Math.min(currentDay.events.length - 1, activeEvent + 1))}
                    disabled={activeEvent === currentDay.events.length - 1}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${activeEvent === currentDay.events.length - 1
                      ? 'border-gray-200 text-gray-600 cursor-not-allowed'
                      : `${colors.border} ${colors.text} hover:${colors.bg} hover:shadow-sm`
                      }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-16 sm:pt-24 pb-8 sm:pb-12 relative border-t border-gray-200/60 mt-8 sm:mt-12 overflow-hidden bg-white/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-3 sm:mb-4">
              RRGI <span className="text-blue-500">Innovathon</span>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-6">
              Lucknow's Biggest Student Hackathon. Where ideas turn into innovation and you prove your technical excellence.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/rrgilko?igsh=MTFlNjI3bzlqODA2bQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-pink-500 hover:shadow-md transition-all border border-gray-100">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/rrgilko/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all border border-gray-100">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/rrgilko" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-sky-500 hover:shadow-md transition-all border border-gray-100">
                <Twitter size={18} />
              </a>
            </div>
            <p className="text-gray-600 text-sm font-medium mt-3">Follow us <span className="font-bold text-blue-500">@rrgilko</span></p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-blue-500 mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500"><Globe size={14} /></div>
                <a href="http://www.rrimt.ac.in" target="_blank" rel="noopener noreferrer" className="mt-1 hover:text-blue-600">www.rrimt.ac.in</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-500"><Info size={14} /></div>
                <span className="mt-1 flex flex-col gap-1">
                  <span>+91 8564025922</span>
                  <span>+91 8565852174</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-orange-500 mb-6">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 text-sm font-medium text-gray-600">
              <li><a href="#" className="hover:text-blue-500">Home</a></li>
              <li><a href="#about" className="hover:text-blue-500">About</a></li>
              <li><a href="#themes" className="hover:text-blue-500">Themes</a></li>
              <li><a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Register</a></li>
              <li><a href="#prizes" className="hover:text-blue-500">Prizes</a></li>
              <li><a href="#faq" className="hover:text-blue-500">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-green-500 mb-6">Location</h4>
            <div className="w-full h-32 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-4 relative flex flex-col items-center justify-center text-center">
              <MapPin size={24} className="mb-2 text-red-500" />
              <span className="text-xs font-semibold text-gray-700">R.R. Institute of Modern Technology, Lucknow</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-gray-400">
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            <span className="ml-2">RRGI Innovathon 2026 · T&P</span>
          </div>
          <p className="mt-4 md:mt-0">© 2026 T&P RRIMT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Edge-Margin Mesh Particle Network
const MeshNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];

    // Vibrant neon tech colors: Purple, Fuchsia, Cyan, Blue
    const colors = ['#8b5cf6', '#d946ef', '#0ea5e9', '#3b82f6'];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Calculate true empty margin (outside max-w-7xl = 1280px content)
      const contentWidth = Math.min(1280, window.innerWidth);
      const gutterWidth = Math.max(60, (window.innerWidth - contentWidth) / 2 + 40);

      // Fewer particles, only in the gutters
      const particleCount = Math.min(Math.floor(gutterWidth / 4), 60);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const isLeft = i % 2 === 0;
        const x = isLeft
          ? Math.random() * gutterWidth
          : window.innerWidth - (Math.random() * gutterWidth);

        particles.push({
          x,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          isLeft,
          gutterWidth
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off top/bottom
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Bounce strictly within left/right gutters only
        if (p.isLeft) {
          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          if (p.x > p.gutterWidth) { p.x = p.gutterWidth; p.vx *= -1; }
        } else {
          if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
          if (p.x < canvas.width - p.gutterWidth) { p.x = canvas.width - p.gutterWidth; p.vx *= -1; }
        }

        // Draw connecting mesh lines (only connect particles on the same side)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p.isLeft !== p2.isLeft) continue; // Don't connect across sides
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Draw glowing nodes on top
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-15 opacity-70"
    />
  );
};

// Global Cursor Sparkle Effect
const CursorSparkle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const sparkleColors = [
      '#f59e0b', '#eab308', '#d97706', // bold gold/amber
      '#3b82f6', '#eb7425ff',             // vivid blue
      '#8b5cf6', '#7c3aed',             // vivid purple
      '#ec4899',                         // pink
      '#10b981',                         // emerald
    ];

    const emitBurst = (x, y) => {
      const count = 8 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 1 + Math.random() * 2,
          life: 1,
          decay: 0.02 + Math.random() * 0.015,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          type: Math.random() > 0.4 ? 'star' : 'dot',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3
        });
      }
    };

    // Trail sparkles on mouse move
    let lastTrailTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTrailTime < 30) return;
      lastTrailTime = now;

      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 1 + Math.random() * 2.5,
          life: 0.7 + Math.random() * 0.3,
          decay: 0.02 + Math.random() * 0.015,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          type: Math.random() > 0.5 ? 'star' : 'dot',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const handleClick = (e) => emitBurst(e.clientX, e.clientY);
    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (touch) emitBurst(touch.clientX, touch.clientY);
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.life > 0);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.life -= p.decay;
        p.size *= 0.988;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'star') {
          // 4-pointed sparkle
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const a = (i * Math.PI) / 2;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.stroke();
        } else {
          // Glowing dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

const BackgroundGrid = () => (
  <div className="fixed inset-0 pointer-events-none -z-20 bg-gradient-to-br from-[#FAFCFF] via-[#F3F8FF] to-[#E5F0FF]">
    <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-multiply"></div>
    <MeshNetwork />
  </div>
);

// Lightweight Vanilla Animation Hooks
const useVanillaAnimations = () => {
  useEffect(() => {
    // 1. Setup Intersection Observer for scroll reveals
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-show');
        } else {
          entry.target.classList.remove('reveal-show');
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.reveal-hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // 2. Setup Mouse Parallax Hook
    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll('.parallax-element');
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // 20px max shift X
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // 20px max shift Y

      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 1;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

function App() {
  useVanillaAnimations();

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative scroll-smooth">
      <BackgroundGrid />
      <CursorSparkle />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <PrizeSection />
        <ThemesSection />
        <EventTimelineSection />
        <TeamSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;





