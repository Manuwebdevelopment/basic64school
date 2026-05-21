"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const LEVELS = [
  { num: 0, title: "Level 0: Welcome to the C64", icon: "\u{1F5A5}\u{FE0F}", desc: "Hello World, PRINT, CHR$, POKE, and your first screen memory tricks.", color: "#00ff00" },
  { num: 1, title: "Level 1: BASIC Basics", icon: "\u{1F4DD}", desc: "Variables, arrays, FOR/NEXT, IF/THEN/GOTO, strings, SUB/RETURN, and your first game.", color: "#A8A8FE" },
  { num: 2, title: "Level 2: Memory & Color", icon: "\u{1F3A8}", desc: "Screen memory addresses, color RAM, PETSCII codes, and text-based UI tricks.", color: "#FF6B6B" },
  { num: 3, title: "Level 3: Sprites", icon: "\u{1F47E}", desc: "Define, position, and animate sprites \u2014 build your first sprite-based game.", color: "#FFD700" },
  { num: 4, title: "Level 4: Sound & Input", icon: "\u{1F3B5}", desc: "SID chip basics, playing melodies, keyboard and joystick input, timing loops.", color: "#6BFFB8" },
  { num: 5, title: "Level 5: Effects & Data", icon: "\u{2728}", desc: "Read data from DATA blocks, multi-screen effects, sprite animations, text effects.", color: "#FF8ED4" },
  { num: 6, title: "Level 6: Full Game Dev", icon: "\u{1F3C6}", desc: "State machines, scoring systems, difficulty escalation, polish, and your capstone game.", color: "#726CC0" },
];

const TRACKS = [
  {
    name: "Games",
    icon: "\u{1F3AE}",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #726CC0, #562841)",
    desc: "Build classic C64 games from scratch \u2014 prototypes, asset packing, collision detection, level design, and polish.",
    lessons: 5,
    capstone: "STAR CHASER",
    link: "/syllabus",
  },
  {
    name: "Creative Coding",
    icon: "\u{1F3A8}",
    color: "#6BFFB8",
    gradient: "linear-gradient(135deg, #2d6a00, #562841)",
    desc: "Demoscene art, generative patterns, scrolling graphics, and color cycling \u2014 all in BASIC on a 1982 machine.",
    lessons: 4,
    capstone: "TEXT EFFECTS DEMO",
    link: "/syllabus",
  },
  {
    name: "Systems & Tools",
    icon: "\u{1F6E0}\u{FE0F}",
    color: "#A8A8FE",
    gradient: "linear-gradient(135deg, #383838, #726CC0)",
    desc: "Build a text editor, sprite editor, disk file I/O system, and multi-program menu system in C64 BASIC.",
    lessons: 4,
    capstone: "BASIC TOOLKIT",
    link: "/syllabus",
  },
];

const FEATURES = [
  { icon: "\u{1F3A5}", title: "Browser-Based Simulator", desc: "No downloads required. Code runs live in your browser with a built-in Commodore 64 emulator." },
  { icon: "\u{1F4D6}", title: "42 Handcrafted Lessons", desc: "7 levels of progressive lessons \u2014 each with theory, code examples, exercises, and quizzes." },
  { icon: "\u{1F3AE}", title: "3 Project Tracks", desc: "Choose your path: Game Development, Creative Coding / Demoscene, or Systems & Tools." },
  { icon: "\u{1F4CA}", title: "Real C64 BASIC", desc: "Every code example is accurate for the Commodore 64 and works in VICE or the built-in simulator." },
  { icon: "\u{1F4E6}", title: "Capstone Projects", desc: "Each track ends with a real project \u2014 a full game, a demoscene demo, or a BASIC toolkit." },
  { icon: "\u{2764}\u{FE0F}", title: "Kid-Friendly", desc: "Concepts explained with analogies. No prior programming experience needed to start." },
];

