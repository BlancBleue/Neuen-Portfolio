:root {
    --bg: #050505; --txt: #ffffff; --card: rgba(255,255,255,0.03); 
    --border: rgba(255,255,255,0.1); --accent: #22d3ee; --x: 4px;
}
body[data-theme="light"] {
    --bg: #f8f8f8; --txt: #000000; --card: rgba(0,0,0,0.04); 
    --border: rgba(0,0,0,0.1); --accent: #6366f1; --x: 24px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--txt); font-family: 'Inter', sans-serif; transition: 0.4s; overflow-x: hidden; }

#dotCanvas { position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.5; }
.ui-wrapper { position: relative; z-index: 10; width: 100%; }

/* Header & Hero */
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; }
.theme-switch { width: 50px; height: 26px; background: var(--card); border: 1px solid var(--border); border-radius: 50px; position: relative; cursor: pointer; }
.indicator { width: 18px; height: 18px; background: var(--accent); border-radius: 50%; position: absolute; top: 3px; left: var(--x); transition: 0.3s; box-shadow: 0 0 10px var(--accent); }
.nav a { color: var(--txt); text-decoration: none; margin: 0 15px; font-size: 0.9rem; opacity: 0.7; }
.cta { background: var(--txt); color: var(--bg); border: none; padding: 10px 20px; border-radius: 50px; font-weight: 700; cursor: pointer; }

.hero { text-align: center; padding: 60px 5% 40px; }
.glimmer-text { 
    font-size: clamp(3rem, 10vw, 7rem); font-weight: 900; letter-spacing: -4px; line-height: 1;
    background: linear-gradient(90deg, var(--txt), var(--accent), #f472b6, var(--txt));
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: move 6s linear infinite;
}
@keyframes move { to { background-position: 200% center; } }

/* AI Box */
.search-container { max-width: 500px; margin: 30px auto; }
.search-bar { background: var(--card); border: 1px solid var(--border); padding: 12px 22px; border-radius: 50px; display: flex; align-items: center; gap: 12px; backdrop-filter: blur(10px); }
#ai-input { flex: 1; background: transparent; border: none; color: var(--txt); outline: none; font-size: 1rem; }
.badge { background: var(--txt); color: var(--bg); font-size: 0.6rem; font-weight: 900; padding: 3px 6px; border-radius: 4px; }
.response-box { margin-top: 15px; text-align: left; padding: 12px; border-left: 2px solid var(--accent); color: var(--accent); display: none; min-height: 1.5em; }

/* BENTO GRID */
.main-grid { 
    display: grid; grid-template-columns: repeat(3, 1fr); 
    grid-auto-rows: 240px; gap: 16px; max-width: 1100px; margin: 0 auto 80px; padding: 0 5%; 
}
.card { background: var(--card); border: 1px solid var(--border); padding: 2rem; border-radius: 28px; position: relative; overflow: hidden; transition: 0.4s; }
.card:hover { border-color: var(--accent); }

/* Grid Placement */
.area-focus { grid-column: 1 / 2; grid-row: 1 / 2; }
.area-portrait { grid-column: 2 / 3; grid-row: 1 / 2; padding: 0 !important; }
.area-craft { grid-column: 3 / 4; grid-row: 1 / 2; }
.area-mindset { grid-column: 1 / 3; grid-row: 2 / 3; }
.area-location { grid-column: 3 / 4; grid-row: 2 / 3; padding: 0 !important; display: flex; flex-direction: column; }

/* PORTRAIT HOVER COLOR EFFECT */
.portrait-container { width: 100%; height: 100%; position: relative; background: #000; overflow: hidden; }
#main-photo, .hobby-layer { 
    width: 100%; height: 100%; object-fit: cover; object-position: top; 
    filter: grayscale(1); transition: 0.6s ease; position: absolute; 
}
.area-portrait:hover #main-photo, .area-portrait:hover .hobby-layer {
    filter: grayscale(0); transform: scale(1.05);
}
.photo-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); z-index: 3; pointer-events: none; }

/* MAP STYLING */
.full-map-container { width: 100%; height: 160px; position: relative; overflow: hidden; }
.world-map { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6) contrast(1.2); }
.map-vignette { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg), transparent 40%); }
.map-ping { 
    position: absolute; top: 45%; left: 70%; width: 8px; height: 8px; 
    background: var(--accent); border-radius: 50%; box-shadow: 0 0 15px var(--accent);
    animation: pulse-ring 2s infinite; 
}
@keyframes pulse-ring { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }

.area-location .loc-content { padding: 1rem 1.5rem; position: relative; z-index: 5; }
.pulse { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; margin-right: 8px; box-shadow: 0 0 8px #22c55e; }

.tech-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px; }
.tech-stack span { background: var(--border); padding: 5px 12px; border-radius: 8px; font-size: 0.8rem; }

.hobby-triggers { display: flex; gap: 15px; margin-top: 20px; }
.hobby-triggers span { font-size: 0.8rem; color: var(--accent); cursor: pointer; opacity: 0.6; font-weight: 600; text-transform: uppercase; }
.hobby-triggers span:hover { opacity: 1; }

@media (max-width: 900px) {
    .main-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
    .area-portrait { height: 350px; order: -1; }
}
