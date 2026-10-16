/**
 * ============================================================================
 * SARA'S ROMANTIC PROPOSAL WEBSITE — MASTER SCRIPT
 * Anime-Romance Experience | Pure Vanilla JavaScript
 * ============================================================================
 */

/* ============================================================================
   1. USER CONFIGURATION (CUSTOMIZE HERE)
   ============================================================================ */
const CONFIG = {
  // Secret Password (Screen 1)
  // Accepts this word (case-insensitive). Also allows 'love' or 'sarah' for a forgiving surprise.
  SECRET_PASSWORD: 'my moon',

  // Recipient email for feelings form (All responses will be delivered here)
  RECIPIENT_EMAIL: 'jh4406011@gmail.com',

  // Email API Provider:
  // - 'formsubmit': (RECOMMENDED - ZERO SETUP NEEDED!)
  //   Uses FormSubmit AJAX API directly to jh4406011@gmail.com. No API keys or registration required!
  // - 'emailjs': Uses the EmailJS browser SDK (requires Public Key & Template ID below)
  EMAIL_PROVIDER: 'formsubmit',

  // Optional: EmailJS Configuration (Only used if EMAIL_PROVIDER is set to 'emailjs')
  EMAILJS: {
    PUBLIC_KEY: '',      // e.g. 'user_xxxxxxxxxxxx'
    SERVICE_ID: '',      // e.g. 'service_xxxxxxx'
    TEMPLATE_ID: '',     // e.g. 'template_xxxxxxx'
  },

  // Romantic Background Song (Ed Sheeran - Perfect: https://youtu.be/hIvcu6291ik)
  YOUTUBE_SONG_ID: 'hIvcu6291ik',

  // Welcome Screen (Screen 2)
  WELCOME_TEXT: "Hey Sara... I've made something special just for you. 💗",

  // Love Letter (Screen 3)
  LOVE_LETTER_CONTENT: `Dear Sara,

Before you came into my life, I thought I understood what happiness was. But loving you showed me a whole new dimension of life—one filled with comfort, warmth, and a quiet kind of peace I’d never known before.

You’ve seen me at my best and supported me through my worst, without ever making me feel like I had to be anything other than myself. With you, every ordinary moment feels sacred, and every quiet day feels full.

I don’t just want to share the happy milestones with you, Sara. I want to stand beside you through every storm, every quiet evening, and every dream we build together.

Sara, will you walk this journey of life with me? Will you make me the happiest person and marry me?

Forever yours,
 Jahid `,

  // Cute Love Quiz Questions (Screen 4)
  QUIZ: [
    {
      question: "What do you think makes a moment truly magical? ✨",
      options: [
        { text: "Stargazing under a quiet midnight sky 🌌", reaction: "A quiet sky with millions of stars... that really is pure poetry. 🥰" },
        { text: "Deep, heartfelt conversations with lots of smiles 🌸", reaction: "Nothing beats conversations where time simply disappears with you. 💖" },
        { text: "Cute sweet treats & uncontrollable laughter 🍰", reaction: "Desserts and hearing you laugh? That's heaven right there! 🧁" },
        { text: "All of the above, as long as it's with someone special 💫", reaction: "The best answer possible! Being together turns every moment into magic. ✨" }
      ]
    },
    {
      question: "If our story was a scene in a romantic anime, where would we be? 🌸",
      options: [
        { text: "Walking under softly falling cherry blossom petals 🌸", reaction: "Classic sakura romance! The wind blowing pink petals around your hair... 🌸" },
        { text: "Sharing a cozy umbrella in a warm summer shower 🌧️", reaction: "Sharing an umbrella is the ultimate anime romance trope! So sweet! 🌂" },
        { text: "Watching festival fireworks from a quiet rooftop 🎆", reaction: "The colorful lights in the sky, reflecting in your eyes. Unforgettable. 🎆" },
        { text: "Sitting by a window at a cute cafe sharing warm tea ☕", reaction: "Warm mugs, gentle music, and sharing sweet little secrets. Perfect. 🍵" }
      ]
    },
    {
      question: "Honest question... did you smile even a little bit while reading this? 🥰",
      options: [
        { text: "Yes, you totally caught me smiling! 😊", reaction: "Yay! Seeing you smile was my entire goal in making this. 💗" },
        { text: "My heart actually skipped a little beat 💓", reaction: "Mine does too every time I think of you, Sara. 🌸" },
        { text: "I'm smiling right this very second! ✨", reaction: "Keep that smile right there, because what comes next is from the heart! 💖" },
        { text: "A little mysterious blush 🙈", reaction: "That is the cutest reaction in the world. You're wonderful. 💕" }
      ]
    }
  ],

  // Playful "Are you sure?" questions when Sara clicks NO (Screen 5)
  NO_QUESTIONS: [
    "Are you sure? 🥺",
    "Are you really sure? 🥺",
    "Are you really really sure? 🥺",
    "Are you 100% sure? 🥺",
    "Think about it again! 💖",
    "Are you absolutely sure? 🥺",
    "Sara, please reconsider? 🥹",
    "Are you positive? 🥺",
    "Look how bright YES is! ✨",
    "Don't break my heart! 💔🥺",
    "Are you completely sure? 🥺",
    "Give it one more thought! 🌸",
    "Are you sure sure sure? 🙈",
    "What if we try YES instead? 💕",
    "Are you truly sure, princess? 👑",
    "There's no saying no to true love! 💖",
    "Are you super duper sure? 🥺",
    "Look at the ring shining! 💍✨",
    "You know in your heart it's YES! 🥰",
    "Are you still sure? 🥺💖"
  ],
  DODGE_MESSAGES: [
    "Are you sure? 🥺",
    "Are you really sure? 🥺"
  ]
};

