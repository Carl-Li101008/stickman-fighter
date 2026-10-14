var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../minigame-src/main.ts
var main_exports = {};
__export(main_exports, {
  game: () => game
});
module.exports = __toCommonJS(main_exports);

// src/game/engine.ts
var WEAPON_SPECS = {
  pistol: { kind: "pistol", cn: "\u624B\u67AA", melee: false, damage: 11, range: 0, cooldown: 0.28, knockback: 140, ammo: 8, bulletSpeed: 950, pellets: 1, spread: 0.02, color: "#cbd5e1" },
  shotgun: { kind: "shotgun", cn: "\u9730\u5F39\u67AA", melee: false, damage: 7, range: 0, cooldown: 0.75, knockback: 260, ammo: 5, bulletSpeed: 820, pellets: 6, spread: 0.24, color: "#d97706" },
  rifle: { kind: "rifle", cn: "\u7A81\u51FB\u6B65\u67AA", melee: false, damage: 6, range: 0, cooldown: 0.11, knockback: 70, ammo: 24, bulletSpeed: 1050, pellets: 1, spread: 0.05, auto: true, color: "#475569" },
  rocket: { kind: "rocket", cn: "\u706B\u7BAD\u7B52", melee: false, damage: 34, range: 0, cooldown: 1.1, knockback: 320, ammo: 3, bulletSpeed: 430, pellets: 1, spread: 0, color: "#8b5cf6" },
  sword: { kind: "sword", cn: "\u957F\u5251", melee: true, damage: 17, range: 88, cooldown: 0.4, knockback: 240, ammo: -1, color: "#22d3ee" },
  hammer: { kind: "hammer", cn: "\u91CD\u9524", melee: true, damage: 27, range: 74, cooldown: 0.85, knockback: 460, ammo: -1, color: "#f59e0b" }
};
var SPAWN_TABLE = ["pistol", "pistol", "shotgun", "rifle", "rifle", "rocket", "sword", "sword", "hammer"];
var W = 960;
var H = 540;
var GRAV = 2100;
var MOVE = 395;
var JUMP_V = -840;
var FLOOR = 490;
var STAGES = [
  {
    name: "\u57CE\u5E02\u5929\u53F0",
    sky: ["#0f172a", "#1e1b4b", "#312e81"],
    platforms: [
      { x: 150, y: 368, w: 210, h: 14 },
      { x: 600, y: 368, w: 210, h: 14 },
      { x: 375, y: 258, w: 210, h: 14 }
    ],
    floor: "#0b1120",
    floorEdge: "#334155",
    plank: "#1e293b",
    plankEdge: "#38bdf8",
    decor: "city",
    ambient: "none",
    hazards: []
  },
  {
    name: "\u843D\u65E5\u5CE1\u8C37",
    sky: ["#2e1065", "#9d174d", "#f59e0b"],
    platforms: [
      { x: 90, y: 372, w: 170, h: 14 },
      { x: 700, y: 372, w: 170, h: 14 },
      { x: 330, y: 300, w: 300, h: 14 },
      { x: 415, y: 205, w: 130, h: 14 }
    ],
    floor: "#451a03",
    floorEdge: "#fbbf24",
    plank: "#78350f",
    plankEdge: "#fde047",
    decor: "desert",
    ambient: "none",
    hazards: [{ type: "spikes", x: 445, y: FLOOR, w: 70, h: 16, dmg: 12 }]
  },
  {
    name: "\u5E7D\u6697\u68EE\u6797",
    sky: ["#02120c", "#052e16", "#14532d"],
    platforms: [
      { x: 130, y: 390, w: 190, h: 16 },
      { x: 640, y: 390, w: 190, h: 16 },
      { x: 385, y: 300, w: 190, h: 16 },
      { x: 130, y: 208, w: 150, h: 16 },
      { x: 680, y: 208, w: 150, h: 16 }
    ],
    floor: "#03150c",
    floorEdge: "#16a34a",
    plank: "#14532d",
    plankEdge: "#4ade80",
    decor: "forest",
    ambient: "firefly",
    hazards: [
      { type: "spikes", x: 190, y: 390, w: 70, h: 16, dmg: 12 },
      { type: "spikes", x: 700, y: 390, w: 70, h: 16, dmg: 12 }
    ]
  },
  {
    name: "\u7194\u5CA9\u6D1E\u7A9F",
    sky: ["#160404", "#431407", "#7c2d12"],
    platforms: [
      { x: 120, y: 380, w: 180, h: 14 },
      { x: 660, y: 380, w: 180, h: 14 },
      { x: 390, y: 272, w: 180, h: 14 },
      { x: 60, y: 182, w: 130, h: 14 },
      { x: 770, y: 182, w: 130, h: 14 }
    ],
    floor: "#1c0a0a",
    floorEdge: "#ea580c",
    plank: "#292524",
    plankEdge: "#f97316",
    decor: "lava",
    ambient: "ember",
    hazards: [
      { type: "spikes", x: 295, y: FLOOR, w: 80, h: 16, dmg: 14 },
      { type: "spikes", x: 585, y: FLOOR, w: 80, h: 16, dmg: 14 }
    ]
  },
  {
    name: "\u6781\u5149\u96EA\u539F",
    sky: ["#020617", "#0c1a3a", "#164e63"],
    platforms: [
      { x: 170, y: 380, w: 200, h: 16 },
      { x: 590, y: 380, w: 200, h: 16 },
      { x: 380, y: 262, w: 200, h: 16 }
    ],
    floor: "#dbe7f3",
    floorEdge: "#7dd3fc",
    plank: "#b6c6d8",
    plankEdge: "#38bdf8",
    decor: "snow",
    ambient: "snow",
    hazards: [
      { type: "spikes", x: 245, y: 380, w: 60, h: 16, dmg: 12 },
      { type: "spikes", x: 655, y: 380, w: 60, h: 16, dmg: 12 }
    ]
  },
  // ---------------- 挤压模式关卡（第 6 回合起出现） ----------------
  {
    name: "\u9F7F\u8F6E\u51B3\u6597\u573A",
    sky: ["#111827", "#1f2937", "#374151"],
    platforms: [
      { x: 330, y: 330, w: 140, h: 14 },
      { x: 490, y: 330, w: 140, h: 14 }
    ],
    floor: "#0b1120",
    floorEdge: "#64748b",
    plank: "#1e293b",
    plankEdge: "#94a3b8",
    decor: "city",
    ambient: "none",
    hazards: [],
    pressure: "gears"
  },
  {
    name: "\u5CA9\u6D46\u7206\u53D1",
    sky: ["#160404", "#431407", "#7c2d12"],
    platforms: [
      { x: 150, y: 400, w: 180, h: 14 },
      { x: 630, y: 400, w: 180, h: 14 },
      { x: 390, y: 300, w: 180, h: 14 },
      { x: 240, y: 205, w: 140, h: 14 },
      { x: 580, y: 205, w: 140, h: 14 }
    ],
    floor: "#1c0a0a",
    floorEdge: "#ea580c",
    plank: "#292524",
    plankEdge: "#f97316",
    decor: "lava",
    ambient: "ember",
    hazards: [],
    pressure: "lava"
  },
  {
    name: "\u7EDE\u8089\u4F20\u9001\u5E26",
    sky: ["#2e1065", "#9d174d", "#f59e0b"],
    platforms: [
      { x: 60, y: 300, w: 130, h: 14 },
      { x: 770, y: 300, w: 130, h: 14 }
    ],
    floor: "#451a03",
    floorEdge: "#fbbf24",
    plank: "#78350f",
    plankEdge: "#fde047",
    decor: "desert",
    ambient: "none",
    hazards: [{ type: "spikes", x: 430, y: FLOOR, w: 100, h: 18, dmg: 16 }],
    pressure: "conveyor"
  }
];
var ROUND_TIME = 99;
var WINS_TO_MATCH = 5;
var Sfx = class {
  constructor() {
    __publicField(this, "ctx", null);
    __publicField(this, "master", null);
  }
  ensure() {
    var _a;
    if (!this.ctx) {
      try {
        const g = globalThis;
        if ((_a = g.wx) == null ? void 0 : _a.createWebAudioContext) this.ctx = g.wx.createWebAudioContext();
        else if (typeof AudioContext !== "undefined") this.ctx = new AudioContext();
        if (this.ctx) {
          this.master = this.ctx.createGain();
          this.master.gain.value = 0.14;
          this.master.connect(this.ctx.destination);
        }
      } catch {
        this.ctx = null;
      }
    }
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }
  tone(freq, dur, type, vol = 1, slide = 0) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide !== 0) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(1e-3, t + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur);
  }
  noise(dur, vol, freq, q = 1) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(1e-3, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t);
  }
  shoot(kind) {
    if (kind === "shotgun") this.noise(0.22, 1.4, 900, 0.6);
    else if (kind === "rifle") this.noise(0.08, 0.9, 1600, 1.2);
    else if (kind === "rocket") {
      this.noise(0.4, 1.2, 400, 0.5);
      this.tone(120, 0.35, "sawtooth", 0.5, -60);
    } else this.noise(0.12, 1.1, 1200, 1);
  }
  empty() {
    this.tone(1400, 0.05, "square", 0.4);
  }
  swing() {
    this.noise(0.12, 0.5, 2400, 2);
  }
  hit() {
    this.tone(180, 0.12, "square", 0.9, -90);
    this.noise(0.08, 0.7, 700, 1);
  }
  hurt() {
    this.tone(300, 0.15, "sawtooth", 0.6, -160);
  }
  jump() {
    this.tone(280, 0.12, "sine", 0.5, 220);
  }
  pickup() {
    this.tone(520, 0.09, "triangle", 0.7, 260);
  }
  explosion() {
    this.noise(0.6, 1.8, 250, 0.4);
    this.tone(90, 0.5, "sawtooth", 0.9, -55);
  }
  gearWarn() {
    this.tone(620, 0.14, "square", 0.45);
    setTimeout(() => this.tone(620, 0.14, "square", 0.45), 190);
  }
  gearAdvance() {
    this.noise(0.35, 1.3, 280, 0.5);
    this.tone(75, 0.4, "sawtooth", 0.85, -25);
  }
  ko() {
    this.tone(220, 0.6, "sawtooth", 1, -170);
    this.noise(0.4, 1, 500, 0.6);
  }
  fanfare() {
    this.tone(440, 0.12, "triangle", 0.7);
    setTimeout(() => this.tone(554, 0.12, "triangle", 0.7), 130);
    setTimeout(() => this.tone(659, 0.22, "triangle", 0.8), 260);
  }
};
var Game = class {
  constructor() {
    __publicField(this, "players");
    __publicField(this, "bullets", []);
    __publicField(this, "pickups", []);
    __publicField(this, "particles", []);
    __publicField(this, "phase", "menu");
    __publicField(this, "paused", false);
    __publicField(this, "round", 1);
    __publicField(this, "timer", ROUND_TIME);
    __publicField(this, "banner", null);
    __publicField(this, "bannerT", 0);
    __publicField(this, "phaseT", 0);
    __publicField(this, "winnerName", null);
    __publicField(this, "spawnT", 3);
    __publicField(this, "shake", 0);
    __publicField(this, "time", 0);
    __publicField(this, "stageIdx", 0);
    __publicField(this, "ambientT", 0);
    // 挤压模式状态
    __publicField(this, "gearL", -80);
    __publicField(this, "gearR", W + 80);
    __publicField(this, "gearTimer", 8);
    __publicField(this, "gearWarnT", 0);
    __publicField(this, "gearActive", false);
    __publicField(this, "lavaY", H + 60);
    __publicField(this, "sfx", new Sfx());
    __publicField(this, "stars", []);
    __publicField(this, "buildings", []);
    __publicField(this, "onHud", null);
    __publicField(this, "_wins", [0, 0]);
    this.players = [this.makePlayer(0), this.makePlayer(1)];
    for (let i = 0; i < 70; i++) this.stars.push({ x: Math.random() * W, y: Math.random() * 300, r: Math.random() * 1.4 + 0.4 });
    let bx = 0;
    while (bx < W) {
      const bw = 40 + Math.random() * 70;
      const bh = 60 + Math.random() * 170;
      const wins = [];
      const n = Math.floor(bw * bh / 900);
      for (let i = 0; i < n; i++) wins.push(Math.random() < 0.4);
      this.buildings.push({ x: bx, w: bw, h: bh, windows: wins });
      bx += bw + 6;
    }
  }
  stage() {
    return STAGES[this.stageIdx];
  }
  resetPressure() {
    this.gearL = -80;
    this.gearR = W + 80;
    this.gearTimer = 8;
    this.gearWarnT = 0;
    this.gearActive = false;
    this.lavaY = H + 60;
  }
  pickNewStage() {
    const pool = this.round >= 6 ? STAGES.filter((s) => s.pressure) : STAGES.filter((s) => !s.pressure);
    const options = pool.filter((s) => s !== this.stage());
    this.stageIdx = STAGES.indexOf(options[Math.floor(Math.random() * options.length)]);
  }
  makePlayer(id) {
    return {
      id,
      name: id === 0 ? "\u7EA2\u65B9" : "\u84DD\u65B9",
      color: id === 0 ? "#ef4444" : "#3b82f6",
      x: id === 0 ? 240 : 720,
      y: FLOOR,
      vx: 0,
      vy: 0,
      hp: 100,
      maxHp: 100,
      facing: id === 0 ? 1 : -1,
      onGround: true,
      airJumps: 1,
      coyoteT: 0,
      jumpBufT: 0,
      dropT: 0,
      hazardCd: 0,
      weapon: null,
      attackCd: 0,
      attackAnim: 0,
      pickupCd: 0,
      invuln: 0,
      dead: false,
      hitFlash: 0,
      runPhase: 0,
      prevJump: false,
      prevDown: false,
      prevAttack: false,
      prevPickup: false,
      keys: { left: false, right: false, jump: false, down: false, attack: false, pickup: false },
      spawnX: id === 0 ? 240 : 720
    };
  }
  // ---------------- 输入 ----------------
  setKey(player, action, down) {
    this.sfx.ensure();
    this.players[player].keys[action] = down;
  }
  startMatch() {
    if (this.phase !== "menu" && this.phase !== "matchEnd") return;
    this.players = [this.makePlayer(0), this.makePlayer(1)];
    this.bullets = [];
    this.pickups = [];
    this.particles = [];
    this.round = 1;
    this.winnerName = null;
    this._wins = [0, 0];
    this.spawnT = 2;
    this.pickNewStage();
    this.resetPressure();
    this.beginRound(`ROUND 1 \xB7 ${this.stage().name} \xB7 FIGHT!`);
  }
  togglePause() {
    if (this.phase === "fight") this.paused = !this.paused;
  }
  beginRound(bannerText) {
    this.players = [this.makePlayer(0), this.makePlayer(1)];
    this.players[0].invuln = 1;
    this.players[1].invuln = 1;
    this.bullets = [];
    this.timer = ROUND_TIME;
    this.phase = "fight";
    this.paused = false;
    this.phaseT = 0;
    this.resetPressure();
    const pressure = this.stage().pressure;
    this.setBanner(bannerText + (pressure ? " \xB7 \u5C0F\u5FC3\u673A\u5173\uFF01" : ""), pressure ? 2 : 1.4);
    this.sfx.fanfare();
  }
  setBanner(text2, t) {
    this.banner = text2;
    this.bannerT = t;
  }
  // ---------------- 主循环 ----------------
  update(dt) {
    this.time += dt;
    if (this.paused) {
      this.emitHud();
      return;
    }
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.banner = null;
    }
    this.shake = Math.max(0, this.shake - dt * 30);
    this.ambientT -= dt;
    if (this.ambientT <= 0) {
      this.spawnAmbient();
      this.ambientT = 0.05 + Math.random() * 0.12;
    }
    if (this.phase === "fight") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.timer = 0;
        this.timeUp();
      }
      this.spawnT -= dt;
      if (this.spawnT <= 0) {
        this.spawnWeapon();
        this.spawnT = 4.5 + Math.random() * 3.5;
      }
      const st = this.stage();
      if (st.pressure === "gears") {
        this.gearTimer -= dt;
        if (this.gearTimer <= 1.4 && this.gearWarnT <= 0) {
          this.gearWarnT = 1.4;
          this.sfx.gearWarn();
        }
        this.gearWarnT = Math.max(0, this.gearWarnT - dt);
        if (this.gearTimer <= 0 && this.gearR - this.gearL > 300) {
          this.gearL += 46;
          this.gearR -= 46;
          this.gearTimer = 5.5;
          this.gearActive = true;
          this.shake = Math.max(this.shake, 6);
          this.sfx.gearAdvance();
        }
      } else if (st.pressure === "lava") {
        this.lavaY -= dt * 8;
      }
      for (const p of this.players) if (!p.dead) {
        this.updatePlayer(p, dt);
        if (st.pressure === "conveyor" && p.onGround) {
          const dir = W / 2 - p.x;
          if (Math.abs(dir) > 8) {
            p.x += Math.sign(dir) * Math.min(60 + Math.abs(dir) * 0.15, 130) * dt;
            p.x = Math.max(20, Math.min(W - 20, p.x));
          }
        }
      }
      this.separatePlayers();
      this.updateBullets(dt);
      this.updatePickups(dt);
    } else if (this.phase === "roundEnd") {
      this.phaseT += dt;
      for (const p of this.players) {
        p.vy += GRAV * dt;
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        if (p.y > FLOOR) {
          p.y = FLOOR;
          p.vy = 0;
          p.vx *= 0.8;
        }
      }
      this.updateBullets(dt);
      this.updatePickups(dt);
      if (this.phaseT > 2.4) {
        if (this.winsOf(1) >= WINS_TO_MATCH || this.winsOf(0) >= WINS_TO_MATCH) {
          this.phase = "matchEnd";
          this.winnerName = this.winsOf(0) >= WINS_TO_MATCH ? this.players[0].name : this.players[1].name;
          this.setBanner(null, 0);
        } else {
          this.round += 1;
          const keep = [this.winsOf(0), this.winsOf(1)];
          this.players = [this.makePlayer(0), this.makePlayer(1)];
          this.players[0].invuln = 1;
          this.players[1].invuln = 1;
          this._wins = keep;
          this.bullets = [];
          this.timer = ROUND_TIME;
          this.phase = "fight";
          this.pickNewStage();
          this.resetPressure();
          const pressure = this.stage().pressure;
          this.setBanner(`ROUND ${this.round} \xB7 ${this.stage().name} \xB7 FIGHT!` + (pressure ? " \xB7 \u5C0F\u5FC3\u673A\u5173\uFF01" : ""), pressure ? 2.2 : 1.8);
          this.sfx.fanfare();
        }
      }
    }
    this.updateParticles(dt);
    this.emitHud();
  }
  winsOf(id) {
    return this._wins[id];
  }
  timeUp() {
    const [a, b] = this.players;
    const winner = a.hp === b.hp ? null : a.hp > b.hp ? a : b;
    if (winner) this._wins[winner.id]++;
    this.setBanner(winner ? `TIME UP \xB7 ${winner.name} \u83B7\u80DC` : "TIME UP \xB7 \u5E73\u5C40", 2.2);
    this.phase = "roundEnd";
    this.phaseT = 0;
  }
  // ---------------- 玩家 ----------------
  updatePlayer(p, dt) {
    const k = p.keys;
    p.attackCd = Math.max(0, p.attackCd - dt);
    p.attackAnim = Math.max(0, p.attackAnim - dt);
    p.pickupCd = Math.max(0, p.pickupCd - dt);
    p.invuln = Math.max(0, p.invuln - dt);
    p.hitFlash = Math.max(0, p.hitFlash - dt);
    p.hazardCd = Math.max(0, p.hazardCd - dt);
    p.dropT = Math.max(0, p.dropT - dt);
    const enemy = this.players[1 - p.id];
    if (k.left && !k.right) p.facing = -1;
    else if (k.right && !k.left) p.facing = 1;
    let ax = 0;
    if (k.left) ax -= 1;
    if (k.right) ax += 1;
    const accel = p.onGround ? 5600 : 3400;
    if (ax !== 0) {
      if (Math.sign(p.vx) !== 0 && Math.sign(p.vx) !== ax) p.vx *= Math.max(0, 1 - dt * 22);
      p.vx += ax * accel * dt;
      p.vx = Math.max(-MOVE, Math.min(MOVE, p.vx));
      p.runPhase += dt * 12.5;
    } else {
      const fr = p.onGround ? 3800 : 620;
      if (p.vx > 0) p.vx = Math.max(0, p.vx - fr * dt);
      else p.vx = Math.min(0, p.vx + fr * dt);
    }
    if (p.onGround) p.coyoteT = 0.11;
    else p.coyoteT = Math.max(0, p.coyoteT - dt);
    if (k.jump && !p.prevJump) p.jumpBufT = 0.12;
    else p.jumpBufT = Math.max(0, p.jumpBufT - dt);
    if (p.jumpBufT > 0) {
      if (p.coyoteT > 0) {
        p.vy = JUMP_V;
        p.onGround = false;
        p.coyoteT = 0;
        p.jumpBufT = 0;
        this.sfx.jump();
      } else if (p.airJumps > 0) {
        p.airJumps--;
        p.vy = JUMP_V * 0.88;
        p.jumpBufT = 0;
        this.sfx.jump();
        this.ringParticles(p.x, p.y - 20, "#ffffff", 8);
      }
    }
    p.prevJump = k.jump;
    if (k.down && !p.prevDown && p.onGround && p.y < FLOOR - 2) {
      p.dropT = 0.25;
      p.onGround = false;
      p.y += 3;
    }
    p.prevDown = k.down;
    if (k.pickup && !p.prevPickup && p.pickupCd <= 0) {
      if (p.weapon) {
        this.throwWeapon(p);
        p.pickupCd = 0.3;
      } else {
        const pk = this.nearestPickup(p);
        if (pk) {
          p.weapon = { kind: pk.kind, ammo: pk.ammo };
          this.pickups.splice(this.pickups.indexOf(pk), 1);
          this.sfx.pickup();
          this.ringParticles(p.x, p.y - 40, WEAPON_SPECS[pk.kind].color, 10);
          p.pickupCd = 0.25;
        }
      }
    }
    p.prevPickup = k.pickup;
    const spec = p.weapon ? WEAPON_SPECS[p.weapon.kind] : null;
    const wantAttack = (spec == null ? void 0 : spec.auto) ? k.attack : k.attack && !p.prevAttack;
    if (wantAttack && p.attackCd <= 0) {
      if (!spec) {
        p.attackCd = 0.34;
        p.attackAnim = 0.16;
        this.sfx.swing();
        this.meleeHit(p, enemy, { dmg: 8, range: 52, kb: 150 });
      } else if (spec.melee) {
        p.attackCd = spec.cooldown;
        p.attackAnim = 0.2;
        this.sfx.swing();
        this.meleeHit(p, enemy, { dmg: spec.damage, range: spec.range, kb: spec.knockback });
      } else if (p.weapon && p.weapon.ammo > 0) {
        p.attackCd = spec.cooldown;
        p.weapon.ammo--;
        this.fireGun(p, enemy, spec);
      } else {
        p.attackCd = 0.25;
        this.sfx.empty();
      }
    }
    p.prevAttack = k.attack;
    this.checkHazardDamage(p);
    p.vy += GRAV * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.x = Math.max(20, Math.min(W - 20, p.x));
    p.onGround = false;
    if (p.y >= FLOOR) {
      p.y = FLOOR;
      p.vy = 0;
      p.onGround = true;
      p.airJumps = 1;
    }
    if (p.dropT <= 0) {
      for (const pl of this.stage().platforms) {
        const wasAbove = p.y - p.vy * dt <= pl.y + 1;
        if (p.vy >= 0 && wasAbove && p.y >= pl.y && p.y <= pl.y + pl.h + 12 && p.x > pl.x - 6 && p.x < pl.x + pl.w + 6) {
          p.y = pl.y;
          p.vy = 0;
          p.onGround = true;
          p.airJumps = 1;
        }
      }
    }
  }
  /** 地刺 / 齿轮墙 / 岩浆 的伤害判定 */
  checkHazardDamage(p) {
    if (p.dead || p.hazardCd > 0) return;
    const stage = this.stage();
    for (const hz of stage.hazards) {
      if (p.x > hz.x - 6 && p.x < hz.x + hz.w + 6 && p.y > hz.y - hz.h - 4 && p.y < hz.y + 8) {
        p.hazardCd = 0.8;
        this.damage(p, hz.dmg, (p.x < hz.x + hz.w / 2 ? -1 : 1) * 160, -420, p.x, p.y - 20);
        return;
      }
    }
    if (stage.pressure === "gears" && this.gearActive) {
      if (p.x < this.gearL + 24) {
        p.hazardCd = 0.7;
        this.damage(p, 14, 260, -260, this.gearL + 20, p.y - 40);
      } else if (p.x > this.gearR - 24) {
        p.hazardCd = 0.7;
        this.damage(p, 14, -260, -260, this.gearR - 20, p.y - 40);
      }
    }
    if (stage.pressure === "lava" && p.y > this.lavaY - 2) {
      p.hazardCd = 0.6;
      this.damage(p, 10, 0, -460, p.x, this.lavaY);
    }
  }
  separatePlayers() {
    const [a, b] = this.players;
    if (a.dead || b.dead) return;
    const dx = b.x - a.x;
    const minD = 30;
    if (Math.abs(dx) < minD && Math.abs(a.y - b.y) < 60) {
      const push = (minD - Math.abs(dx)) / 2 * (dx >= 0 ? 1 : -1);
      a.x -= push;
      b.x += push;
    }
  }
  nearestPickup(p) {
    let best = null;
    let bd = 55;
    for (const pk of this.pickups) {
      const d = Math.hypot(pk.x - p.x, pk.y - (p.y - 20));
      if (d < bd) {
        bd = d;
        best = pk;
      }
    }
    return best;
  }
  throwWeapon(p) {
    if (!p.weapon) return;
    const kind = p.weapon.kind;
    this.bullets.push({
      x: p.x + p.facing * 20,
      y: p.y - 45,
      vx: p.facing * 620 + p.vx * 0.4,
      vy: -140,
      owner: p.id,
      kind: "thrown",
      weaponKind: kind,
      damage: 14,
      life: 3
    });
    p.weapon = null;
    this.sfx.swing();
  }
  meleeHit(attacker, defender, opt) {
    if (defender.dead) return;
    const dx = defender.x - attacker.x;
    if (Math.abs(dx) > opt.range || Math.abs(defender.y - attacker.y) > 65) return;
    if (Math.sign(dx || attacker.facing) !== attacker.facing && Math.abs(dx) > 12) return;
    const hx = defender.x - Math.sign(dx || attacker.facing) * 10;
    const hy = defender.y - 45;
    this.damage(defender, opt.dmg, Math.sign(dx || attacker.facing) * opt.kb, -120, hx, hy);
  }
  fireGun(p, _enemy, spec) {
    var _a, _b, _c;
    this.sfx.shoot(spec.kind);
    const sx = p.x + p.facing * 18;
    const sy = p.y - 44;
    const base = p.facing === 1 ? 0 : Math.PI;
    const pellets = (_a = spec.pellets) != null ? _a : 1;
    for (let i = 0; i < pellets; i++) {
      const ang = base + (Math.random() - 0.5) * 2 * ((_b = spec.spread) != null ? _b : 0);
      const sp = (_c = spec.bulletSpeed) != null ? _c : 900;
      this.bullets.push({
        x: sx,
        y: sy,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        owner: p.id,
        kind: spec.kind === "rocket" ? "rocket" : "bullet",
        weaponKind: spec.kind,
        damage: spec.damage,
        life: 2
      });
    }
    p.vx -= p.facing * spec.knockback * 0.35;
    this.shake = Math.max(this.shake, spec.kind === "shotgun" ? 5 : spec.kind === "rocket" ? 7 : 2);
    for (let i = 0; i < 5; i++) {
      const ang = base + (Math.random() - 0.5) * 0.7;
      this.particles.push({
        x: sx + Math.cos(base) * 22,
        y: sy + Math.sin(base) * 22,
        vx: Math.cos(ang) * 260,
        vy: Math.sin(ang) * 260,
        life: 0.1 + Math.random() * 0.08,
        maxLife: 0.18,
        color: "#fde047",
        size: 2.5,
        grav: 0
      });
    }
  }
  // ---------------- 伤害 / 死亡 ----------------
  damage(target, amount, kbX, kbY, hx, hy) {
    if (target.dead || target.invuln > 0) return;
    const dmg = Math.max(1, Math.round(amount));
    target.hp -= dmg;
    target.vx += kbX;
    target.vy += kbY;
    target.hitFlash = 0.15;
    this.sfx.hit();
    this.sfx.hurt();
    this.spark(hx, hy, "#fca5a5", 12);
    this.shake = Math.max(this.shake, 3);
    if (target.hp <= 0) this.kill(target);
  }
  kill(p) {
    p.hp = 0;
    p.dead = true;
    this._wins[1 - p.id]++;
    if (p.weapon) {
      this.pickups.push({ x: p.x, y: p.y - 20, vx: (Math.random() - 0.5) * 200, vy: -300, kind: p.weapon.kind, ammo: p.weapon.ammo, landed: false, life: 15, spin: 0 });
      p.weapon = null;
    }
    this.spark(p.x, p.y - 40, "#ffffff", 30);
    this.shake = 12;
    this.sfx.ko();
    this.setBanner("K.O.!", 2);
    this.phase = "roundEnd";
    this.phaseT = 0;
  }
  // ---------------- 子弹 / 投掷物 ----------------
  updateBullets(dt) {
    var _a;
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.life -= dt;
      if (b.kind === "thrown") b.vy += GRAV * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      let remove = b.life <= 0 || b.x < -40 || b.x > W + 40 || b.y > H + 40;
      if (!remove && this.stage().pressure === "gears" && this.gearActive && (b.x < this.gearL + 26 || b.x > this.gearR - 26)) {
        this.spark(b.x, b.y, "#cbd5e1", 5);
        remove = true;
      }
      if (!remove && (b.y >= FLOOR || this.stage().platforms.some((pl) => b.x > pl.x && b.x < pl.x + pl.w && b.y > pl.y && b.y < pl.y + pl.h + 6))) {
        if (b.kind === "rocket") {
          this.explode(b.x, b.y, b.owner);
          remove = true;
        } else if (b.kind === "thrown") {
          this.dropThrown(b);
          remove = true;
        } else {
          this.spark(b.x, b.y, "#e2e8f0", 5);
          remove = true;
        }
      }
      if (!remove) {
        for (const p of this.players) {
          if (p.id === b.owner || p.dead) continue;
          if (Math.abs(b.x - p.x) < 18 && b.y > p.y - 68 && b.y < p.y + 4) {
            if (b.kind === "rocket") {
              this.explode(b.x, b.y, b.owner);
            } else if (b.kind === "thrown") {
              this.damage(p, b.damage, Math.sign(b.vx) * 220, -140, b.x, b.y);
              this.dropThrown(b);
            } else {
              this.damage(p, b.damage, Math.sign(b.vx) * WEAPON_SPECS[(_a = b.weaponKind) != null ? _a : "pistol"].knockback, -60, b.x, b.y);
            }
            remove = true;
            break;
          }
        }
      }
      if (remove) this.bullets.splice(i, 1);
    }
  }
  dropThrown(b) {
    if (b.weaponKind) {
      this.pickups.push({ x: b.x, y: Math.min(b.y, FLOOR - 4), vx: 0, vy: 0, kind: b.weaponKind, ammo: 14, landed: true, life: 14, spin: 0 });
    } else {
      this.spark(b.x, b.y, "#94a3b8", 6);
    }
  }
  explode(x, y, owner) {
    this.sfx.explosion();
    this.shake = 16;
    const R = 115;
    for (const p of this.players) {
      if (p.dead) continue;
      const d = Math.hypot(p.x - x, p.y - 35 - y);
      if (d < R) {
        const f = 1 - d / R;
        const dir = p.x >= x ? 1 : -1;
        this.damage(p, Math.round(10 + 30 * f), dir * (150 + 350 * f), -(120 + 320 * f), p.x, p.y - 40);
        if (p.id === owner) {
        }
      }
    }
    for (let i = 0; i < 42; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 80 + Math.random() * 420;
      this.particles.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 80,
        life: 0.35 + Math.random() * 0.45,
        maxLife: 0.8,
        color: ["#fbbf24", "#f97316", "#ef4444", "#78716c"][i % 4],
        size: 2 + Math.random() * 4,
        grav: 500
      });
    }
  }
  // ---------------- 武器掉落 ----------------
  spawnWeapon() {
    const kind = SPAWN_TABLE[Math.floor(Math.random() * SPAWN_TABLE.length)];
    const spec = WEAPON_SPECS[kind];
    this.pickups.push({
      x: 100 + Math.random() * (W - 200),
      y: -30,
      vx: 0,
      vy: 60,
      kind,
      ammo: spec.ammo,
      landed: false,
      life: 20,
      spin: Math.random() * 6
    });
  }
  spawnAmbient() {
    const a = this.stage().ambient;
    if (a === "snow") {
      this.particles.push({
        x: Math.random() * W,
        y: -6,
        vx: (Math.random() - 0.5) * 30,
        vy: 50 + Math.random() * 55,
        life: 10,
        maxLife: 10,
        color: "#ffffff",
        size: 1.5 + Math.random() * 2,
        grav: 5
      });
    } else if (a === "ember") {
      this.particles.push({
        x: Math.random() * W,
        y: H + 6,
        vx: (Math.random() - 0.5) * 25,
        vy: -(30 + Math.random() * 65),
        life: 2.5 + Math.random() * 2,
        maxLife: 4.5,
        color: ["#f97316", "#fbbf24", "#ef4444"][Math.floor(Math.random() * 3)],
        size: 1.5 + Math.random() * 2,
        grav: -12
      });
    } else if (a === "firefly") {
      this.particles.push({
        x: Math.random() * W,
        y: 160 + Math.random() * 300,
        vx: (Math.random() - 0.5) * 36,
        vy: (Math.random() - 0.5) * 26,
        life: 3 + Math.random() * 2.5,
        maxLife: 5.5,
        color: "#a3e635",
        size: 1.8,
        grav: 0
      });
    }
  }
  updatePickups(dt) {
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const pk = this.pickups[i];
      pk.life -= dt;
      pk.spin += dt * 3;
      if (!pk.landed) {
        pk.vy += GRAV * 0.6 * dt;
        pk.y += pk.vy * dt;
        pk.x += pk.vx * dt;
        if (pk.y >= FLOOR - 4) {
          pk.y = FLOOR - 4;
          pk.landed = true;
        } else {
          for (const pl of this.stage().platforms) {
            if (pk.vy > 0 && pk.y >= pl.y - 2 && pk.y <= pl.y + pl.h && pk.x > pl.x && pk.x < pl.x + pl.w) {
              pk.y = pl.y - 2;
              pk.landed = true;
            }
          }
        }
      }
      if (pk.life <= 0) this.pickups.splice(i, 1);
    }
  }
  // ---------------- 粒子 ----------------
  spark(x, y, color, n) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 60 + Math.random() * 320;
      this.particles.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 60,
        life: 0.2 + Math.random() * 0.3,
        maxLife: 0.5,
        color,
        size: 1.5 + Math.random() * 2.5,
        grav: 700
      });
    }
  }
  ringParticles(x, y, color, n) {
    for (let i = 0; i < n; i++) {
      const ang = i / n * Math.PI * 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(ang) * 160,
        vy: Math.sin(ang) * 160,
        life: 0.3,
        maxLife: 0.3,
        color,
        size: 2.5,
        grav: 0
      });
    }
  }
  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.life -= dt;
      pt.vy += pt.grav * dt;
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      if (pt.life <= 0) this.particles.splice(i, 1);
    }
  }
  // ---------------- HUD ----------------
  emitHud() {
    var _a;
    const mk = (p) => ({
      hp: Math.max(0, Math.ceil(p.hp)),
      maxHp: p.maxHp,
      weaponCn: p.weapon ? WEAPON_SPECS[p.weapon.kind].cn : null,
      ammo: p.weapon ? p.weapon.ammo : 0,
      color: p.color,
      name: p.name,
      wins: this._wins[p.id],
      dead: p.dead
    });
    const hud2 = {
      phase: this.phase,
      paused: this.paused,
      round: this.round,
      timer: Math.ceil(this.timer),
      players: [mk(this.players[0]), mk(this.players[1])],
      banner: this.banner,
      winnerName: this.winnerName
    };
    (_a = this.onHud) == null ? void 0 : _a.call(this, hud2);
  }
  // ---------------- 渲染 ----------------
  render(ctx2) {
    ctx2.save();
    if (this.shake > 0) {
      ctx2.translate((Math.random() - 0.5) * this.shake, (Math.random() - 0.5) * this.shake);
    }
    this.drawBackground(ctx2);
    this.drawPlatforms(ctx2);
    this.drawStageHazards(ctx2);
    for (const pk of this.pickups) this.drawPickup(ctx2, pk);
    for (const b of this.bullets) this.drawBullet(ctx2, b);
    for (const p of this.players) this.drawPlayer(ctx2, p);
    for (const pt of this.particles) {
      ctx2.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx2.fillStyle = pt.color;
      ctx2.beginPath();
      ctx2.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.globalAlpha = 1;
    ctx2.restore();
  }
  drawBackground(ctx2) {
    const s = this.stage();
    const g = ctx2.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, s.sky[0]);
    g.addColorStop(0.6, s.sky[1]);
    g.addColorStop(1, s.sky[2]);
    ctx2.fillStyle = g;
    ctx2.fillRect(0, 0, W, H);
    switch (s.decor) {
      case "city":
        this.drawCityDecor(ctx2);
        break;
      case "desert":
        this.drawDesertDecor(ctx2);
        break;
      case "forest":
        this.drawForestDecor(ctx2);
        break;
      case "lava":
        this.drawLavaDecor(ctx2);
        break;
      case "snow":
        this.drawSnowDecor(ctx2);
        break;
    }
    ctx2.fillStyle = s.floor;
    ctx2.fillRect(0, FLOOR, W, H - FLOOR);
    ctx2.strokeStyle = s.floorEdge;
    ctx2.globalAlpha = 0.22;
    ctx2.lineWidth = 1;
    for (let x = 0; x < W; x += 48) {
      ctx2.beginPath();
      ctx2.moveTo(x, FLOOR + 8);
      ctx2.lineTo(x + 24, H);
      ctx2.stroke();
    }
    ctx2.globalAlpha = 1;
    ctx2.strokeStyle = s.floorEdge;
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    ctx2.moveTo(0, FLOOR + 1.5);
    ctx2.lineTo(W, FLOOR + 1.5);
    ctx2.stroke();
    if (s.decor === "lava") this.drawLavaCracks(ctx2);
  }
  drawStars(ctx2) {
    ctx2.fillStyle = "#e0e7ff";
    for (const s of this.stars) {
      ctx2.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(this.time * 1.5 + s.x));
      ctx2.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx2.globalAlpha = 1;
  }
  drawCityDecor(ctx2) {
    this.drawStars(ctx2);
    ctx2.fillStyle = "#fef9c3";
    ctx2.beginPath();
    ctx2.arc(830, 80, 26, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "#0f172a";
    ctx2.beginPath();
    ctx2.arc(820, 72, 22, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "#111827";
    for (let x = -20; x < W; x += 90) {
      const h = 90 + (x * 7919 % 130 + 130) % 130;
      ctx2.fillRect(x, FLOOR - h, 70, h);
    }
    let tallest = 0;
    for (const b of this.buildings) {
      ctx2.fillStyle = "#1e293b";
      ctx2.fillRect(b.x, FLOOR - b.h, b.w, b.h);
      tallest = Math.max(tallest, FLOOR - b.h);
      ctx2.fillStyle = "#facc15";
      const cols = Math.max(1, Math.floor(b.w / 14));
      b.windows.forEach((on, i) => {
        if (!on) return;
        const wx2 = b.x + 4 + i % cols * 14;
        const wy = FLOOR - b.h + 6 + Math.floor(i / cols) * 16;
        if (wy < FLOOR - 8) ctx2.fillRect(wx2, wy, 5, 7);
      });
    }
    const blinkOn = Math.sin(this.time * 4) > 0;
    if (blinkOn) {
      const bx = W / 2 - 12;
      ctx2.fillStyle = "#ef4444";
      ctx2.beginPath();
      ctx2.arc(bx, tallest - 6, 4, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.globalAlpha = 0.25;
      ctx2.beginPath();
      ctx2.arc(bx, tallest - 6, 10, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.globalAlpha = 1;
    }
  }
  drawDesertDecor(ctx2) {
    const sg = ctx2.createRadialGradient(480, FLOOR - 60, 10, 480, FLOOR - 60, 130);
    sg.addColorStop(0, "#fef3c7");
    sg.addColorStop(0.5, "#fbbf24");
    sg.addColorStop(1, "rgba(251,191,36,0)");
    ctx2.fillStyle = sg;
    ctx2.beginPath();
    ctx2.arc(480, FLOOR - 60, 130, 0, Math.PI * 2);
    ctx2.fill();
    const mesa = (color, base, offset) => {
      ctx2.fillStyle = color;
      ctx2.beginPath();
      ctx2.moveTo(0, FLOOR);
      let x = -40;
      while (x < W + 40) {
        const w = 120 + ((x * 31 + offset) % 90 + 90) % 90;
        const h = base + ((x * 57 + offset) % 70 + 70) % 70;
        ctx2.lineTo(x, FLOOR);
        ctx2.lineTo(x + 10, FLOOR - h);
        ctx2.lineTo(x + w - 30, FLOOR - h);
        ctx2.lineTo(x + w - 10, FLOOR - h * 0.75);
        ctx2.lineTo(x + w, FLOOR);
        x += w + 50;
      }
      ctx2.lineTo(W, FLOOR);
      ctx2.closePath();
      ctx2.fill();
    };
    mesa("#4c1d95", 60, 7);
    mesa("#701a3d", 30, 3);
    ctx2.fillStyle = "rgba(254,243,199,0.5)";
    for (let i = 0; i < 3; i++) {
      const cx = (this.time * (10 + i * 5) + i * 350) % (W + 240) - 120;
      const cy = 70 + i * 55;
      ctx2.beginPath();
      ctx2.ellipse(cx, cy, 46, 12, 0, 0, Math.PI * 2);
      ctx2.ellipse(cx + 30, cy + 5, 30, 9, 0, 0, Math.PI * 2);
      ctx2.ellipse(cx - 32, cy + 6, 26, 8, 0, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.strokeStyle = "rgba(30,20,50,0.8)";
    ctx2.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const bx = (this.time * 26 + i * 300) % (W + 120) - 60;
      const by = 130 + i * 40 + Math.sin(this.time * 3 + i) * 8;
      const flap = Math.sin(this.time * 10 + i) * 5;
      ctx2.beginPath();
      ctx2.moveTo(bx - 8, by + flap);
      ctx2.quadraticCurveTo(bx, by - 5, bx, by);
      ctx2.quadraticCurveTo(bx, by - 5, bx + 8, by + flap);
      ctx2.stroke();
    }
  }
  drawForestDecor(ctx2) {
    this.drawStars(ctx2);
    ctx2.fillStyle = "rgba(224,231,255,0.12)";
    ctx2.beginPath();
    ctx2.arc(150, 90, 60, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "#e2e8f0";
    ctx2.beginPath();
    ctx2.arc(150, 90, 30, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "#0a2417";
    ctx2.beginPath();
    ctx2.arc(140, 82, 25, 0, Math.PI * 2);
    ctx2.fill();
    const pines = (color, base, step, yBase) => {
      ctx2.fillStyle = color;
      for (let x = -10; x < W + 20; x += step) {
        const h = base + (x * 37 % 50 + 50) % 50;
        const w = h * 0.55;
        ctx2.beginPath();
        ctx2.moveTo(x, yBase);
        ctx2.lineTo(x + w / 2, yBase - h);
        ctx2.lineTo(x + w, yBase);
        ctx2.closePath();
        ctx2.fill();
        ctx2.fillRect(x + w / 2 - 2, yBase - 6, 4, 6);
      }
    };
    pines("#052e16", 130, 55, FLOOR);
    pines("#031b0e", 190, 90, FLOOR);
    const fg = ctx2.createLinearGradient(0, FLOOR - 70, 0, FLOOR);
    fg.addColorStop(0, "rgba(134,239,172,0)");
    fg.addColorStop(1, "rgba(134,239,172,0.14)");
    ctx2.fillStyle = fg;
    ctx2.fillRect(0, FLOOR - 70, W, 70);
  }
  drawLavaDecor(ctx2) {
    ctx2.fillStyle = "#0c0404";
    ctx2.fillRect(0, 0, W, 34);
    for (let x = 20; x < W; x += 85) {
      const h = 26 + (x * 53 % 34 + 34) % 34;
      ctx2.beginPath();
      ctx2.moveTo(x - 16, 34);
      ctx2.lineTo(x, 34 + h);
      ctx2.lineTo(x + 16, 34);
      ctx2.closePath();
      ctx2.fill();
    }
    ctx2.fillStyle = "#120606";
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.lineTo(70, 0);
    ctx2.lineTo(46, 160);
    ctx2.lineTo(64, 300);
    ctx2.lineTo(40, FLOOR);
    ctx2.lineTo(0, FLOOR);
    ctx2.closePath();
    ctx2.fill();
    ctx2.beginPath();
    ctx2.moveTo(W, 0);
    ctx2.lineTo(W - 70, 0);
    ctx2.lineTo(W - 46, 160);
    ctx2.lineTo(W - 64, 300);
    ctx2.lineTo(W - 40, FLOOR);
    ctx2.lineTo(W, FLOOR);
    ctx2.closePath();
    ctx2.fill();
    const lg = ctx2.createRadialGradient(W / 2, FLOOR, 20, W / 2, FLOOR, 420);
    lg.addColorStop(0, "rgba(249,115,22,0.28)");
    lg.addColorStop(1, "rgba(249,115,22,0)");
    ctx2.fillStyle = lg;
    ctx2.fillRect(0, FLOOR - 220, W, 220);
    for (let i = 0; i < 6; i++) {
      const bx = (i * 173 + 60) % W;
      const pulse = 0.5 + 0.5 * Math.sin(this.time * 2 + i * 1.7);
      ctx2.globalAlpha = 0.25 + pulse * 0.3;
      ctx2.fillStyle = "#fb923c";
      ctx2.beginPath();
      ctx2.arc(bx, FLOOR - 8 - pulse * 10, 4 + pulse * 5, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.globalAlpha = 1;
  }
  drawLavaCracks(ctx2) {
    ctx2.strokeStyle = "rgba(249,115,22,0.75)";
    ctx2.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      const x0 = i * 145 + 30;
      const flick = 0.5 + 0.5 * Math.sin(this.time * 3 + i * 2.3);
      ctx2.globalAlpha = 0.35 + flick * 0.4;
      ctx2.beginPath();
      ctx2.moveTo(x0, FLOOR + 6);
      ctx2.lineTo(x0 + 14, FLOOR + 16);
      ctx2.lineTo(x0 + 6, FLOOR + 28);
      ctx2.lineTo(x0 + 26, FLOOR + 40);
      ctx2.stroke();
    }
    ctx2.globalAlpha = 1;
  }
  drawSnowDecor(ctx2) {
    this.drawStars(ctx2);
    ctx2.save();
    ctx2.globalCompositeOperation = "lighter";
    for (let band = 0; band < 2; band++) {
      const grad = ctx2.createLinearGradient(0, 30, 0, 230);
      grad.addColorStop(0, "rgba(52,211,153,0)");
      grad.addColorStop(0.5, band === 0 ? "rgba(52,211,153,0.22)" : "rgba(96,165,250,0.18)");
      grad.addColorStop(1, "rgba(52,211,153,0)");
      ctx2.fillStyle = grad;
      ctx2.beginPath();
      ctx2.moveTo(0, 90);
      for (let x = 0; x <= W; x += 24) {
        ctx2.lineTo(x, 110 + band * 45 + Math.sin(x * 0.014 + this.time * (0.7 + band * 0.4)) * 26);
      }
      ctx2.lineTo(W, 210);
      ctx2.lineTo(0, 210);
      ctx2.closePath();
      ctx2.fill();
    }
    ctx2.restore();
    ctx2.fillStyle = "#f1f5f9";
    ctx2.beginPath();
    ctx2.arc(850, 70, 20, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "#b8c9dd";
    ctx2.beginPath();
    ctx2.moveTo(0, FLOOR);
    ctx2.lineTo(120, FLOOR - 130);
    ctx2.lineTo(260, FLOOR - 60);
    ctx2.lineTo(420, FLOOR - 150);
    ctx2.lineTo(600, FLOOR - 70);
    ctx2.lineTo(760, FLOOR - 140);
    ctx2.lineTo(W, FLOOR - 80);
    ctx2.lineTo(W, FLOOR);
    ctx2.closePath();
    ctx2.fill();
    ctx2.fillStyle = "#1e3a4c";
    for (let x = 10; x < W; x += 70) {
      const h = 46 + (x * 41 % 30 + 30) % 30;
      ctx2.beginPath();
      ctx2.moveTo(x - 14, FLOOR);
      ctx2.lineTo(x, FLOOR - h);
      ctx2.lineTo(x + 14, FLOOR);
      ctx2.closePath();
      ctx2.fill();
    }
  }
  drawPlatforms(ctx2) {
    const s = this.stage();
    for (const pl of this.stage().platforms) {
      ctx2.fillStyle = s.plank;
      ctx2.fillRect(pl.x, pl.y, pl.w, pl.h);
      ctx2.fillStyle = s.plankEdge;
      ctx2.fillRect(pl.x, pl.y, pl.w, 3);
      ctx2.globalAlpha = 0.6;
      for (let x = pl.x + 8; x < pl.x + pl.w - 8; x += 24) ctx2.fillRect(x, pl.y + 7, 10, 3);
      ctx2.globalAlpha = 1;
      ctx2.globalAlpha = 0.18;
      ctx2.fillStyle = s.plankEdge;
      ctx2.fillRect(pl.x + 4, pl.y + pl.h, pl.w - 8, 5);
      ctx2.globalAlpha = 1;
    }
  }
  /** 画一个齿轮 */
  drawGear(ctx2, x, y, r, rot, warn) {
    ctx2.save();
    ctx2.translate(x, y);
    ctx2.rotate(rot);
    ctx2.fillStyle = warn ? "#b91c1c" : "#64748b";
    ctx2.strokeStyle = warn ? "#fca5a5" : "#94a3b8";
    for (let i = 0; i < 8; i++) {
      ctx2.save();
      ctx2.rotate(i / 8 * Math.PI * 2);
      ctx2.fillRect(-3.5, -r - 6, 7, 8);
      ctx2.restore();
    }
    ctx2.beginPath();
    ctx2.arc(0, 0, r, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.stroke();
    ctx2.fillStyle = warn ? "#7f1d1d" : "#334155";
    ctx2.beginPath();
    ctx2.arc(0, 0, r * 0.35, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.strokeStyle = warn ? "#fecaca" : "#cbd5e1";
    ctx2.lineWidth = 3;
    for (let i = 0; i < 3; i++) {
      ctx2.save();
      ctx2.rotate(i / 3 * Math.PI);
      ctx2.beginPath();
      ctx2.moveTo(-r * 0.85, 0);
      ctx2.lineTo(r * 0.85, 0);
      ctx2.stroke();
      ctx2.restore();
    }
    ctx2.restore();
  }
  /** 地刺 / 齿轮墙 / 上涨岩浆 / 传送带 */
  drawStageHazards(ctx2) {
    const stage = this.stage();
    const icy = stage.decor === "snow";
    for (const hz of stage.hazards) {
      const n = Math.max(2, Math.floor(hz.w / 14));
      const tw = hz.w / n;
      for (let i = 0; i < n; i++) {
        const bx = hz.x + i * tw;
        const glow = 0.6 + 0.4 * Math.sin(this.time * 3 + i);
        ctx2.fillStyle = icy ? "#bae6fd" : "#94a3b8";
        ctx2.beginPath();
        ctx2.moveTo(bx, hz.y);
        ctx2.lineTo(bx + tw / 2, hz.y - hz.h);
        ctx2.lineTo(bx + tw, hz.y);
        ctx2.closePath();
        ctx2.fill();
        ctx2.strokeStyle = icy ? `rgba(125,211,252,${0.6 * glow})` : `rgba(248,113,113,${0.5 * glow})`;
        ctx2.lineWidth = 1;
        ctx2.stroke();
      }
    }
    if (stage.pressure === "gears" && this.gearL > -60) {
      const warn = this.gearWarnT > 0;
      ctx2.fillStyle = "#1e293b";
      ctx2.fillRect(0, 34, this.gearL, FLOOR - 34);
      ctx2.fillRect(this.gearR, 34, W - this.gearR, FLOOR - 34);
      const rot = this.time * (warn ? 6 : 2.2);
      for (let gy = 90; gy < FLOOR + 20; gy += 105) {
        this.drawGear(ctx2, this.gearL - 2, gy, 24, rot, warn);
        this.drawGear(ctx2, this.gearR + 2, gy, 24, -rot, warn);
      }
      if (warn) {
        ctx2.globalAlpha = 0.5 + 0.5 * Math.sin(this.time * 16);
        ctx2.fillStyle = "#ef4444";
        ctx2.fillRect(this.gearL, 34, 5, FLOOR - 34);
        ctx2.fillRect(this.gearR - 5, 34, 5, FLOOR - 34);
        ctx2.globalAlpha = 1;
      }
    }
    if (stage.pressure === "lava" && this.lavaY < H + 50) {
      const lg = ctx2.createLinearGradient(0, this.lavaY, 0, H);
      lg.addColorStop(0, "#fbbf24");
      lg.addColorStop(0.25, "#f97316");
      lg.addColorStop(1, "#7c2d12");
      ctx2.fillStyle = lg;
      ctx2.beginPath();
      ctx2.moveTo(0, H);
      ctx2.lineTo(0, this.lavaY);
      for (let xx = 0; xx <= W; xx += 20) {
        ctx2.lineTo(xx, this.lavaY + Math.sin(xx * 0.05 + this.time * 4) * 4);
      }
      ctx2.lineTo(W, H);
      ctx2.closePath();
      ctx2.fill();
      ctx2.globalAlpha = 0.5;
      ctx2.fillStyle = "#fde047";
      for (let i = 0; i < 8; i++) {
        const bx = (i * 137 + this.time * 30) % W;
        const by = this.lavaY + Math.sin(this.time * 3 + i) * 3;
        ctx2.beginPath();
        ctx2.arc(bx, by, 2.5 + i % 3, 0, Math.PI * 2);
        ctx2.fill();
      }
      ctx2.globalAlpha = 1;
    }
    if (stage.pressure === "conveyor") {
      ctx2.fillStyle = "rgba(253,224,71,0.65)";
      const offset = this.time * 70 % 36;
      for (let cx = 40; cx < W - 20; cx += 36) {
        const dir = cx < W / 2 ? 1 : -1;
        const ax = cx + dir * offset * 0.4;
        ctx2.beginPath();
        ctx2.moveTo(ax, FLOOR + 14);
        ctx2.lineTo(ax + dir * 9, FLOOR + 22);
        ctx2.lineTo(ax, FLOOR + 30);
        ctx2.closePath();
        ctx2.fill();
      }
    }
  }
  drawPickup(ctx2, pk) {
    const spec = WEAPON_SPECS[pk.kind];
    const blink = pk.life < 3 && Math.floor(pk.life * 8) % 2 === 0;
    if (blink) return;
    ctx2.save();
    ctx2.translate(pk.x, pk.y + (pk.landed ? Math.sin(pk.spin * 2) * 3 - 8 : 0));
    if (!pk.landed) ctx2.rotate(Math.sin(pk.spin) * 0.4);
    this.drawWeaponShape(ctx2, pk.kind, 1, 1.1);
    ctx2.globalAlpha = 0.35 + 0.2 * Math.sin(pk.spin * 3);
    ctx2.strokeStyle = spec.color;
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.ellipse(0, 2, 20, 7, 0, 0, Math.PI * 2);
    ctx2.stroke();
    ctx2.globalAlpha = 1;
    ctx2.restore();
    ctx2.fillStyle = spec.color;
    ctx2.font = "12px sans-serif";
    ctx2.textAlign = "center";
    ctx2.fillText(spec.cn, pk.x, pk.y - 26);
  }
  drawBullet(ctx2, b) {
    var _a;
    if (b.kind === "rocket") {
      ctx2.save();
      ctx2.translate(b.x, b.y);
      ctx2.rotate(Math.atan2(b.vy, b.vx));
      ctx2.fillStyle = "#8b5cf6";
      ctx2.fillRect(-10, -3.5, 20, 7);
      ctx2.fillStyle = "#f97316";
      ctx2.beginPath();
      ctx2.moveTo(10, -3.5);
      ctx2.lineTo(16, 0);
      ctx2.lineTo(10, 3.5);
      ctx2.fill();
      ctx2.globalAlpha = 0.7;
      ctx2.fillStyle = "#fbbf24";
      ctx2.beginPath();
      ctx2.moveTo(-10, -2.5);
      ctx2.lineTo(-20 - Math.random() * 10, 0);
      ctx2.lineTo(-10, 2.5);
      ctx2.fill();
      ctx2.restore();
      ctx2.globalAlpha = 1;
    } else if (b.kind === "thrown") {
      ctx2.save();
      ctx2.translate(b.x, b.y);
      ctx2.rotate(Math.atan2(b.vy, b.vx) + this.time * 12);
      this.drawWeaponShape(ctx2, (_a = b.weaponKind) != null ? _a : "hammer", 1, 1);
      ctx2.restore();
    } else {
      ctx2.strokeStyle = b.weaponKind === "shotgun" ? "#fdba74" : "#fde047";
      ctx2.lineWidth = b.weaponKind === "shotgun" ? 2 : 2.5;
      ctx2.beginPath();
      ctx2.moveTo(b.x - b.vx * 0.016, b.y - b.vy * 0.016);
      ctx2.lineTo(b.x, b.y);
      ctx2.stroke();
    }
  }
  /** 以 (0,0) 为握点朝 +x 画武器 */
  drawWeaponShape(ctx2, kind, dir, scale2) {
    const spec = WEAPON_SPECS[kind];
    ctx2.save();
    ctx2.scale(dir * scale2, scale2);
    ctx2.lineWidth = 3;
    ctx2.strokeStyle = spec.color;
    ctx2.fillStyle = spec.color;
    switch (kind) {
      case "pistol":
        ctx2.fillRect(0, -3, 15, 5);
        ctx2.fillRect(2, 2, 5, 7);
        break;
      case "shotgun":
        ctx2.fillRect(0, -3.5, 26, 6);
        ctx2.fillRect(-8, -3, 8, 6);
        ctx2.fillRect(6, 2.5, 5, 6);
        break;
      case "rifle":
        ctx2.fillRect(-6, -3, 30, 5.5);
        ctx2.fillRect(4, 2, 5, 8);
        ctx2.fillRect(-6, 2, 6, 5);
        ctx2.fillRect(20, -5, 4, 3);
        break;
      case "rocket":
        ctx2.fillRect(-10, -5, 34, 10);
        ctx2.beginPath();
        ctx2.moveTo(24, -5);
        ctx2.lineTo(32, 0);
        ctx2.lineTo(24, 5);
        ctx2.fill();
        ctx2.fillRect(-4, -8, 6, 3);
        ctx2.fillRect(-4, 5, 6, 3);
        break;
      case "sword":
        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(34, 0);
        ctx2.stroke();
        ctx2.lineWidth = 5;
        ctx2.beginPath();
        ctx2.moveTo(-2, -5);
        ctx2.lineTo(-2, 5);
        ctx2.stroke();
        break;
      case "hammer":
        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(24, 0);
        ctx2.stroke();
        ctx2.fillRect(20, -9, 14, 18);
        break;
    }
    ctx2.restore();
  }
  /** 两段式肢体：带膝盖/手肘弯曲 */
  limb(ctx2, x1, y1, x2, y2, bend, w) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const kx = mx + -dy / len * bend;
    const ky = my + dx / len * bend;
    ctx2.lineWidth = w;
    ctx2.beginPath();
    ctx2.moveTo(x1, y1);
    ctx2.lineTo(kx, ky);
    ctx2.lineTo(x2, y2);
    ctx2.stroke();
  }
  drawPlayer(ctx2, p) {
    if (p.dead) {
      this.drawDeadBody(ctx2, p);
      return;
    }
    const blink = p.invuln > 0 && Math.floor(this.time * 14) % 2 === 0;
    ctx2.save();
    if (blink) ctx2.globalAlpha = 0.35;
    const x = p.x, y = p.y;
    const f = p.facing;
    const t = this.time;
    const color = p.hitFlash > 0 ? "#ffffff" : p.color;
    const speed = Math.abs(p.vx);
    const moving = speed > 40 && p.onGround;
    const ph = p.runPhase;
    const s1 = Math.sin(ph), s2 = Math.sin(ph + Math.PI);
    const air = !p.onGround;
    const lean = Math.max(-6, Math.min(6, p.vx * 0.016));
    const bob = moving ? Math.abs(Math.sin(ph)) * 2 : Math.sin(t * 2.2 + p.id * 2) * 0.9;
    const hipX = x - lean * 0.4, hipY = y - 30 + bob * 0.4;
    const chestX = x + lean, chestY = y - 50 + bob;
    const shX = chestX, shY = chestY + 1;
    const headX = chestX + f * 2.5, headY = chestY - 17;
    ctx2.strokeStyle = color;
    ctx2.lineCap = "round";
    let feet;
    if (air) {
      feet = [[x + f * 10, y - 13], [x - f * 5, y - 5]];
    } else if (moving) {
      feet = [[x + s1 * 15, y - Math.max(0, s1) * 5], [x + s2 * 15, y - Math.max(0, s2) * 5]];
    } else {
      feet = [[x + 7, y], [x - 7, y]];
    }
    this.limb(ctx2, hipX, hipY, feet[0][0], feet[0][1], air ? 7 : moving ? 5 * s2 : 2, 3.8);
    this.limb(ctx2, hipX, hipY, feet[1][0], feet[1][1], air ? -4 : moving ? 5 * s1 : -2, 3.8);
    ctx2.fillStyle = color;
    for (const ft of feet) {
      ctx2.beginPath();
      ctx2.ellipse(ft[0] + f * 1.5, ft[1] - 1.5, 4.5, 2.6, 0, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.lineWidth = 4.2;
    ctx2.beginPath();
    ctx2.moveTo(hipX, hipY);
    ctx2.quadraticCurveTo((hipX + chestX) / 2 + f * 1.5, (hipY + chestY) / 2, chestX, chestY);
    ctx2.stroke();
    ctx2.fillRect(hipX - 5, hipY - 2.5, 10, 3.5);
    const spec = p.weapon ? WEAPON_SPECS[p.weapon.kind] : null;
    const meleeSwing = p.attackAnim > 0 && !!(spec == null ? void 0 : spec.melee);
    const punch = p.attackAnim > 0 && !spec;
    const hands = [];
    if (spec && !spec.melee) {
      const hx = shX + f * 19, hy = shY + 3;
      this.limb(ctx2, shX, shY + 1, hx, hy, -4, 3.4);
      this.limb(ctx2, shX, shY + 3, shX + f * 12 - f * 2, shY + 9, -5, 3.4);
      hands.push([hx, hy], [shX + f * 10, shY + 8]);
      ctx2.save();
      ctx2.translate(hx, hy);
      ctx2.rotate(f === 1 ? 0 : Math.PI);
      this.drawWeaponShape(ctx2, spec.kind, 1, 0.95);
      ctx2.restore();
    } else if (spec == null ? void 0 : spec.melee) {
      let ang;
      if (meleeSwing) {
        const tt = 1 - p.attackAnim / 0.2;
        ang = f === 1 ? -1.9 + tt * 2.8 : Math.PI + 1.9 - tt * 2.8;
      } else {
        ang = f === 1 ? 0.55 : Math.PI - 0.55;
      }
      const hx = shX + Math.cos(ang) * 19, hy = shY + 4 + Math.sin(ang) * 19;
      const side = f === 1 ? 1 : -1;
      this.limb(ctx2, shX, shY + 1, hx, hy, side * Math.cos(ang + Math.PI / 2) * 4 - 2, 3.4);
      const backSwing = meleeSwing ? -f * 12 : -f * 8;
      const bhx = shX + backSwing - f * 4, bhy = shY + 14;
      this.limb(ctx2, shX, shY + 3, bhx, bhy, -f * 3, 3.4);
      hands.push([hx, hy], [bhx, bhy]);
      ctx2.save();
      ctx2.translate(hx, hy);
      ctx2.rotate(ang);
      this.drawWeaponShape(ctx2, spec.kind, 1, 1);
      ctx2.restore();
      if (meleeSwing) {
        ctx2.globalAlpha = p.attackAnim / 0.2 * 0.35;
        ctx2.strokeStyle = spec.color;
        ctx2.lineWidth = 7;
        ctx2.beginPath();
        ctx2.arc(shX, shY + 4, spec.range * 0.75, f === 1 ? -1.6 : Math.PI - 0.2, f === 1 ? 0.6 : Math.PI + 1.6, f !== 1);
        ctx2.stroke();
        ctx2.globalAlpha = blink ? 0.35 : 1;
      }
    } else if (punch) {
      const ext = p.attackAnim / 0.16;
      const hx = shX + f * (15 + ext * 17), hy = shY + 2;
      this.limb(ctx2, shX, shY + 1, hx, hy, -2, 3.6);
      const bhx = shX - f * 10, bhy = shY + 13;
      this.limb(ctx2, shX, shY + 3, bhx, bhy, -f * 3, 3.4);
      hands.push([hx, hy], [bhx, bhy]);
    } else {
      const sw = moving ? s2 : Math.sin(t * 2 + p.id) * 0.25;
      const hx = shX + f * 5 + sw * 11, hy = shY + 15;
      this.limb(ctx2, shX, shY + 1, hx, hy, f * 2.5 + sw * 2, 3.4);
      const bhx = shX - f * 5 - sw * 11, bhy = shY + 15;
      this.limb(ctx2, shX, shY + 3, bhx, bhy, -f * 2.5 - sw * 2, 3.4);
      hands.push([hx, hy], [bhx, bhy]);
    }
    ctx2.fillStyle = color;
    for (const h of hands) {
      ctx2.beginPath();
      ctx2.arc(h[0], h[1], 2.7, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.lineWidth = 3.6;
    ctx2.strokeStyle = color;
    ctx2.beginPath();
    ctx2.arc(headX, headY, 8.5, 0, Math.PI * 2);
    ctx2.stroke();
    ctx2.fillStyle = "#0f172a";
    ctx2.beginPath();
    ctx2.arc(headX + f * 3.6, headY - 0.5, 1.7, 0, Math.PI * 2);
    ctx2.fill();
    if (p.attackAnim > 0) {
      ctx2.strokeStyle = "#0f172a";
      ctx2.lineWidth = 1.4;
      ctx2.beginPath();
      ctx2.moveTo(headX + f * 1.5, headY - 4.2);
      ctx2.lineTo(headX + f * 6, headY - 3);
      ctx2.stroke();
    }
    ctx2.strokeStyle = color;
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    ctx2.moveTo(headX - f * 7.5, headY - 5);
    ctx2.lineTo(headX + f * 7.5, headY - 5.5);
    ctx2.stroke();
    const wave = Math.sin(t * 8 + p.id * 2) * (2 + speed * 0.02);
    ctx2.lineWidth = 2.2;
    for (let i = 0; i < 2; i++) {
      const bx = headX - f * 7, by = headY - 5 + i * 2.5;
      ctx2.beginPath();
      ctx2.moveTo(bx, by);
      ctx2.quadraticCurveTo(bx - f * 9, by + wave + i * 2, bx - f * 16 - speed * 0.02, by + wave * 1.6 + i * 3);
      ctx2.stroke();
    }
    ctx2.fillStyle = p.color;
    ctx2.font = "bold 11px sans-serif";
    ctx2.textAlign = "center";
    ctx2.fillText(p.id === 0 ? "P1" : "P2", x, y - 80);
    ctx2.restore();
  }
  drawDeadBody(ctx2, p) {
    ctx2.save();
    ctx2.globalAlpha = 0.75;
    ctx2.strokeStyle = p.color;
    ctx2.lineWidth = 3.5;
    ctx2.lineCap = "round";
    const y = Math.min(p.y, FLOOR);
    ctx2.beginPath();
    ctx2.moveTo(p.x - 20, y - 4);
    ctx2.lineTo(p.x + 10, y - 4);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(p.x - 8, y - 4);
    ctx2.lineTo(p.x - 16, y - 1);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(p.x + 2, y - 4);
    ctx2.lineTo(p.x + 10, y - 1);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.arc(p.x + 18, y - 5, 8, 0, Math.PI * 2);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(p.x + 15, y - 8);
    ctx2.lineTo(p.x + 19, y - 4);
    ctx2.moveTo(p.x + 19, y - 8);
    ctx2.lineTo(p.x + 15, y - 4);
    ctx2.stroke();
    ctx2.restore();
  }
};

// ../minigame-src/main.ts
var W2 = 960;
var H2 = 540;
var info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
var winW = info.windowWidth;
var winH = info.windowHeight;
var dpr = Math.min(info.pixelRatio || 1, 2);
var canvas = wx.createCanvas();
canvas.width = Math.floor(winW * dpr);
canvas.height = Math.floor(winH * dpr);
var ctx = canvas.getContext("2d");
var scale = Math.min(winW / W2, winH / H2);
var offX = (winW - W2 * scale) / 2;
var offY = (winH - H2 * scale) / 2;
var toLX = (cx) => (cx - offX) / scale;
var toLY = (cy) => (cy - offY) / scale;
var game = new Game();
var hud = null;
game.onHud = (h) => {
  hud = h;
};
var sticks = [
  { id: null, ox: 118, oy: 432, dx: 0, dy: 0 },
  { id: null, ox: 842, oy: 432, dx: 0, dy: 0 }
];
var BTNS = {
  p1a: { x: 302, y: 428, r: 44, label: "\u653B", pl: 0, act: "attack" },
  p1p: { x: 396, y: 464, r: 37, label: "\u6361", pl: 0, act: "pickup" },
  p2a: { x: 658, y: 428, r: 44, label: "\u653B", pl: 1, act: "attack" },
  p2p: { x: 564, y: 464, r: 37, label: "\u6361", pl: 1, act: "pickup" }
};
var PAUSE_BTN = { x: 922, y: 40, r: 24 };
var STICK_MAX = 52;
var held = {};
var touchBtn = {};
var lastKeys = [{}, {}];
function pushKeys(pl, want) {
  for (const a of ["left", "right", "jump", "down", "attack", "pickup"]) {
    if (lastKeys[pl][a] !== want[a]) {
      game.setKey(pl, a, want[a]);
      lastKeys[pl][a] = want[a];
    }
  }
}
function syncKeys() {
  for (const pl of [0, 1]) {
    const st = sticks[pl];
    const want = {
      left: false,
      right: false,
      jump: false,
      down: false,
      attack: held.p1a && pl === 0 || held.p2a && pl === 1,
      pickup: held.p1p && pl === 0 || held.p2p && pl === 1
    };
    if (st.id !== null) {
      if (st.dx < -14) want.left = true;
      if (st.dx > 14) want.right = true;
      if (st.dy < -26) want.jump = true;
      if (st.dy > 30) want.down = true;
    }
    pushKeys(pl, want);
  }
}
function findBtn(x, y) {
  for (const key of Object.keys(BTNS)) {
    const b = BTNS[key];
    if (Math.hypot(x - b.x, y - b.y) <= b.r + 10) return key;
  }
  return null;
}
wx.onTouchStart((e) => {
  for (const t of e.changedTouches) {
    const x = toLX(t.clientX), y = toLY(t.clientY);
    if (hud && (hud.phase === "menu" || hud.phase === "matchEnd")) {
      game.startMatch();
      continue;
    }
    if (hud && hud.phase !== "fight") continue;
    if (Math.hypot(x - PAUSE_BTN.x, y - PAUSE_BTN.y) <= PAUSE_BTN.r + 8) {
      game.togglePause();
      continue;
    }
    const bk = findBtn(x, y);
    if (bk) {
      touchBtn[t.identifier] = bk;
      held[bk] = true;
      continue;
    }
    const pl = x < W2 / 2 ? 0 : 1;
    if (y > 290 && sticks[pl].id === null) {
      const st = sticks[pl];
      st.id = t.identifier;
      st.ox = x;
      st.oy = y;
      st.dx = 0;
      st.dy = 0;
    }
  }
  syncKeys();
});
wx.onTouchMove((e) => {
  for (const t of e.changedTouches) {
    for (const pl of [0, 1]) {
      const st = sticks[pl];
      if (st.id === t.identifier) {
        let dx = toLX(t.clientX) - st.ox;
        let dy = toLY(t.clientY) - st.oy;
        const len = Math.hypot(dx, dy);
        if (len > STICK_MAX) {
          dx = dx / len * STICK_MAX;
          dy = dy / len * STICK_MAX;
        }
        st.dx = dx;
        st.dy = dy;
      }
    }
  }
  syncKeys();
});
function touchEnd(e) {
  for (const t of e.changedTouches) {
    const bk = touchBtn[t.identifier];
    if (bk) {
      held[bk] = false;
      delete touchBtn[t.identifier];
    }
    for (const st of sticks) {
      if (st.id === t.identifier) {
        st.id = null;
        st.dx = 0;
        st.dy = 0;
      }
    }
  }
  syncKeys();
}
wx.onTouchEnd(touchEnd);
wx.onTouchCancel(touchEnd);
function hpBar(c, x, y, w, hp, maxHp, color, right) {
  const pct = Math.max(0, hp / maxHp);
  c.fillStyle = "rgba(2,6,23,0.72)";
  c.fillRect(x, y, w, 16);
  c.fillStyle = color;
  const fw = w * pct;
  c.fillRect(right ? x + w - fw : x, y, fw, 16);
  c.strokeStyle = "rgba(148,163,184,0.65)";
  c.lineWidth = 1.5;
  c.strokeRect(x + 0.5, y + 0.5, w - 1, 15);
}
function pips(c, x, y, wins, color, right) {
  for (let i = 0; i < 5; i++) {
    const px = right ? x - i * 16 : x + i * 16;
    c.beginPath();
    c.arc(px, y, 5, 0, Math.PI * 2);
    if (i < wins) {
      c.fillStyle = color;
      c.fill();
    } else {
      c.strokeStyle = color;
      c.lineWidth = 1.5;
      c.stroke();
    }
  }
}
function text(c, s, x, y, size, color, align = "center", bold = true) {
  c.font = `${bold ? "bold " : ""}${size}px sans-serif`;
  c.fillStyle = color;
  c.textAlign = align;
  c.textBaseline = "middle";
  c.fillText(s, x, y);
}
function drawTouchControls(c) {
  const colors = ["#ef4444", "#3b82f6"];
  for (const pl of [0, 1]) {
    const st = sticks[pl];
    c.globalAlpha = 0.28;
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(st.ox, st.oy, STICK_MAX + 12, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    c.globalAlpha = 0.55;
    c.fillStyle = colors[pl];
    c.beginPath();
    c.arc(st.ox + st.dx, st.oy + st.dy, 26, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
  }
  for (const key of Object.keys(BTNS)) {
    const b = BTNS[key];
    c.globalAlpha = held[key] ? 0.75 : 0.32;
    c.fillStyle = held[key] ? b.pl === 0 ? "#ef4444" : "#3b82f6" : "#ffffff";
    c.beginPath();
    c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    c.strokeStyle = "rgba(255,255,255,0.7)";
    c.lineWidth = 2;
    c.beginPath();
    c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    c.stroke();
    text(c, b.label, b.x, b.y + 1, 20, "#0f172a");
  }
  c.globalAlpha = 0.35;
  c.fillStyle = "#ffffff";
  c.beginPath();
  c.arc(PAUSE_BTN.x, PAUSE_BTN.y, PAUSE_BTN.r, 0, Math.PI * 2);
  c.fill();
  c.globalAlpha = 1;
  text(c, "II", PAUSE_BTN.x, PAUSE_BTN.y + 1, 15, "#0f172a");
}
function panel(c) {
  c.fillStyle = "rgba(2,6,23,0.85)";
  c.fillRect(0, 0, W2, H2);
}
function drawHud(c) {
  if (!hud) return;
  const [p1, p2] = hud.players;
  text(c, "P1 \u7EA2\u65B9", 24, 14, 13, "#ef4444", "left");
  pips(c, 330, 14, p1.wins, "#ef4444", false);
  hpBar(c, 20, 26, 380, p1.hp, p1.maxHp, "#ef4444", false);
  text(c, p1.weaponCn ? `${p1.weaponCn}${p1.ammo >= 0 ? ` \xB7 ${p1.ammo}` : ""}` : "\u5F92\u624B", 24, 56, 13, "#e2e8f0", "left", false);
  text(c, "P2 \u84DD\u65B9", W2 - 24, 14, 13, "#3b82f6", "right");
  pips(c, W2 - 330, 14, p2.wins, "#3b82f6", true);
  hpBar(c, W2 - 400, 26, 380, p2.hp, p2.maxHp, "#3b82f6", true);
  text(c, p2.weaponCn ? `${p2.weaponCn}${p2.ammo >= 0 ? ` \xB7 ${p2.ammo}` : ""}` : "\u5F92\u624B", W2 - 24, 56, 13, "#e2e8f0", "right", false);
  text(c, `\u7B2C ${hud.round} \u56DE\u5408`, W2 / 2, 14, 12, "#94a3b8");
  text(c, `${hud.timer}`, W2 / 2, 38, 26, hud.timer <= 10 ? "#f87171" : "#f8fafc");
  if (hud.phase === "fight" && !hud.paused) drawTouchControls(c);
  if (hud.banner) {
    const pulse = 1 + Math.sin(Date.now() / 90) * 0.04;
    c.save();
    c.translate(W2 / 2, H2 / 2 - 30);
    c.scale(pulse, pulse);
    text(c, hud.banner, 0, 0, 42, "#ffffff");
    c.restore();
  }
  if (hud.paused) {
    panel(c);
    text(c, "\u5DF2\u6682\u505C \xB7 \u70B9\u53F3\u4E0A\u89D2 II \u7EE7\u7EED", W2 / 2, H2 / 2, 26, "#e2e8f0");
    drawTouchControls(c);
  }
  if (hud.phase === "menu") {
    panel(c);
    text(c, "\u706B\u67F4\u4EBA\u683C\u6597", W2 / 2, 120, 52, "#f8fafc");
    text(c, "\u53CC\u4EBA\u540C\u5C4F\u5BF9\u6218 \xB7 \u5148\u8D62 5 \u56DE\u5408 \xB7 \u7B2C 6 \u56DE\u5408\u8D77\u8FDB\u5165\u6324\u538B\u6A21\u5F0F", W2 / 2, 172, 17, "#94a3b8", "center", false);
    text(c, "\u6B66\u5668\u4ECE\u5929\u800C\u964D\u53EF\u62FE\u53D6 \xB7 \u67AA\u68B0\u6C34\u5E73\u5F39\u9053 \xB7 \u5730\u523A/\u9F7F\u8F6E/\u5CA9\u6D46\u8981\u5C0F\u5FC3", W2 / 2, 202, 15, "#94a3b8", "center", false);
    c.fillStyle = "rgba(239,68,68,0.12)";
    c.fillRect(70, 240, 380, 130);
    c.fillStyle = "rgba(59,130,246,0.12)";
    c.fillRect(510, 240, 380, 130);
    text(c, "P1 \u7EA2\u65B9\uFF08\u5DE6\u534A\u5C4F\uFF09", 260, 262, 17, "#ef4444");
    text(c, "\u5DE6\u6447\u6746\uFF1A\u5DE6\u53F3\u79FB\u52A8 / \u4E0A\u63A8\u8DF3 / \u4E0B\u63A8\u94BB\u5E73\u53F0", 260, 296, 14, "#e2e8f0", "center", false);
    text(c, "\u653B\uFF1A\u653B\u51FB\xB7\u5F00\u67AA    \u6361\uFF1A\u62FE\u53D6\xB7\u6295\u63B7\u6B66\u5668", 260, 324, 14, "#e2e8f0", "center", false);
    text(c, "\u652F\u6301\u4E8C\u6BB5\u8DF3", 260, 352, 13, "#94a3b8", "center", false);
    text(c, "P2 \u84DD\u65B9\uFF08\u53F3\u534A\u5C4F\uFF09", 700, 262, 17, "#3b82f6");
    text(c, "\u53F3\u6447\u6746\uFF1A\u5DE6\u53F3\u79FB\u52A8 / \u4E0A\u63A8\u8DF3 / \u4E0B\u63A8\u94BB\u5E73\u53F0", 700, 296, 14, "#e2e8f0", "center", false);
    text(c, "\u653B\uFF1A\u653B\u51FB\xB7\u5F00\u67AA    \u6361\uFF1A\u62FE\u53D6\xB7\u6295\u63B7\u6B66\u5668", 700, 324, 14, "#e2e8f0", "center", false);
    text(c, "\u540C\u4E00\u90E8\u624B\u673A\uFF0C\u53CC\u4EBA\u5408\u4F5C\u5BF9\u6297", 700, 352, 13, "#94a3b8", "center", false);
    const blink = Math.sin(Date.now() / 300) > -0.3;
    if (blink) text(c, "\u2014 \u70B9\u51FB\u4EFB\u610F\u4F4D\u7F6E\u5F00\u59CB \u2014", W2 / 2, 430, 22, "#38bdf8");
  }
  if (hud.phase === "matchEnd") {
    panel(c);
    const wc = hud.winnerName === "\u7EA2\u65B9" ? "#ef4444" : "#3b82f6";
    text(c, `${hud.winnerName} \u83B7\u80DC\uFF01`, W2 / 2, 190, 50, wc);
    text(c, `\u6700\u7EC8\u6BD4\u5206  ${p1.wins} : ${p2.wins}`, W2 / 2, 250, 24, "#e2e8f0", "center", false);
    const blink = Math.sin(Date.now() / 300) > -0.3;
    if (blink) text(c, "\u2014 \u70B9\u51FB\u4EFB\u610F\u4F4D\u7F6E\u518D\u6765\u4E00\u5C40 \u2014", W2 / 2, 330, 20, "#38bdf8");
  }
}
var last = Date.now();
var raf = typeof requestAnimationFrame !== "undefined" ? (cb) => requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
function loop() {
  const now = Date.now();
  const dt = Math.min(0.033, (now - last) / 1e3);
  last = now;
  game.update(dt);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * offX, dpr * offY);
  try {
    game.render(ctx);
    drawHud(ctx);
  } catch (err) {
    console.error("render error", err);
  }
  raf(loop);
}
raf(loop);
