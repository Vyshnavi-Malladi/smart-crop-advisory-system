





// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { 
//   Sprout, 
//   LogIn, 
//   UserPlus, 
//   LayoutDashboard, 
//   LogOut, 
//   Menu, 
//   X
// } from 'lucide-react';
// import styles1 from './HeroBanner.module.css';

// // ✅ Import images from assets folder
// import farmer from '../assets/HeroFarmerImage.png';
// import carrot from '../assets/HeroCarrot.png';
// import corn from '../assets/HeroCorn.png';
// import naturalBadge from '../assets/HeroBadgeImage.png';
// import bgImage from '../assets/HeroBackground.jpg';
// import farmer2 from '../assets/HeroFarmerImage1.png';
// import bgImage2 from '../assets/HeroBackground1.jpg';

// const slidesData = [
//   {
//     bg: bgImage,
//     topLabel: '🌾 Welcome to FarmXpert',
//     mainTitle: (
//       <>
//         SMART FARMING,<br />
//         <span className={styles1.agriv_hero_underline}>BETTER HARVEST!</span>
//       </>
//     ),
//     subText: 'Your AI-powered farming assistant for crop recommendations, disease detection, yield prediction, and more.',
//     images: {
//       farmer: farmer,
//       carrot: carrot,
//       corn: corn,
//       badge: naturalBadge,
//     },
//     buttonText: '🚀 Get Started',
//   },
//   {
//     bg: bgImage2,
//     topLabel: '🌱 Grow Smarter with AI',
//     mainTitle: (
//       <>
//         TECHNOLOGY MEETS<br />
//         <span className={styles1.agriv_hero_underline}>TRADITIONAL FARMING!</span>
//       </>
//     ),
//     subText: 'Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.',
//     images: {
//       farmer: farmer2,
//       carrot: carrot,
//       corn: corn,
//       badge: naturalBadge,
//     },
//     buttonText: '🌿 Explore Features',
//   },
// ];

// const AgriHeroBanner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const totalSlides = slidesData.length;
//   const navigate = useNavigate();

//   // Get user info from cookies
//   const token = Cookies.get('token');

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
//   };

//   const handleGetStarted = () => {
//     const token = Cookies.get('token');
//     if (token) {
//       navigate('/dashboard');
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('user');
//     setIsMobileMenuOpen(false);
//     navigate('/');
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className={styles1.agriv_hero_carouselContainer}>
//       {/* ===================== NAVBAR ===================== */}
//       <nav className={styles1.agriv_hero_navbar}>
//         <div className={styles1.agriv_hero_navContainer}>
//           {/* Logo - Left */}
//           <Link to="/" className={styles1.agriv_hero_logo}>
//             <div className={styles1.agriv_hero_logoIcon}>
//               <Sprout size={24} />
//             </div>
//             <span>FarmXpert</span>
//           </Link>

