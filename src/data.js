// Central place for all your info — edit here to update the whole site.

export const profile = {
  name: 'Sadiq Shah',
  role: 'Software Engineer',
  headline: 'JavaScript · ReactJS · Next.js · TypeScript',
  location: 'Karachi, Pakistan',
  email: 'sadiqshahdev234@gmail.com',
  phone: '0307 6523149',
  cv: '/cv.html', // printable CV page (public/cv.html) — has Print & Download PDF buttons
  intro:
    "Meticulous web developer with 3+ years of front-end experience and a passion for responsive design. A firm believer in the mobile-first approach — I enjoy turning complex problems into simple, beautiful, and intuitive interfaces.",
  about: [
    "I'm a Software Engineer at Sofcom × Dax, building modern web applications with React, Next.js and TypeScript. Over 3+ years I've grown from Frontend Developer to Senior Software roles across several companies.",
    "My focus is front-end engineering and responsive, mobile-first design — but I'm comfortable across the stack with Node.js and server-side JavaScript. I care deeply about clean, maintainable code and great user experience.",
    "Alongside building products, I've spent 1.5 years as an Instructor at Saylani Mass I.T Training (SMIT), mentoring students and guiding them towards careers in tech.",
  ],
}

export const stats = [
  { num: 3, label: 'Years Experience', plus: true },
  { num: 6, label: 'Companies', plus: false },
  { num: 95, label: 'Repositories', plus: true },
  { num: 170, label: 'GitHub Followers', plus: true },
]

// "Values" style rows (icon = name from Icons.jsx)
export const values = [
  { icon: 'code', title: 'Clean & Elegant Code', desc: 'I write maintainable, readable code that scales — because good software outlives its first deploy.' },
  { icon: 'zap', title: 'Performance First', desc: 'Fast, accessible, responsive experiences. Every millisecond and every user matters.' },
  { icon: 'users', title: 'Collaboration Driven', desc: 'I thrive in teams — sharing ideas, reviewing code, and shipping products together.' },
]

