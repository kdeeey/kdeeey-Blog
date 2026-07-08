// All user-facing copy lives here. Components never hardcode text.
export type Lang = "en" | "fr";

// ── Translation shape ────────────────────────────────────────────────
// Every leaf is `string` or `string[]` so both EN and FR satisfy the
// same structural type — no literal-type mismatch.

interface PortfolioRow { pre: string; cat: string; sub: string }

interface ProjectItem { title: string; desc: string; tags: string[] }

interface CtfEntry { title: string; xp: string; desc: string; tags: string[] }

interface HackathonEntry {
  badge: string; title: string; date: string; desc: string;
  quote?: string; team?: string; organizer?: string; tags: string[];
}

interface CertEntry { title: string; issuer: string; tags: string[] }

export interface Translation {
  home: {
    title: string; subtitle: string; hud: string;
    aboutLabel: string; portfolioLabel: string; contactLabel: string;
  };
  loading: { label: string; skip: string };
  nav: {
    navigate: string; home: string; about: string; portfolio: string;
    ctf: string; contact: string; replay: string;
    dark: string; light: string; sfxOn: string; sfxOff: string;
  };
  about: {
    badgeProfile: string; badgeLvl: string; badgeClass: string;
    badgeGuild: string; bubble: string; name: string;
    lvl: string; age: string; clazz: string; guild: string;
    specialty: string; specialties: string[];
    currentQuest: string; questText: string;
    guildAffiliation: string; uemfName: string; uemfProg: string;
    downloadCV: string;
  };
  portfolio: {
    questLog: string; selectCategory: string;
    rows: {
      projects: PortfolioRow; internships: PortfolioRow; ctf: PortfolioRow;
      hackathons: PortfolioRow; certificates: PortfolioRow; htb: PortfolioRow;
    };
  };
  projects: {
    title: string; teamProject: string;
    items: {
      nood: ProjectItem; malware: ProjectItem;
      campusops: ProjectItem; satellite: ProjectItem;
    };
  };
  internships: {
    title: string; sub: string; projectsHdr: string; handsOnLab: string;
    m1337: {
      title: string; role: string; desc: string; tags: string[];
      adLab: { title: string; writeup: string };
      rag: { title: string; desc: string };
    };
    dgi: {
      title: string; role: string; desc: string; tags: string[];
      tax: { title: string };
    };
  };
  ctf: {
    title: string;
    inpt: CtfEntry; ensi: CtfEntry; htb: CtfEntry;
  };
  hackathons: {
    title: string; sub: string;
    actinspace: HackathonEntry; hackdays: HackathonEntry; forum: HackathonEntry;
  };
  certificates: {
    title: string;
    aws: CertEntry; cpts: CertEntry;
    locked: string; comingSoon: string;
  };
  htb: {
    title: string; sub: string; machine: string;
    difficulty: string; viewWriteup: string; locked: string;
  };
  contact: {
    handle: string; sendRaven: string;
    bubbles: {
      default: string[];
      linkedin: string; github: string; tryhackme: string;
      mail: string; x: string; discord: string;
      ctftime: string; seeYou: string;
    };
  };
  common: {
    back: string; backPortfolio: string; viewRepo: string;
    writeupSoon: string; githubSoon: string;
    completed: string; upcoming: string; inProgress: string;
    inPrep: string; participated: string;
    noImage: string; comingSoon: string;
  };
}

// ── Translations data ────────────────────────────────────────────────