/* ============================================================================
   2. GLOBAL STATE
   ============================================================================ */
const state = {
  currentScreen: 1,
  currentQuizIndex: 0,
  quizSelected: false,
  musicStarted: false,
  isPlayingAudio: false,
  isMuted: false,
  volume: 1.0,
  noDodgeCount: 0,
  noClickCount: 0,
  yesScale: 1.0,
  letterOpened: false,
  webAudioActive: false,
  audioSynthTimer: null,
  isTransitioning: false,
};

/* ============================================================================
   3. PROCEDURAL ROMANTIC MUSIC SYNTHESIZER (WEB AUDIO API)
   Generates warm, romantic piano / music-box arpeggios automatically!
   Guarantees romantic background music works seamlessly in any browser
   even if an external MP3 file is not yet provided.
   ============================================================================ */
class RomanticMusicSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.step = 0;

    // Romantic Chord Progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 (pentatonic anime feel)
    this.notes = [
      // Chord 1: Cmaj9
      [261.63, 329.63, 392.00, 493.88, 587.33], 
      // Chord 2: Am9
      [220.00, 261.63, 329.63, 392.00, 493.88],
      // Chord 3: Fmaj7
      [174.61, 261.63, 329.63, 392.00, 523.25],
      // Chord 4: Gsus4 / G7
      [196.00, 261.63, 293.66, 392.00, 587.33]
    ];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(state.volume * 0.35, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  playNote(freq, time, duration = 1.8, velocity = 0.5) {
    if (!this.ctx || !this.isPlaying) return;

    // Carrier oscillator (sine for sweet bell/chime purity)
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm soft overtone
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, time);

    // Piano / music box attack & decay envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.4, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(time);
    oscHarmonic.start(time);
    osc.stop(time + duration);
    oscHarmonic.stop(time + duration);
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.step = 0;
    this.scheduleLoop();
  }

  scheduleLoop() {
    if (!this.isPlaying) return;

    const chordIdx = Math.floor(this.step / 8) % this.notes.length;
    const currentChord = this.notes[chordIdx];
    const noteInChord = currentChord[this.step % currentChord.length];

    // Play note with gentle timing humanization
    const now = this.ctx.currentTime;
    this.playNote(noteInChord, now, 2.2, 0.45);

    // Occasional twinkle high octave
    if (this.step % 4 === 2) {
      const highNote = currentChord[(this.step + 2) % currentChord.length] * 2;
      this.playNote(highNote, now + 0.15, 1.4, 0.25);
    }

    this.step++;

    // 120 BPM arpeggio eighth notes (350ms interval)
    state.audioSynthTimer = setTimeout(() => {
      this.scheduleLoop();
    }, 380);
  }

  stop() {
    this.isPlaying = false;
    if (state.audioSynthTimer) {
      clearTimeout(state.audioSynthTimer);
      state.audioSynthTimer = null;
    }
  }

  setVolume(vol) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol * 0.35, this.ctx.currentTime);
    }
  }
}

const synthPlayer = new RomanticMusicSynth();

/* ============================================================================
   4. AUDIO CONTROLLER MANAGER
   Prefers native audio element if user added MP3, otherwise uses Web Audio Synth.
   ============================================================================ */