export default function HomePage() {
  const { isPremium } = useAuth();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* ===== HERO ===== */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem 2.5rem',
        background: 'linear-gradient(180deg, transparent 0%, rgba(114,108,192,0.15) 100%)',
        marginBottom: '2rem',
      }}>
        <div style={{
          fontSize: '2.8rem',
          fontFamily: "'Press Start 2P', monospace",
          color: '#00ff00',
          textShadow: '4px 4px #383838',
          marginBottom: '1rem',
          lineHeight: 1.3,
        }}>
          BASIC<span style={{ color: '#ffd700' }}>64</span> SCHOOL
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.6rem',
          color: '#E3DAF0',
          marginBottom: '0.4rem',
        }}>
          Learn Commodore 64 BASIC \u2014 the fun way.
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.2rem',
          color: '#A8A8FE',
          marginBottom: '2rem',
          fontStyle: 'italic',
        }}>
          42 lessons &bull; 7 levels &bull; 3 tracks &bull; browser-based simulator
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/syllabus" style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.75rem',
            padding: '0.85rem 2rem',
            background: '#00ff00',
            color: '#000',
            textDecoration: 'none',
            borderRadius: 0,
            boxShadow: '4px 4px 0 #383838',
            transition: 'all 0.1s ease-out',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #383838'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #383838'; }}
          >
            &#9650; START LEARNING
          </Link>
          <Link href="/about" style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.75rem',
            padding: '0.85rem 2rem',
            background: '#726CC0',
            color: '#E3DAF0',
            textDecoration: 'none',
            borderRadius: 0,
            border: '3px solid #562841',
            boxShadow: '4px 4px 0 #383838',
            transition: 'all 0.1s ease-out',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A8A8FE'; e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #383838'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#726CC0'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #383838'; }}
          >
            &#9432; LEARN MORE
          </Link>
          {!isPremium && (
            <Link href="/premium" style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.75rem',
              padding: '0.85rem 2rem',
              background: '#ffd700',
              color: '#000',
              textDecoration: 'none',
              borderRadius: 0,
              boxShadow: '4px 4px 0 #383838',
              transition: 'all 0.1s ease-out',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #383838'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #383838'; }}
            >
              &#9733; UPGRADE $25
            </Link>
          )}
        </div>
      </div>

      {/* ===== QUICK STATS ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        {[
          { num: '1982', label: 'C64 Released' },
          { num: '42', label: 'Interactive Lessons' },
          { num: '7', label: 'Progressive Levels' },
          { num: '3', label: 'Project Tracks' },
        ].map(s => (
          <div key={s.label} style={{
            textAlign: 'center',
            padding: '1.2rem 1rem',
            background: '#383838',
            border: '3px solid #562841',
            boxShadow: '4px 4px 0 #726CC0',
          }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '1.6rem',
              color: '#00ff00',
              textShadow: '3px 3px #383838',
              marginBottom: '0.4rem',
            }}>{s.num}</div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#D6CDE4' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===== 7 LEVELS ===== */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1rem',
          color: '#ffd700',
          textShadow: '3px 3px #383838',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          &#9650; YOUR LEARNING PATH
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#A8A8FE',
          marginBottom: '1.5rem',
        }}>
          7 levels from Hello World to full-game development
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {LEVELS.map(l => (
            <div key={l.num} style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.2rem',
              background: '#383838',
              border: '3px solid #562841',
              boxShadow: '4px 4px 0 #726CC0',
            }}>
              <div style={{ fontSize: '2rem', flexShrink: 0, lineHeight: 1 }}>{l.icon}</div>
              <div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.6rem',
                  color: l.color,
                  marginBottom: '0.3rem',
                  textShadow: '2px 2px #383838',
                }}>{l.title}</div>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.05rem',
                  color: '#D6CDE4',
                  lineHeight: 1.5,
                }}>{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 3 TRACKS ===== */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1rem',
          color: '#ffd700',
          textShadow: '3px 3px #383838',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          &#9733; CHOOSE YOUR TRACK
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#A8A8FE',
          marginBottom: '1.5rem',
        }}>
          Pick your passion \u2014 game dev, demoscene art, or systems tools
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {TRACKS.map(t => (
            <div key={t.name} style={{
              border: '4px solid #562841',
              background: 'linear-gradient(180deg, #2a2a2a 0%, #383838 100%)',
              overflow: 'hidden',
              boxShadow: '6px 6px 0 #726CC0',
            }}>
              <div style={{
                background: t.gradient,
                padding: '1.2rem 1.5rem',
                borderBottom: '3px solid #562841',
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.8rem',
                  color: '#ffd700',
                  textShadow: '2px 2px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
                  {t.name} TRACK
                </div>
              </div>
              <div style={{ padding: '1.3rem 1.5rem' }}>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.1rem',
                  color: '#D6CDE4',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}>{t.desc}</div>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '0.95rem',
                  color: '#A8A8FE',
                  marginBottom: '1.2rem',
                }}>
                  <span style={{ color: '#00ff00' }}>&#9650;</span> {t.lessons} lessons &bull; <span style={{ color: '#ffd700' }}>Capstone: {t.capstone}</span>
                </div>
                <Link href={t.link} style={{
                  display: 'inline-block',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.65rem',
                  padding: '0.55rem 1.4rem',
                  background: '#726CC0',
                  color: '#E3DAF0',
                  textDecoration: 'none',
                  borderRadius: 0,
                  border: '2px solid #562841',
                  boxShadow: '3px 3px 0 #383838',
                  transition: 'all 0.1s ease-out',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#A8A8FE'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '1px 1px 0 #383838'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#726CC0'; e.currentTarget.style.color = '#E3DAF0'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '3px 3px 0 #383838'; }}
                >
                  &#9656; EXPLORE TRACK
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1rem',
          color: '#00ff00',
          textShadow: '3px 3px #383838',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          &#9733; WHY BASIC64?
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              padding: '1.3rem',
              background: '#383838',
              border: '3px solid #562841',
              boxShadow: '4px 4px 0 #726CC0',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                color: '#ffd700',
                marginBottom: '0.5rem',
                textShadow: '2px 2px #383838',
              }}>{f.title}</div>
              <div style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.05rem',
                color: '#D6CDE4',
                lineHeight: 1.5,
              }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PRICING ===== */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1rem',
          color: '#ffd700',
          textShadow: '3px 3px #383838',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          &#9733; PRICING
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#A8A8FE',
          marginBottom: '1.5rem',
        }}>
          Start free, upgrade when you're ready
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Free tier */}
          <div style={{
            border: '4px solid #562841',
            background: 'linear-gradient(180deg, #2a2a2a 0%, #383838 100%)',
            boxShadow: '6px 6px 0 #726CC0',
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '3px solid #562841',
              background: '#562841',
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.9rem',
                color: '#E3DAF0',
                textShadow: '2px 2px rgba(0,0,0,0.4)',
              }}>FREE</div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.8rem',
                color: '#00ff00',
                textShadow: '3px 3px #383838',
                marginBottom: '1rem',
              }}>&#36;0</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#D6CDE4', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <span style={{ color: '#00ff00' }}>&#9650;</span> Welcome to the C64 (Level 0)<br />
                <span style={{ color: '#00ff00' }}>&#9650;</span> 8 sample lessons across Levels 1-3<br />
                <span style={{ color: '#00ff00' }}>&#9650;</span> Browser-based C64 emulator<br />
                <span style={{ color: '#00ff00' }}>&#9650;</span> No account required
              </div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                color: '#A8A8FE',
                textAlign: 'center',
              }}>START CODING TODAY</div>
            </div>
          </div>

          {/* Premium tier */}
          <div style={{
            border: '4px solid #ffd700',
            background: 'linear-gradient(180deg, rgba(255,215,0,0.08) 0%, #383838 100%)',
            boxShadow: '6px 6px 0 #ffd700',
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '3px solid #ffd700',
              background: 'linear-gradient(135deg, #b8860b, #726CC0)',
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.9rem',
                color: '#ffd700',
                textShadow: '2px 2px rgba(0,0,0,0.6)',
              }}>&#9733; PREMIUM &#9733;</div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.8rem',
                color: '#ffd700',
                textShadow: '3px 3px #383838',
                marginBottom: '0.3rem',
              }}>&#36;25</div>
              <div style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1rem',
                color: '#A8A8FE',
                marginBottom: '1rem',
              }}>One-time payment. No recurring fees.</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#D6CDE4', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <span style={{ color: '#ffd700' }}>&#9733;</span> All 42 lessons \u2014 Levels 0 through 6<br />
                <span style={{ color: '#ffd700' }}>&#9733;</span> Full 3 tracks (Games, Creative Coding, Systems)<br />
                <span style={{ color: '#ffd700' }}>&#9733;</span> Progress tracking across all levels<br />
                <span style={{ color: '#ffd700' }}>&#9733;</span> Your results are saved<br />
                <span style={{ color: '#ffd700' }}>&#9733;</span> Support the project
              </div>
              <Link href="/premium" style={{
                display: 'block',
                textAlign: 'center',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.7rem',
                padding: '0.75rem 1.5rem',
                background: '#ffd700',
                color: '#000',
                textDecoration: 'none',
                borderRadius: 0,
                boxShadow: '4px 4px 0 #383838',
                fontFamily: "'Press Start 2P', monospace",
                fontWeight: 'bold',
              }}>
                &#9650; UPGRADE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        background: '#383838',
        border: '4px solid #562841',
        boxShadow: '6px 6px 0 #726CC0',
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1rem',
          color: '#00ff00',
          textShadow: '3px 3px #383838',
          marginBottom: '1rem',
        }}>
          READY TO type your first command?
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.2rem',
          color: '#D6CDE4',
          marginBottom: '2rem',
        }}>
          Open the simulator, enter some BASIC, and watch something appear on screen!<br />
          That&apos;s the magic of the Commodore 64.
        </div>
        <Link href="/syllabus" style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.85rem',
          padding: '1rem 3rem',
          background: '#00ff00',
          color: '#000',
          textDecoration: 'none',
          borderRadius: 0,
          boxShadow: '5px 5px 0 #383838',
          fontWeight: 'bold',
          display: 'inline-block',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '3px 3px 0 #383838'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '5px 5px 0 #383838'; }}
        >
          &#9650; OPEN THE SYLLABUS
        </Link>
      </div>

      {/* ===== BLINKING CURSOR FOOTER ===== */}
      <div style={{
        textAlign: 'center',
        paddingTop: '1.5rem',
        fontFamily: "'VT323', monospace",
        fontSize: '1.3rem',
        color: '#00ff00',
      }}>
        {'READY&gt; '}<span style={{
          display: 'inline-block',
          width: '0.6em',
          height: '1.1em',
          backgroundColor: '#00ff00',
          animation: 'blink-caret 1s linear infinite',
          verticalAlign: 'middle',
          marginLeft: '4px',
        }} />
      </div>

    </div>
  );
}