// Terminal-style skill lists (the `>` cyan lists)
export const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'HTML5'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Three.js', 'React Three Fiber'] },
  { title: 'Styling', items: ['CSS3', 'SASS', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend & Databases', items: ['Node.js', 'Express', 'MongoDB', 'Firebase'] },
  { title: 'WordPress & CMS', items: ['WordPress', 'WooCommerce', 'Elementor', 'PHP'] },
  { title: 'Data Science & AI', items: ['Python', 'Pandas', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'Seaborn'] },
  { title: 'Design', items: ['Figma', 'Photoshop', 'Illustrator', 'Adobe XD'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Linux', 'VS Code', 'npm', 'Vite', 'Netlify', 'Vercel'] },
]

// Work experience (accordion items)
export const experience = [
  {
    tag: '2024 — Present',
    title: 'Freelance Full Stack Developer',
    desc: 'Building custom websites, interactive 3D/WebGL experiences and WordPress + WooCommerce e-commerce stores for clients — handling design, development and deployment end to end.',
    tech: ['WordPress', 'React', 'WooCommerce', 'Three.js'],
  },
  {
    tag: '2025',
    title: 'Senior Software Executive · Sofcom',
    desc: 'Promoted from React Developer (Jan 2025) to Senior Software Executive at Sofcom × Dax, building modern web applications with React, Next.js and TypeScript.',
    tech: ['React', 'Next.js', 'TypeScript'],
  },
  {
    tag: '2023 — 2025',
    title: 'Instructor · Saylani Mass I.T Training (SMIT)',
    desc: 'Taught and mentored students in web development for 1.5 years — inspiring and guiding them toward successful careers in tech.',
    tech: ['Teaching', 'JavaScript', 'React'],
  },
  {
    tag: '2023 — 2024',
    title: 'Software Engineer · Digital Auxilius',
    desc: 'Grew from Associate Software Engineer to Software Engineer over ~2 years, delivering responsive, production-grade front-end applications.',
    tech: ['JavaScript', 'React', 'Node.js'],
  },
  {
    tag: '2022 — 2023',
    title: 'Frontend Developer · LearnTech.pk',
    desc: 'Built and maintained responsive, mobile-first user interfaces for web platforms over 11 months.',
    tech: ['JavaScript', 'CSS3', 'Responsive'],
  },
  {
    tag: '2020 — 2022',
    title: 'Frontend Developer · Dynamic Global Links',
    desc: 'Started my professional journey developing front-end interfaces with a focus on clean, intuitive design.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
]

// Education (accordion items)
export const education = [
  {
    tag: '2016 — 2021',
    title: 'BS Computer Science · Federal Urdu University',
    desc: 'Bachelor of Science in Computer Science — Federal Urdu University of Arts, Science & Technology, Islamabad.',
  },
  {
    tag: '2022 — 2023',
    title: 'Web & Mobile App Development · SMIT',
    desc: 'Web & Mobile Application Development program at Saylani Mass I.T Training (SMIT), Karachi.',
  },
]

// Project categories used for the filter bar
export const categories = ['All', '3D & WebGL', 'WordPress', 'Web Apps', 'Tools']

// Full project list. `featured` ones show on the home page.
// Each has a detail page at /projects/<slug>.
export const projects = [
  {
    slug: 'nebula-3d-galaxy',
    title: 'Nebula 3D Galaxy',
    category: '3D & WebGL',
    featured: true,
    thumb: ['#3a1c71', '#7b61ff'],
    desc: 'An interactive 3D galaxy with 28,000 glowing particles, a distorted core and real-time bloom. Drag to orbit, scroll to zoom, and move the mouse to watch it react.',
    longDesc: [
      'Nebula is a real-time 3D galaxy rendered entirely in the browser. 28,000 individually animated particles swirl around a distorted core, lit with a custom bloom post-processing pass.',
      'The camera responds to input — drag to orbit, scroll to zoom, and move your mouse to nudge the particle field. Everything runs at 60fps thanks to GPU-side animation in custom GLSL shaders.',
    ],
    features: [
      '28,000 GPU-animated particles',
      'Custom GLSL vertex & fragment shaders',
      'Real-time bloom post-processing',
      'Orbit / zoom / mouse-reactive camera',
    ],
    tech: ['Three.js', 'React Three Fiber', 'GLSL'],
    live: 'https://nebula786.netlify.app/',
  },
  {
    slug: 'lumiere-restaurant',
    title: 'Lumiere Restaurant',
    category: '3D & WebGL',
    featured: true,
    thumb: ['#8e2de2', '#ffb454'],
    desc: 'A fine-dining restaurant landing page with a shader-lit liquid gold background that flickers like candlelight. Full-screen WebGL, seasonal menu and a reservation flow.',
    longDesc: [
      'Lumiere is a premium restaurant landing experience. The hero is a full-screen WebGL surface of flowing liquid gold that flickers like candlelight, driven by custom noise shaders.',
      'Beyond the visuals it is a complete marketing site — a seasonal menu, story section and a working reservation flow — all wrapped in an elegant, motion-rich layout.',
    ],
    features: [
      'Full-screen shader-lit liquid gold background',
      'Candlelight flicker via custom GLSL noise',
      'Seasonal menu & story sections',
      'Reservation booking flow',
    ],
    tech: ['Three.js', 'GLSL', 'Shaders'],
    live: 'https://stepphen-resturan-demo.netlify.app/',
  },
  {
    slug: 'anatomica-3d-body',
    title: 'Anatomica 3D Body Explorer',
    category: '3D & WebGL',
    featured: true,
    thumb: ['#0f2027', '#2ee6b6'],
    desc: 'An interactive 3D human body explorer for health and anatomy. Rotate, zoom and click any region to learn how it works, and toggle between the full body and the skeleton.',
    longDesc: [
      'Anatomica is an educational 3D human-body explorer. Users can rotate and zoom the model, then click any region to reveal information about how that part of the body works.',
      'A toggle switches between the full body and the skeleton view, and the body-systems panel lets you isolate the muscular, nervous, respiratory and other systems.',
    ],
    features: [
      'Interactive 3D body — rotate, zoom, click',
      'Full body ↔ skeleton toggle',
      'Body-systems explorer (muscular, nervous…)',
      'Clickable regions with health info',
    ],
    tech: ['Three.js', 'React Three Fiber', 'WebGL'],
    live: 'https://anatomia-holla.netlify.app/',
  },
  {
    slug: 'it-tools',
    title: 'IT Tools',
    category: 'Tools',
    featured: true,
    thumb: ['#1a2980', '#26d0ce'],
    desc: 'A handy all-in-one collection of developer tools — converters, formatters, generators and encoders — in one fast, clean web app.',
    longDesc: [
      'IT Tools is a fast, offline-friendly collection of everyday utilities for developers — from JSON/YAML converters and formatters to hash, UUID and token generators, encoders/decoders and more.',
      'Everything lives in one clean, searchable interface so you can grab the right tool instantly without hunting across the web.',
    ],
    features: ['Dozens of dev utilities in one place', 'Converters, formatters & generators', 'Encoders / decoders & hashing', 'Fast, searchable, clean UI'],
    tech: ['Vue.js', 'TypeScript', 'Vite'],
    live: 'https://it-tools-786.vercel.app/',
  },
  {
    slug: 'excalidraw-whiteboard',
    title: 'Excalidraw Whiteboard',
    category: 'Tools',
    featured: true,
    thumb: ['#232526', '#414345'],
    desc: 'A hand-drawn style collaborative whiteboard for sketching diagrams, wireframes and ideas — with an infinite canvas and real-time feel.',
    longDesc: [
      'A virtual whiteboard for sketching hand-drawn style diagrams. It offers an infinite canvas with shapes, arrows, freehand drawing and text, perfect for wireframes and quick ideation.',
    ],
    features: ['Infinite hand-drawn canvas', 'Shapes, arrows & freehand tools', 'Export to image / clipboard'],
    tech: ['React', 'Canvas', 'TypeScript'],
    live: 'https://excalidraw.com/',
  },
  {
    slug: 'suits-by-sadia',
    title: 'Suits by Sadia',
    category: 'WordPress',
    featured: true,
    thumb: ['#642b73', '#c6426e'],
    desc: 'A fashion e-commerce store for a women\'s clothing brand — full catalog, product pages, cart and checkout built on WooCommerce.',
    longDesc: [
      'Suits by Sadia is a complete online fashion store built on WordPress + WooCommerce. It features a curated product catalog, detailed product pages with variations, and a smooth cart-to-checkout flow.',
      'The design is elegant and mobile-first, tuned for browsing collections and converting shoppers with a clean, brand-led look.',
    ],
    features: ['WooCommerce catalog & product variations', 'Cart & secure checkout', 'Responsive, brand-led design', 'Order & inventory management'],
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'PHP'],
    live: 'https://suitsbysadia.com/',
  },
  {
    slug: 'armani-premium',
    title: 'Armani Premium',
    category: 'WordPress',
    featured: false,
    thumb: ['#232526', '#c9a227'],
    desc: 'A premium fragrance & fashion e-commerce store with a luxury aesthetic, full WooCommerce shop and a polished checkout experience.',
    longDesc: [
      'Armani Premium is a luxury-styled online store built on WordPress + WooCommerce, showcasing premium products with a refined, high-end aesthetic.',
      'It includes the full shopping experience — product listings, filtering, cart and checkout — wrapped in a dark, elegant theme.',
    ],
    features: ['Luxury WooCommerce storefront', 'Product filtering & search', 'Cart & checkout', 'Mobile-optimized layout'],
    tech: ['WordPress', 'WooCommerce', 'CSS3', 'PHP'],
    live: 'https://armanipremium.com/',
  },
  {
    slug: 'xpert-appliances',
    title: 'Xpert Appliances',
    category: 'WordPress',
    featured: true,
    thumb: ['#0f2027', '#2c5364'],
    desc: 'A home & kitchen appliances e-commerce store for the Pakistani market — large product catalog, categories and WooCommerce checkout.',
    longDesc: [
      'Xpert Appliances is a home & kitchen appliances online store built on WordPress + WooCommerce, serving the Pakistani market with a large, well-organized product catalog.',
      'It handles many product categories, detailed specs, cart and checkout, plus local payment and delivery considerations.',
    ],
    features: ['Large multi-category catalog', 'Detailed product specs', 'WooCommerce cart & checkout', 'Localized for the PK market'],
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'PHP'],
    live: 'https://xpertappliances.pk/',
  },
  {
    slug: 'shamooz',
    title: 'Shamooz',
    category: 'WordPress',
    featured: false,
    thumb: ['#603813', '#b29f94'],
    desc: 'A fashion & lifestyle e-commerce store with a modern catalog, collections and a complete WooCommerce shopping flow.',
    longDesc: [
      'Shamooz is a modern fashion & lifestyle store built on WordPress + WooCommerce, with organized collections and a smooth end-to-end shopping experience.',
      'The build focuses on fast browsing, clean product presentation and a frictionless checkout.',
    ],
    features: ['Collections & category browsing', 'Product pages with variations', 'Cart & checkout', 'Responsive design'],
    tech: ['WordPress', 'WooCommerce', 'CSS3', 'PHP'],
    live: 'https://shamooz.com/',
  },
  {
    slug: 'habitt',
    title: 'Habitt',
    category: 'WordPress',
    featured: false,
    thumb: ['#134e5e', '#71b280'],
    desc: 'A large home, furniture & kitchen appliances e-commerce store with extensive collections and a full WooCommerce shopping experience.',
    longDesc: [
      'Habitt is a large-scale home, furniture and kitchen appliances online store built on WordPress + WooCommerce, handling extensive collections and a high product count.',
      'It offers rich category navigation, product filtering, cart and checkout at scale.',
    ],
    features: ['Extensive furniture & appliance catalog', 'Rich category navigation & filters', 'WooCommerce cart & checkout', 'Scales to a large product count'],
    tech: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript'],
    live: 'https://habitt.com/',
  },
  {
    slug: 'join-her-beauty',
    title: 'Join Her Beauty',
    category: 'WordPress',
    featured: false,
    thumb: ['#ee4f8b', '#ff9a9e'],
    desc: 'A beauty & cosmetics e-commerce store with an on-brand, feminine aesthetic and a complete WooCommerce shopping flow.',
    longDesc: [
      'Join Her Beauty is a cosmetics & beauty online store built on WordPress + WooCommerce, with a soft, feminine, on-brand aesthetic.',
      'It delivers the full e-commerce experience — product catalog, cart and checkout — optimized for mobile shoppers.',
    ],
    features: ['Beauty & cosmetics catalog', 'On-brand feminine design', 'WooCommerce cart & checkout', 'Mobile-first experience'],
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'CSS3'],
    live: 'https://joinherbeauty.com/',
  },
  {
    slug: 'quiz-app',
    title: 'Quiz App',
    category: 'Web Apps',
    featured: false,
    thumb: ['#ee4f8b', '#ff6b45'],
    desc: 'An interactive quiz application with dynamic questions, real-time scoring and instant feedback. Built to make learning fun and engaging.',
    longDesc: ['A vanilla-JavaScript quiz app with dynamic questions, live scoring and instant feedback on each answer.'],
    features: ['Dynamic question sets', 'Real-time scoring', 'Instant answer feedback'],
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    code: 'https://github.com/sadiqshah786/Quiz-App',
  },
  {
    slug: 'weather-app',
    title: 'Weather App',
    category: 'Web Apps',
    featured: false,
    thumb: ['#2e9df0', '#00c6ff'],
    desc: 'Real-time weather forecasts by city using the OpenWeatherMap API, with a clean responsive UI that adapts to current conditions.',
    longDesc: ['Search any city for real-time weather from the OpenWeatherMap API, with a responsive UI that adapts to the current conditions.'],
    features: ['Live data from OpenWeatherMap', 'Search by city', 'Condition-aware responsive UI'],
    tech: ['JavaScript', 'REST API', 'CSS3'],
    code: 'https://github.com/sadiqshah786/Weather-app',
  },
  {
    slug: 'news-app',
    title: 'News App',
    category: 'Web Apps',
    featured: false,
    thumb: ['#42275a', '#734b6d'],
    desc: 'A news reader that fetches and displays the latest headlines across categories from a live news API, with a fast, filterable layout.',
    longDesc: ['A news reader pulling the latest headlines across categories from a live news API, laid out in a fast, filterable grid.'],
    features: ['Live headlines by category', 'Fast filterable layout', 'External API integration'],
    tech: ['JavaScript', 'News API', 'Flexbox'],
    code: 'https://github.com/sadiqshah786/News-App',
  },
  {
    slug: 'todo-app',
    title: 'To-Do App',
    category: 'Web Apps',
    featured: false,
    thumb: ['#11998e', '#38ef7d'],
    desc: 'A task manager with add, complete and delete actions plus persistent local storage so your tasks stick around between sessions.',
    longDesc: ['A clean task manager with add/complete/delete actions and localStorage persistence so tasks survive page reloads.'],
    features: ['Add / complete / delete tasks', 'localStorage persistence', 'Minimal, focused UI'],
    tech: ['JavaScript', 'LocalStorage', 'CSS3'],
    code: 'https://github.com/sadiqshah786/To-do-App',
  },
  {
    slug: 'nft-design',
    title: 'NFT Design',
    category: 'Web Apps',
    featured: false,
    thumb: ['#ff5f6d', '#ffc371'],
    desc: 'A fully responsive NFT marketplace landing page with a modern layout, smooth interactions and pixel-perfect styling.',
    longDesc: ['A responsive NFT marketplace landing page with a modern layout, smooth interactions and pixel-perfect styling.'],
    features: ['Fully responsive layout', 'Modern marketplace UI', 'Smooth interactions'],
    tech: ['HTML5', 'CSS3', 'Responsive'],
    code: 'https://github.com/sadiqshah786/NFT-Design',
  },
]

// Services as accordion items
export const services = [
  { tag: 'SERVICE', title: 'Full Stack Web Development', desc: 'End-to-end web apps — from React/Next.js frontends to Node.js APIs and databases. Built, tested and deployed.' },
  { tag: 'SERVICE', title: 'Frontend Engineering', desc: 'Pixel-perfect, responsive, accessible interfaces with React or Vue, optimized for speed and great UX.' },
  { tag: 'SERVICE', title: 'API & Backend Development', desc: 'RESTful APIs, authentication, database design and integrations with Node, Express, MongoDB and Firebase.' },
  { tag: 'SERVICE', title: 'Data Science & AI Solutions', desc: 'Data analysis, visualization and ML models with Python, Pandas, TensorFlow and Scikit-learn.' },
]

// FAQ accordion
export const faqs = [
  { tag: 'FAQ 01', title: 'Are you available for freelance work?', desc: 'Yes! I\'m open to freelance projects, contract work and full-time opportunities. Reach out via LinkedIn or GitHub and let\'s talk.' },
  { tag: 'FAQ 02', title: 'What is your main tech stack?', desc: 'React, Next.js and Vue on the frontend; Node.js, Express, MongoDB and Firebase on the backend; plus Python for data science.' },
  { tag: 'FAQ 03', title: 'Can you work with a team?', desc: 'Absolutely. I love collaborative environments — code reviews, pair programming and shipping features together as a team.' },
  { tag: 'FAQ 04', title: 'How can I see more of your work?', desc: 'I have 95+ public repositories on GitHub covering web apps, experiments and data-science notebooks. The link is in the nav and footer.' },
  { tag: 'FAQ 05', title: 'How do we get started on a project?', desc: 'Send me a message with your idea, timeline and goals. We\'ll scope it together, agree on milestones, and start building.' },
]

// Selectable accent palettes — each overrides the theme's accent CSS variables.
export const palettes = [
  { id: 'magenta', name: 'Magenta',  pink: '#ee4f8b', coral: '#ff6b45', teal: '#2ee6b6', purple: '#7b61ff' },
  { id: 'ocean',   name: 'Ocean',    pink: '#2e9df0', coral: '#00c6ff', teal: '#2ee6b6', purple: '#6a5cff' },
  { id: 'violet',  name: 'Violet',   pink: '#b16cff', coral: '#ff6bd6', teal: '#8b7bff', purple: '#9d4edd' },
  { id: 'sunset',  name: 'Sunset',   pink: '#ff5f6d', coral: '#ffc371', teal: '#ffd166', purple: '#ff7e5f' },
  { id: 'emerald', name: 'Emerald',  pink: '#2ee6b6', coral: '#38ef7d', teal: '#a8ff78', purple: '#11998e' },
  { id: 'amber',   name: 'Amber',    pink: '#ffb454', coral: '#ff7b45', teal: '#ffd166', purple: '#ff5f6d' },
]

// Selectable heading fonts
export const headingFonts = [
  { id: 'pixel', name: 'Pixel', stack: "'Press Start 2P', monospace" },
  { id: 'grotesk', name: 'Grotesk', stack: "'Space Grotesk', system-ui, sans-serif" },
  { id: 'sora', name: 'Sora', stack: "'Sora', system-ui, sans-serif" },
  { id: 'poppins', name: 'Poppins', stack: "'Poppins', system-ui, sans-serif" },
  { id: 'mono', name: 'Mono', stack: "'Space Mono', monospace" },
]

// Selectable body / paragraph fonts
export const fonts = [
  { id: 'grotesk', name: 'Grotesk', stack: "'Space Grotesk', system-ui, sans-serif" },
  { id: 'inter', name: 'Inter', stack: "'Inter', system-ui, sans-serif" },
  { id: 'poppins', name: 'Poppins', stack: "'Poppins', system-ui, sans-serif" },
  { id: 'sora', name: 'Sora', stack: "'Sora', system-ui, sans-serif" },
  { id: 'dmsans', name: 'DM Sans', stack: "'DM Sans', system-ui, sans-serif" },
]

// Selectable text sizes (applied as page zoom)
export const textSizes = [
  { id: 'sm', label: 'Small', zoom: 0.92 },
  { id: 'md', label: 'Default', zoom: 1 },
  { id: 'lg', label: 'Large', zoom: 1.08 },
]

export const socials = [
  { icon: 'mail', label: 'Email', href: 'mailto:sadiqshahdev234@gmail.com' },
  { icon: 'phone', label: 'Call', href: 'tel:+923076523149' },
  { icon: 'github', label: 'GitHub', href: 'https://github.com/sadiqshah786' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sadiq-shah-806937166/' },
  { icon: 'pen', label: 'Dev.to', href: 'https://dev.to/sadiqshah786' },
  { icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/SadiqSh83537015' },
]
