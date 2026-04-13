import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Lenis from 'lenis';
import {
  Users, Zap, Trophy, ChevronDown, ChevronUp, Rocket,
  MapPin, Calendar, Clock, ArrowRight, Instagram, Linkedin, Twitter, Globe, Info, Gift, Lightbulb, UserPlus, Fingerprint, Code, Smartphone,
  Coffee, Utensils, Mic, Play, Pause, Award, PartyPopper, Sun, Moon, Sunrise, ChevronLeft, ChevronRight, Hammer, Presentation, MessageSquare, Star, Menu, X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Components
const FloatingShape = ({ color, size, top, left, delay = 0, duration = 10, blur = 'blur-2xl' }) => (
  <motion.div
    className={`hidden md:block absolute rounded-full animate-floating parallax-element ${color} ${size} ${blur} opacity-40 mix-blend-multiply -z-10`}
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
    className={`hidden md:block absolute pointer-events-none parallax-element -z-10 ${color}`}
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-4 sm:px-6 py-2 sm:py-3"
    >
      <div className="max-w-7xl mx-auto glass-card rounded-2xl sm:rounded-full px-4 sm:px-6 py-2 flex justify-between items-center shadow-lg border border-white/40">
        <div className="flex items-center gap-1 sm:gap-4 hover:opacity-90 transition-opacity cursor-pointer">

          <div className="flex flex-col justify-center mt-0.5 z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 whitespace-nowrap">
                <span className="text-red-600 font-black">RRGI</span> ORGANIZES
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-blue-600 uppercase tracking-widest leading-none opacity-80 hidden min-[400px]:inline">2026 Edition</span>
            </div>
            <div className="font-display font-black text-lg sm:text-2xl tracking-tighter leading-none flex items-center gap-1.5" style={{ letterSpacing: '-0.04em' }}>
              <span className="text-red-600 drop-shadow-sm">RRGI</span>
              <span className="text-slate-800 drop-shadow-sm">Innovathon</span>
              
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
          <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
          <a href="#prizes" className="hover:text-blue-500 transition-colors">Prizes</a>
          <a href="#themes" className="hover:text-blue-500 transition-colors">Themes</a>
          <a href="#faq" className="hover:text-blue-500 transition-colors">FAQs</a>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          <a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="skeu-btn-primary px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center">
            Register <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      <div className={`md:hidden ${open ? 'block' : 'hidden'} px-4`}> 
        <div className="max-w-7xl mx-auto mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 border border-white/50">
          <div className="flex flex-col gap-3 text-center">
            <a href="#about" onClick={() => setOpen(false)} className="py-2 hover:text-blue-500">About</a>
            <a href="#features" onClick={() => setOpen(false)} className="py-2 hover:text-blue-500">Features</a>
            <a href="#prizes" onClick={() => setOpen(false)} className="py-2 hover:text-blue-500">Prizes</a>
            <a href="#themes" onClick={() => setOpen(false)} className="py-2 hover:text-blue-500">Themes</a>
            <a href="#faq" onClick={() => setOpen(false)} className="py-2 hover:text-blue-500">FAQs</a>
          </div>
        </div>
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



          <RevealText delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-3 sm:mb-6 drop-shadow-xl text-center w-full" style={{ fontFamily: "'Syne', sans-serif", lineHeight: '1.3', letterSpacing: '-0.01em' }}>
              <span className="text-red-600">RRGI</span>{" "}
              <span className="text-black">Innova</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">thon</span>
            </h1>
            <RevealText delay={0.45}>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 px-2">
              <a href="#" className="flex items-center gap-2 bg-white/6 hover:bg-white/12 border border-white/10 text-sm text-slate-800 px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm">
                <img src="/ola.jpeg" alt="OLA" className="w-6 h-6 rounded-full object-contain" />
                <span className="font-semibold text-xs">Powered by OLA Krutrim</span>
              </a>

              <a href="#" className="flex items-center gap-2 bg-white/6 hover:bg-white/12 border border-white/10 text-sm text-slate-800 px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm">
                <img src="/trainx.jpeg" alt="TrainX" className="w-6 h-6 rounded-full object-contain" />
                <span className="font-semibold text-xs">Strategic Partner — TrainX</span>
              </a>

             
            </div>
          </RevealText>
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

          {/* Sponsors moved to hero */}
          
          
        </motion.div>
      </div>
    </section>
  );
};