const AudioController = {
  bgAudio: null,
  ytPlayer: null,
  ytReady: false,
  _ytFallbackTimer: null,

  init() {
    this.bgAudio = document.getElementById('bg-audio');
    if (this.bgAudio) {
      this.bgAudio.volume = 1.0;
    }

    // Modern browser autoplay policy:
    // Browsers require a user interaction before playing unmuted audio.
    // Register global listeners so the very first tap/click/keypress anywhere starts music in full volume!
    const triggerAutoplayOnGesture = () => {
      this.startMusic();
    };

    ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, triggerAutoplayOnGesture, { passive: true });
    });

    this.initYouTube();

    // Also attempt immediate autoplay
    this.startMusic();
  },

  initYouTube() {
    const setupPlayer = () => {
      if (window.YT && window.YT.Player && !this.ytPlayer) {
        try {
          this.ytPlayer = new YT.Player('yt-player', {
            height: '200',
            width: '200',
            videoId: CONFIG.YOUTUBE_SONG_ID,
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: CONFIG.YOUTUBE_SONG_ID,
              playsinline: 1,
              rel: 0,
              modestbranding: 1
            },
            events: {
              onReady: (event) => {
                this.ytReady = true;
                try {
                  event.target.unMute();
                  event.target.setVolume(100);
                  event.target.playVideo();
                  state.isPlayingAudio = true;
                  state.musicStarted = true;
                  synthPlayer.stop();
                } catch (e) {
                  console.warn('YouTube onReady notice:', e);
                }
              },
              onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                  state.isPlayingAudio = true;
                  state.musicStarted = true;
                  synthPlayer.stop();
                } else if (event.data === YT.PlayerState.ENDED) {
                  try {
                    this.ytPlayer.playVideo();
                  } catch (e) {}
                }
              },
              onError: (err) => {
                console.warn('YouTube playback notice:', err);
                this.fallbackAudio();
              }
            }
          });
        } catch (e) {
          console.warn('YouTube player init error:', e);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') prevOnReady();
        setupPlayer();
      };
    }
  },

  startMusic() {
    state.musicStarted = true;

    // 1. Play YouTube song (Ed Sheeran - Perfect) at 100% full volume
    if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.playVideo === 'function') {
      try {
        this.ytPlayer.unMute();
        this.ytPlayer.setVolume(100);
        this.ytPlayer.playVideo();
        state.isPlayingAudio = true;
        synthPlayer.stop();
        return;
      } catch (e) {
        console.warn('YouTube play attempt failed, using fallback:', e);
      }
    }

    // 2. If YouTube is initializing, give it a moment to connect
    if (!this.ytReady && (window.YT || document.querySelector('script[src*="youtube.com/iframe_api"]'))) {
      clearTimeout(this._ytFallbackTimer);
      this._ytFallbackTimer = setTimeout(() => {
        if (!state.isPlayingAudio) {
          this.fallbackAudio();
        }
      }, 2500);
      return;
    }

    // 3. Fallback to native MP3 or Web Audio romantic piano synth at full volume
    this.fallbackAudio();
  },

  fallbackAudio() {
    if (this.bgAudio) {
      this.bgAudio.volume = 1.0;
      const playPromise = this.bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            state.isPlayingAudio = true;
          })
          .catch(() => {
            synthPlayer.setVolume(1.0);
            synthPlayer.start();
            state.isPlayingAudio = true;
          });
        return;
      }
    }

    // Web Audio fallback at full volume
    synthPlayer.setVolume(1.0);
    synthPlayer.start();
    state.isPlayingAudio = true;
  }
};

/* ============================================================================
   5. CANVAS 1: SAKURA CHERRY BLOSSOM PETALS
   Realistic falling petals with flutter angle, sway, and anime romance lighting.
   ============================================================================ */
class SakuraCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.petalCount = window.innerWidth < 768 ? 26 : 45;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createPetals();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createPetals() {
    this.petals = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 8 + 8,
        speedX: Math.random() * 1.5 - 0.5,
        speedY: Math.random() * 1.2 + 0.8,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.45 + 0.45,
        colorType: Math.random() > 0.4 ? 'pink' : 'blush'
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.petals) {
      p.x += p.speedX + Math.sin(p.angle) * 0.5;
      p.y += p.speedY;
      p.angle += p.angularSpeed;
      p.flipAngle += p.flipSpeed;

      // Wrap around screen edges
      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 20) {
        p.x = -20;
      } else if (p.x < -20) {
        p.x = this.width + 20;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.scale(Math.sin(p.flipAngle), 1);

      this.ctx.beginPath();
      // Draw organic sakura petal shape using bezier curves
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size * 1.5);
      this.ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);

      const grad = this.ctx.createLinearGradient(0, 0, 0, p.size * 1.5);
      if (p.colorType === 'pink') {
        grad.addColorStop(0, `rgba(255, 182, 193, ${p.opacity})`);
        grad.addColorStop(1, `rgba(255, 105, 140, ${p.opacity * 0.8})`);
      } else {
        grad.addColorStop(0, `rgba(255, 230, 240, ${p.opacity})`);
        grad.addColorStop(1, `rgba(255, 140, 180, ${p.opacity * 0.75})`);
      }

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = 'rgba(255, 117, 140, 0.4)';
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

/* ============================================================================
   6. CANVAS 2: TWINKLING STARDUST & METEOR SKY
   ============================================================================ */
class StarsCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.starCount = window.innerWidth < 768 ? 40 : 75;
    this.shootingStars = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createStars();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleFactor: Math.random() * Math.PI
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render stars
    for (let s of this.stars) {
      s.twinkleFactor += s.twinkleSpeed;
      const currentAlpha = s.alpha * (0.4 + 0.6 * Math.sin(s.twinkleFactor));

      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, currentAlpha)})`;
      this.ctx.shadowColor = 'rgba(255, 220, 240, 0.8)';
      this.ctx.shadowBlur = s.size * 3;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

/* ============================================================================
   7. CANVAS 3: HEART CONFETTI & CELEBRATION PARTICLES
   Fired during the Screen 6 Proposal YES Celebration
   ============================================================================ */
class ConfettiCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  burst() {
    this.active = true;
    this.particles = [];
    const colors = ['#ff4b72', '#ff758c', '#ff8da1', '#c77dff', '#ffd166', '#ffffff'];

    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 4;
      this.particles.push({
        x: this.width / 2,
        y: this.height / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        gravity: 0.18,
        friction: 0.98,
        size: Math.random() * 14 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        type: Math.random() > 0.4 ? 'heart' : 'star',
        alpha: 1,
        decay: Math.random() * 0.008 + 0.004
      });
    }

    this.loop();
  }

  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    let aliveCount = 0;
    for (let p of this.particles) {
      p.vx *= p.friction;
      p.vy = p.vy * p.friction + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        aliveCount++;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === 'heart') {
          this.drawHeart(p.size, p.color);
        } else {
          this.drawStar(p.size, p.color);
        }

        this.ctx.restore();
      }
    }

    if (aliveCount > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.active = false;
    }
  }

  drawHeart(size, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    const topCurveHeight = size * 0.3;
    this.ctx.moveTo(0, topCurveHeight);
    this.ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    this.ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
    this.ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    this.ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawStar(size, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 2;
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;

    this.ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = Math.cos(rot) * outerRadius;
      let y = Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(0, -outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

let confettiEngine = null;

/* ============================================================================
   8. SCREEN ROUTER & SMOOTH NAVIGATION
   ============================================================================ */
function goToScreen(screenNumber) {
  if (state.isTransitioning || state.currentScreen === screenNumber) return;

  const currentScreenEl = document.getElementById(`screen-${state.currentScreen}`);
  const nextScreenEl = document.getElementById(`screen-${screenNumber}`);

  if (!nextScreenEl) return;

  state.isTransitioning = true;

  if (currentScreenEl) {
    // Phase 1: Smooth fade & blur out
    currentScreenEl.classList.add('transition-leaving');

    setTimeout(() => {
      currentScreenEl.classList.remove('active', 'transition-leaving');

      state.currentScreen = screenNumber;
      nextScreenEl.classList.add('active', 'transition-entering');

      // Smooth scroll to top of viewport
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Screen-specific triggers
      onScreenEnter(screenNumber);

      // Phase 2: Complete entrance transition
      setTimeout(() => {
        nextScreenEl.classList.remove('transition-entering');
        state.isTransitioning = false;
      }, 500);
    }, 320);
  } else {
    state.currentScreen = screenNumber;
    nextScreenEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onScreenEnter(screenNumber);
    state.isTransitioning = false;
  }
}

function onScreenEnter(screenNumber) {
  switch (screenNumber) {
    case 2:
      startWelcomeTypewriter();
      break;
    case 4:
      renderQuizQuestion();
      break;
    case 6:
      if (confettiEngine) confettiEngine.burst();
      break;
    default:
      break;
  }
}

/* ============================================================================
   9. SCREEN 1: SECRET PASSWORD LOGIC & UNLOCK NOTIFICATION
   ============================================================================ */
function sendUnlockNotification() {
  try {
    const timeNow = new Date().toLocaleString();
    const timeZone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Unknown';
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'Mobile Device 📱' : 'Desktop / Laptop 💻';

    const payload = {
      _subject: '🌸 Sara just opened & unlocked your proposal website! 💖',
      _captcha: 'false',
      _template: 'table',
      event: 'Website Unlocked 💖',
      time: timeNow,
      timezone: timeZone,
      device: deviceType,
      screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
      message: 'Sara just entered the secret password and clicked "Unlock My Heart"!'
    };

    fetch(`https://formsubmit.co/ajax/${CONFIG.RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.warn('Unlock notification notice:', err);
    });
  } catch (e) {
    console.warn('Unlock notification error:', e);
  }
}

