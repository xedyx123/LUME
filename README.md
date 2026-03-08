# Lume — Award-Winning Frontend Skill for Claude

**Lume** is a Claude skill that teaches AI to build Awwwards-quality frontend interfaces — the kind that win Site of the Day, not get lost in a sea of purple gradients.

> This skill was built studying [landonorris.com](https://landonorris.com) and [igloo.inc](https://www.igloo.inc) — two of the most celebrated web experiences of 2024.

---

## What it does

Give Claude a design brief. Get back a site that feels crafted by a world-class studio.

- 7 distinct aesthetic directions (Dark Cinematic, Playful Wonder, Editorial Luxury, Brutalist, Futuristic Precision, Soft Organic, Retro-Futuristic)
- 15+ ready-to-use components with copy-paste implementations
- Scroll storytelling with GSAP + Lenis
- Mobile-first with full touch optimization
- Production-grade: only `transform` + `opacity` animated, `prefers-reduced-motion` respected

---

## Install

### Antigravity / Claude Code (global)

```bash
# Via openskills CLI
npx openskills install xedyx123/LUME

# Or manually — copy the lume/ folder to:
# Antigravity: C:\Users\[you]\.gemini\antigravity\global_skills\lume\
# Claude Code:  ~/.claude/skills/lume/
```

### Project-level (any agent)

```bash
mkdir -p .agent/skills
cp -r lume/ .agent/skills/lume/
```

### Bootstrap a full Next.js project

```bash
node .agent/skills/lume/scripts/scaffold.js my-project
cd my-project && npm run dev
```

---

## Usage

Once installed, Lume activates automatically when you ask for premium UI work:

```
"Build me a landing page for my SaaS — make it feel premium"
"Create an award-winning portfolio site"
"Hero section with cinematic scroll animations"
"I want something like Vercel.com but for my agency"
```

Or reference it explicitly:

```
"Use the Lume skill to build a product showcase with horizontal scroll"
```

---

## What's inside

```
lume/
├── SKILL.md                    # Core instructions + checklist
├── LICENSE.txt                 # MIT
├── README.md                   # This file
├── CHANGELOG.md                # Version history
├── scripts/
│   └── scaffold.js             # Next.js project bootstrapper
└── references/
    ├── components.md           # 15+ copy-paste components
    ├── aesthetics.md           # 7 aesthetic directions with code
    └── mobile.md               # Mobile-first patterns + touch optimization
```

---

## Compatibility

| Agent | Supported |
|-------|-----------|
| Antigravity | ✅ |
| Claude Code | ✅ |
| Any agent following Agent Skills spec | ✅ |
| Claude.ai (via system prompt) | ✅ |

---

## License

MIT — use it, fork it, build on it.

---

## Contributing

PRs welcome. If you build something beautiful with Lume, open an issue and share it — the best examples may get added to the references.