const StudentOrganizersSection = () => {
  const organizers = [
    { name: 'Ekansh Saxena', role: 'Core Lead', subtitle: 'B.Tech CSE, 3rd Year', img: '/ekansh.jpeg', website: 'https://www.ekanshh.in', linkedin: 'https://www.linkedin.com/in/ekanshsaxena0718?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: 'https://www.instagram.com/eku.dev' },
    { name: 'Ashish Singh', role: 'Technical Head', subtitle: 'B.Tech CSE, 3rd Year', img: '/ashish.jpeg', website: 'https://www.ashishbhadauriya.in', linkedin: 'https://www.linkedin.com/in/ashishsinghbhadauriya', instagram: 'https://www.instagram.com/bhadauriya.kshatriya' },
    { name: 'Soumya Singh', role: 'Design Lead', subtitle: 'B.Tech CSE, 3rd Year', img: '/momo.jpeg', website: '#', linkedin: 'https://www.linkedin.com/in/soumya-singh-424388252?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: '' },
    { name: 'Divyanshu Sachan', role: 'Logistics Head', subtitle: 'B.Tech CSE, 3rd Year', img: '/sachan.jpeg', website: '#', linkedin: 'https://www.linkedin.com/in/divyanshu-sachan-a32a5132b', instagram: 'https://www.instagram.com/mr.khurana54' },
    { name: 'Aditya Maurya', role: 'Community Lead', subtitle: 'B.Tech CS AIML, 3rd Year', img: '/aditya.jpeg', website: '#', linkedin: 'https://www.linkedin.com/in/adiincode?utm_source=share_via&utm_content=profile&utm_medium=member_ios', instagram: 'https://www.instagram.com/0001_adi_?igsh=ODZkd2NvODZpY3hj&utm_source=qr' },
  ];
   

  // Hacklance / Student leadership team
  const hacklanceTeam = [
    { role: 'President', name: 'Uday Kumar', website: '#', linkedin: 'https://www.linkedin.com/in/uday-kumar-b12040296?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: '#', img: 'uday.jpeg' },
    { role: 'Vice President', name: 'Anushka Srivastava', website: '#', linkedin: 'https://www.linkedin.com/in/anushkasrivastava27?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: '#', img: 'anushka.jpeg' },
    { role: 'Joint Secretary', name: 'Satya Prakash Sharma', website: '#', linkedin: 'https://www.linkedin.com/in/satya-prakash-sharma-b6440b243/', instagram: '#', img: 'satya.jpeg' },
    { role: 'Treasurer', name: 'Muskan Yadav', website: '#', linkedin: 'https://www.linkedin.com/in/muskan-yadav-9120922b6/', instagram: '#', img: 'muskan.jpeg' },
    { role: 'Documentation Head', name: 'Ambrish Rao', website: '', linkedin: 'https://www.linkedin.com/in/ambrish-rao-918164251/', instagram: '#', img: 'ambrish.jpeg' },
    { role: 'Core Member', name: 'Aryan Singh', website: '#', linkedin: 'https://www.linkedin.com/in/aryan-singh-986b05329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: '#', img: 'aryan.jpeg' },
    { role: 'Core Member', name: 'Mohd Sahil', website: '#', linkedin: 'https://www.linkedin.com/in/mohd-sahil-919407295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: '#', img: 'sahil.jpeg' },
    { role: 'Core Member', name: 'Amartya Kushwaha', website: '#', linkedin: 'https://www.linkedin.com/in/amartya-kushwaha-70204832b?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: '#', img: 'amartya.jpeg' },
    { role: 'Core Member', name: 'Ayushman Paswan', website: '#', linkedin: 'https://tinywebs.site/IQPyiK', instagram: '#', img: 'ayushman.jpeg' },
    { role: 'Core Member', name: 'Nilesh Rajbhar', website: '#', linkedin: 'https://www.linkedin.com/in/nilesh-rajbhar-483371274/', instagram: '#', img: 'nilesh.jpeg' },
    

    
    
  ];

  const coordinators = [
    { name: 'Mr. Anurag Pandey', role: '', subtitle: 'EVENT COORDINATOR ,GIT RRGI INNOVATHON', img: '/hodtnp.jpeg', linkedin: '#' },
     { name: 'Mr. Sujeet Singh', role: '', subtitle: 'EVENT COORDINATOR , RRGI INNOVATHON', img: '/sujeet.jpeg', linkedin: '#' },
    { name: 'Mr. Harendra  Prajapati', role: '', subtitle: 'Faculty Advisor,Hacklance, RRIMT', img: '/harendra.jpeg', linkedin: '#' },
  ];

  const coordColors = [
    { gradient: 'from-red-50 via-rose-50 to-orange-50', border: 'border border-red-200 border-r-4 border-r-red-500', strip: 'from-blue-400 to-blue-600', ring: 'ring-red-300', avatar: 'bg-red-100', label: 'text-blue-500', dot: 'bg-blue-400', blob: 'bg-red-100' },
    { gradient: 'from-purple-50 via-fuchsia-50 to-pink-50', border: 'border border-purple-200 border-r-4 border-r-purple-500', strip: 'from-red-400 to-red-600', ring: 'ring-purple-300', avatar: 'bg-pink-100', label: 'text-red-500', dot: 'bg-rose-400', blob: 'bg-pink-100' },
    { gradient: 'from-blue-50 via-cyan-50 to-sky-50', border: 'border border-blue-200 border-r-4 border-r-blue-500', strip: 'from-yellow-400 to-amber-500', ring: 'ring-blue-300', avatar: 'bg-yellow-100', label: 'text-yellow-600', dot: 'bg-yellow-400', blob: 'bg-yellow-100' },
  ];

  const rowColors = [
    { gradient: 'from-violet-50 via-indigo-50 to-blue-50', outerBorder: 'border border-violet-200', rightBorder: 'border-r-4 border-violet-500', topStrip: 'from-violet-500 via-indigo-400 to-blue-400', ring: 'ring-violet-300', avatar: 'bg-violet-100' },
    { gradient: 'from-blue-50 via-cyan-50 to-sky-50', outerBorder: 'border border-blue-200', rightBorder: 'border-r-4 border-blue-500', topStrip: 'from-blue-500 via-cyan-400 to-sky-400', ring: 'ring-blue-300', avatar: 'bg-blue-100' },
    { gradient: 'from-rose-50 via-pink-50 to-fuchsia-50', outerBorder: 'border border-rose-200', rightBorder: 'border-r-4 border-rose-500', topStrip: 'from-rose-500 via-pink-400 to-fuchsia-400', ring: 'ring-rose-300', avatar: 'bg-rose-100' },
    { gradient: 'from-amber-50 via-orange-50 to-yellow-50', outerBorder: 'border border-amber-200', rightBorder: 'border-r-4 border-amber-500', topStrip: 'from-amber-500 via-orange-400 to-yellow-400', ring: 'ring-amber-300', avatar: 'bg-amber-100' },
    { gradient: 'from-emerald-50 via-teal-50 to-green-50', outerBorder: 'border border-emerald-200', rightBorder: 'border-r-4 border-emerald-500', topStrip: 'from-emerald-500 via-teal-400 to-green-400', ring: 'ring-emerald-300', avatar: 'bg-emerald-100' },
    { gradient: 'from-purple-50 via-fuchsia-50 to-pink-50', outerBorder: 'border border-purple-200', rightBorder: 'border-r-4 border-purple-500', topStrip: 'from-purple-500 via-fuchsia-400 to-pink-400', ring: 'ring-purple-300', avatar: 'bg-purple-100' },
    { gradient: 'from-teal-50 via-cyan-50 to-blue-50', outerBorder: 'border border-teal-200', rightBorder: 'border-r-4 border-teal-500', topStrip: 'from-teal-500 via-cyan-400 to-blue-400', ring: 'ring-teal-300', avatar: 'bg-teal-100' },
    { gradient: 'from-orange-50 via-red-50 to-rose-50', outerBorder: 'border border-orange-200', rightBorder: 'border-r-4 border-orange-500', topStrip: 'from-orange-500 via-red-400 to-rose-400', ring: 'ring-orange-300', avatar: 'bg-orange-100' },
  ];

  // Theme for the main HACKLANCE tile (use second palette by default)
  const hacklanceTheme = rowColors[1];

  // Pagination / slide state removed — replaced by merged lists

  const SectionLabel = ({ children, color = 'from-blue-100 to-indigo-100 border-blue-200 text-blue-700' }) => (
    <span className={`inline-block py-1 px-5 rounded-full bg-gradient-to-r ${color} border text-[11px] font-extrabold tracking-widest uppercase shadow-sm backdrop-blur-sm`}>
      {children}
    </span>
  );

  // Merge organizers + hacklanceTeam into unified lists
  const mergedTeam = [
    ...organizers.map(o => ({
      name: o.name,
      role: o.role || o.subtitle || '',
      img: o.img || '',
      website: o.website || '#',
      linkedin: o.linkedin || '',
      instagram: o.instagram || ''
    })),
    ...hacklanceTeam.map(h => ({
      name: h.name,
      role: h.role || '',
      img: h.img || '',
      website: h.website || '#',
      linkedin: h.linkedin || '',
      instagram: h.instagram || ''
    }))
  ];

  const photoMembers = mergedTeam.filter(m => m.img && m.img.trim());
  const noPhotoMembers = mergedTeam.filter(m => !m.img || m.img.trim() === '');

  // Prefer ordering so Soumya and Abhay appear adjacent to Ashish on medium+ screens
  const priorityNames = ['Ekansh Saxena', 'Ashish Singh', 'Aditya Maurya', 'Soumya Singh','Divyanshu Sachan' ];
  const orderedPhotoMembers = [
    ...priorityNames.map(n => photoMembers.find(m => m.name === n)).filter(Boolean),
    ...photoMembers.filter(m => !priorityNames.includes(m.name))
  ];
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Slider refs + auto-slide logic for the right-side team carousel
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const step = () => {
      if (isSliderHovered) return; // pause on hover
      const maxScroll = slider.scrollHeight - slider.clientHeight;
      const delta = Math.round(slider.clientHeight / 3);
      const next = Math.min(slider.scrollTop + delta, maxScroll);
      if (slider.scrollTop >= maxScroll - 5) {
        slider.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        slider.scrollTo({ top: next, behavior: 'smooth' });
      }
    };

    autoSlideRef.current = setInterval(step, 3000);
    return () => clearInterval(autoSlideRef.current);
  }, [isSliderHovered]);

  const slideNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollHeight - slider.clientHeight;
    const delta = Math.round(slider.clientHeight / 3);
    const next = Math.min(slider.scrollTop + delta, maxScroll);
    slider.scrollTo({ top: next, behavior: 'smooth' });
  };

  const slidePrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const delta = Math.round(slider.clientHeight / 3);
    const prev = Math.max(slider.scrollTop - delta, 0);
    slider.scrollTo({ top: prev, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 relative" id="students">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1 — EVENT PLANNERS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div>
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SPONSORSHIP — Added above Organized By
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div>
            <RevealText>
              <div className="text-center mb-8">
                <SectionLabel color="from-yellow-100 to-amber-100 border-amber-200 text-amber-700">Partners & Sponsors</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-display font-black mt-3">Our Partners & Sponsors</h2>
                <p className="text-gray-500 mt-2 text-sm">Backed by industry leaders</p>
              </div>
            </RevealText>
            <RevealText delay={0.05} className="mb-24">
              <div className="flex flex-col sm:flex-row gap-12">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="flex-1 bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-gray-100 shadow-md overflow-hidden flex items-center gap-5 min-h-[140px]"
                >
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-gray-100 shadow-inner flex-shrink-0">
                    <img src="/ola.jpeg" alt="OLA KRUTRIM" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Powered by</h3>
                    <p className="text-lg font-extrabold text-slate-900">OLA KRUTRIM</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="flex-1 bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-gray-100 shadow-md overflow-hidden flex items-center gap-5 min-h-[140px]"
                >
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-gray-100 shadow-inner flex-shrink-0">
                    <img src="/trainx.jpeg" alt="TrainX" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Strategic Partner</h3>
                    <p className="text-lg font-extrabold text-slate-900">TrainX</p>
                  </div>
                </motion.div>
              </div>
            </RevealText>
          </div>

          <RevealText>
            <div className="text-center mb-8">
              <div className="mt-6 flex justify-center">
                <SectionLabel color="from-blue-100 to-indigo-100 border-blue-200 text-blue-700">Event Planners</SectionLabel>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black mt-3">Organized By</h2>
              <p className="text-gray-500 mt-2 text-sm">Proudly presented under the banner of</p>
            </div>
          </RevealText>
          <RevealText delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-12">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="flex-1 bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-gray-100 shadow-md overflow-hidden flex items-center gap-5 min-h-[180px]"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-gray-100 shadow-inner flex-shrink-0">
                  <img src="/HACKLANCE.jpeg" alt="HACKLANCE" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">HACKLANCE</h3>
                  <p className="text-sm text-gray-400 font-medium">Innovation Team</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="flex-1 bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-gray-100 shadow-md overflow-hidden flex items-center gap-5 min-h-[180px]"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-gray-100 shadow-inner flex-shrink-0">
                  <img src="/d.png" alt="T&P" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">T&amp;P Department</h3>
                  <p className="text-sm text-gray-400 font-medium">Training &amp; Placement</p>
                </div>
              </motion.div>
            </div>
          </RevealText>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 2 — MEET THE TEAM (Redesigned: 50/50 Grid + Slider)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div>
          <RevealText>
            <div className="text-center mb-8">
              <SectionLabel color="from-violet-100 to-purple-100 border-violet-200 text-violet-700">Student Organizers</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-display font-black mt-3">Meet the Team Behind It All</h2>
              <p className="text-gray-500 mt-2 text-sm">The passionate students making it all happen</p>
            </div>
          </RevealText>

          <RevealText>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">

              {/* LEFT: Core Organizing Team (2 columns × 3 rows) — wider (60%) */}
              <div className="w-full md:w-[60%] px-6 sm:px-8">
                <div className="flex items-center justify-center mb-4">
                  <SectionLabel color="from-indigo-100 to-indigo-200 border-indigo-200 text-indigo-700">Core Organizing Team</SectionLabel>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {organizers.slice(0, 6).map((org, idx) => {
                    const tc = rowColors[idx % rowColors.length];
                    const hideOnMobile = !showAllMobile && idx >= 2; // show only first 2 on mobile when collapsed
                    const layoutClass = hideOnMobile ? 'hidden sm:flex items-start md:items-center' : 'flex items-start md:items-center';
                    return (
                      <motion.div
                        key={`${org.name}-${idx}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className={`group rounded-xl p-4 ${layoutClass} gap-4 shadow-sm ${tc.outerBorder} bg-gradient-to-br ${tc.gradient}`}
                        style={{ minHeight: 110 }}
                      >
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex items-center justify-center ${tc.avatar} flex-shrink-0`}> 
                          {org.img ? <img src={org.img} alt={org.name} className="w-full h-full object-cover" /> : <span className="text-lg font-black text-gray-400">{(org.name||'').split(' ').map(n=>n[0]).slice(0,2).join('')}</span>}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-base font-black text-slate-900 leading-tight break-normal whitespace-normal">{org.name}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          {org.website && org.website !== '#' && (
                            <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
                              <Globe size={14} />
                            </a>
                          )}
                          {org.linkedin && org.linkedin !== '#' && (
                            <a href={org.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700">
                              <Linkedin size={14} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile-only Show more / Show less */}
                {organizers.slice(0, 6).length > 2 && (
                  <div className="flex sm:hidden justify-center mt-4">
                    <button
                      onClick={() => setShowAllMobile(v => !v)}
                      aria-expanded={showAllMobile}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-slate-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <span className="text-sm">
                        {showAllMobile ? 'Show less' : `Show ${Math.max(0, organizers.slice(0,6).length - 2)} more`}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAllMobile ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT: Large card with vertical slider (Hacklance Team) — narrower (40%) */}
              <div className="w-full md:w-[40%] px-6 sm:px-8">
                <div className="flex items-center justify-center mb-4">
                  <SectionLabel color="from-teal-100 to-cyan-100 border-teal-200 text-teal-700">Hacklance Team</SectionLabel>
                </div>

                <motion.div className={`rounded-2xl shadow-md bg-white/80 p-6 border border-gray-100 relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${hacklanceTheme.topStrip} opacity-90`} />

                  <div className="relative z-10">
                    <div
                      ref={sliderRef}
                      onMouseEnter={() => setIsSliderHovered(true)}
                      onMouseLeave={() => setIsSliderHovered(false)}
                      onTouchStart={() => setIsSliderHovered(true)}
                      onWheel={(e) => e.preventDefault()}
                      onTouchMove={(e) => e.preventDefault()}
                      className="flex flex-col gap-4 overflow-y-auto scroll-smooth py-2 px-1 md:max-h-[336px] max-h-[336px] premium-scrollbar"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                      {hacklanceTeam.map((m, i) => {
                        const hc = rowColors[i % rowColors.length];
                        return (
                          <div key={`${m.name}-${i}`} className={`snap-start w-full rounded-xl p-4 flex items-center gap-4 h-24 shadow-sm ${hc.outerBorder} bg-gradient-to-br ${hc.gradient}`}>
                            <div className={`w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center ${hc.avatar} flex-shrink-0`}> 
                              {m.img ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" /> : <span className="text-lg font-black text-gray-400">{(m.name||'').split(' ').map(n=>n[0]).slice(0,2).join('')}</span>}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-black text-slate-900 break-words">{m.name}</div>
                            </div>

                            <div className="flex items-center gap-3">
                              {m.website && m.website !== '#' && (
                                <a href={m.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
                                  <Globe size={14} />
                                </a>
                              )}
                              {m.linkedin && m.linkedin !== '#' && (
                                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700">
                                  <Linkedin size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* controls removed per request */}
                  </div>
                </motion.div>
              </div>
            </div>
          </RevealText>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3 — EVENT COORDINATORS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div>
          <RevealText>
            <div className="text-center mb-8">
              <SectionLabel color="from-red-100 to-rose-100 border-red-200 text-red-600">Faculty</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-display font-black mt-3">Event Coordinators</h2>
              <p className="text-gray-500 mt-2 text-sm">Guided by our faculty coordinators</p>
            </div>
          </RevealText>
          <div className="flex flex-wrap justify-center gap-8">
            {coordinators.map((coord, idx) => {
              const cc = coordColors[idx % coordColors.length];
              return (
                <RevealText key={coord.name} delay={0.12 * idx}>
                  <motion.div
                    className="relative w-72 bg-white rounded-[28px] shadow-xl overflow-hidden flex flex-col items-center border border-gray-100/80 px-6 pb-6 pt-4"
                    style={{ boxShadow: '0 8px 40px -10px rgba(0,0,0,0.12)' }}
                  >
                    {/* Decorative dot top-right */}
                    <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${cc.dot} opacity-70`}></div>

                    {/* Photo with pastel blob background */}
                    <div className="w-full flex justify-center pt-4 pb-3 px-6 relative">
                      {/* Soft blob behind photo */}
                      <div className={`absolute inset-4 rounded-full ${cc.blob} blur-xl opacity-60`}></div>
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0 z-10">
                        <img src={coord.img} alt={coord.name} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="text-center px-6 pb-0 w-full">
                      <p className={`text-[9px] font-extrabold uppercase tracking-[0.18em] ${cc.label} mb-0`}>{coord.role}</p>
                      <h3 className="text-[1rem] font-black text-slate-900 leading-tight mb-0">{coord.name}</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] leading-snug mb-0">{coord.subtitle}</p>
                    </div>

                    {/* Colored bottom strip */}
                    <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${cc.strip}`}></div>
                  </motion.div>
                </RevealText>
              );
            })}
          </div>
        </div>

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
            <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
              
              
            </div>
          </RevealText>
          <RevealText delay={0.1}>
            <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium px-2">
              The RR Group of Institutions, Lucknow proudly presents RRGI Innovathon 2026—the ultimate Pan-Lucknow Inter-College Hackathon powered by <a href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-amber-100 text-xs font-bold text-amber-700 shadow-sm">
                <img src="/ola.jpeg" alt="OLA KRUTRIM" className="w-5 h-5 rounded-sm object-contain" />
                <span className="hidden sm:inline">OLA KRUTRIM</span>
              </a> with <a href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-teal-100 text-xs font-bold text-teal-700 shadow-sm">
                <img src="/trainx.jpeg" alt="TrainX" className="w-5 h-5 rounded-sm object-contain" />
                <span className="hidden sm:inline">TrainX</span>
              </a> as strategic partner, designed for the visionaries of tomorrow. Whether you're an AI enthusiast, a web wizard, or a cybersecurity sentinel, this is your stage to build, compete, and innovate.
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
  const committee = [
    { name: "Shri Anil Agarwal", role: "Chief Patron", subtitle: "Chairman, RRGI", color: "border-blue-500", dot: "bg-blue-500", initials: "SC", img: "/chaiman.jpeg" },
    { name: "Mr. Chitranshu Agarwal", role: "Patron", subtitle: "Secretary, RRGI", color: "border-red-500", dot: "bg-red-500", initials: "CA", img: "/secretary.jpeg" },
    { name: "Dr. S. S. Chauhan", role: "Co-Patron", subtitle: "Director, RRIMT", color: "border-yellow-500", dot: "bg-yellow-500", initials: "CP", img: "/director.jpeg" },
    { name: "Ms. Aarti Jaiswal", role: "Event Chair", subtitle: "Dean Training & Placement, RRIMT", color: "border-green-500", dot: "bg-green-500", initials: "AJ", img: "/deant&p.jpeg" },
    { name: "Mr. Durgesh Verma", role: "Academic Advisor", subtitle: "Dean Academics, RRIMT", color: "border-blue-400", dot: "bg-blue-400", initials: "DV", img: "/dean.jpeg" },
    { name: "Mr. Vikash Singh", role: "Student Engagement Lead", subtitle: "Dean Student and Welfare, RRIMT", color: "border-purple-500", dot: "bg-purple-500", initials: "VS", img: "/dsw.jpeg" },
    { name: "Mr. Vijay Bahadur Singh", role: "Protocol & Discipline Lead", subtitle: "Chief Proctor, RRIMT", color: "border-orange-500", dot: "bg-orange-500", initials: "VB", img: "/proctor.jpeg" },
  ];

  const MemberCard = ({ member, idx, isLarge = false }) => (
    <RevealText key={idx} delay={0.05 * idx}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative bg-white rounded-[2.5rem] p-8 flex flex-col items-center text-center border-b-4 ${member.color} shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all overflow-hidden h-full group`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] -z-10 group-hover:bg-blue-50 transition-colors"></div>
        <div className={`absolute top-8 right-8 w-3 h-3 rounded-full ${member.dot} opacity-20`}></div>

        {/* Avatar Area - show image if available */}
          <div className="relative mb-6">
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center bg-gray-50 border-2 border-solid border-gray-200 group-hover:${member.color} transition-all duration-500 overflow-hidden`}>
            <div className="w-full h-full rounded-2xl flex items-center justify-center bg-white shadow-inner overflow-hidden">
              {member.img ? (
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-slate-800 opacity-20 group-hover:opacity-100 transition-opacity">
                  {member.initials}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-2">
          <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-blue-600 mb-2">{member.role}</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight mb-2 tracking-tight">
            {member.name}
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {member.subtitle}
          </p>
        </div>
      </motion.div>
    </RevealText>
  );

  const HorizontalProfileCard = ({ member, full = false }) => (
    <RevealText delay={0.05}>
      <motion.div
        whileHover={{ y: full ? 0 : -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`w-full ${full ? 'h-full min-h-screen' : ''} bg-white/95 rounded-[18px] ${full ? 'p-8 sm:p-12' : 'p-3 sm:p-4'} flex items-center gap-4 border border-gray-100 ${full ? 'shadow-xl' : 'shadow-md'} overflow-hidden`}
      >
        <div className={`${full ? 'flex-shrink-0 w-40 h-40 sm:w-56 sm:h-56' : 'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20'} rounded-lg overflow-hidden bg-gray-100`}>
          {member.img ? (
            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200"><span className="text-lg font-black text-gray-400">{member.initials}</span></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${full ? 'text-sm' : 'text-[10px]'} font-extrabold uppercase tracking-wide text-gray-500`}>{member.role}</p>
          <h3 className={`${full ? 'text-3xl sm:text-4xl' : 'text-lg'} font-black text-slate-800 truncate`}>{member.name}</h3>
          <p className={`${full ? 'text-base' : 'text-xs'} text-gray-400 truncate`}>{member.subtitle}</p>
        </div>
        <div className={`${full ? 'flex' : 'hidden sm:flex'} items-center justify-end text-right ml-4`}>
          <a href="#team" className="text-sm font-semibold text-blue-600 hover:underline">Contact</a>
        </div>
      </motion.div>
    </RevealText>
  );

  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-transparent" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20">
          <RevealText>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Users size={14} /> Team Behind Innovation
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black mb-6 tracking-tighter text-slate-900">
              Core  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Organizing Committee</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg">
              The visionaries and mentors driving the spirit of innovation at RRGI.
            </p>
          </RevealText>
        </div>

        {/* Top label above tiles */}
        <div className="flex justify-center mb-6">
          <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-gray-600 px-4 py-2 rounded-full bg-white/70 border border-gray-200 shadow-sm">
            CORE ORGANIZING COMMITTEE
          </span>
        </div>

        {/* Row 1: 3 Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-6 sm:mb-16">
          {committee.slice(0, 3).map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </div>

        {/* Mobile: show toggle for more members */}
        <div className="flex justify-center sm:hidden mb-6">
          <button onClick={() => setShowAll(s => !s)} className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/90 border border-gray-200 shadow-sm font-bold">
            {showAll ? 'See Less' : 'Show More'}
            <ChevronDown size={16} className={`ml-2 transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Row 2: 4 Members (hidden on mobile unless toggled) */}
        <div className={`${showAll ? 'grid' : 'hidden sm:grid'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-16`}>
          {committee.slice(3, 7).map((member, idx) => (
            <MemberCard key={idx + 3} member={member} idx={idx + 3} />
          ))}
        </div>

        {/* Event Coordinator horizontal tile removed */}

      </div>

      {/* Full-screen Event Coordinator Tile removed */}
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
        { time: '10:30 AM', title: 'Inaugural Session & PS ID Announcement', duration: '1 hr', icon: <Mic size={22} />, desc: 'Welcome address, rules briefing, sponsor highlights, and the official reveal of problem statements. Teams select their challenge!', category: 'Ceremony' },
        { time: '11:30 AM', title: 'Brainstorming & PPT Preparation', duration: '2 hrs', icon: <Presentation size={22} />, desc: 'Teams dive deep into research, strategise their approach, and craft presentation decks. Mentors are available for guidance.', category: 'Hacking' },
        { time: '01:30 PM', title: 'Break', duration: '1 hr', icon: <Utensils size={22} />, desc: 'Take a well-deserved break! Grab snacks and refreshments, network with fellow participants, and clear your mind.', category: 'Break' },
        { time: '02:30 PM', title: 'PPT Documentation & Idea Submission', duration: '1.5 hrs', icon: <Award size={22} />, desc: 'Teams finalize their documentation and submit their initial ideas and presentation to the panel.', category: 'Evaluation' },
        { time: '04:00 PM', title: 'Group Photo & Wrap-up', duration: '30 min', icon: <PartyPopper size={22} />, desc: 'End the day with a group photo of all participants, organisers, and judges. See you tomorrow!', category: 'Closing' },
      ]
    },
    {
      label: 'Day 2',
      date: '17 April',
      tagline: 'Build & Iterate',
      color: 'purple',
      events: [
        { time: '10:00 AM', title: 'Arrival & Setup (Shortlisted Teams)', duration: '30 min', icon: <UserPlus size={22} />, desc: 'Teams shortlisted from Day 1 report back. Power up your laptops, grab a coffee, and prepare for an intense day of coding.', category: 'Check-in' },
        { time: '10:30 AM', title: 'Core Prototype Building', duration: '2 hrs', icon: <Hammer size={22} />, desc: 'The main development window! Teams start building their models, creating the UI, and developing the core functionality of their projects.', category: 'Hacking' },
        { time: '12:30 PM', title: 'Break', duration: '1 hr', icon: <Utensils size={22} />, desc: 'Take a breather to refuel. A perfect time to stretch your legs, eat, and discuss technical roadblocks with peers.', category: 'Meal' },
        { time: '01:30 PM', title: 'Mentorship & Progress Check', duration: '30 min', icon: <Users size={22} />, desc: 'Mentors visit each team to review architectural choices, resolve technical bugs, and ensure the project is on the right track.', category: 'Mentoring' },
        { time: '02:00 PM', title: 'Final Sprint & Deployment', duration: '2 hrs', icon: <Rocket size={22} />, desc: 'The final stretch. Teams fix last-minute bugs, polish the UI, and begin deploying their projects to live hosting services.', category: 'Hacking' },
        { time: '04:00 PM', title: 'Wrap-up for the Day', duration: '30 min', icon: <Code size={22} />, desc: 'Pack up and consolidate your work. Prepare for the final submissions.', category: 'Prep' },
        { time: '05:00 PM', title: 'Documentation & Submission', duration: '30 min', icon: <Globe size={22} />, desc: 'All coding stops! Teams submit their final GitHub repository links and live website URLs to the portal. Day 2 wraps up!', category: 'Submission' },
      ]
    },
    {
      label: 'Day 3',
      date: '18 April',
      tagline: 'Win & Celebrate',
      color: 'orange',
      events: [
        { time: '10:00 AM', title: 'Arrival & Check-in', duration: '30 min', icon: <UserPlus size={22} />, desc: 'Teams arrive and set up their final demos. This is the time for last-minute health checks on live links before facing the jury.', category: 'Preparation' },
        { time: '10:30 AM', title: 'Guest Session (Industry & Hiring Insights)', duration: '1 hr', icon: <Mic size={22} />, desc: 'Sit back and get inspired! Industry leaders share their insights into tech trends, hiring, and building a great career.', category: 'Guest Session' },
        { time: '11:30 AM', title: 'Final Preparation', duration: '30 min', icon: <Hammer size={22} />, desc: 'Final chance to polish your presentations and make sure your live models are ready for the ultimate showcase.', category: 'Preparation' },
        { time: '12:00 PM', title: 'Presentation Session – 01', duration: '2 hrs', icon: <Presentation size={22} />, desc: 'The first batch of teams present their fully functioning applications and models to the expert judging panel.', category: 'Judging' },
        { time: '02:00 PM', title: 'Break', duration: '30 min', icon: <Utensils size={22} />, desc: 'Take a short break before the second half of the presentations.', category: 'Meal' },
        { time: '02:30 PM', title: 'Presentation Session – 02', duration: '2 hrs', icon: <Presentation size={22} />, desc: 'The second batch of teams get to impress the judges with their technical depth and creativity.', category: 'Judging' },
        { time: '04:30 PM', title: 'Prize Distribution & Certification', duration: '30 min', icon: <PartyPopper size={22} />, desc: 'The moment of truth! Announcement of winners, domain-specific prizes, and certificate distribution for all participants.', category: 'Ceremony' },
      ]
    }
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', dot: 'bg-blue-500', line: 'bg-blue-300', tab: 'bg-blue-500', tabHover: 'hover:bg-blue-50', badge: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', dot: 'bg-purple-500', line: 'bg-purple-300', tab: 'bg-purple-500', tabHover: 'hover:bg-purple-50', badge: 'bg-purple-100 text-purple-700', iconBg: 'bg-purple-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', dot: 'bg-orange-500', line: 'bg-orange-300', tab: 'bg-orange-500', tabHover: 'hover:bg-orange-50', badge: 'bg-orange-100 text-orange-700', iconBg: 'bg-orange-100' },
  };

  const categoryColorMap = {
    'Registration': { cardBg: 'bg-blue-50/80', border: 'border-blue-300', text: 'text-blue-600', dot: 'bg-blue-500', line: 'bg-blue-300', badge: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-100', navBorder: 'border-blue-300', navText: 'text-blue-600', navHover: 'hover:bg-blue-50' },
    'Ceremony': { cardBg: 'bg-indigo-50/80', border: 'border-indigo-300', text: 'text-indigo-600', dot: 'bg-indigo-500', line: 'bg-indigo-300', badge: 'bg-indigo-100 text-indigo-700', iconBg: 'bg-indigo-100', navBorder: 'border-indigo-300', navText: 'text-indigo-600', navHover: 'hover:bg-indigo-50' },
    'Hacking': { cardBg: 'bg-violet-50/80', border: 'border-violet-300', text: 'text-violet-600', dot: 'bg-violet-500', line: 'bg-violet-300', badge: 'bg-violet-100 text-violet-700', iconBg: 'bg-violet-100', navBorder: 'border-violet-300', navText: 'text-violet-600', navHover: 'hover:bg-violet-50' },
    'Break': { cardBg: 'bg-green-50/80', border: 'border-green-300', text: 'text-green-600', dot: 'bg-green-500', line: 'bg-green-300', badge: 'bg-green-100 text-green-700', iconBg: 'bg-green-100', navBorder: 'border-green-300', navText: 'text-green-600', navHover: 'hover:bg-green-50' },
    'Evaluation': { cardBg: 'bg-amber-50/80', border: 'border-amber-300', text: 'text-amber-600', dot: 'bg-amber-500', line: 'bg-amber-300', badge: 'bg-amber-100 text-amber-700', iconBg: 'bg-amber-100', navBorder: 'border-amber-300', navText: 'text-amber-600', navHover: 'hover:bg-amber-50' },
    'Closing': { cardBg: 'bg-rose-50/80', border: 'border-rose-300', text: 'text-rose-600', dot: 'bg-rose-500', line: 'bg-rose-300', badge: 'bg-rose-100 text-rose-700', iconBg: 'bg-rose-100', navBorder: 'border-rose-300', navText: 'text-rose-600', navHover: 'hover:bg-rose-50' },
    'Check-in': { cardBg: 'bg-cyan-50/80', border: 'border-cyan-300', text: 'text-cyan-600', dot: 'bg-cyan-500', line: 'bg-cyan-300', badge: 'bg-cyan-100 text-cyan-700', iconBg: 'bg-cyan-100', navBorder: 'border-cyan-300', navText: 'text-cyan-600', navHover: 'hover:bg-cyan-50' },
    'Meal': { cardBg: 'bg-lime-50/80', border: 'border-lime-300', text: 'text-lime-600', dot: 'bg-lime-500', line: 'bg-lime-300', badge: 'bg-lime-100 text-lime-700', iconBg: 'bg-lime-100', navBorder: 'border-lime-300', navText: 'text-lime-600', navHover: 'hover:bg-lime-50' },
    'Mentoring': { cardBg: 'bg-teal-50/80', border: 'border-teal-300', text: 'text-teal-600', dot: 'bg-teal-500', line: 'bg-teal-300', badge: 'bg-teal-100 text-teal-700', iconBg: 'bg-teal-100', navBorder: 'border-teal-300', navText: 'text-teal-600', navHover: 'hover:bg-teal-50' },
    'Prep': { cardBg: 'bg-slate-50/80', border: 'border-slate-300', text: 'text-slate-600', dot: 'bg-slate-500', line: 'bg-slate-300', badge: 'bg-slate-100 text-slate-700', iconBg: 'bg-slate-100', navBorder: 'border-slate-300', navText: 'text-slate-600', navHover: 'hover:bg-slate-50' },
    'Submission': { cardBg: 'bg-fuchsia-50/80', border: 'border-fuchsia-300', text: 'text-fuchsia-600', dot: 'bg-fuchsia-500', line: 'bg-fuchsia-300', badge: 'bg-fuchsia-100 text-fuchsia-700', iconBg: 'bg-fuchsia-100', navBorder: 'border-fuchsia-300', navText: 'text-fuchsia-600', navHover: 'hover:bg-fuchsia-50' },
    'Guest Session': { cardBg: 'bg-pink-50/80', border: 'border-pink-300', text: 'text-pink-600', dot: 'bg-pink-500', line: 'bg-pink-300', badge: 'bg-pink-100 text-pink-700', iconBg: 'bg-pink-100', navBorder: 'border-pink-300', navText: 'text-pink-600', navHover: 'hover:bg-pink-50' },
    'Preparation': { cardBg: 'bg-sky-50/80', border: 'border-sky-300', text: 'text-sky-600', dot: 'bg-sky-500', line: 'bg-sky-300', badge: 'bg-sky-100 text-sky-700', iconBg: 'bg-sky-100', navBorder: 'border-sky-300', navText: 'text-sky-600', navHover: 'hover:bg-sky-50' },
    'Judging': { cardBg: 'bg-orange-50/80', border: 'border-orange-300', text: 'text-orange-600', dot: 'bg-orange-500', line: 'bg-orange-300', badge: 'bg-orange-100 text-orange-700', iconBg: 'bg-orange-100', navBorder: 'border-orange-300', navText: 'text-orange-600', navHover: 'hover:bg-orange-50' },
    'Wrap-up': { cardBg: 'bg-emerald-50/80', border: 'border-emerald-300', text: 'text-emerald-600', dot: 'bg-emerald-500', line: 'bg-emerald-300', badge: 'bg-emerald-100 text-emerald-700', iconBg: 'bg-emerald-100', navBorder: 'border-emerald-300', navText: 'text-emerald-600', navHover: 'hover:bg-emerald-50' },
    'Ceremony': { cardBg: 'bg-indigo-50/80', border: 'border-indigo-300', text: 'text-indigo-600', dot: 'bg-indigo-500', line: 'bg-indigo-300', badge: 'bg-indigo-100 text-indigo-700', iconBg: 'bg-indigo-100', navBorder: 'border-indigo-300', navText: 'text-indigo-600', navHover: 'hover:bg-indigo-50' },
  };

  const currentDay = days[activeDay];
  const colors = colorMap[currentDay.color];
  const currentEvent = currentDay.events[activeEvent];
  const eventColors = categoryColorMap[currentEvent.category] || categoryColorMap['Registration'];

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
              className={`rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-10 border-2 ${eventColors.border} ${eventColors.cardBg} backdrop-blur-md shadow-lg relative overflow-hidden flex flex-col justify-between h-max`}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-[2rem]"></div>
              {/* Corner dot */}
              <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${eventColors.dot}`}></div>

              <div className="relative z-10">
                {/* Category + Day badge */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-extrabold tracking-[0.15em] uppercase ${eventColors.badge} border ${eventColors.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${eventColors.dot}`}></span>
                    {currentEvent.category}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-extrabold tracking-[0.15em] uppercase bg-white/60 text-gray-600 border border-gray-200`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    {currentDay.label}
                  </span>
                </div>

                {/* Icon + Title Row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${eventColors.iconBg} flex items-center justify-center ${eventColors.text} shadow-sm border border-white/80 flex-shrink-0`}>
                    {currentEvent.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-extrabold tracking-[0.2em] uppercase ${eventColors.text} mb-1`}>{currentEvent.time}</p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-800 tracking-tight leading-tight">
                      {currentEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-px flex-1 ${eventColors.line} opacity-30`}></div>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-extrabold tracking-[0.15em] uppercase ${eventColors.badge} border ${eventColors.border}`}>
                    <Clock size={10} className="inline mr-1 -mt-0.5" />{currentEvent.duration}
                  </span>
                  <div className={`h-px flex-1 ${eventColors.line} opacity-30`}></div>
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
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : `${eventColors.navBorder} ${eventColors.navText} ${eventColors.navHover} hover:shadow-sm`
                      }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveEvent(Math.min(currentDay.events.length - 1, activeEvent + 1))}
                    disabled={activeEvent === currentDay.events.length - 1}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${activeEvent === currentDay.events.length - 1
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : `${eventColors.navBorder} ${eventColors.navText} ${eventColors.navHover} hover:shadow-sm`
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
            <div className="flex items-center gap-1 mb-3 sm:mb-4">

              <div className="font-display font-black text-2xl sm:text-3xl tracking-tighter z-10" style={{ letterSpacing: '-0.03em' }}>
                <span className="text-red-600">RRGI</span> <span className="text-slate-800">Innovathon</span>
              </div>
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
            <div className="block w-full h-48 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.43633215273!2d80.91549957591605!3d27.01247575560882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995173007f27d5%3A0xd8e0f9e0017ddd9!2sR.R.%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1712561500000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1)' }}
                allowFullScreen=""
                loading="lazy"
                title="Mini Map"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/d8e0f9e0017ddd9"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
              >
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <MapPin size={16} className="text-red-500" />
                </div>
              </a>
            </div>
            <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wide">RRGI Campus, Lucknow</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#hero" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#themes" className="hover:text-blue-500 transition-colors">Themes</a>
            <a href="#prizes" className="hover:text-blue-500 transition-colors">Prizes</a>
            <a href="#faq" className="hover:text-blue-500 transition-colors">FAQs</a>
            <a href="#location" className="hover:text-blue-500 transition-colors">Location</a>
            <a href="https://forms.gle/aWXrC9w6FwURfLDJ9" target="_blank" rel="noopener noreferrer" className="text-red-500/80 hover:text-red-600 transition-colors">Register</a>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
            </div>
            <p>© 2026 RRGI Innovathon · T&P RRIMT</p>
          </div>
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
        <StudentOrganizersSection />

        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;