function setupScreen1() {
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const errorToast = document.getElementById('password-error');
  const peekBtn = document.getElementById('peek-password-btn');
  const hintToggleBtn = document.getElementById('hint-toggle-btn');
  const hintBox = document.getElementById('hint-box');

  // Peek password toggle
  if (peekBtn && input) {
    peekBtn.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
        peekBtn.textContent = '🔒';
      } else {
        input.type = 'password';
        peekBtn.textContent = '👁️';
      }
    });
  }

  // Hint accordion toggle (if present)
  if (hintToggleBtn && hintBox) {
    hintToggleBtn.addEventListener('click', () => {
      hintBox.classList.toggle('hidden');
    });
  }

  // Form submit handler
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredValue = input.value.trim().toLowerCase();
      const correctWord = CONFIG.SECRET_PASSWORD.trim().toLowerCase();

      // Forgiving matching: matches 'sara', or 'sarah', or 'love'
      if (enteredValue === correctWord || enteredValue === 'sarah' || enteredValue === 'love') {
        errorToast.textContent = '';
        input.classList.remove('shake-animation');

        // Unlock animation on icon
        const lockGlyph = document.getElementById('lock-glyph');
        if (lockGlyph) {
          lockGlyph.textContent = '🔓';
          lockGlyph.style.transform = 'scale(1.2)';
        }

        // Start Ed Sheeran - Perfect right on user unlock gesture!
        if (!state.musicStarted) {
          AudioController.startMusic();
        }

        // Send silent unlock notification to Jahid's email
        sendUnlockNotification();

        setTimeout(() => {
          goToScreen(2);
        }, 400);

      } else {
        // Shake & display playful romantic error
        input.classList.remove('shake-animation');
        void input.offsetWidth; // Trigger DOM reflow
        input.classList.add('shake-animation');

        const cuteErrors = [
          "Oops! Not quite, my princess 🌸 Try again!",
          "Secret access denied! Are you really Sara? 💕",
          "Try entering your beautiful name ✨",
          "One more try, cutie! 💖"
        ];
        const randomErr = cuteErrors[Math.floor(Math.random() * cuteErrors.length)];
        errorToast.textContent = randomErr;
      }
    });
  }
}

/* ============================================================================
   10. SCREEN 2: ROMANTIC WELCOME & TYPEWRITER
   ============================================================================ */
function startWelcomeTypewriter() {
  const container = document.getElementById('welcome-typewriter');
  if (!container) return;

  container.textContent = '';
  const fullText = CONFIG.WELCOME_TEXT;
  let index = 0;

  function typeChar() {
    if (index < fullText.length) {
      container.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeChar, 45);
    }
  }

  setTimeout(typeChar, 300);
}

function setupScreen2() {
  const startStoryBtn = document.getElementById('start-story-btn');
  if (startStoryBtn) {
    startStoryBtn.addEventListener('click', () => {
      // User explicitly interacted: safe to begin audio!
      if (!state.musicStarted) {
        AudioController.startMusic();
      }
      goToScreen(3);
    });
  }
}

/* ============================================================================
   11. SCREEN 3: ANIMATED LOVE LETTER & 3D ENVELOPE
   ============================================================================ */
function setupScreen3() {
  const envelopeContainer = document.getElementById('envelope-container');
  const envelope = document.getElementById('envelope');
  const letterSheet = document.getElementById('letter-sheet');
  const letterControls = document.getElementById('letter-controls');
  const toQuizBtn = document.getElementById('to-quiz-btn');

  if (envelopeContainer && envelope) {
    envelopeContainer.addEventListener('click', () => {
      if (state.letterOpened) return;
      state.letterOpened = true;

      // 1. Break the seal & open envelope flap
      envelope.classList.add('open');

      // Update the hint above envelope
      const tapHint = document.getElementById('envelope-tap-hint');
      if (tapHint) {
        tapHint.textContent = "💖 Scroll down gently to read what's in my heart... 🌸";
        tapHint.style.animation = "none";
      }

      // 2. Play soft audio cue or ensure music is running
      if (!state.musicStarted) {
        AudioController.startMusic();
      }

      // 3. Type out the letter text gradually after letter smoothly glides out
      setTimeout(() => {
        typeLetterContent();
      }, 750);
    });
  }

  if (toQuizBtn) {
    toQuizBtn.addEventListener('click', () => {
      goToScreen(4);
    });
  }
}

function typeLetterContent() {
  const container = document.getElementById('letter-typewriter-content');
  const controls = document.getElementById('letter-controls');
  if (!container) return;

  container.textContent = '';
  const text = CONFIG.LOVE_LETTER_CONTENT;
  let charIdx = 0;

  function typeNext() {
    if (charIdx < text.length) {
      // Type in bursts of 2-3 characters for a natural handwritten flow
      const chunk = text.substr(charIdx, 2);
      container.textContent += chunk;
      charIdx += chunk.length;

      const delay = text.charAt(charIdx) === '\n' ? 80 : 18;
      setTimeout(typeNext, delay);
    } else {
      // Reveal the continue button
      if (controls) {
        controls.classList.remove('hidden');
        controls.style.opacity = '0';
        setTimeout(() => {
          controls.style.opacity = '1';
        }, 50);
      }
    }
  }

  typeNext();
}

