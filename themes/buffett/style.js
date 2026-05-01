/* eslint-disable react/no-unknown-property */
/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

      :root {
        --bg: #FAF7F2;
        --bg2: #F3EDE4;
        --text: #1B1B18;
        --text2: #6B6560;
        --gold: #B8860B;
        --gold-light: #D4A843;
        --gold-glow: rgba(184, 134, 11, .12);
        --navy: #1A2332;
        --navy-light: #2C3E50;
        --cream: #FFF8EE;
        --border: #E0D6C8;
        --card: #FFFFFF;
        --link: #8B5E0B;
        --serif: 'Noto Serif SC', 'Crimson Pro', Georgia, 'Times New Roman', serif;
        --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
        --sidebar-w: 260px;
      }

      #theme-buffett {
        background-color: var(--bg);
        color: var(--text);
        font-family: var(--sans);
        min-height: 100vh;
        display: flex;
        line-height: 1.8;
      }

      /* ===== SIDEBAR ===== */
      #theme-buffett .sidebar {
        width: var(--sidebar-w);
        background: var(--navy);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        z-index: 100;
        display: flex;
        flex-direction: column;
      }

      #theme-buffett .sidebar-header {
        padding: 24px 20px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, .08);
      }

      #theme-buffett .logo {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: .5px;
        font-family: var(--serif);
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      #theme-buffett .sidebar-nav {
        flex: 1;
        padding: 12px 0;
      }

      #theme-buffett .nav-link {
        display: block;
        padding: 8px 20px;
        color: #cbd5e1;
        text-decoration: none;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-left: 3px solid transparent;
        transition: all .2s;
      }

      #theme-buffett .nav-link:hover {
        background: rgba(255, 255, 255, .06);
        color: #fff;
      }

      #theme-buffett .nav-link.active {
        color: #fff;
        background: rgba(184, 134, 11, .15);
        border-left-color: var(--gold);
        font-weight: 600;
      }

      /* ===== MAIN ===== */
      #theme-buffett .main {
        margin-left: var(--sidebar-w);
        flex: 1;
        position: relative;
        max-width: 100%;
        padding: 0;
      }

      /* grain overlay */
      #theme-buffett .main::after {
        content: '';
        position: fixed;
        top: 0;
        left: var(--sidebar-w);
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: .04;
        z-index: 999;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* ===== ARTICLE ===== */
      #theme-buffett .article-wrapper {
        max-width: 860px;
        margin: 0 auto;
        padding: 60px 40px 100px;
      }

      #theme-buffett .notion h1 {
        font-family: var(--serif) !important;
        font-size: 32px !important;
        line-height: 1.2 !important;
        margin-bottom: 28px !important;
        font-weight: 900 !important;
        color: var(--navy) !important;
        letter-spacing: -1px !important;
      }

      #theme-buffett .notion h2 {
        font-family: var(--serif) !important;
        font-size: 24px !important;
        margin: 40px 0 16px !important;
        padding-bottom: 10px !important;
        border-bottom: 2px solid var(--border) !important;
        font-weight: 700 !important;
        color: var(--navy) !important;
      }

      #theme-buffett .notion p {
        font-size: 16px !important;
        line-height: 1.8 !important;
        margin: 14px 0 !important;
        color: var(--text) !important;
      }

      #theme-buffett .notion blockquote {
        background: var(--cream) !important;
        border-left: 5px solid var(--gold) !important;
        padding: 20px 24px !important;
        margin: 24px 0 !important;
        border-radius: 0 12px 12px 0 !important;
        font-style: italic !important;
        color: #5C4813 !important;
        font-family: var(--serif) !important;
        font-size: 17px !important;
      }

      /* WikiLinks / Inline Links */
      #theme-buffett .notion a {
        color: var(--link);
        text-decoration: none;
        background: linear-gradient(to bottom, transparent 65%, var(--gold-glow) 65%);
        transition: all .2s;
      }
      #theme-buffett .notion a:hover {
        background: linear-gradient(to bottom, transparent 45%, rgba(184, 134, 11, .2) 45%);
      }

      /* Badges */
      .type-badge {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        text-transform: uppercase;
      }
      .type-concept { background: #7C5E2A; }
      .type-company { background: #1A6B7C; }
      .type-person { background: #8B2F2F; }

      /* ===== HERO ===== */
      #theme-buffett .hero-section {
        padding: 80px 48px 40px;
        max-width: 1000px;
        margin: 0 auto;
      }

      #theme-buffett .hero-title {
        font-family: var(--serif);
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -2px;
        color: var(--navy);
      }

      #theme-buffett .gold {
        color: var(--gold);
      }

      /* Animations */
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-up {
        animation: fadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @media(max-width: 768px) {
        #theme-buffett .sidebar {
          transform: translateX(-100%);
          transition: transform .4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #theme-buffett .sidebar.open {
          transform: translateX(0);
        }
        #theme-buffett .main {
          margin-left: 0;
        }
        #theme-buffett .main::after {
          left: 0;
        }
        #theme-buffett .hero-section {
            padding: 60px 24px 30px;
        }
        #theme-buffett .article-wrapper {
            padding: 40px 20px 60px;
        }
      }
    `}</style>
  )
}

export { Style }
