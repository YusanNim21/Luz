function goToPage(id) {
  stopTypewriter();

  // pause all media
  document.querySelectorAll('video, audio').forEach(m => {
    try { m.pause(); m.currentTime = 0; } catch (e) {}
  });

  // hide pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // show target
  const page = document.getElementById(id);
  if (!page) return;
  page.classList.add('active');
  page.scrollTop = 0;

  // play media for specific pages
  if (id === "warn") playMedia("warnVideo");
  if (id === "ask") playMedia("bigVideo");
  if (id === "no") playMedia("bruhAudio");

  // typewriter for song page
  if (id === "song") {
    startTypewriter();
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.disabled = true;
  } else {
    const n = document.getElementById("nextBtn");
    if (n) n.disabled = false;
  }
}

// play / stop helpers
function playMedia(id) {
  const m = document.getElementById(id);
  if (!m) return;
  try { m.currentTime = 0; } catch(e){}
  m.play && m.play().catch(()=>{});
}

function stopMedia(id) {
  const m = document.getElementById(id);
  if (!m) return;
  try {
    m.pause && m.pause();
    m.currentTime = 0;
  } catch(e){}
}

// WhatsApp buttons
function sayYes() {
  for (let i=0;i<6;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';
    heart.style.left = (10 + Math.random()*80) + '%';
    heart.style.bottom = (30 + Math.random()*30) + 'px';
    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(), 1800);
  }
  setTimeout(()=>{
    const phone = "94767608448";
    const text = "YES 😍 I’ll be your girlfriend! 💕";
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }, 1200);
}

function sayNo() {
  const phone = "94767608448";
  const text = "Sorry 😢 I can't…";
  window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// ---------- Typewriter ----------
const lyricsLines = [
  "Your eyes, lanterns in the night",
  "showing shadows how to shine light",
  "The world turns softer when you smile",
  "storms grow quiet, at least for a while",
  "",
  "You’re not perfect? you’re rare",
  "like a hidden song floating in the air",
  "The shine that lifts a silent place",
  "a secret dawn no words can trace",
  "",
  "And your name, itself a light",
  "walking forward, already bright",
  "Una estrella, glowing so near",
  "your light makes the shadows disappear",
  "",
  "Short in height, but tall in fire",
  "talks so much, yet I never tire",
  "A little bossy, always funny",
  "and every snack somehow finds your tummy",
  "",
  "I keep a thousand suns inside my chest",
  "burning quietly, never at rest",
  "You walk on, never seeing this flame",
  "but every fire still bends to your name"
];

let tw = { lineIndex: 0, charIndex: 0, timers: [], running: false };

function startTypewriter() {
  stopTypewriter();
  const container = document.getElementById('lyrics');
  if (!container) return;
  container.innerHTML = '';
  tw.lineIndex = 0;
  tw.charIndex = 0;
  tw.running = true;
  typeLine();
}

function stopTypewriter() {
  tw.running = false;
  tw.timers.forEach(t => clearTimeout(t));
  tw.timers = [];
}

function typeLine() {
  if (!tw.running) return;
  const container = document.getElementById('lyrics');
  if (!container) return;

  if (tw.lineIndex >= lyricsLines.length) {
    finishTypewriter();
    return;
  }

  const line = lyricsLines[tw.lineIndex];

  if (line.trim() === "") {
    const br = document.createElement('div');
    br.className = 'line';
    br.innerHTML = '&nbsp;';
    container.appendChild(br);
    container.scrollTop = container.scrollHeight;
    tw.lineIndex++;
    const t = setTimeout(typeLine, 420);
    tw.timers.push(t);
    return;
  }

  const lineDiv = document.createElement('div');
  lineDiv.className = 'line';
  const textSpan = document.createElement('span');
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor';
  cursorSpan.textContent = '|';
  lineDiv.appendChild(textSpan);
  lineDiv.appendChild(cursorSpan);
  container.appendChild(lineDiv);
  container.scrollTop = container.scrollHeight;

  tw.charIndex = 0;

  function typeChar() {
    if (!tw.running) return;
    if (tw.charIndex < line.length) {
      textSpan.textContent += line[tw.charIndex++];
      container.scrollTop = container.scrollHeight;
      const delay = 28 + Math.floor(Math.random()*70);
      const t = setTimeout(typeChar, delay);
      tw.timers.push(t);
    } else {
      cursorSpan.remove();
      tw.lineIndex++;
      const t = setTimeout(typeLine, 540);
      tw.timers.push(t);
    }
  }
  typeChar();
}

function finishTypewriter() {
  tw.running = false;
  tw.timers.forEach(t => clearTimeout(t));
  tw.timers = [];
  const next = document.getElementById('nextBtn');
  if (next) next.disabled = false;
  const tile = document.querySelector('#song .media-tile');
  if (tile) {
    tile.animate([
      { boxShadow: '0 6px 24px rgba(255,111,145,0.06)' },
      { boxShadow: '0 12px 36px rgba(255,111,145,0.18)' },
      { boxShadow: '0 6px 24px rgba(255,111,145,0.06)' }
    ], { duration: 900 });
  }
}

// start on home page
goToPage('home');