/* ============================================================================
   12. SCREEN 4: CUTE LOVE QUIZ
   ============================================================================ */
function renderQuizQuestion() {
  const qData = CONFIG.QUIZ[state.currentQuizIndex];
  if (!qData) {
    goToScreen(5);
    return;
  }

  state.quizSelected = false;

  // Update progress dots
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      dot.className = 'progress-dot';
      if (i === state.currentQuizIndex + 1) dot.classList.add('active');
      if (i < state.currentQuizIndex + 1) dot.classList.add('completed');
    }
  }

  // Set question title
  const questionEl = document.getElementById('quiz-question-text');
  if (questionEl) questionEl.textContent = qData.question;

  // Reset reaction box
  const reactionBox = document.getElementById('quiz-reaction');
  if (reactionBox) reactionBox.classList.add('hidden');

  // Next button hidden until choice made
  const nextBtn = document.getElementById('next-question-btn');
  if (nextBtn) {
    nextBtn.classList.add('hidden');
    if (state.currentQuizIndex === CONFIG.QUIZ.length - 1) {
      nextBtn.innerHTML = '<span>Ready for what is next? 💖</span>';
    } else {
      nextBtn.innerHTML = '<span>Next Question 🌸</span>';
    }
  }

  // Render options
  const optionsGrid = document.getElementById('quiz-options-grid');
  if (optionsGrid) {
    optionsGrid.innerHTML = '';
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="opt-bullet">🌸</span> <span class="opt-text">${opt.text}</span>`;
      btn.addEventListener('click', () => handleQuizOptionClick(idx, opt.reaction, btn));
      optionsGrid.appendChild(btn);
    });
  }
}

function handleQuizOptionClick(index, reaction, buttonElement) {
  if (state.quizSelected) return;
  state.quizSelected = true;

  // Highlight selected button
  const allBtns = document.querySelectorAll('.quiz-option-btn');
  allBtns.forEach(b => b.classList.remove('selected'));
  buttonElement.classList.add('selected');

  // Show sweet reaction box
  const reactionBox = document.getElementById('quiz-reaction');
  const reactionText = document.getElementById('reaction-text');
  if (reactionBox && reactionText) {
    reactionText.textContent = reaction;
    reactionBox.classList.remove('hidden');
  }

  // Show next button
  const nextBtn = document.getElementById('next-question-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
}

function setupScreen4() {
  const nextBtn = document.getElementById('next-question-btn');
  const skipBtn = document.getElementById('skip-quiz-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      state.currentQuizIndex++;
      if (state.currentQuizIndex < CONFIG.QUIZ.length) {
        renderQuizQuestion();
      } else {
        goToScreen(5);
      }
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      goToScreen(5);
    });
  }
}

/* ============================================================================
   13. SCREEN 5: THE PROPOSAL & NO BUTTON DODGE MECHANICS
   Playful evasion on desktop, touch-friendly fallback on mobile.
   ============================================================================ */
function setupScreen5() {
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const noBtnText = document.getElementById('no-btn-text');
  const arena = document.getElementById('proposal-arena');
  const bubble = document.getElementById('playful-bubble');
  const bubbleText = document.getElementById('playful-bubble-text');

  // Sweet Dialog elements
  const sweetDialog = document.getElementById('sweet-no-dialog');
  const dialogYesBtn = document.getElementById('dialog-yes-btn');
  const dialogCloseBtn = document.getElementById('dialog-close-btn');

  // YES Button Click -> Celebration!
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      goToScreen(6);
    });
  }

  if (dialogYesBtn) {
    dialogYesBtn.addEventListener('click', () => {
      if (sweetDialog) sweetDialog.classList.add('hidden');
      goToScreen(6);
    });
  }

  if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener('click', () => {
      if (sweetDialog) sweetDialog.classList.add('hidden');
    });
  }

  // NO Button Click: DO NOT MOVE! Ask "Are you sure?" questions infinitely!
  if (noBtn) {
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      state.noClickCount = (state.noClickCount || 0) + 1;

      // Make YES button grow slightly larger each time NO is clicked!
      state.yesScale = Math.min(2.0, 1.0 + state.noClickCount * 0.08);
      if (yesBtn) {
        yesBtn.style.transform = `scale(${state.yesScale})`;
      }

      // Infinite cycle of "Are you sure?" questions
      const questionList = CONFIG.NO_QUESTIONS || [
        "Are you sure? 🥺",
        "Are you really sure? 🥺",
        "Are you really really sure? 🥺",
        "Are you 100% sure? 🥺",
        "Think about it again! 💖",
        "Are you absolutely sure? 🥺",
        "Sara, please reconsider? 🥹"
      ];

      const msgIndex = (state.noClickCount - 1) % questionList.length;
      const question = questionList[msgIndex];

      // 1. Update text on NO button
      if (noBtnText) {
        noBtnText.textContent = question;
      }

      // 2. Update and display the playful question bubble
      if (bubble && bubbleText) {
        bubbleText.textContent = question;
        bubble.classList.remove('hidden');
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }

      // 3. Gentle shake in place (does NOT move position)
      noBtn.classList.remove('shake-animation');
      void noBtn.offsetWidth;
      noBtn.classList.add('shake-animation');
    });
  }
}

/* ============================================================================
   14. SCREEN 6: YES CELEBRATION
   ============================================================================ */
function setupScreen6() {
  const toFormBtn = document.getElementById('to-form-btn');
  if (toFormBtn) {
    toFormBtn.addEventListener('click', () => {
      goToScreen(7);
    });
  }
}

/* ============================================================================
   15. SCREEN 7: SARA'S FEELINGS FORM & EMAILJS INTEGRATION
   Direct, secure transmission to jh4406011@gmail.com with honest error handling.
   ============================================================================ */
function setupScreen7() {
  const form = document.getElementById('feelings-form');
  const submitBtn = document.getElementById('submit-feelings-btn');
  const spinner = document.getElementById('btn-spinner');
  const statusBanner = document.getElementById('form-status');
  const fallbackBox = document.getElementById('fallback-email-box');
  const directMailtoLink = document.getElementById('direct-mailto-link');

  // Initialize EmailJS if public key is configured
  if (window.emailjs && CONFIG.EMAILJS.PUBLIC_KEY && CONFIG.EMAILJS.PUBLIC_KEY.trim() !== '') {
    try {
      emailjs.init({
        publicKey: CONFIG.EMAILJS.PUBLIC_KEY,
      });
    } catch (e) {
      console.warn('EmailJS initialization notice:', e);
    }
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Retrieve field values
      const firstThought = document.getElementById('field-first-thought')?.value.trim() || '';
      const feelings = document.getElementById('field-feelings')?.value.trim() || '';
      const future = document.getElementById('field-future')?.value.trim() || '';
      const message = document.getElementById('field-message')?.value.trim() || '';

      // Validate required fields
      let hasError = false;
      const checkField = (val, errId, msg) => {
        const errEl = document.getElementById(errId);
        if (!val) {
          if (errEl) errEl.textContent = msg;
          hasError = true;
        } else {
          if (errEl) errEl.textContent = '';
        }
      };

      checkField(firstThought, 'err-first-thought', 'Please share your first thought 🌸');
      checkField(feelings, 'err-feelings', 'Please tell me how you feel 💖');
      checkField(future, 'err-future', 'Please share what you would like for us ✨');

      if (hasError) return;

      // Prepare fallback mailto link regardless
      const subject = encodeURIComponent("Sara's Romantic Response 💌");
      const body = encodeURIComponent(
        `Dear Jahid,\n\nHere are my answers:\n\n1. First thought:\n${firstThought}\n\n2. How I feel about you:\n${feelings}\n\n3. What I would like us to be:\n${future}\n\n4. Anything else:\n${message}\n\nWith love,\nSara 🌸`
      );
      if (directMailtoLink) {
        directMailtoLink.href = `mailto:${CONFIG.RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
      }

      // Set Loading UI
      if (submitBtn) submitBtn.disabled = true;
      if (spinner) spinner.classList.remove('hidden');
      if (statusBanner) {
        statusBanner.className = 'form-status-banner loading';
        statusBanner.textContent = 'Carrying your sweet words like a paper crane to Jahid... 🕊️';
        statusBanner.classList.remove('hidden');
      }

      // -------------------------------------------------------------
      // API Provider 1: FormSubmit Direct AJAX API (Zero setup needed!)
      // -------------------------------------------------------------
      if (CONFIG.EMAIL_PROVIDER === 'formsubmit') {
        try {
          const payload = {
            _subject: "Sara's Romantic Proposal Response 💌",
            _template: "table",
            _captcha: "false",
            "1. First Thought": firstThought,
            "2. Feelings About Jahid": feelings,
            "3. What She Wants Us To Be": future,
            "4. Personal Message": message || "(No extra note)",
            "Submitted At": new Date().toLocaleString()
          };

          const response = await fetch(`https://formsubmit.co/ajax/${CONFIG.RECIPIENT_EMAIL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          const result = await response.json();

          if (response.ok && (result.success === 'true' || result.success === true)) {
            statusBanner.className = 'form-status-banner success';
            statusBanner.textContent = 'Your feelings were safely delivered to Jahid! 💗';

            setTimeout(() => {
              goToScreen(8);
            }, 1200);
          } else {
            throw new Error(result.message || `API error code: ${response.status}`);
          }
        } catch (error) {
          console.error('FormSubmit API error:', error);
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.classList.add('hidden');

          statusBanner.className = 'form-status-banner error';
          statusBanner.innerHTML = `⚠️ Delivery encountered an issue (${error.message || 'Service unavailable'}).<br>Please click the button below to send it directly via email!`;
          if (fallbackBox) fallbackBox.classList.remove('hidden');
        }
        return;
      }

      // -------------------------------------------------------------
      // API Provider 2: EmailJS Browser SDK (When configured)
      // -------------------------------------------------------------
      const isConfigured =
        window.emailjs &&
        CONFIG.EMAILJS.SERVICE_ID &&
        CONFIG.EMAILJS.TEMPLATE_ID &&
        CONFIG.EMAILJS.PUBLIC_KEY &&
        CONFIG.EMAILJS.SERVICE_ID.trim() !== '' &&
        CONFIG.EMAILJS.TEMPLATE_ID.trim() !== '' &&
        CONFIG.EMAILJS.PUBLIC_KEY.trim() !== '';

      if (isConfigured) {
        try {
          const templateParams = {
            to_email: CONFIG.RECIPIENT_EMAIL,
            first_thought: firstThought,
            feelings: feelings,
            future: future,
            message: message,
            timestamp: new Date().toLocaleString()
          };

          const response = await emailjs.send(
            CONFIG.EMAILJS.SERVICE_ID,
            CONFIG.EMAILJS.TEMPLATE_ID,
            templateParams
          );

          if (response.status === 200 || response.text === 'OK') {
            statusBanner.className = 'form-status-banner success';
            statusBanner.textContent = 'Your feelings were safely delivered to Jahid! 💗';
            
            setTimeout(() => {
              goToScreen(8);
            }, 1200);
          } else {
            throw new Error(`EmailJS responded with status: ${response.status}`);
          }
        } catch (error) {
          console.error('EmailJS error:', error);
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.classList.add('hidden');

          statusBanner.className = 'form-status-banner error';
          statusBanner.innerHTML = `⚠️ Delivery encountered a network glitch (${error.message || 'Service unavailable'}).<br>Please click the button below to send it directly via email!`;
          if (fallbackBox) fallbackBox.classList.remove('hidden');
        }
      } else {
        // Transparent development mode: EmailJS credentials not inserted yet
        setTimeout(() => {
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.classList.add('hidden');

          statusBanner.className = 'form-status-banner success';
          statusBanner.innerHTML = `💌 <strong>Your answers are ready!</strong><br>EmailJS is awaiting your Service &amp; Template IDs in <code>script.js</code>. Click below to review or send directly to <strong>${CONFIG.RECIPIENT_EMAIL}</strong>:`;
          if (fallbackBox) fallbackBox.classList.remove('hidden');

          setTimeout(() => {
            goToScreen(8);
          }, 3500);
        }, 800);
      }
    });
  }
}

/* ============================================================================
   16. SCREEN 8: FINAL MESSAGE & REPLAY
   ============================================================================ */
function setupScreen8() {
  const replayBtn = document.getElementById('replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Reset state for a fresh replay
      state.currentQuizIndex = 0;
      state.noDodgeCount = 0;
      state.noClickCount = 0;
      state.yesScale = 1.0;
      state.letterOpened = false;

      const envelope = document.getElementById('envelope');
      if (envelope) envelope.classList.remove('open');

      const yesBtn = document.getElementById('yes-btn');
      if (yesBtn) yesBtn.style.transform = 'scale(1)';

      const noBtn = document.getElementById('no-btn');
      const noBtnText = document.getElementById('no-btn-text');
      const bubble = document.getElementById('playful-bubble');
      if (noBtn) {
        noBtn.classList.remove('teleported');
        noBtn.classList.remove('shake-animation');
        noBtn.style.left = '';
        noBtn.style.top = '';
      }
      if (noBtnText) {
        noBtnText.textContent = 'No... 🙈';
      }
      if (bubble) {
        bubble.classList.add('hidden');
      }

      goToScreen(2);
    });
  }
}

/* ============================================================================
   17. INITIALIZATION ON DOM READY
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize canvases
  new SakuraCanvas('sakura-canvas');
  new StarsCanvas('stars-canvas');
  confettiEngine = new ConfettiCanvas('confetti-canvas');

  // 2. Initialize Audio Controller
  AudioController.init();

  // 3. Setup Screens
  setupScreen1();
  setupScreen2();
  setupScreen3();
  setupScreen4();
  setupScreen5();
  setupScreen6();
  setupScreen7();
  setupScreen8();

  // 4. Dismiss loading screen smoothly
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 1200);
  }
});
