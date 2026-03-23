import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "cinestream-theme";
const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
}

const downloadOptions = [
  {
    platform: "Windows",
    version: "Windows 10+",
    downloads: [
      {
        label: "Setup Installer (.exe)",
        filename: "CineStream-Setup-1.4.1.exe",
        href: "https://drive.google.com/uc?export=download&id=1AYbJT7ffgTc5lJqBLaLiqyvzjsDWtzBa"
      },
      {
        label: "Portable (.exe)",
        filename: "CineStream-1.4.1.exe",
        href: "https://drive.google.com/uc?export=download&id=1uKQq57CzRu2uMi31iHOdq4Ca-CME9Jjm"
      }
    ]
  },
  {
    platform: "macOS",
    version: "Apple Silicon / Intel",
    downloads: [
      {
        label: "Apple Silicon DMG",
        filename: "CineStream-1.4.1-arm64.dmg",
        href: "https://drive.google.com/uc?export=download&id=1OInDir-rzWtelwvWYNPg0xiYuKh-MxtJ"
      },
      {
        label: "Apple Silicon ZIP",
        filename: "CineStream-1.4.1-arm64-mac.zip",
        href: "https://drive.google.com/uc?export=download&id=1R6JW5ZWb-kn__vywhiXnJb0Lw5VAXg5j"
      }
    ]
  },
  {
    platform: "Linux",
    version: "Ubuntu, Debian, Arch",
    downloads: [
      {
        label: "Universal AppImage",
        filename: "CineStream-1.4.1.AppImage",
        href: "https://drive.google.com/uc?export=download&id=1Z-UQ5KIEpsHtgTRmzpkQXmRhEtc7LPH3"
      },
      {
        label: "Debian/Ubuntu DEB",
        filename: "cinestream_1.4.1_amd64.deb",
        href: "https://drive.google.com/uc?export=download&id=1ue7GR5MTXMOv7gV0FBCfPJ1IFqckIsQO"
      }
    ]
  }
];

const keyFeatures = [
  "Massive movie, TV series, and anime catalog",
  "Advanced search with practical filters",
  "Offline downloads for supported content",
  "Ad-free experience from start to finish",
  "Fast desktop performance on all major OS",
  "Clean interface built for binge sessions"
];

const techStack = [
  "Electron",
  "JavaScript",
  "Fastify",
  "SQLite",
  "TMDB API",
  "WebTorrent"
];

const screenshots = [
  {
    title: "Home Experience",
    description: "Trending, popular, and top-rated rows in a clean cinematic layout.",
    src: publicAsset("assets/screenshots/home-ui.png"),
    alt: "CineStream home page screenshot"
  },
  {
    title: "Discover and Filter",
    description: "Genre filters and sorting controls built for fast discovery.",
    src: publicAsset("assets/screenshots/discover-ui.png"),
    alt: "CineStream discover page screenshot"
  },
  {
    title: "Title Details",
    description: "Focused watch page with story line, cast, and quick actions.",
    src: publicAsset("assets/screenshots/details-ui.png"),
    alt: "CineStream title details page screenshot"
  }
];

function LogoMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      aria-label="CineStream logo"
      role="img"
    >
      <defs>
        <linearGradient id="cs-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-accent-start)" />
          <stop offset="100%" stopColor="var(--logo-accent-end)" />
        </linearGradient>
        <filter id="cs-glow">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        x="8"
        y="8"
        width="144"
        height="144"
        rx="36"
        fill="var(--logo-bg)"
        stroke="var(--logo-stroke)"
      />
      <g filter="url(#cs-glow)" stroke="url(#cs-accent)" strokeWidth="8" fill="none">
        <path d="M109 42A44 44 0 1 0 109 118" strokeLinecap="round" />
        <path d="M61 52V108" strokeLinecap="round" />
        <path d="M72 56L109 80L72 104Z" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function PlatformIcon({ platform }) {
  if (platform === "Windows") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4L11 3V11H3V4ZM13 2.75L21 1.5V11H13V2.75ZM3 13H11V21L3 20V13ZM13 13H21V22.5L13 21.25V13Z" />
      </svg>
    );
  }

  if (platform === "macOS") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.4 12.1C16.4 9.8 18.3 8.8 18.4 8.7C17.4 7.2 15.8 7 15.3 7C13.9 6.9 12.5 7.8 11.8 7.8C11.1 7.8 10 7 8.9 7C6.6 7 4.5 8.9 4.5 12.4C4.5 13.7 4.7 15.1 5.3 16.5C6.1 18.5 7.2 20.7 8.8 20.6C9.8 20.6 10.3 19.9 11.5 19.9C12.7 19.9 13.1 20.6 14.2 20.6C15.8 20.6 16.8 18.6 17.5 16.6C18 15.3 18.2 14 18.2 14C18.2 14 16.4 13.3 16.4 12.1Z" />
        <path d="M14.4 5.7C15 5 15.4 4.1 15.3 3.2C14.4 3.3 13.4 3.8 12.8 4.5C12.2 5.2 11.8 6.1 11.9 7C12.9 7.1 13.8 6.5 14.4 5.7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.4 18L12.1 13.4H3.2L8.4 5.9H14.6L11.9 10.5H20.8L15.6 18H9.4Z" />
    </svg>
  );
}