export const translations: Record<Lang, Translation> = {
  en: {
    home: {
      title: "KARIMA ED DAHHAK",
      subtitle: "START BY WALKING OVER DESIRED GAME MODE OR CLICK",
      hud: "WASD / ARROWS · MOVE\nK · ATTACK",
      aboutLabel: "About Me",
      portfolioLabel: "Portfolio",
      contactLabel: "Contact Me",
    },
    loading: {
      label: "LOADING",
      skip: "CLICK TO SKIP",
    },
    nav: {
      navigate: "navigate",
      home: "HOME",
      about: "ABOUT ME",
      portfolio: "PORTFOLIO",
      ctf: "CTF LOG",
      contact: "CONTACT ME",
      replay: "REPLAY INTRO",
      dark: "DARK MODE",
      light: "LIGHT MODE",
      sfxOn: "SFX: ON",
      sfxOff: "SFX: OFF",
    },
    about: {
      badgeProfile: "PLAYER PROFILE",
      badgeLvl: "LVL 1",
      badgeClass: "CLASS: CYBERSEC",
      badgeGuild: "GUILD: UEMF",
      bubble: "WHO AM I?",
      name: "KARIMA ED DAHHAK",
      lvl: "LVL",
      age: "AGE",
      clazz: "CLASS",
      guild: "GUILD",
      specialty: "SPECIALTY:",
      specialties: [
        "OFFENSIVE SECURITY",
        "AI SECURITY",
        "HANDS-ON LABS",
      ],
      currentQuest: "CURRENT QUEST:",
      questText: "BREAKING THINGS TO LEARN HOW TO DEFEND THEM.",
      guildAffiliation: "GUILD AFFILIATION",
      uemfName: "EURO-MEDITERRANEAN UNIVERSITY OF FES",
      uemfProg: "CYBERSECURITY ENGINEERING",
      downloadCV: "DOWNLOAD CV",
    },
    portfolio: {
      questLog: "QUEST LOG",
      selectCategory: "SELECT A CATEGORY",
      rows: {
        projects: { pre: "CRAFTED ITEMS", cat: "PROJECTS", sub: "4 ITEMS FORGED" },
        internships: { pre: "SIDE QUESTS", cat: "INTERNSHIPS", sub: "2 QUESTS · SUMMER 2026" },
        ctf: { pre: "COMPETITIVE MODE", cat: "CTF", sub: "3 QUESTS COMPLETED" },
        hackathons: { pre: "BOSS BATTLES", cat: "HACKATHONS", sub: "3 BATTLES FOUGHT" },
        certificates: { pre: "ACHIEVEMENTS UNLOCKED", cat: "CERTIFICATES", sub: "1 UNLOCKED · 1 IN PREPARATION" },
        htb: { pre: "TRAINING GROUNDS", cat: "HTB LABS", sub: "WRITEUPS COMING SOON" },
      },
    },
    projects: {
      title: "CRAFTED ITEMS · PROJECTS",
      teamProject: "TEAM PROJECT",
      items: {
        nood: {
          title: "NOOD · AI COMMUNICATION COACH",
          desc: "AI-powered coaching platform that analyzes speech and body language to help users improve communication skills.",
          tags: ["JavaScript", "AI", "Electron", "React", "TypeScript"],
        },
        malware: {
          title: "MALWARE FEATURES EXTRACTION",
          desc: "C++ tool that extracts Windows PE file features for machine-learning-based malware detection.",
          tags: ["C++", "Windows PE", "Malware Analysis"],
        },
        campusops: {
          title: "CAMPUSOPS",
          desc: "Campus management platform featuring role-based access control, attendance management, and academic services.",
          tags: ["TypeScript", "fork · team"],
        },
        satellite: {
          title: "SATELLITE PROTECTION (ASTRAEA)",
          desc: "AI-based cyberattack detection system for satellites using Isolation Forest and LSTM models.",
          tags: ["Python", "Machine Learning", "fork · team"],
        },
      },
    },
    internships: {
      title: "SIDE QUESTS · INTERNSHIPS",
      sub: "REAL WORLD XP · SUMMER 2026",
      projectsHdr: "PROJECTS",
      handsOnLab: "HANDS-ON LAB",
      m1337: {
        title: "1337 KHOURIBGA",
        role: "Offensive Security Intern · Summer 2026",
        desc: "Built and attacked realistic lab environments to practice offensive security hands-on.",
        tags: ["Windows Server", "Kali Linux", "Wireshark", "Python", "LLMs", "AI Security"],
        adLab: { title: "AD & KERBEROS ATTACK LAB", writeup: "DOWNLOAD WRITEUP" },
        rag: {
          title: "DAMN VULNERABLE RAG",
          desc: "A deliberately vulnerable RAG assistant for learning prompt injection attacks, defenses, and secure AI architecture. Built locally with Ollama + ChromaDB + Streamlit.",
        },
      },
      dgi: {
        title: "DGI RABAT",
        role: "AI & Cybersecurity Engineering Intern · August 2026",
        desc: "General Directorate of Taxes (DGI) — Predicting tax audit risk and estimating tax fraud amounts using deep learning.",
        tags: ["Deep Learning", "Python", "Data Analysis", "Fraud Detection"],
        tax: { title: "TAX FRAUD · DEEP LEARNING" },
      },
    },
    ctf: {
      title: "COMPETITIVE MODE · CTF",
      inpt: {
        title: "INPT CTF", xp: "+250 XP",
        desc: "Challenges across web security, cryptography, reverse engineering, forensics, and OSINT.",
        tags: ["WEB", "CRYPTO", "REV", "FORENSICS", "OSINT"],
      },
      ensi: {
        title: "ENSI CTF", xp: "+250 XP",
        desc: "Beginner and intermediate cybersecurity challenges, solved in a competitive team environment.",
        tags: ["TEAM PLAY", "MIXED CHALLENGES"],
      },
      htb: {
        title: "HACK THE BOX", xp: "+500 XP",
        desc: "Offensive security challenges involving exploitation, privilege escalation, and enumeration.",
        tags: ["EXPLOITATION", "PRIVESC", "ENUMERATION"],
      },
    },
    hackathons: {
      title: "BOSS BATTLES · HACKATHONS",
      sub: "INTENSIVE MODE · 48H SPRINTS",
      actinspace: {
        badge: "FIRST HACKATHON", title: "ACT IN SPACE", date: "2026",
        desc: "ASTRAEA — autonomous cybersecurity for satellites. On-board threat detection without ground control dependency.",
        quote: "WINNING WASN'T THE LESSON. LEARNING HOW TO THINK UNDER PRESSURE WAS.",
        team: "Team: Aya Driouche, Salma El Messaoudi",
        tags: ["SATELLITE", "CYBERSECURITY", "AI"],
      },
      hackdays: {
        badge: "REGIONAL BOOTCAMP", title: "HACK'DAYS UEMF", date: "APRIL 16-17, 2026",
        desc: "48h innovation sprint at Euromed Innovation Center. Built NOOD — AI-powered public speaking coach.",
        organizer: "Organizer: EIC × TAMWILCOM × BlueSpace (Bank Of Africa)",
        tags: ["AI", "ENTREPRENEURSHIP", "PUBLIC SPEAKING"],
      },
      forum: {
        badge: "SHOWCASE", title: "1ST REGIONAL EMPLOYMENT FORUM", date: "2026 · FÈS CONGRESS PALACE",
        desc: "Presented NOOD AI, our AI-powered public speaking coach, alongside startups and innovators from across the Fès–Meknès region. Showcased our solution and exchanged ideas with professionals and entrepreneurs.",
        tags: ["AI", "ENTREPRENEURSHIP", "PUBLIC SPEAKING"],
      },
    },
    certificates: {
      title: "ACHIEVEMENTS UNLOCKED · CERTIFICATES",
      aws: { title: "AWS CLOUD PRACTITIONER ESSENTIALS", issuer: "Amazon Web Services (AWS)", tags: ["Cloud Computing", "April 2026"] },
      cpts: { title: "CPTS · CERTIFIED PENETRATION TESTING SPECIALIST", issuer: "Hack The Box", tags: ["Penetration Testing", "Offensive Security"] },
      locked: "???",
      comingSoon: "COMING SOON",
    },
    htb: {
      title: "TRAINING GROUNDS · HTB LABS", sub: "PRACTICE MAKES PERFECT",
      machine: "MACHINE", difficulty: "DIFFICULTY", viewWriteup: "VIEW WRITEUP", locked: "???",
    },
    contact: {
      handle: "@kdeeey",
      sendRaven: "SEND A RAVEN",
      bubbles: {
        default: [
          "WANT TO TEAM UP?", "CLICK A LINK TO CONNECT!", "I DON'T BITE... MUCH.",
          "FIND ME ON CTFTIME!", "SEND ME A MESSAGE SCROLL!", "JOIN MY PARTY?",
        ],
        linkedin: "LET'S NETWORK!", github: "CHECK MY CODE!", tryhackme: "HACK TOGETHER?",
        mail: "SEND ME A MESSAGE!", x: "FOLLOW ME!", discord: "JOIN MY SERVER!",
        ctftime: "CAPTURE THE FLAG!", seeYou: "SEE YOU THERE!",
      },
    },
    common: {
      back: "BACK", backPortfolio: "BACK TO PORTFOLIO", viewRepo: "VIEW REPO",
      writeupSoon: "WRITEUP · SOON", githubSoon: "GITHUB · SOON",
      completed: "COMPLETED", upcoming: "UPCOMING", inProgress: "IN PROGRESS",
      inPrep: "IN PREPARATION", participated: "PARTICIPATED",
      noImage: "NO IMAGE", comingSoon: "COMING SOON",
    },
  },
  fr: {
    home: {
      title: "KARIMA ED DAHHAK",
      subtitle: "COMMENCE PAR MARCHER SUR LE MODE DE JEU VOULU OU CLIQUE",
      hud: "WASD / FLÈCHES · BOUGER\nK · ATTAQUE",
      aboutLabel: "À Propos",
      portfolioLabel: "Portfolio",
      contactLabel: "Contact",
    },
    loading: {
      label: "CHARGEMENT",
      skip: "CLIQUE POUR PASSER",
    },
    nav: {
      navigate: "naviguer",
      home: "ACCUEIL",
      about: "À PROPOS",
      portfolio: "PORTFOLIO",
      ctf: "JOURNAL CTF",
      contact: "CONTACT",
      replay: "REJOUER L'INTRO",
      dark: "MODE SOMBRE",
      light: "MODE CLAIR",
      sfxOn: "SFX: ON",
      sfxOff: "SFX: OFF",
    },
    about: {
      badgeProfile: "PROFIL JOUEUR",
      badgeLvl: "NIV 1",
      badgeClass: "CLASSE: CYBERSEC",
      badgeGuild: "GUILDE: UEMF",
      bubble: "QUI SUIS-JE?",
      name: "KARIMA ED DAHHAK",
      lvl: "NIV",
      age: "ÂGE",
      clazz: "CLASSE",
      guild: "GUILDE",
      specialty: "SPÉCIALITÉ:",
      specialties: [
        "SÉCURITÉ OFFENSIVE",
        "SÉCURITÉ IA",
        "LABS PRATIQUES",
      ],
      currentQuest: "QUÊTE ACTUELLE:",
      questText: "CASSER DES CHOSES POUR APPRENDRE À LES DÉFENDRE.",
      guildAffiliation: "AFFILIATION GUILDE",
      uemfName: "UNIVERSITÉ EURO-MÉDITERRANÉENNE DE FÈS",
      uemfProg: "INGÉNIERIE CYBERSÉCURITÉ",
      downloadCV: "TÉLÉCHARGER CV",
    },
    portfolio: {
      questLog: "JOURNAL DE QUÊTES",
      selectCategory: "SÉLECTIONNER UNE CATÉGORIE",
      rows: {
        projects: { pre: "OBJETS FABRIQUÉS", cat: "PROJETS", sub: "4 OBJETS FORGÉS" },
        internships: { pre: "QUÊTES ANNEXES", cat: "STAGES", sub: "2 QUÊTES · ÉTÉ 2026" },
        ctf: { pre: "MODE COMPÉTITIF", cat: "CTF", sub: "3 QUÊTES TERMINÉES" },
        hackathons: { pre: "COMBATS DE BOSS", cat: "HACKATHONS", sub: "3 COMBATS MENÉS" },
        certificates: { pre: "SUCCÈS DÉBLOQUÉS", cat: "CERTIFICATS", sub: "1 DÉBLOQUÉ · 1 EN PRÉPARATION" },
        htb: { pre: "TERRAINS D'ENTRAÎNEMENT", cat: "LABS HTB", sub: "WRITEUPS BIENTÔT" },
      },
    },
    projects: {
      title: "OBJETS FABRIQUÉS · PROJETS",
      teamProject: "PROJET D'ÉQUIPE",
      items: {
        nood: {
          title: "NOOD · COACH IA EN COMMUNICATION",
          desc: "Plateforme de coaching IA qui analyse la parole et le langage corporel pour améliorer les compétences en communication.",
          tags: ["JavaScript", "IA", "Electron", "React", "TypeScript"],
        },
        malware: {
          title: "EXTRACTION DE CARACTÉRISTIQUES MALWARE",
          desc: "Outil C++ d'extraction de caractéristiques de fichiers Windows PE pour la détection de malwares par machine learning.",
          tags: ["C++", "Windows PE", "Analyse de Malware"],
        },
        campusops: {
          title: "CAMPUSOPS",
          desc: "Plateforme de gestion de campus avec contrôle d'accès par rôles, gestion des présences et services académiques.",
          tags: ["TypeScript", "fork · équipe"],
        },
        satellite: {
          title: "PROTECTION SATELLITE (ASTRAEA)",
          desc: "Système de détection de cyberattaques par IA pour satellites utilisant Isolation Forest et des modèles LSTM.",
          tags: ["Python", "Machine Learning", "fork · équipe"],
        },
      },
    },
    internships: {
      title: "QUÊTES ANNEXES · STAGES",
      sub: "XP DU MONDE RÉEL · ÉTÉ 2026",
      projectsHdr: "PROJETS",
      handsOnLab: "LAB PRATIQUE",
      m1337: {
        title: "1337 KHOURIBGA",
        role: "Stagiaire en Sécurité Offensive · Été 2026",
        desc: "Construction et attaque d'environnements de lab réalistes pour pratiquer la sécurité offensive.",
        tags: ["Windows Server", "Kali Linux", "Wireshark", "Python", "LLMs", "Sécurité IA"],
        adLab: { title: "LAB ATTAQUE AD & KERBEROS", writeup: "TÉLÉCHARGER WRITEUP" },
        rag: {
          title: "DAMN VULNERABLE RAG",
          desc: "Assistant RAG délibérément vulnérable pour apprendre les attaques par injection de prompt, les défenses et l'architecture IA sécurisée. Construit localement avec Ollama + ChromaDB + Streamlit.",
        },
      },
      dgi: {
        title: "DGI RABAT",
        role: "Stagiaire en Ingénierie IA & Cybersécurité · Août 2026",
        desc: "Direction Générale des Impôts (DGI) — Prédiction du risque d'audit fiscal et estimation des montants de fraude fiscale par deep learning.",
        tags: ["Deep Learning", "Python", "Analyse de Données", "Détection de Fraude"],
        tax: { title: "FRAUDE FISCALE · DEEP LEARNING" },
      },
    },
    ctf: {
      title: "MODE COMPÉTITIF · CTF",
      inpt: {
        title: "INPT CTF", xp: "+250 XP",
        desc: "Défis en sécurité web, cryptographie, rétro-ingénierie, forensique et OSINT.",
        tags: ["WEB", "CRYPTO", "REV", "FORENSIQUE", "OSINT"],
      },
      ensi: {
        title: "ENSI CTF", xp: "+250 XP",
        desc: "Défis cybersécurité débutant et intermédiaire, résolus en équipe compétitive.",
        tags: ["JEU D'ÉQUIPE", "DÉFIS MIXTES"],
      },
      htb: {
        title: "HACK THE BOX", xp: "+500 XP",
        desc: "Défis sécurité offensive : exploitation, élévation de privilèges et énumération.",
        tags: ["EXPLOITATION", "ÉLÉVATION DE PRIV", "ÉNUMÉRATION"],
      },
    },
    hackathons: {
      title: "COMBATS DE BOSS · HACKATHONS",
      sub: "MODE INTENSIF · SPRINTS 48H",
      actinspace: {
        badge: "PREMIER HACKATHON", title: "ACT IN SPACE", date: "2026",
        desc: "ASTRAEA — cybersécurité autonome pour satellites. Détection de menaces embarquée sans dépendance au contrôle sol.",
        quote: "GAGNER N'ÉTAIT PAS LA LEÇON. APPRENDRE À PENSER SOUS PRESSION L'ÉTAIT.",
        team: "Équipe : Aya Driouche, Salma El Messaoudi",
        tags: ["SATELLITE", "CYBERSÉCURITÉ", "IA"],
      },
      hackdays: {
        badge: "BOOTCAMP RÉGIONAL", title: "HACK'DAYS UEMF", date: "16-17 AVRIL 2026",
        desc: "Sprint d'innovation de 48h à l'Euromed Innovation Center. Création de NOOD — coach de prise de parole propulsé par l'IA.",
        organizer: "Organisateur : EIC × TAMWILCOM × BlueSpace (Bank Of Africa)",
        tags: ["IA", "ENTREPRENEURIAT", "PRISE DE PAROLE"],
      },
      forum: {
        badge: "VITRINE", title: "1ER FORUM RÉGIONAL DE L'EMPLOI", date: "2026 · PALAIS DES CONGRÈS DE FÈS",
        desc: "Présentation de NOOD AI, notre coach de prise de parole propulsé par l'IA, aux côtés de startups et d'innovateurs de la région Fès–Meknès. Échanges avec des professionnels et entrepreneurs.",
        tags: ["IA", "ENTREPRENEURIAT", "PRISE DE PAROLE"],
      },
    },
    certificates: {
      title: "SUCCÈS DÉBLOQUÉS · CERTIFICATS",
      aws: { title: "AWS CLOUD PRACTITIONER ESSENTIALS", issuer: "Amazon Web Services (AWS)", tags: ["Cloud Computing", "Avril 2026"] },
      cpts: { title: "CPTS · CERTIFIED PENETRATION TESTING SPECIALIST", issuer: "Hack The Box", tags: ["Tests de Pénétration", "Sécurité Offensive"] },
      locked: "???",
      comingSoon: "BIENTÔT DISPONIBLE",
    },
    htb: {
      title: "TERRAINS D'ENTRAÎNEMENT · LABS HTB", sub: "LA PRATIQUE REND PARFAIT",
      machine: "MACHINE", difficulty: "DIFFICULTÉ", viewWriteup: "VOIR WRITEUP", locked: "???",
    },
    contact: {
      handle: "@kdeeey",
      sendRaven: "ENVOYER UN CORBEAU",
      bubbles: {
        default: [
          "ON FAIT ÉQUIPE?", "CLIQUE UN LIEN POUR CONNECTER!", "JE NE MORDS PAS... PRESQUE.",
          "TROUVE-MOI SUR CTFTIME!", "ENVOIE-MOI UN PARCHEMIN!", "REJOINS MA PARTIE?",
        ],
        linkedin: "CRÉONS UN RÉSEAU!", github: "REGARDE MON CODE!", tryhackme: "HACKONS ENSEMBLE?",
        mail: "ENVOIE-MOI UN MESSAGE!", x: "SUIS-MOI!", discord: "REJOINS MON SERVEUR!",
        ctftime: "CAPTURE LE DRAPEAU!", seeYou: "À BIENTÔT!",
      },
    },
    common: {
      back: "RETOUR", backPortfolio: "RETOUR AU PORTFOLIO", viewRepo: "VOIR REPO",
      writeupSoon: "WRITEUP · BIENTÔT", githubSoon: "GITHUB · BIENTÔT",
      completed: "TERMINÉ", upcoming: "À VENIR", inProgress: "EN COURS",
      inPrep: "EN PRÉPARATION", participated: "PARTICIPÉ",
      noImage: "PAS D'IMAGE", comingSoon: "BIENTÔT",
    },
  },
};

export type Dict = Translation;

// External links are language-independent.
export const links = {
  linkedin: "https://www.linkedin.com/in/karima-ed-dahhak-8708461a9/",
  github: "https://github.com/kdeeey",
  tryhackme: "https://tryhackme.com/p/kdeeey01",
  mail: "mailto:karimaeddahhak@gmail.com",
  x: "https://x.com/dahhak_karima",
  discord: "https://discord.gg/9nw8fd8z4",
  ctftime: "https://ctftime.org/user/243517",
  repos: {
    nood: "https://github.com/kdeeey/NOOD-",
    malware: "https://github.com/kdeeey/malware-features-extraction",
    campusops: "https://github.com/kdeeey/CampusOps-",
    satellite: "https://github.com/kdeeey/satellite-protection",
    rag: "https://github.com/kdeeey/damn-vulnerable-rag",
    dgi: "https://github.com/kdeeey/dgi-audit-risk-predicto",
  },
} as const;
