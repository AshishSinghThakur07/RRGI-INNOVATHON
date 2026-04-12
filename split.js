const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf-8');

const components = [
  'FloatingShape',
  'RevealText',
  'Navbar',
  'TimerCard',
  'CursorSparkle',
  'HeroSection',
  'AboutSection',
  'FeaturesSection',
  'PrizeSection',
  'ThemesSection',
  'FaqSection',
  'EventTimelineSection',
  'Footer',
  'MeshNetwork',
  'BackgroundGrid',
  'useVanillaAnimations'
];

let appFile = file;

// General imports we just throw at the top of everything
const imports = `import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { 
  Users, Zap, Trophy, ChevronDown, Rocket, 
  MapPin, Calendar, Clock, ArrowRight, Instagram, Linkedin, Twitter, Globe, Info, Gift, Lightbulb, UserPlus, Fingerprint, Code, Smartphone,
  Coffee, Utensils, Mic, Play, Pause, Award, PartyPopper, Sun, Moon, Sunrise, ChevronLeft, ChevronRight, Hammer, Presentation, MessageSquare, Star
} from 'lucide-react';
`;

for (const comp of components) {
  // Find start
  const startRegex = new RegExp(`const ${comp} =.*?=>\\s*{`, 's');
  let match = startRegex.exec(appFile);
  if (!match) {
    const startRegex2 = new RegExp(`const ${comp} =.*?\\(.*?\\).*?=>\\s*\\(`, 's');
    match = startRegex2.exec(appFile);
  }
  
  if (!match) continue;
  
  let startIndex = match.index;
  let bracketCount = 0;
  let endIndex = -1;
  let isArrowFuncExpr = appFile[startIndex + match[0].length - 1] === '(';
  if(isArrowFuncExpr){
     // looking for closing ')'
     for (let i = startIndex + match[0].length - 1; i < appFile.length; i++) {
        if (appFile[i] === '(') bracketCount++;
        if (appFile[i] === ')') bracketCount--;
        if (bracketCount === 0) {
           endIndex = i;
           if (appFile[i+1] === ';') endIndex++;
           break;
        }
     }
  } else {
     // looking for closing '}'
     for (let i = startIndex + match[0].length - 1; i < appFile.length; i++) {
        if (appFile[i] === '{') bracketCount++;
        if (appFile[i] === '}') bracketCount--;
        if (bracketCount === 0) {
           endIndex = i;
           if (appFile[i+1] === ';') endIndex++;
           break;
        }
     }
  }

  if (endIndex !== -1) {
    const code = appFile.substring(startIndex, endIndex + 1);
    
    // figure out which other components this uses to add to imports
    let localImports = '';
    for(const other of components) {
       if (other !== comp && code.includes(other)) {
          localImports += `import { ${other} } from './${other}';\n`;
       }
    }
    
    let content = imports + localImports + '\n' + code + `\n\nexport { ${comp} };\n`;
    fs.writeFileSync(path.join(__dirname, `src/components/${comp}.jsx`), content);
    
    // replace in App
    appFile = appFile.substring(0, startIndex) + `// Moved ${comp}` + appFile.substring(endIndex + 1);
  }
}

// Ensure App.jsx imports components
let appImports = '';
for(const comp of components) {
   appImports += `import { ${comp} } from './components/${comp}';\n`;
}

// Replace the old imports section in App.jsx (up to Custom Components)
appFile = appImports + '\n' + appFile;
fs.writeFileSync(path.join(__dirname, 'src/App.jsx'), appFile);
console.log('Done!');