function ThemeIcon({ theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4.25A1 1 0 0 1 13 5.25V6.3A1 1 0 0 1 11 6.3V5.25A1 1 0 0 1 12 4.25ZM6.73 6.14A1 1 0 0 1 8.14 6.14L8.89 6.89A1 1 0 1 1 7.48 8.3L6.73 7.55A1 1 0 0 1 6.73 6.14ZM17.27 6.14A1 1 0 0 1 17.27 7.55L16.52 8.3A1 1 0 1 1 15.11 6.89L15.86 6.14A1 1 0 0 1 17.27 6.14ZM12 8.25A3.75 3.75 0 1 1 8.25 12A3.75 3.75 0 0 1 12 8.25ZM5.25 11A1 1 0 0 1 6.25 12A1 1 0 0 1 5.25 13H4.2A1 1 0 0 1 4.2 11H5.25ZM19.8 11A1 1 0 0 1 19.8 13H18.75A1 1 0 0 1 18.75 11H19.8ZM8.89 15.11A1 1 0 0 1 8.89 16.52L8.14 17.27A1 1 0 1 1 6.73 15.86L7.48 15.11A1 1 0 0 1 8.89 15.11ZM15.11 15.11A1 1 0 0 1 16.52 15.11L17.27 15.86A1 1 0 1 1 15.86 17.27L15.11 16.52A1 1 0 0 1 15.11 15.11ZM12 17.7A1 1 0 0 1 13 17.7V18.75A1 1 0 0 1 11 18.75V17.7A1 1 0 0 1 12 17.7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.77 4.75A1 1 0 0 1 15.75 5.97C15.73 6.07 15.72 6.17 15.72 6.28C15.72 10.04 18.76 13.08 22.52 13.08C22.63 13.08 22.73 13.07 22.83 13.05A1 1 0 0 1 24.04 14.06A9.96 9.96 0 1 1 14.77 4.75ZM13.67 7.03A7.96 7.96 0 1 0 20.96 14.3A8.77 8.77 0 0 1 13.67 7.03Z" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  if (isOpen) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.78 5.72A1 1 0 0 1 8.2 5.72L12 9.52L15.8 5.72A1 1 0 0 1 17.22 7.14L13.42 10.94L17.22 14.74A1 1 0 1 1 15.8 16.16L12 12.36L8.2 16.16A1 1 0 0 1 6.78 14.74L10.58 10.94L6.78 7.14A1 1 0 0 1 6.78 5.72Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.75 6.5A1 1 0 0 1 5.75 5.5H18.25A1 1 0 1 1 18.25 7.5H5.75A1 1 0 0 1 4.75 6.5ZM4.75 12A1 1 0 0 1 5.75 11H18.25A1 1 0 1 1 18.25 13H5.75A1 1 0 0 1 4.75 12ZM4.75 17.5A1 1 0 0 1 5.75 16.5H18.25A1 1 0 1 1 18.25 18.5H5.75A1 1 0 0 1 4.75 17.5Z" />
    </svg>
  );
}