//           {/* Desktop Navigation - Right */}
//           <div className={styles1.agriv_hero_navLinks}>
//             {token ? (
//               // ✅ User is logged in
//               <div className={styles1.agriv_hero_rightSection}>
//                 <Link to="/dashboard" className={styles1.agriv_hero_dashboardBtn}>
//                   <LayoutDashboard size={18} />
//                   Dashboard
//                 </Link>
//                 <button onClick={handleLogout} className={styles1.agriv_hero_logoutBtn}>
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               // ✅ User is not logged in
//               <>
//                 <Link to="/login" className={styles1.agriv_hero_navLink}>
//                   <LogIn size={18} />
//                   Login
//                 </Link>
//                 <Link to="/signup" className={styles1.agriv_hero_navLinkSignup}>
//                   <UserPlus size={18} />
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className={styles1.agriv_hero_mobileMenuBtn}
//             onClick={toggleMobileMenu}
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {isMobileMenuOpen && (
//           <div className={styles1.agriv_hero_mobileMenu}>
//             {token ? (
//               // ✅ User is logged in - Mobile
//               <>
//                 <Link 
//                   to="/dashboard" 
//                   className={styles1.agriv_hero_mobileNavLink}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <LayoutDashboard size={20} />
//                   Dashboard
//                 </Link>
//                 <button 
//                   onClick={handleLogout} 
//                   className={styles1.agriv_hero_mobileNavLinkLogout}
//                 >
//                   <LogOut size={20} />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               // ✅ User is not logged in - Mobile
//               <>
//                 <Link 
//                   to="/login" 
//                   className={styles1.agriv_hero_mobileNavLink}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <LogIn size={20} />
//                   Login
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className={styles1.agriv_hero_mobileNavLinkSignup}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <UserPlus size={20} />
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* ===================== CAROUSEL ===================== */}
//       <div className={styles1.agriv_hero_arrowLeft} onClick={handlePrev}>&#8249;</div>
//       <div className={styles1.agriv_hero_arrowRight} onClick={handleNext}>&#8250;</div>

//       <div
//         className={styles1.agriv_hero_slidesWrapper}
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {slidesData.map((slide, index) => (
//           <div
//             key={index}
//             className={styles1.agriv_hero_bannerContainer}
//             style={{ backgroundImage: `url(${slide.bg})` }}
//           >
//             <div className={styles1.agriv_hero_overlay}></div>

//             <div className={styles1.agriv_hero_leftContent}>
//               <div className={styles1.agriv_hero_topLabel}>{slide.topLabel}</div>
//               <div className={styles1.agriv_hero_mainTitle}>{slide.mainTitle}</div>
//               <div className={styles1.agriv_hero_subText}>{slide.subText}</div>
//               <button
//                 className={styles1.agriv_hero_discoverBtn}
//                 onClick={handleGetStarted}
//               >
//                 {slide.buttonText}
//               </button>
//             </div>

//             <div className={styles1.agriv_hero_rightContent}>
//               <img src={slide.images.farmer} className={styles1.agriv_hero_farmerImg} alt="Farmer" />
//               <img src={slide.images.carrot} className={styles1.agriv_hero_carrotImg} alt="Carrot" />
//               <img src={slide.images.corn} className={styles1.agriv_hero_cornImg} alt="Corn" />
//               <img src={slide.images.badge} className={styles1.agriv_hero_naturalBadge} alt="Badge" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles1.agriv_hero_dots}>
//         {slidesData.map((_, idx) => (
//           <span
//             key={idx}
//             className={currentSlide === idx ? styles1.agriv_hero_active : ''}
//             onClick={() => setCurrentSlide(idx)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AgriHeroBanner;













// // HeroBanner.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Sprout,
//   ArrowUpRight,
//   Menu,
//   X,
//   Leaf,
//   ScanLine,
//   CloudSun,
//   LineChart,
// } from 'lucide-react';

// import styles from './HeroBanner.module.css';

// import farmer from '../assets/HeroFarmerImage.png';
// import fields from '../assets/HeroBackground.jpg';

// const slides = [
//   {
//     kicker: '01 — Crop intelligence',
//     title: 'Smart farming,',
//     accent: 'richer harvest.',
//     copy:
//       'FarmXpert reads your soil, weather and crop history, then tells you exactly what to plant, when to water and where disease is starting.',
//     stat: { value: '30%', label: 'yield lift' },
//   },
//   {
//     kicker: '02 — Field diagnostics',
//     title: 'Point a camera,',
//     accent: 'catch disease early.',
//     copy:
//       'Leaf-level detection trained on millions of field images. Get a diagnosis, a treatment plan and a cost estimate in under ten seconds.',
//     stat: { value: '10s', label: 'full diagnosis' },
//   },
// ];

// const capabilities = [
//   { icon: ScanLine, label: 'Disease scan' },
//   { icon: Leaf, label: 'Crop advisor' },
//   { icon: CloudSun, label: 'Weather windows' },
//   { icon: LineChart, label: 'Yield forecast' },
// ];

// const ticker = [
//   '50,000+ farmers',
//   '14 states',
//   'Soil-first advice',
//   'Offline ready',
//   '9 languages',
//   'Free for smallholders',
// ];

// export default function HeroBanner() {
//   const [active, setActive] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const slide = slides[active] || slides[0];

//   useEffect(() => {
//     const id = setInterval(
//       () => setActive((i) => (i + 1) % slides.length),
//       7000
//     );
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className={styles.shell}>
//       <img className={styles.bgImage} src={fields} alt="" aria-hidden="true" />
//       <div className={styles.glow} />

//       {/* ---------- NAV ---------- */}
//       <header className={styles.header}>
//         <Link to="/" className={styles.brand}>
//           <span className={styles.brandMark}>
//             <Sprout size={18} />
//           </span>
//           <span className={styles.brandName}>FarmXpert</span>
//         </Link>

//         <nav className={styles.nav}>
//           {/* Changed Platform to Dashboard with Link */}
//           <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
//           <a className={styles.navLink} href="#field">Field tools</a>
//           <a className={styles.navLink} href="#pricing">Pricing</a>
//           <Link to="/login" className={styles.navGhostBtn}>Sign in</Link>
//         </nav>

//         <button
//           type="button"
//           className={styles.menuBtn}
//           onClick={() => setMenuOpen((v) => !v)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </header>

//       {menuOpen && (
//         <div className={styles.mobileMenu}>
//           {/* Changed Platform to Dashboard with Link */}
//           <Link 
//             to="/dashboard" 
//             className={styles.mobileMenuLink}
//             onClick={() => setMenuOpen(false)}
//           >
//             Dashboard
//           </Link>
//           <a
//             href="#field"
//             className={styles.mobileMenuLink}
//             onClick={() => setMenuOpen(false)}
//           >
//             Field tools
//           </a>
//           <a
//             href="#pricing"
//             className={styles.mobileMenuLink}
//             onClick={() => setMenuOpen(false)}
//           >
//             Pricing
//           </a>
//           <Link
//             to="/login"
//             className={styles.mobileMenuLink}
//             onClick={() => setMenuOpen(false)}
//           >
//             Sign in
//           </Link>
//         </div>
//       )}

//       {/* ---------- HERO ---------- */}
//       <section className={styles.hero}>
//         <div className={styles.copyCol}>
//           <p className={styles.kicker}>{slide.kicker}</p>

//           <h1 className={styles.title}>
//             {slide.title}
//             <br />
//             <span className={styles.titleAccent}>{slide.accent}</span>
//           </h1>

//           <p className={styles.subText}>{slide.copy}</p>

//           <div className={styles.ctaRow}>
//             <a id="start" href="#platform" className={styles.primaryBtn}>
//               Start free
//               <ArrowUpRight size={14} />
//             </a>

//             <div className={styles.statBlock}>
//               <span className={styles.statValue}>{slide.stat.value}</span>
//               <span className={styles.statLabel}>{slide.stat.label}</span>
//             </div>
//           </div>

//           <div className={styles.dots}>
//             {slides.map((s, i) => (
//               <button
//                 key={s.kicker}
//                 type="button"
//                 aria-label={`Show slide ${i + 1}`}
//                 onClick={() => setActive(i)}
//                 className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles.visualCol}>
//           <div className={styles.arch}>
//             <img
//               className={styles.farmerImg}
//               src={farmer}
//               alt="Farmer reviewing crop insights on a tablet"
//             />
//           </div>

//           <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
//             <p className={styles.cardLabel}>Soil moisture</p>
//             <p className={styles.cardValue}>62%</p>
//             <p className={styles.cardNotePrimary}>Irrigate in 2 days</p>
//           </div>

//           <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
//             <p className={styles.cardLabel}>Leaf scan</p>
//             <p className={styles.cardValueSm}>Healthy</p>
//             <p className={styles.cardNoteAccent}>98.4% confidence</p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- CAPABILITIES ---------- */}
//       <div id="platform" className={styles.capGrid}>
//         {capabilities.map(({ icon: Icon, label }) => (
//           <div key={label} className={styles.capCard}>
//             <Icon size={14} className={styles.capIcon} />
//             <span>{label}</span>
//           </div>
//         ))}
//       </div>

//       {/* ---------- TICKER ---------- */}
//       <div id="field" className={styles.tickerWrap}>
//         <div className={styles.tickerTrack}>
//           {[...ticker, ...ticker].map((item, i) => (
//             <span key={`${item}-${i}`} className={styles.tickerItem}>
//               {item}
//               <span className={styles.tickerDot}>•</span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






















// // HeroBanner.jsx - Public Landing Page
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './HeroBanner.module.css';
// import farmer from '../assets/HeroFarmerImage.png';
// import naturalBadge from '../assets/HeroBadgeImage.png';
// import bgImage from '../assets/HeroBackground.jpg';
// import farmer2 from '../assets/HeroFarmerImage1.png';
// import bgImage2 from '../assets/HeroBackground1.jpg';

// const slidesData = [
//   {
//     bg: bgImage,
//     topLabel: '🌾 Welcome to FarmXpert',
//     mainTitle: (
//       <>
//         Smart Farming,<br />
//         <span className={styles.heroUnderline}>Better Harvest!</span>
//       </>
//     ),
//     subText: 'FarmXpert combines soil data, weather intelligence and crop analysis to help farmers make better decisions throughout the growing season.',
//     images: {
//       farmer: farmer,
//       badge: naturalBadge,
//     },
//     buttonText: 'Start Free',
//     features: ['Disease Detection', 'Crop Intelligence', 'Weather Intelligence', 'Yield Forecast']
//   },
//   {
//     bg: bgImage2,
//     topLabel: '🌱 Grow Smarter with AI',
//     mainTitle: (
//       <>
//         Technology Meets<br />
//         <span className={styles.heroUnderline}>Traditional Farming!</span>
//       </>
//     ),
//     subText: 'Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.',
//     images: {
//       farmer: farmer2,
//       badge: naturalBadge,
//     },
//     buttonText: 'Explore Features',
//     features: ['Precision Agriculture', 'Yield Prediction', 'Smart Irrigation', 'Soil Health']
//   },
// ];

// const HeroBanner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const totalSlides = slidesData.length;

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
//   };

//   useEffect(() => {
//     const timer = setInterval(handleNext, 6000);
//     return () => clearInterval(timer);
//   }, [currentSlide]);

//   return (
//     <div className={styles.heroContainer}>
//       {/* ===== NAVBAR ===== */}
//       <nav className={styles.publicNavbar}>
//         <div className={styles.navContent}>
//           <Link to="/" className={styles.logo}>
//             <span className={styles.logoIcon}>🌱</span>
//             <span className={styles.logoText}>Farm<span className={styles.logoHighlight}>Xpert</span></span>
//           </Link>

//           <div className={styles.navLinks}>
//             <a href="#features" className={styles.navLink}>Features</a>
//             <a href="#how-it-works" className={styles.navLink}>How It Works</a>
//             <a href="#solutions" className={styles.navLink}>Solutions</a>
//             <a href="#about" className={styles.navLink}>About</a>
//           </div>

//           <div className={styles.navActions}>
//             <Link to="/login" className={styles.navSignIn}>Sign In</Link>
//             <Link to="/register" className={styles.navStartFree}>Start Free</Link>
//           </div>

//           <button 
//             className={styles.mobileMenuBtn}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? '✕' : '☰'}
//           </button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className={styles.mobileMenu}>
//             <a href="#features" className={styles.mobileNavLink}>Features</a>
//             <a href="#how-it-works" className={styles.mobileNavLink}>How It Works</a>
//             <a href="#solutions" className={styles.mobileNavLink}>Solutions</a>
//             <a href="#about" className={styles.mobileNavLink}>About</a>
//             <Link to="/login" className={styles.mobileSignIn}>Sign In</Link>
//             <Link to="/register" className={styles.mobileStartFree}>Start Free</Link>
//           </div>
//         )}
//       </nav>

//       {/* ===== HERO SLIDER ===== */}
//       <div className={styles.sliderContainer}>
//         <button className={styles.arrowLeft} onClick={handlePrev}>‹</button>
//         <button className={styles.arrowRight} onClick={handleNext}>›</button>

//         <div 
//           className={styles.slidesWrapper}
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {slidesData.map((slide, index) => (
//             <div 
//               key={index} 
//               className={styles.heroSlide}
//               style={{ backgroundImage: `url(${slide.bg})` }}
//             >
//               <div className={styles.heroOverlay}></div>
              
//               <div className={styles.heroContent}>
//                 <div className={styles.heroLeft}>
//                   <span className={styles.topBadge}>{slide.topLabel}</span>
//                   <h1 className={styles.heroTitle}>{slide.mainTitle}</h1>
//                   <p className={styles.heroSubText}>{slide.subText}</p>
                  
//                   <div className={styles.heroActions}>
//                     <Link to="/register" className={styles.primaryBtn}>
//                       {slide.buttonText} <span className={styles.btnArrow}>→</span>
//                     </Link>
//                     <div className={styles.statBadge}>
//                       <span className={styles.statValue}>30%</span>
//                       <span className={styles.statLabel}>Yield Lift</span>
//                     </div>
//                   </div>

//                   <div className={styles.featurePills}>
//                     {slide.features.map((feature, idx) => (
//                       <span key={idx} className={styles.featurePill}>
//                         <span className={styles.pillDot}></span>
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className={styles.heroRight}>
//                   <img src={slide.images.farmer} alt="Farmer" className={styles.farmerImage} />
//                   <img src={slide.images.badge} alt="Badge" className={styles.badgeImage} />
//                   <div className={styles.decoCircle1}></div>
//                   <div className={styles.decoCircle2}></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className={styles.slideDots}>
//           {slidesData.map((_, idx) => (
//             <span 
//               key={idx} 
//               className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
//               onClick={() => setCurrentSlide(idx)}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;
























// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Sprout,
//   ArrowUpRight,
//   Menu,
//   X,
//   Leaf,
//   ScanLine,
//   CloudSun,
//   LineChart,
// } from 'lucide-react';

// import styles from './HeroBanner.module.css';

// import farmer from '../assets/HeroFarmerImage.png';
// import fields from '../assets/HeroBackground.jpg'; // any wide field photo

// const slides = [
//   {
//     kicker: '01 — Crop intelligence',
//     title: 'Smart farming,',
//     accent: 'richer harvest.',
//     copy:
//       'FarmXpert reads your soil, weather and crop history, then tells you exactly what to plant, when to water and where disease is starting.',
//     stat: { value: '30%', label: 'average yield lift' },
//   },
//   {
//     kicker: '02 — Field diagnostics',
//     title: 'Point a camera,',
//     accent: 'catch disease early.',
//     copy:
//       'Leaf-level detection trained on millions of field images. Get a diagnosis, a treatment plan and a cost estimate in under ten seconds.',
//     stat: { value: '10s', label: 'to a full diagnosis' },
//   },
// ];

// const capabilities = [
//   { icon: ScanLine, label: 'Disease scan' },
//   { icon: Leaf, label: 'Crop advisor' },
//   { icon: CloudSun, label: 'Weather windows' },
//   { icon: LineChart, label: 'Yield forecast' },
// ];

// const ticker = [
//   '50,000+ farmers',
//   '14 states',
//   'Soil-first advice',
//   'Offline ready',
//   '9 languages',
//   'Free for smallholders',
// ];

// export default function HeroBanner() {
//   const [active, setActive] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const slide = slides[active] || slides[0];

//   useEffect(() => {
//     const id = setInterval(
//       () => setActive((i) => (i + 1) % slides.length),
//       7000
//     );
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className={styles.shell}>
//       <img className={styles.bgImage} src={fields} alt="" aria-hidden="true" />
//       <div className={styles.glow} />

//       {/* ---------- NAV ---------- */}
//       <header className={styles.header}>
//         <Link to="/" className={styles.brand}>
//           <span className={styles.brandMark}>
//             <Sprout size={22} />
//           </span>
//           <span className={styles.brandName}>FarmXpert</span>
//         </Link>

//         <nav className={styles.nav}>
//           <a className={styles.navLink} href="#platform">Platform</a>
//           <a className={styles.navLink} href="#field">Field tools</a>
//           <a className={styles.navLink} href="#pricing">Pricing</a>
//           <Link to="/login" className={styles.navGhostBtn}>Sign in</Link>
//         </nav>

//         <button
//           type="button"
//           className={styles.menuBtn}
//           onClick={() => setMenuOpen((v) => !v)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </header>

//       {menuOpen && (
//         <div className={styles.mobileMenu}>
//           {['Platform', 'Field tools', 'Pricing', 'Sign in'].map((item) => (
//             <a
//               key={item}
//               href="#start"
//               className={styles.mobileMenuLink}
//               onClick={() => setMenuOpen(false)}
//             >
//               {item}
//             </a>
//           ))}
//         </div>
//       )}

//       {/* ---------- HERO ---------- */}
//       <section className={styles.hero}>
//         <div className={styles.copyCol}>
//           <p className={styles.kicker}>{slide.kicker}</p>

//           <h1 className={styles.title}>
//             {slide.title}
//             <br />
//             <span className={styles.titleAccent}>{slide.accent}</span>
//           </h1>

//           <p className={styles.subText}>{slide.copy}</p>

//           <div className={styles.ctaRow}>
//             <a id="start" href="#platform" className={styles.primaryBtn}>
//               Start free
//               <ArrowUpRight size={18} />
//             </a>

//             <div className={styles.statBlock}>
//               <span className={styles.statValue}>{slide.stat.value}</span>
//               <span className={styles.statLabel}>{slide.stat.label}</span>
//             </div>
//           </div>

//           <div className={styles.dots}>
//             {slides.map((s, i) => (
//               <button
//                 key={s.kicker}
//                 type="button"
//                 aria-label={`Show slide ${i + 1}`}
//                 onClick={() => setActive(i)}
//                 className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles.visualCol}>
//           <div className={styles.arch}>
//             <img
//               className={styles.farmerImg}
//               src={farmer}
//               alt="Farmer reviewing crop insights on a tablet"
//             />
//           </div>

//           <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
//             <p className={styles.cardLabel}>Soil moisture</p>
//             <p className={styles.cardValue}>62%</p>
//             <p className={styles.cardNotePrimary}>Irrigate in 2 days</p>
//           </div>

//           <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
//             <p className={styles.cardLabel}>Leaf scan</p>
//             <p className={styles.cardValueSm}>Healthy</p>
//             <p className={styles.cardNoteAccent}>98.4% confidence</p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- CAPABILITIES ---------- */}
//       <div id="platform" className={styles.capGrid}>
//         {capabilities.map(({ icon: Icon, label }) => (
//           <div key={label} className={styles.capCard}>
//             <Icon size={18} className={styles.capIcon} />
//             <span>{label}</span>
//           </div>
//         ))}
//       </div>

//       {/* ---------- TICKER ---------- */}
//       <div id="field" className={styles.tickerWrap}>
//         <div className={styles.tickerTrack}>
//           {[...ticker, ...ticker].map((item, i) => (
//             <span key={`${item}-${i}`} className={styles.tickerItem}>
//               {item}
//               <span className={styles.tickerDot}>•</span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }













// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Sprout,
//   ArrowUpRight,
//   Menu,
//   X,
//   Leaf,
//   ScanLine,
//   CloudSun,
//   LineChart,
// } from "lucide-react";

// import styles from "./HeroBanner.module.css";
// import farmer from "../assets/farmermain.png";

// const slides = [
//   {
//     kicker: "01 — Crop intelligence",
//     title: "Smart farming,",
//     accent: "richer harvest.",
//     copy: "FarmXpert reads your soil, weather and crop history, then tells you exactly what to plant, when to water and where disease is starting.",
//     stat: { value: "30%", label: "average yield lift" },
//   },
//   {
//     kicker: "02 — Field diagnostics",
//     title: "Point a camera,",
//     accent: "catch disease early.",
//     copy: "Leaf-level detection trained on millions of field images. Get a diagnosis, a treatment plan and a cost estimate in under ten seconds.",
//     stat: { value: "10s", label: "to a full diagnosis" },
//   },
// ];

// const capabilities = [
//   { icon: ScanLine, label: "Disease scan" },
//   { icon: Leaf, label: "Crop advisor" },
//   { icon: CloudSun, label: "Weather windows" },
//   { icon: LineChart, label: "Yield forecast" },
// ];

// export default function HeroBanner() {
//   const [active, setActive] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const shellRef = useRef(null);
//   const slide = slides[active] ?? slides[0];

//   useEffect(() => {
//     const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 7000);
//     return () => clearInterval(id);
//   }, []);

//   // cursor-following spotlight
//   useEffect(() => {
//     const el = shellRef.current;
//     if (!el) return;
//     const onMove = (e) => {
//       const r = el.getBoundingClientRect();
//       el.style.setProperty("--mx", `${e.clientX - r.left}px`);
//       el.style.setProperty("--my", `${e.clientY - r.top}px`);
//     };
//     el.addEventListener("mousemove", onMove);
//     return () => el.removeEventListener("mousemove", onMove);
//   }, []);

//   return (
//     <div className={styles["shell"]} ref={shellRef}>
//       <div className={styles["contours"]} />
//       <div className={styles["spotlight"]} />
//       <div className={styles["grain"]} />

//       {/* ---------- NAV ---------- */}
//       <header className={styles["header"]}>
//         <Link to="/" className={styles["brand"]}>
//           <span className={styles["brandMark"]}>
//             <Sprout size={20} />
//           </span>
//           <span className={styles["brandName"]}>FarmXpert</span>
//         </Link>

//         <nav className={styles["nav"]}>
//           <a className={styles["navLink"]} href="#platform">Platform</a>
//           <a className={styles["navLink"]} href="#field">Field tools</a>
//           <a className={styles["navLink"]} href="#pricing">Pricing</a>
//         </nav>

//         <Link to="/login" className={styles["navGhostBtn"]}>
//           Sign in
//         </Link>

//         <button
//           type="button"
//           className={styles["menuBtn"]}
//           onClick={() => setMenuOpen((v) => !v)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </header>

//       {menuOpen && (
//         <div className={styles["mobileMenu"]}>
//           {["Platform", "Field tools", "Pricing"].map((item) => (
//             <a
//               key={item}
//               href="#start"
//               className={styles["mobileMenuLink"]}
//               onClick={() => setMenuOpen(false)}
//             >
//               {item}
//             </a>
//           ))}
//           <Link
//             to="/login"
//             className={styles["mobileMenuLink"]}
//             onClick={() => setMenuOpen(false)}
//           >
//             Sign in
//           </Link>
//         </div>
//       )}

//       {/* ---------- HERO ---------- */}
//       <section className={styles["hero"]}>
//         <div className={styles["copyCol"]}>
//           <p className={styles["kicker"]}>{slide.kicker}</p>

//           <h1 className={styles["title"]}>
//             {slide.title}
//             <br />
//             <span className={styles["titleAccent"]}>{slide.accent}</span>
//           </h1>

//           <p className={styles["subText"]}>{slide.copy}</p>

//           <div className={styles["ctaRow"]}>
//             <a id="start" href="#platform" className={styles["primaryBtn"]}>
//               Start free
//               <ArrowUpRight size={18} />
//             </a>

//             <div className={styles["statBlock"]}>
//               <span className={styles["statValue"]}>{slide.stat.value}</span>
//               <span className={styles["statLabel"]}>{slide.stat.label}</span>
//             </div>
//           </div>

//           <div className={styles["dots"]}>
//             {slides.map((s, i) => (
//               <button
//                 key={s.kicker}
//                 type="button"
//                 aria-label={`Show slide ${i + 1}`}
//                 onClick={() => setActive(i)}
//                 className={`${styles["dot"]} ${i === active ? styles["dotActive"] : ""}`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles["visualCol"]}>
//           <div className={styles["farmerWrap"]}>
//             <img
//               className={styles["farmerImg"]}
//               src={farmer}
//               width={912}
//               height={1104}
//               alt="Farmer reviewing crop insights"
//             />
//             <span className={styles["scanline"]} />

//             <div className={`${styles["floatCard"]} ${styles["floatCardLeft"]}`}>
//               <p className={styles["cardLabel"]}>Soil moisture</p>
//               <p className={styles["cardValue"]}>62%</p>
//               <p className={styles["cardNotePrimary"]}>Irrigate in 2 days</p>
//             </div>

//             <div className={`${styles["floatCard"]} ${styles["floatCardRight"]}`}>
//               <p className={styles["cardLabel"]}>Leaf scan</p>
//               <p className={styles["cardValueSm"]}>Healthy</p>
//               <p className={styles["cardNoteAccent"]}>98.4% confidence</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------- CAPABILITIES ---------- */}
//       <div id="platform" className={styles["capGrid"]}>
//         {capabilities.map(({ icon: Icon, label }) => (
//           <div key={label} className={styles["capCard"]}>
//             <Icon size={18} className={styles["capIcon"]} />
//             <span>{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }













// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   Sprout,
//   ArrowUpRight,
//   Menu,
//   X,
//   Leaf,
//   ScanLine,
//   CloudSun,
//   LineChart,
// } from "lucide-react";

// import Cookies from "js-cookie";

// import styles from "./HeroBanner.module.css";
// import farmer from "../assets/farmermain.png";

// /* =========================================================
//    HERO SLIDES
//    ========================================================= */

// const slides = [
//   {
//     kicker: "01 — Smart crop advisory",

//     title: "Smarter farming,",

//     accent: "better harvests.",

//     copy:
//       "FarmXpert analyzes your soil, climate and farming conditions to recommend suitable crops and help you make better decisions throughout the growing season.",

//     stat: {
//       value: "NPK",
//       label: "soil-based crop insights",
//     },
//   },

//   {
//     kicker: "02 — Plant disease detection",

//     title: "Scan your crop,",

//     accent: "detect disease early.",

//     copy:
//       "Upload a crop or leaf image to identify possible diseases and receive intelligent insights that can help farmers respond before the problem spreads.",

//     stat: {
//       value: "AI",
//       label: "powered crop diagnosis",
//     },
//   },
// ];

// /* =========================================================
//    HERO CAPABILITIES
//    ========================================================= */

// const capabilities = [
//   {
//     icon: ScanLine,
//     label: "Disease prediction",
//   },

//   {
//     icon: Leaf,
//     label: "Crop recommendation",
//   },

//   {
//     icon: CloudSun,
//     label: "Weather insights",
//   },

//   {
//     icon: LineChart,
//     label: "Yield forecasting",
//   },
// ];

// /* =========================================================
//    HERO COMPONENT
//    ========================================================= */

// export default function HeroBanner() {
//   const [active, setActive] = useState(0);

//   const [menuOpen, setMenuOpen] = useState(false);

//   const shellRef = useRef(null);

//   const slide = slides[active] ?? slides[0];

//   /* =======================================================
//      CHECK WHETHER USER IS ALREADY LOGGED IN
//      ======================================================= */

//   const isLoggedIn = Boolean(
//     Cookies.get("token")
//   );

//   /* =======================================================
//      AUTOMATIC SLIDE CHANGE
//      ======================================================= */

//   useEffect(() => {
//     const id = setInterval(() => {
//       setActive(
//         (i) => (i + 1) % slides.length
//       );
//     }, 7000);

//     return () => clearInterval(id);
//   }, []);

//   /* =======================================================
//      CURSOR FOLLOWING SPOTLIGHT
//      ======================================================= */

//   useEffect(() => {
//     const el = shellRef.current;

//     if (!el) return;

//     const onMove = (e) => {
//       const r = el.getBoundingClientRect();

//       el.style.setProperty(
//         "--mx",
//         `${e.clientX - r.left}px`
//       );

//       el.style.setProperty(
//         "--my",
//         `${e.clientY - r.top}px`
//       );
//     };

//     el.addEventListener(
//       "mousemove",
//       onMove
//     );

//     return () => {
//       el.removeEventListener(
//         "mousemove",
//         onMove
//       );
//     };
//   }, []);

//   /* =======================================================
//      RENDER
//      ======================================================= */

//   return (
//     <div
//       className={styles["shell"]}
//       ref={shellRef}
//     >

//       {/* ===================================================
//           BACKGROUND EFFECTS
//           =================================================== */}

//       <div
//         className={styles["contours"]}
//       />

//       <div
//         className={styles["spotlight"]}
//       />

//       <div
//         className={styles["grain"]}
//       />

//       {/* ===================================================
//           NAVIGATION
//           =================================================== */}

//       <header
//         className={styles["header"]}
//       >

//         {/* BRAND */}

//         <Link
//           to="/"
//           className={styles["brand"]}
//         >

//           <span
//             className={styles["brandMark"]}
//           >
//             <Sprout size={20} />
//           </span>

//           <span
//             className={styles["brandName"]}
//           >
//             FarmXpert
//           </span>

//         </Link>


//         {/* DESKTOP NAVIGATION */}

//         <nav
//           className={styles["nav"]}
//         >

//           <a
//             className={styles["navLink"]}
//             href="#platform"
//           >
//             Smart Farming
//           </a>

//           <a
//             className={styles["navLink"]}
//             href="#platform"
//           >
//             Farm Tools
//           </a>

//           <a
//             className={styles["navLink"]}
//             href="#platform"
//           >
//             Features
//           </a>

//         </nav>


//         {/* LOGIN / DASHBOARD BUTTON */}

//         <Link
//           to={
//             isLoggedIn
//               ? "/dashboard"
//               : "/login"
//           }
//           className={
//             styles["navGhostBtn"]
//           }
//         >

//           {isLoggedIn
//             ? "🌱 Open My Farm"
//             : "Sign In"}

//         </Link>


//         {/* MOBILE MENU BUTTON */}

//         <button
//           type="button"
//           className={
//             styles["menuBtn"]
//           }
//           onClick={() =>
//             setMenuOpen(
//               (v) => !v
//             )
//           }
//           aria-label="Toggle menu"
//         >

//           {menuOpen ? (
//             <X size={22} />
//           ) : (
//             <Menu size={22} />
//           )}

//         </button>

//       </header>


//       {/* ===================================================
//           MOBILE MENU
//           =================================================== */}

//       {menuOpen && (
//         <div
//           className={
//             styles["mobileMenu"]
//           }
//         >

//           <a
//             href="#platform"
//             className={
//               styles["mobileMenuLink"]
//             }
//             onClick={() =>
//               setMenuOpen(false)
//             }
//           >
//             Smart Farming
//           </a>


//           <a
//             href="#platform"
//             className={
//               styles["mobileMenuLink"]
//             }
//             onClick={() =>
//               setMenuOpen(false)
//             }
//           >
//             Farm Tools
//           </a>


//           <a
//             href="#platform"
//             className={
//               styles["mobileMenuLink"]
//             }
//             onClick={() =>
//               setMenuOpen(false)
//             }
//           >
//             Features
//           </a>


//           <Link
//             to={
//               isLoggedIn
//                 ? "/dashboard"
//                 : "/login"
//             }
//             className={
//               styles["mobileMenuLink"]
//             }
//             onClick={() =>
//               setMenuOpen(false)
//             }
//           >

//             {isLoggedIn
//               ? "🌱 Open My Farm"
//               : "Sign In"}

//           </Link>

//         </div>
//       )}


//       {/* ===================================================
//           HERO SECTION
//           =================================================== */}

//       <section
//         className={styles["hero"]}
//       >

//         {/* =================================================
//             LEFT CONTENT
//             ================================================= */}

//         <div
//           className={styles["copyCol"]}
//         >

//           <p
//             className={styles["kicker"]}
//           >
//             {slide.kicker}
//           </p>


//           <h1
//             className={styles["title"]}
//           >

//             {slide.title}

//             <br />

//             <span
//               className={
//                 styles["titleAccent"]
//               }
//             >
//               {slide.accent}
//             </span>

//           </h1>


//           <p
//             className={styles["subText"]}
//           >
//             {slide.copy}
//           </p>


//           {/* CTA */}

//           <div
//             className={styles["ctaRow"]}
//           >

//             <Link
//               id="start"
//               to={
//                 isLoggedIn
//                   ? "/dashboard"
//                   : "/login"
//               }
//               className={
//                 styles["primaryBtn"]
//               }
//             >

//               {isLoggedIn
//                 ? "🌱 Open My Farm"
//                 : "Get Started"}

//               <ArrowUpRight
//                 size={18}
//               />

//             </Link>


//             {/* SLIDE STAT */}

//             <div
//               className={
//                 styles["statBlock"]
//               }
//             >

//               <span
//                 className={
//                   styles["statValue"]
//                 }
//               >
//                 {slide.stat.value}
//               </span>

//               <span
//                 className={
//                   styles["statLabel"]
//                 }
//               >
//                 {slide.stat.label}
//               </span>

//             </div>

//           </div>


//           {/* SLIDE DOTS */}

//           <div
//             className={styles["dots"]}
//           >

//             {slides.map(
//               (s, i) => (
//                 <button
//                   key={s.kicker}
//                   type="button"
//                   aria-label={
//                     `Show slide ${
//                       i + 1
//                     }`
//                   }
//                   onClick={() =>
//                     setActive(i)
//                   }
//                   className={`
//                     ${styles["dot"]}
//                     ${
//                       i === active
//                         ? styles[
//                             "dotActive"
//                           ]
//                         : ""
//                     }
//                   `}
//                 />
//               )
//             )}

//           </div>

//         </div>


//         {/* =================================================
//             FARMER VISUAL
//             ================================================= */}

//         <div
//           className={
//             styles["visualCol"]
//           }
//         >

//           <div
//             className={
//               styles["farmerWrap"]
//             }
//           >

//             {/* FARMER IMAGE */}

//             <img
//               className={
//                 styles["farmerImg"]
//               }
//               src={farmer}
//               width={912}
//               height={1104}
//               alt="Farmer using FarmXpert smart agriculture insights"
//             />


//             {/* SCANNING LINE */}

//             <span
//               className={
//                 styles["scanline"]
//               }
//             />


//             {/* =================================================
//                 SOIL ANALYSIS CARD
//                 ================================================= */}

//             <div
//               className={`
//                 ${styles["floatCard"]}
//                 ${styles["floatCardLeft"]}
//               `}
//             >

//               <p
//                 className={
//                   styles["cardLabel"]
//                 }
//               >
//                 Soil Analysis
//               </p>


//               <p
//                 className={
//                   styles["cardValue"]
//                 }
//               >
//                 NPK
//               </p>


//               <p
//                 className={
//                   styles[
//                     "cardNotePrimary"
//                   ]
//                 }
//               >
//                 Smart crop insights
//               </p>

//             </div>


//             {/* =================================================
//                 DISEASE PREDICTION CARD
//                 ================================================= */}

//             <div
//               className={`
//                 ${styles["floatCard"]}
//                 ${styles["floatCardRight"]}
//               `}
//             >

//               <p
//                 className={
//                   styles["cardLabel"]
//                 }
//               >
//                 Disease Prediction
//               </p>


//               <p
//                 className={
//                   styles["cardValueSm"]
//                 }
//               >
//                 AI Powered
//               </p>


//               <p
//                 className={
//                   styles[
//                     "cardNoteAccent"
//                   ]
//                 }
//               >
//                 Early crop detection
//               </p>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ===================================================
//           HERO CAPABILITIES
//           This is the final part of the first page.
//           =================================================== */}

//       <div
//         id="platform"
//         className={
//           styles["capGrid"]
//         }
//       >

//         {capabilities.map(
//           ({
//             icon: Icon,
//             label,
//           }) => (

//             <div
//               key={label}
//               className={
//                 styles["capCard"]
//               }
//             >

//               <Icon
//                 size={18}
//                 className={
//                   styles["capIcon"]
//                 }
//               />

//               <span>
//                 {label}
//               </span>

//             </div>

//           )
//         )}

//       </div>

//     </div>
//   );
// }
















// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   Sprout,
//   ArrowUpRight,
//   Menu,
//   X,
//   Leaf,
//   ScanLine,
//   CloudSun,
//   LineChart,
//   FlaskConical,
//   ShoppingBasket,
//   Languages,
//   Brain,
//   Compass,
//   Droplets,
//   Satellite,
// } from "lucide-react";

// import Cookies from "js-cookie";

// import styles from "./HeroBanner.module.css";
// import farmer from "../assets/farmermain.png";
// import farmfield from "../assets/farmfield.jpg";

// /* =========================================================
//    HERO SLIDES
//    ========================================================= */

// const slides = [
//   {
//     kicker: "01 — Smart crop advisory",
//     title: "Smarter farming,",
//     accent: "better harvests.",
//     copy:
//       "FarmXpert analyzes your soil, climate and farming conditions to recommend suitable crops and help you make better decisions throughout the growing season.",
//     stat: {
//       value: "NPK",
//       label: "soil-based crop insights",
//     },
//   },
//   {
//     kicker: "02 — Plant disease detection",
//     title: "Scan your crop,",
//     accent: "detect disease early.",
//     copy:
//       "Upload a crop or leaf image to identify possible diseases and receive intelligent insights that can help farmers respond before the problem spreads.",
//     stat: {
//       value: "AI",
//       label: "powered crop diagnosis",
//     },
//   },
// ];

// /* =========================================================
//    HERO CAPABILITIES
//    ========================================================= */

// const capabilities = [
//   { icon: ScanLine, label: "Disease prediction" },
//   { icon: Leaf, label: "Crop recommendation" },
//   { icon: CloudSun, label: "Weather insights" },
//   { icon: LineChart, label: "Yield forecasting" },
// ];

// /* =========================================================
//    LANDING PAGE FEATURES
//    ========================================================= */

// const features = [
//   {
//     icon: Leaf,
//     title: "Crop Recommendation",
//     text: "Get suitable crop suggestions based on soil and NPK values.",
//   },
//   {
//     icon: ScanLine,
//     title: "Disease Prediction",
//     text: "Upload a crop image and identify possible diseases using AI.",
//   },
//   {
//     icon: CloudSun,
//     title: "Weather Insights",
//     text: "Check weather conditions to plan your farming activities.",
//   },
//   {
//     icon: LineChart,
//     title: "Yield Forecast",
//     text: "Get insights into expected crop yield and farm productivity.",
//   },
//   {
//     icon: FlaskConical,
//     title: "Soil Testing",
//     text: "Find nearby soil testing centers easily.",
//   },
//   {
//     icon: ShoppingBasket,
//     title: "Farm Store",
//     text: "Explore seeds, fertilizers and other farming products.",
//   },
// ];

// /* =========================================================
//    HOW FARMXPERT HELPS
//    ========================================================= */

// const steps = [
//   {
//     icon: Satellite,
//     title: "Analyze",
//     text: "Understand your soil, crops and weather.",
//   },
//   {
//     icon: Brain,
//     title: "Predict",
//     text: "Get AI-powered crop, disease and yield insights.",
//   },
//   {
//     icon: Compass,
//     title: "Decide",
//     text: "Make smarter decisions for better farm management.",
//   },
// ];

// /* =========================================================
//    SCROLL REVEAL HELPER
//    ========================================================= */

// function Reveal({ children, delay = 0, className = "" }) {
//   const ref = useRef(null);
//   const [shown, setShown] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShown(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );

//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`${styles.reveal} ${shown ? styles.revealIn : ""} ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    HERO COMPONENT
//    ========================================================= */

// export default function HeroBanner() {
//   const [active, setActive] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const shellRef = useRef(null);
//   const slide = slides[active] ?? slides[0];

//   const isLoggedIn = Boolean(Cookies.get("token"));

//   useEffect(() => {
//     const id = setInterval(() => {
//       setActive((i) => (i + 1) % slides.length);
//     }, 7000);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     const el = shellRef.current;
//     if (!el) return;

//     const onMove = (e) => {
//       const r = el.getBoundingClientRect();
//       el.style.setProperty("--mx", `${e.clientX - r.left}px`);
//       el.style.setProperty("--my", `${e.clientY - r.top}px`);
//     };

//     el.addEventListener("mousemove", onMove);
//     return () => el.removeEventListener("mousemove", onMove);
//   }, []);

//   return (
//     <>
//       {/* ===================================================
//           HERO / FIRST PAGE
//           =================================================== */}

//       <div className={styles.shell} ref={shellRef}>
//         {/* BACKGROUND EFFECTS */}
//         <div className={styles.contours} />
//         <div className={styles.spotlight} />
//         <div className={styles.grain} />

//         {/* ===================================================
//             NAVIGATION
//             =================================================== */}

//         <header className={styles.header}>
//           <Link to="/" className={styles.brand}>
//             <span className={styles.brandMark}>
//               <Sprout size={20} />
//             </span>
//             <span className={styles.brandName}>FarmXpert</span>
//           </Link>

//           <Link
//             to={isLoggedIn ? "/dashboard" : "/login"}
//             className={styles.navGhostBtn}
//           >
//             {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
//           </Link>

//           <button
//             type="button"
//             className={styles.menuBtn}
//             onClick={() => setMenuOpen((v) => !v)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </header>

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div className={styles.mobileMenu}>
//             <a
//               href="#platform"
//               className={styles.mobileMenuLink}
//               onClick={() => setMenuOpen(false)}
//             >
//               Smart Farming
//             </a>
//             <a
//               href="#platform"
//               className={styles.mobileMenuLink}
//               onClick={() => setMenuOpen(false)}
//             >
//               Farm Tools
//             </a>
//             <a
//               href="#platform"
//               className={styles.mobileMenuLink}
//               onClick={() => setMenuOpen(false)}
//             >
//               Features
//             </a>
//             <Link
//               to={isLoggedIn ? "/dashboard" : "/login"}
//               className={styles.mobileMenuLink}
//               onClick={() => setMenuOpen(false)}
//             >
//               {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
//             </Link>
//           </div>
//         )}

//         {/* ===================================================
//             HERO SECTION
//             =================================================== */}

//         <section className={styles.hero}>
//           {/* LEFT CONTENT */}
//           <div className={styles.copyCol}>
//             <p className={styles.kicker}>{slide.kicker}</p>

//             <h1 className={styles.title}>
//               {slide.title}
//               <br />
//               <span className={styles.titleAccent}>{slide.accent}</span>
//             </h1>

//             <p className={styles.subText}>{slide.copy}</p>

//             <div className={styles.ctaRow}>
//               <Link
//                 id="start"
//                 to={isLoggedIn ? "/dashboard" : "/login"}
//                 className={styles.primaryBtn}
//               >
//                 {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
//                 <ArrowUpRight size={18} />
//               </Link>

//               <div className={styles.statBlock}>
//                 <span className={styles.statValue}>{slide.stat.value}</span>
//                 <span className={styles.statLabel}>{slide.stat.label}</span>
//               </div>
//             </div>

//             <div className={styles.dots}>
//               {slides.map((s, i) => (
//                 <button
//                   key={s.kicker}
//                   type="button"
//                   aria-label={`Show slide ${i + 1}`}
//                   onClick={() => setActive(i)}
//                   className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* RIGHT VISUAL */}
//           <div className={styles.visualCol}>
//             <div className={styles.farmerWrap}>
//               <img
//                 className={styles.farmerImg}
//                 src={farmer}
//                 width={912}
//                 height={1104}
//                 alt="Farmer using FarmXpert smart agriculture insights"
//               />
//               <span className={styles.scanline} />

//               <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
//                 <p className={styles.cardLabel}>Soil Analysis</p>
//                 <p className={styles.cardValue}>NPK</p>
//                 <p className={styles.cardNotePrimary}>Smart crop insights</p>
//               </div>

//               <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
//                 <p className={styles.cardLabel}>Disease Prediction</p>
//                 <p className={styles.cardValueSm}>AI Powered</p>
//                 <p className={styles.cardNoteAccent}>Early crop detection</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CAPABILITIES */}
//         <div id="platform" className={styles.capGrid}>
//           {capabilities.map(({ icon: Icon, label }) => (
//             <div key={label} className={styles.capCard}>
//               <Icon size={18} className={styles.capIcon} />
//               <span>{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* =====================================================
//           PAGE CONTENT BELOW HERO
//           ===================================================== */}

//       <div className={styles.page}>
//         {/* 1. ABOUT */}
//         <section id="about" className={`${styles.section} ${styles.about}`}>
//           <Reveal>
//             <p className={styles.sectionTag}>About FarmXpert</p>
//             <h2 className={styles.sectionTitle}>Smart technology for smarter farming</h2>
//             <p className={styles.sectionText}>
//               FarmXpert is a smart agriculture assistant that helps farmers make
//               better decisions using soil data, weather information and AI-powered
//               insights.
//             </p>
//             <div className={styles.aboutPills}>
//               <span className={styles.pill}>
//                 <Droplets size={15} /> Soil data
//               </span>
//               <span className={styles.pill}>
//                 <CloudSun size={15} /> Weather aware
//               </span>
//               <span className={styles.pill}>
//                 <Brain size={15} /> AI insights
//               </span>
//             </div>
//           </Reveal>

//           <Reveal delay={120}>
//             <div className={styles.aboutCard}>
//               <img
//                 src={farmfield}
//                 alt="Green farm field at sunrise"
//                 className={styles.aboutImg}
//                 loading="lazy"
//                 width={1200}
//                 height={800}
//               />
//               <span className={styles.aboutGlow} />
//             </div>
//           </Reveal>
//         </section>

//         {/* 2. FEATURES */}
//         <section id="features" className={styles.section}>
//           <Reveal>
//             <p className={styles.sectionTag}>Smart farming features</p>
//             <h2 className={styles.sectionTitle}>Everything your farm needs, in one place</h2>
//           </Reveal>

//           <div className={styles.featureGrid}>
//             {features.map(({ icon: Icon, title, text }, i) => (
//               <Reveal key={title} delay={i * 70}>
//                 <article className={styles.featureCard}>
//                   <span className={styles.featureIcon}>
//                     <Icon size={20} />
//                   </span>
//                   <h3 className={styles.featureTitle}>{title}</h3>
//                   <p className={styles.featureText}>{text}</p>
//                 </article>
//               </Reveal>
//             ))}
//           </div>
//         </section>

//         {/* 3. HOW IT HELPS */}
//         <section id="how" className={styles.section}>
//           <Reveal>
//             <p className={styles.sectionTag}>How FarmXpert helps</p>
//             <h2 className={styles.sectionTitle}>Three simple steps</h2>
//           </Reveal>

//           <div className={styles.steps}>
//             {steps.map(({ icon: Icon, title, text }, i) => (
//               <Reveal key={title} delay={i * 90}>
//                 <article className={styles.stepCard}>
//                   <span className={styles.stepNum}>0{i + 1}</span>
//                   <h3 className={styles.stepHead}>
//                     <Icon size={18} /> {title}
//                   </h3>
//                   <p className={styles.stepText}>{text}</p>
//                 </article>
//               </Reveal>
//             ))}
//           </div>
//         </section>

//         {/* 4. MULTILINGUAL SUPPORT */}
//         <section className={styles.section}>
//           <Reveal>
//             <div className={styles.langStrip}>
//               <div>
//                 <p className={styles.sectionTag}>
//                   <Languages size={13} style={{ verticalAlign: "-2px" }} />{" "}
//                   Multilingual support
//                 </p>
//                 <h2 className={styles.langTitle}>Built for every farmer</h2>
//                 <p className={styles.langText}>
//                   FarmXpert supports English, తెలుగు and हिन्दी to make smart
//                   farming tools easier to use.
//                 </p>
//               </div>
//               <div className={styles.langChips}>
//                 <span className={styles.langChip}>English</span>
//                 <span className={styles.langChip}>తెలుగు</span>
//                 <span className={styles.langChip}>हिन्दी</span>
//               </div>
//             </div>
//           </Reveal>
//         </section>

//         {/* 5. FINAL CTA */}
//         <section className={styles.section}>
//           <Reveal>
//             <div className={styles.ctaCard}>
//               <h2 className={styles.ctaTitle}>Make smarter decisions for your farm.</h2>
//               <p className={styles.ctaText}>
//                 Explore FarmXpert's intelligent tools and take your farming to the
//                 next level.
//               </p>
//               <div className={styles.ctaBtnRow}>
//                 <Link
//                   to={isLoggedIn ? "/dashboard" : "/login"}
//                   className={styles.primaryBtn}
//                 >
//                   {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
//                   <ArrowUpRight size={18} />
//                 </Link>
//               </div>
//             </div>
//           </Reveal>
//         </section>

//         {/* FOOTER */}
//         <footer className={styles.footer}>
//           <div className={styles.footerInner}>
//             <span>© {new Date().getFullYear()} FarmXpert — Smart Agriculture Assistant</span>
//             <div className={styles.footerLinks}>
//               <a href="#about" className={styles.footerLink}>About</a>
//               <a href="#features" className={styles.footerLink}>Features</a>
//               <Link
//                 to={isLoggedIn ? "/dashboard" : "/login"}
//                 className={styles.footerLink}
//               >
//                 {isLoggedIn ? "Open My Farm" : "Sign In"}
//               </Link>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }












import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Leaf,
  ScanLine,
  CloudSun,
  LineChart,
  FlaskConical,
  ShoppingBasket,
  Languages,
  Brain,
  Compass,
  Droplets,
  Satellite,
  CheckCircle2,
  Target,
  Users,
  Quote,
  Star,
  Globe2,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Cookies from "js-cookie";

import styles from "./HeroBanner.module.css";
import farmer from "../assets/farmermain.png";
import farmfield from "../assets/farmfield.jpg";

/* =========================================================
   HERO SLIDES
   ========================================================= */

const slides = [
  {
    kicker: "01 — Smart crop advisory",
    title: "Smarter farming,",
    accent: "better harvests.",
    copy:
      "FarmXpert analyzes your soil, climate and farming conditions to recommend suitable crops and help you make better decisions throughout the growing season.",
    stat: {
      value: "NPK",
      label: "soil-based crop insights",
    },
  },
  {
    kicker: "02 — Plant disease detection",
    title: "Scan your crop,",
    accent: "detect disease early.",
    copy:
      "Upload a crop or leaf image to identify possible diseases and receive intelligent insights that can help farmers respond before the problem spreads.",
    stat: {
      value: "AI",
      label: "powered crop diagnosis",
    },
  },
];

/* =========================================================
   HERO CAPABILITIES
   ========================================================= */

const capabilities = [
  { icon: ScanLine, label: "Disease prediction" },
  { icon: Leaf, label: "Crop recommendation" },
  { icon: CloudSun, label: "Weather insights" },
  { icon: LineChart, label: "Yield forecasting" },
];

/* =========================================================
   ABOUT
   ========================================================= */

const aboutPoints = [
  "Personalized crop plans from your soil's NPK profile",
  "Early disease alerts from a single leaf photo",
  "Hyperlocal weather and irrigation guidance",
  "Market-aware yield and profit forecasts",
];

const aboutPills = [
  { icon: Leaf, label: "Soil data" },
  { icon: CloudSun, label: "Weather aware" },
  { icon: Brain, label: "AI insights" },
  { icon: Droplets, label: "Irrigation guidance" },
];

const stats = [
  { value: 12500, suffix: "+", label: "Farmers onboard" },
  { value: 40, suffix: "+", label: "Crops supported" },
  { value: 98, suffix: "%", label: "Detection accuracy" },
  { value: 3, suffix: "", label: "Languages" },
];

/* =========================================================
   MARQUEE STRIP
   ========================================================= */

const marqueeItems = [
  "Crop Advisory",
  "Disease Detection",
  "Weather Insights",
  "Yield Forecast",
  "Soil Testing",
  "Farm Store",
  "Multilingual Support",
];

/* =========================================================
   LANDING PAGE FEATURES
   ========================================================= */

const features = [
  {
    icon: Leaf,
    title: "Crop Recommendation",
    text: "Get suitable crop suggestions based on your soil type, NPK values, season and local climate patterns — so every sowing decision is backed by data.",
    wide: true,
    chips: ["NPK levels", "pH balance", "Rainfall", "Soil type"],
  },
  {
    icon: ScanLine,
    title: "Disease Prediction",
    text: "Upload a crop image and identify possible diseases using AI before they spread.",
  },
  {
    icon: CloudSun,
    title: "Weather Insights",
    text: "Hyperlocal forecasts and alerts to plan sowing, spraying and irrigation.",
  },
  {
    icon: LineChart,
    title: "Yield Forecast",
    text: "Estimate expected yield and plan harvest, storage and sales in advance.",
  },
  {
    icon: FlaskConical,
    title: "Soil Testing",
    text: "Find nearby soil testing centers and understand your soil health report.",
  },
  {
    icon: ShoppingBasket,
    title: "Farm Store",
    text: "Explore quality seeds, fertilizers and tools from trusted sellers.",
  },
];

/* =========================================================
   HOW FARMXPERT HELPS
   ========================================================= */

const steps = [
  {
    icon: Satellite,
    title: "Analyze",
    text: "Understand your soil, crops and weather.",
  },
  {
    icon: Brain,
    title: "Predict",
    text: "Get AI-powered crop, disease and yield insights.",
  },
  {
    icon: Compass,
    title: "Decide",
    text: "Make smarter decisions for better farm management.",
  },
];

/* =========================================================
   TESTIMONIALS
   ========================================================= */

const testimonials = [
  {
    initials: "RG",
    name: "Ramesh Goud",
    role: "Cotton farmer · Telangana",
    text: "FarmXpert flagged leaf spot on my cotton before I could see it spread. I treated it early and saved half my crop this season.",
  },
  {
    initials: "SD",
    name: "Sunita Devi",
    role: "Wheat farmer · Uttar Pradesh",
    text: "The crop suggestions matched my soil report perfectly. My yield went up and I finally feel confident about what to sow.",
  },
  {
    initials: "KM",
    name: "Krishna Murthy",
    role: "Rice farmer · Andhra Pradesh",
    text: "Weather alerts in Telugu help me plan spraying and irrigation without any guesswork. It feels like an expert in my pocket.",
  },
];

/* =========================================================
   SCROLL REVEAL HELPER
   ========================================================= */

function Reveal({ children, delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${styles.reveal} ${shown ? styles.revealIn : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ANIMATED COUNTER
   ========================================================= */

function CountUp({ to, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    let start;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const tick = (t) => {
          if (!start) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* =========================================================
   MOUSE-TRACKING GLOW HANDLER (for cards)
   ========================================================= */

const setGlow = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--gx", `${e.clientX - r.left}px`);
  el.style.setProperty("--gy", `${e.clientY - r.top}px`);
};

/* =========================================================
   HERO COMPONENT
   ========================================================= */

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef(null);
  const slide = slides[active] ?? slides[0];

  const isLoggedIn = Boolean(Cookies.get("token"));

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* ===================================================
          HERO / FIRST PAGE
          =================================================== */}

      <section className={styles.shell} ref={shellRef}>
        {/* BACKGROUND EFFECTS */}
        <div className={styles.contours} />
        <div className={styles.spotlight} />
        <div className={styles.grain} />

        {/* ===================================================
            NAVIGATION
            =================================================== */}

        <header className={styles.header}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark}>
              <Sprout size={22} />
            </span>
            <span className={styles.brandName}>FarmXpert</span>
          </Link>

          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className={styles.navGhostBtn}
          >
            {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* MOBILE MENU */}
        {menuOpen && (
          <nav className={styles.mobileMenu}>
            <a
              href="#about"
              className={styles.mobileMenuLink}
              onClick={() => setMenuOpen(false)}
            >
              Smart Farming
            </a>
            <a
              href="#features"
              className={styles.mobileMenuLink}
              onClick={() => setMenuOpen(false)}
            >
              Farm Tools
            </a>
            <a
              href="#how"
              className={styles.mobileMenuLink}
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className={styles.mobileMenuLink}
              onClick={() => setMenuOpen(false)}
            >
              {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
            </Link>
          </nav>
        )}

        {/* ===================================================
            HERO SECTION
            =================================================== */}

        <div className={styles.hero}>
          {/* LEFT CONTENT */}
          <div className={styles.copyCol}>
            <p className={styles.kicker}>{slide.kicker}</p>

            <h1 className={styles.title}>
              {slide.title}
              <br />
              <span className={styles.titleAccent}>{slide.accent}</span>
            </h1>

            <p className={styles.subText}>{slide.copy}</p>

            <div className={styles.ctaRow}>
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className={styles.primaryBtn}
              >
                {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
                <ArrowUpRight size={18} />
              </Link>

              <div className={styles.statBlock}>
                <span className={styles.statValue}>{slide.stat.value}</span>
                <span className={styles.statLabel}>{slide.stat.label}</span>
              </div>
            </div>

            <div className={styles.dots}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className={styles.visualCol}>
            <div className={styles.farmerWrap}>
              <img src={farmer} alt="Farmer" className={styles.farmerImg} />
              <span className={styles.scanline} />

              <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
                <p className={styles.cardLabel}>Soil Analysis</p>
                <p className={styles.cardValue}>NPK</p>
                <p className={styles.cardNotePrimary}>Smart crop insights</p>
              </div>

              <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
                <p className={styles.cardLabel}>Disease Prediction</p>
                <p className={styles.cardValueSm}>AI Powered</p>
                <p className={styles.cardNoteAccent}>Early crop detection</p>
              </div>
            </div>
          </div>
        </div>

        {/* CAPABILITIES */}
        <div className={styles.capGrid}>
          {capabilities.map(({ icon: Icon, label }) => (
            <div key={label} className={styles.capCard}>
              <Icon size={18} className={styles.capIcon} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          PAGE CONTENT BELOW HERO
          ===================================================== */}

      <main className={styles.page}>
        {/* 1. ABOUT */}
        <section className={styles.section} id="about">
          <div className={styles.about}>
            <Reveal className={styles.aboutMedia}>
              <div className={styles.aboutCard}>
                <img
                  src={farmfield}
                  alt="Lush green farm field"
                  className={styles.aboutImg}
                />
                <div className={styles.aboutGlow} />
              </div>

              <div className={`${styles.aboutBadge} ${styles.aboutBadgeTop}`}>
                <Target size={18} />
                <div>
                  <strong>98%</strong>
                  <span>detection accuracy</span>
                </div>
              </div>

              <div className={`${styles.aboutBadge} ${styles.aboutBadgeBottom}`}>
                <Users size={18} />
                <div>
                  <strong>12,500+</strong>
                  <span>farmers onboard</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className={styles.sectionTag}>About FarmXpert</p>
              <h2 className={styles.sectionTitle}>
                Smart technology for{" "}
                <span className={styles.titleAccent}>smarter farming</span>
              </h2>
              <p className={styles.sectionText}>
                FarmXpert is a smart agriculture assistant that helps farmers
                make better decisions using soil data, weather information and
                AI-powered insights — from sowing to harvest.
              </p>

              <ul className={styles.aboutList}>
                {aboutPoints.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={16} />
                    {point}
                  </li>
                ))}
              </ul>

              <div className={styles.aboutPills}>
                {aboutPills.map(({ icon: Icon, label }) => (
                  <span key={label} className={styles.pill}>
                    <Icon size={14} />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ANIMATED STATS BAND */}
          <Reveal delay={100} className={styles.statsBand}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <p className={styles.statNum}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className={styles.statCap}>{s.label}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* MARQUEE TICKER */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={styles.marqueeItem}>
                <Sprout size={16} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 2. FEATURES */}
        <section className={styles.section} id="features">
          <Reveal className={styles.sectionHead}>
            <p className={styles.sectionTag}>Smart farming features</p>
            <h2 className={styles.sectionTitle}>
              Everything your farm needs,{" "}
              <span className={styles.titleAccent}>in one place</span>
            </h2>
            <p className={styles.sectionText}>
              Six intelligent tools that work together to guide every decision
              on your farm.
            </p>
          </Reveal>

          <div className={styles.featureGrid}>
            {features.map(
              ({ icon: Icon, title, text, wide, chips }, i) => (
                <Reveal
                  key={title}
                  delay={(i % 3) * 100}
                  onMouseMove={setGlow}
                  className={`${styles.featureCard} ${
                    wide ? styles.featureCardWide : ""
                  }`}
                >
                  <div className={styles.featureTop}>
                    <span className={styles.featureIcon}>
                      <Icon size={22} />
                    </span>
                    <span className={styles.featureIndex}>0{i + 1}</span>
                  </div>

                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureText}>{text}</p>

                  {chips && (
                    <div className={styles.featureMiniChips}>
                      {chips.map((c) => (
                        <span key={c} className={styles.featureMiniChip}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className={styles.featureArrow}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Reveal>
              )
            )}
          </div>
        </section>

        {/* 3. HOW IT HELPS */}
        <section className={styles.section} id="how">
          <Reveal className={styles.sectionHead}>
            <p className={styles.sectionTag}>How FarmXpert helps</p>
            <h2 className={styles.sectionTitle}>Three simple steps</h2>
            <p className={styles.sectionText}>
              From raw farm data to confident decisions — in minutes, not weeks.
            </p>
          </Reveal>

          <div className={styles.steps}>
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120} className={styles.stepCard}>
                <span className={styles.stepNum}>0{i + 1}</span>
                <span className={styles.stepOrb}>
                  <Icon size={22} />
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. MULTILINGUAL SUPPORT */}
        <section className={styles.section} id="languages">
          <Reveal>
            <div className={styles.langStrip}>
              <div className={styles.langVisual}>
                <span className={styles.langOrbit}>
                  <Languages size={34} />
                </span>
              </div>

              <div>
                <p className={styles.sectionTag}>Multilingual support</p>
                <h2 className={styles.langTitle}>Built for every farmer</h2>
                <p className={styles.langText}>
                  FarmXpert speaks your language — use every tool in English,
                  తెలుగు or हिन्दी, so nothing gets lost in translation.
                </p>
              </div>

              <div className={styles.langChips}>
                <span className={styles.langChip}>
                  English <span className={styles.langChipSub}>Default</span>
                </span>
                <span className={styles.langChip}>
                  తెలుగు <span className={styles.langChipSub}>Telugu</span>
                </span>
                <span className={styles.langChip}>
                  हिन्दी <span className={styles.langChipSub}>Hindi</span>
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className={styles.section} id="stories">
          <Reveal className={styles.sectionHead}>
            <p className={styles.sectionTag}>Farmer stories</p>
            <h2 className={styles.sectionTitle}>
              Trusted in the{" "}
              <span className={styles.titleAccent}>field</span>
            </h2>
            <p className={styles.sectionText}>
              Real results from farmers using FarmXpert every season.
            </p>
          </Reveal>

          <div className={styles.testiGrid}>
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 120}
                onMouseMove={setGlow}
                className={styles.testiCard}
              >
                <Quote size={26} className={styles.testiQuote} />
                <div className={styles.testiStars}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className={styles.testiText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testiPerson}>
                  <span className={styles.testiAvatar}>{t.initials}</span>
                  <div>
                    <p className={styles.testiName}>{t.name}</p>
                    <p className={styles.testiRole}>{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className={styles.section} id="get-started">
          <Reveal>
            <div className={styles.ctaCard}>
              <span className={styles.ctaRings} />

              <p className={styles.sectionTag}>Get started today</p>
              <h2 className={styles.ctaTitle}>
                Make smarter decisions for your farm.
              </h2>
              <p className={styles.ctaText}>
                Explore FarmXpert's intelligent tools and take your farming to
                the next level.
              </p>

              <div className={styles.ctaBtnRow}>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/login"}
                  className={styles.primaryBtn}
                >
                  {isLoggedIn ? "🌱 Open My Farm" : "Sign In"}
                  <ArrowUpRight size={18} />
                </Link>
                <a href="#features" className={styles.ghostBtn}>
                  Explore features <ArrowRight size={16} />
                </a>
              </div>

              <div className={styles.ctaTrust}>
                <span className={styles.ctaTrustItem}>
                  <ShieldCheck size={15} /> Free to start
                </span>
                <span className={styles.ctaTrustItem}>
                  <Sparkles size={15} /> AI-powered insights
                </span>
                <span className={styles.ctaTrustItem}>
                  <Globe2 size={15} /> English · తెలుగు · हिन्दी
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <Link to="/" className={styles.brand}>
                <span className={styles.brandMark}>
                  <Sprout size={22} />
                </span>
                <span className={styles.brandName}>FarmXpert</span>
              </Link>
              <p>
                A smart agriculture assistant that turns soil, weather and crop
                data into decisions farmers can trust.
              </p>
              <div className={styles.footerContact}>
                <span className={styles.footerContactItem}>
                  <Mail size={15} /> hello@farmxpert.app
                </span>
                <span className={styles.footerContactItem}>
                  <Phone size={15} /> +91 98765 43210
                </span>
                <span className={styles.footerContactItem}>
                  <MapPin size={15} /> Hyderabad, India
                </span>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Explore</h4>
              <a href="#about" className={styles.footerLink}>
                About
              </a>
              <a href="#features" className={styles.footerLink}>
                Features
              </a>
              <a href="#how" className={styles.footerLink}>
                How it helps
              </a>
              <a href="#stories" className={styles.footerLink}>
                Farmer stories
              </a>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Tools</h4>
              <span className={styles.footerLink}>Crop recommendation</span>
              <span className={styles.footerLink}>Disease prediction</span>
              <span className={styles.footerLink}>Weather insights</span>
              <span className={styles.footerLink}>Yield forecast</span>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Languages</h4>
              <span className={styles.footerLink}>English</span>
              <span className={styles.footerLink}>తెలుగు (Telugu)</span>
              <span className={styles.footerLink}>हिन्दी (Hindi)</span>
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className={styles.footerLink}
              >
                {isLoggedIn ? "Open My Farm →" : "Sign In →"}
              </Link>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerBottomInner}>
              <span>
                © {new Date().getFullYear()} FarmXpert — Smart Agriculture
                Assistant
              </span>
              <span>Built for farmers, powered by AI 🌱</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
