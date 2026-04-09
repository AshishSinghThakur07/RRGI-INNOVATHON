const fs = require('fs');

const appJsx = fs.readFileSync('src/App.jsx', 'utf-8');
const lines = appJsx.split('\n');

const getLines = (start, end) => lines.slice(start - 1, end).join('\n');

const makeDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };
makeDir('src/components');
makeDir('src/sections');

// Extracts
const floatingShape = getLines(15, 33);
const floatingCircuit = getLines(35, 54);
const revealText = getLines(56, 66);
let navbar = getLines(68, 93);
const timerCard = getLines(95, 191);
const heroSection = getLines(193, 333);
const aboutSection = getLines(335, 387);
const featuresSection = getLines(389, 498);
const scratchCardPrize = getLines(500, 816);
const prizeSection = getLines(818, 909);
const themesSection = getLines(911, 979);
const faqSection = getLines(981, 1071);
let teamSection = getLines(1073, 1199);
const eventTimelineSection = getLines(1201, 1458);
const footer = getLines(1460, 1539);
const meshNetwork = getLines(1541, 1660);
const cursorSparkle = getLines(1662, 1809);
const backgroundGrid = getLines(1811, 1816);
const useVanillaAnimations = getLines(1818, 1860);

// Enhancements
navbar = navbar.replace(
  '<a href="#themes" className="hover:text-blue-500 transition-colors">Themes</a>',
  '<a href="#themes" className="hover:text-blue-500 transition-colors">Themes</a>\n          <a href="#timeline" className="hover:text-blue-500 transition-colors">Timeline</a>\n          <a href="#team" className="hover:text-blue-500 transition-colors">Team</a>'
);
teamSection = teamSection.replace(
  '<a key={i} href="#" className="w-8 h-8',
  '<a key={i} href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8'
);

// File writers
const writeFile = (path, content) => fs.writeFileSync(path, content, 'utf-8');

// UI.jsx
writeFile('src/components/UI.jsx', `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Gift } from 'lucide-react';

${floatingShape.replace('const FloatingShape', 'export const FloatingShape')}
${floatingCircuit.replace('const FloatingCircuit', 'export const FloatingCircuit')}
${revealText.replace('const RevealText', 'export const RevealText')}
${timerCard.replace('const TimerCard', 'export const TimerCard')}
${scratchCardPrize.replace('const ScratchCardPrize', 'export const ScratchCardPrize')}
`);

// Layout.jsx
writeFile('src/components/Layout.jsx', `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Twitter, Globe, Info, MapPin } from 'lucide-react';

${navbar.replace('const Navbar', 'export const Navbar')}
${footer.replace('const Footer', 'export const Footer')}
`);

// Effects.jsx
writeFile('src/components/Effects.jsx', `import React, { useRef, useEffect } from 'react';

${meshNetwork.replace('const MeshNetwork', 'export const MeshNetwork')}
${cursorSparkle.replace('const CursorSparkle', 'export const CursorSparkle')}
${backgroundGrid.replace('const BackgroundGrid', 'export const BackgroundGrid')}
${useVanillaAnimations.replace('const useVanillaAnimations', 'export const useVanillaAnimations')}
`);

// Sections
writeFile('src/sections/HeroSection.jsx', `import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Info, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { FloatingShape, FloatingCircuit, RevealText, TimerCard } from '../components/UI';

${heroSection.replace('const HeroSection', 'export const HeroSection')}
`);

writeFile('src/sections/AboutSection.jsx', `import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { RevealText } from '../components/UI';

${aboutSection.replace('const AboutSection', 'export const AboutSection')}
`);

writeFile('src/sections/FeaturesSection.jsx', `import React from 'react';
import { motion } from 'framer-motion';
import { FloatingShape, FloatingCircuit, RevealText } from '../components/UI';

${featuresSection.replace('const FeaturesSection', 'export const FeaturesSection')}
`);

writeFile('src/sections/PrizeSection.jsx', `import React from 'react';
import { motion } from 'framer-motion';
import { FloatingShape, RevealText, ScratchCardPrize } from '../components/UI';

${prizeSection.replace('const PrizeSection', 'export const PrizeSection')}
`);

writeFile('src/sections/ThemesSection.jsx', `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Fingerprint, Code, Smartphone, Globe } from 'lucide-react';
import { FloatingShape, RevealText } from '../components/UI';

${themesSection.replace('const ThemesSection', 'export const ThemesSection')}
`);

writeFile('src/sections/FaqSection.jsx', `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText } from '../components/UI';

${faqSection.replace('const faqColors', 'export const faqColors').replace('const FaqSection', 'export const FaqSection')}
`);

writeFile('src/sections/TeamSection.jsx', `import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { FloatingShape, RevealText } from '../components/UI';

${teamSection.replace('const TeamSection', 'export const TeamSection')}
`);

writeFile('src/sections/EventTimelineSection.jsx', `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mic, Presentation, Utensils, Award, PartyPopper, Hammer, Users, Rocket, Code, Globe, Gift, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloatingShape, RevealText } from '../components/UI';

${eventTimelineSection.replace('const EventTimelineSection', 'export const EventTimelineSection')}
`);

// App.jsx
writeFile('src/App.jsx', `import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BackgroundGrid, CursorSparkle, useVanillaAnimations } from './components/Effects';
import { Navbar, Footer } from './components/Layout';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { PrizeSection } from './sections/PrizeSection';
import { ThemesSection } from './sections/ThemesSection';
import { EventTimelineSection } from './sections/EventTimelineSection';
import { TeamSection } from './sections/TeamSection';
import { FaqSection } from './sections/FaqSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useVanillaAnimations();

  useEffect(() => {
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
`);

console.log('Refactoring complete!');
