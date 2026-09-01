window.portfolioData = {
  profile: {
    name: 'Harsh',
    identity: 'Denvil',
    github: 'https://github.com/DenxVil',
    title: 'Medical Student · AI & Technology Developer',
    axis: 'Medicine × AI × Technology',
    statement: 'Exploring the intersection of medicine, artificial intelligence, and technology.',
    college: 'Maulana Azad Medical College',
    role: 'MBBS, Currently 2nd Year',
    linkedIn: null,
    email: null
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'journey', label: 'Journey' },
    { id: 'mavericks', label: 'MAVERICKS' },
    { id: 'contact', label: 'Contact' }
  ],
  achievements: [
    { value: '🥈', label: '2nd Prize', detail: 'Catalyst Hackathon 2025 · Pulse Protector' },
    { value: '690/720', label: 'NEET-UG', detail: 'First attempt' },
    { value: '95.6%', label: 'Class XII', detail: 'Jawahar Navodaya Vidyalaya' }
  ],
  aboutFrames: [
    { title: 'Medicine', detail: 'MBBS · MAMC' },
    { title: 'Building', detail: 'AI · Software · Automation' },
    { title: 'Exploring', detail: 'Healthcare · Technology · Research' }
  ],
  education: [
    {
      stage: 'Classes I–V',
      title: 'Gems English School',
      detail: 'Foundational schooling.'
    },
    {
      stage: 'Classes VI–XII',
      title: 'Jawahar Navodaya Vidyalaya',
      detail: 'Class XII: 95.6%'
    },
    {
      stage: 'Present',
      title: 'Maulana Azad Medical College, New Delhi',
      detail: 'MBBS · Currently 2nd Year'
    }
  ],
  journey: [
    { stage: 'Early', text: 'Early coding exploration' },
    { stage: 'Build', text: 'Software and automation projects' },
    { stage: 'Telegram', text: 'Telegram and AI experimentation' },
    { stage: 'Assistants', text: 'Assistant-focused AI systems' },
    { stage: 'Healthcare', text: 'Healthcare technology direction' },
    { stage: 'Today', text: 'Medicine × Technology integration' }
  ],
  technologies: {
    Languages: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    AI: ['AI/ML', 'Generative AI', 'LLMs', 'Multimodal AI', 'AI assistants'],
    'Web / Backend': ['React', 'Node.js', 'MongoDB', 'Astro'],
    'Tools / Infrastructure': ['Docker', 'Git', 'GitHub', 'CI/CD'],
    'Telegram / Automation': ['Telegram API', 'Telethon', 'API integration', 'Automation']
  },
  projects: [
    {
      id: 'pulse-protector',
      number: '01',
      title: 'Pulse Protector',
      subtitle: 'AI-Assisted Trauma Response System',
      category: 'Healthcare · AI · Trauma Response',
      description:
        'AI-assisted trauma response prototype supporting rapid trauma assessment, START-based triage simulation, confidence scoring, and intervention guidance.',
      disclaimer: 'Research / educational prototype — not for clinical use.',
      highlight: true,
      achievement: '2nd Prize — Catalyst Hackathon 2025',
      technologies: ['Python', 'JavaScript', 'HTML/CSS', 'AI-assisted logic'],
      links: {
        github: 'https://github.com/DenxVil/Pulse-Protector-',
        live: 'https://denxvil.github.io/Pulse-Protector-/',
        caseStudy: 'pulse-protector.html'
      },
      idea:
        'Blend medical learning context with software to model trauma triage support in simulated scenarios.',
      problem:
        'Trauma triage decision flow is time-sensitive and cognitively demanding in high-pressure simulations.',
      approach:
        'Combine START-inspired checks with weighted subsystem scoring over clinical inputs including HR, RR, SpO2, BP, GCS, temperature, and pupils.',
      contribution:
        'System design, triage logic workflow, and implementation of the educational simulation interface.',
      result: 'Catalyst Hackathon 2025 — 2nd Prize.'
    },
    {
      id: 'mitra-ai',
      number: '02',
      title: 'Mitra AI',
      subtitle: 'AI Assistant',
      category: 'Conversational AI · Assistant Systems',
      description:
        'AI assistant exploration focusing on conversation memory, emotion-aware interaction, crisis detection, moderation, and Telegram integration.',
      technologies: ['Python', 'Hugging Face', 'Telegram', 'Docker', 'Azure', 'CI/CD'],
      links: {
        github: 'https://github.com/DenxVil/MitraAI'
      },
      idea: 'Investigate practical assistant behaviors for safer and context-aware conversations.',
      approach:
        'Experiment with modular conversational components for memory handling, moderation layers, and safety-related checks.',
      contribution: 'Development and iteration on assistant capabilities and integrations.'
    },
    {
      id: 'shan-d',
      number: '03',
      title: 'Shan-D',
      subtitle: 'Multimodal AI Assistant',
      category: 'AI · Multimodal · Personalization',
      description:
        'Multimodal assistant exploration across reasoning, memory, personalization, and understanding of mixed input types.',
      technologies: ['Multimodal AI', 'Reasoning pipelines', 'Caching', 'Async processing'],
      links: {},
      idea: 'Explore a more adaptive assistant that can process text, media, and contextual cues.',
      approach:
        'Blend multiple models and async workflows to support image, video/audio, and document-oriented interactions.',
      contribution: 'Product direction, capability integration, and personalization experimentation.'
    },
    {
      id: 'dark-userbot',
      number: '04',
      title: 'DARK USERBOT',
      subtitle: 'Telegram Automation',
      category: 'Automation · Telegram Ecosystem',
      description:
        'Development, extension, and maintenance work on a Telegram userbot project for command-based automation and extensibility.',
      technologies: ['Python', 'Telegram API', 'Telethon ecosystem', 'Docker'],
      links: {
        github: 'https://github.com/DenxVil/DARK-USERBOT'
      },
      idea: 'Extend userbot workflows for practical day-to-day automation use cases.',
      contribution: 'Feature extension, maintenance, and deployment-oriented improvements.'
    },
    {
      id: 'synapse-2026',
      number: '05',
      title: 'SYNAPSE 2026',
      subtitle: 'KRAFTON × SYNAPSE BGMI Battle 2026',
      category: 'Web Experience · Event Platform',
      description:
        'Modern website for the tournament ecosystem linked with MAVERICKS at Maulana Azad Medical College.',
      technologies: ['Astro', 'HTML', 'CSS', 'JavaScript/TypeScript'],
      links: {
        github: 'https://github.com/XJENNI/BGMI_SYNAPSE',
        live: 'https://synapse26.live'
      },
      idea: 'Deliver a clean event experience for schedules, standings, rules, and media.',
      contribution: 'Design and frontend implementation focused on responsive interaction and performance.'
    },
    {
      id: 'mavericks',
      number: '06',
      title: 'MAVERICKS',
      subtitle: 'Gaming Society of Maulana Azad Medical College',
      category: 'Leadership · Technical Initiatives',
      description:
        'IT Head role focused on digital presence, technical initiatives, and website-related work for the society.',
      technologies: ['Leadership', 'Web systems', 'Technical operations'],
      links: {
        live: 'https://synapse26.live'
      },
      contribution: 'Technical leadership and digital execution supporting the society’s online initiatives.'
    }
  ]
};