function ScreenshotCard({ shot }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <article className="shot-card">
      <div className="shot-media">
        {hasImage ? (
          <img src={shot.src} alt={shot.alt} onError={() => setHasImage(false)} loading="lazy" />
        ) : (
          <div className="shot-fallback">Add screenshot file in /public/assets/screenshots</div>
        )}
      </div>
      <h3>{shot.title}</h3>
      <p>{shot.description}</p>
    </article>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const initialTheme = getInitialTheme();
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
    return initialTheme;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(nextProgress);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = 0;
      });
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    if (!revealItems.length) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const orbOffset = scrollProgress * 110;

  return (
    <main className="page-shell">
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="orb orb-left" aria-hidden="true" style={{ transform: `translateY(${orbOffset * 0.45}px)` }} />
      <div className="orb orb-right" aria-hidden="true" style={{ transform: `translateY(${-orbOffset * 0.38}px)` }} />

      <header className="topbar reveal-up is-visible">
        <a href="#top" className="brand">
          <LogoMark className="brand-logo" />
          <span>CineStream</span>
        </a>
        <div className="topbar-actions">
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="main-nav"
            aria-expanded={mobileMenuOpen}
          >
            <MenuIcon isOpen={mobileMenuOpen} />
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            <ThemeIcon theme={theme} />
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
        <nav id="main-nav" className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#preview" onClick={() => setMobileMenuOpen(false)}>
            Preview
          </a>
          <a href="#download" onClick={() => setMobileMenuOpen(false)}>
            Download
          </a>
        </nav>
      </header>

      <section className="hero section-panel reveal-up is-visible" id="top">
        <LogoMark className="hero-logo" />
        <p className="hero-badge">Version 1.4.1</p>
        <h1>Premium Desktop Streaming. Completely Free.</h1>
        <p className="hero-copy">
          CineStream is a modern desktop app for movies, TV series, and anime with smart search,
          powerful filters, and offline downloads. It is free to use, ad-free, and available on
          Windows, macOS, and Linux.
        </p>
        <div className="hero-actions">
          <a href="#download" className="btn btn-solid">
            Download CineStream
          </a>
          <a href="#preview" className="btn btn-ghost">
            View Preview
          </a>
        </div>
        <p className="hero-meta">
          Freeware for personal use. Source code is private (not open source). Android version is
          coming soon.
        </p>
      </section>

      <section className="section-panel reveal-up" id="download" data-reveal>
        <div className="section-head">
          <h2>Download for Desktop</h2>
          <p>One app, three platforms, same premium experience.</p>
        </div>
        <div className="downloads-grid">
          {downloadOptions.map((item, index) => (
            <article
              className="download-card reveal-up"
              key={item.platform}
              data-reveal
              style={{ "--reveal-delay": `${120 + index * 90}ms` }}
            >
              <div className="platform-mark" aria-hidden="true">
                <PlatformIcon platform={item.platform} />
              </div>
              <h3>{item.platform}</h3>
              <p className="platform-version">{item.version}</p>
              <p className="platform-file">{item.downloads.length} files available</p>
              <div className="download-actions">
                {item.downloads.map((download) => (
                  <a
                    key={download.filename}
                    href={download.href}
                    className="btn btn-card"
                    title={download.filename}
                  >
                    {download.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel feature-wrap reveal-up" id="features" data-reveal>
        <div className="section-head">
          <h2>Built for Serious Watchers</h2>
          <p>Speed, scale, and comfort in one desktop experience.</p>
        </div>
        <div className="feature-grid">
          {keyFeatures.map((feature, index) => (
            <article
              key={feature}
              className="feature-item reveal-up"
              data-reveal
              style={{ "--reveal-delay": `${80 + index * 45}ms` }}
            >
              <span className="feature-dot" aria-hidden="true" />
              <p>{feature}</p>
            </article>
          ))}
        </div>
        <div className="stack-panel reveal-up" data-reveal style={{ "--reveal-delay": "110ms" }}>
          <h3>Technology Stack</h3>
          <div className="stack-tags">
            {techStack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel reveal-up" id="preview" data-reveal>
        <div className="section-head">
          <h2>CineStream Preview</h2>
          <p>Preview the interface before your first download.</p>
        </div>
        <div className="shots-grid">
          {screenshots.map((shot, index) => (
            <div
              key={shot.title}
              className="reveal-up"
              data-reveal
              style={{ "--reveal-delay": `${100 + index * 70}ms` }}
            >
              <ScreenshotCard shot={shot} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-panel developer-panel reveal-up" data-reveal style={{ "--reveal-delay": "90ms" }}>
        <div className="section-head">
          <h2>From the Developer</h2>
          <p>Independently crafted by Sushan Fernando.</p>
        </div>
        <p>
          CineStream is designed to feel fast, clean, and reliable every day. New improvements are
          continuously shipped, and the Android build is currently in active development.
        </p>
        <div className="developer-links">
          <a href="https://sushanfer.dev/" target="_blank" rel="noreferrer">
            Developer Website
          </a>
          <a href="https://github.com/klsdfernando" target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright 2026 Sushan Fernando. All rights reserved.</p>
        <p>
          CineStream uses TMDB data but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </main>
  );
}
