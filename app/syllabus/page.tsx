export default function SyllabusPage() {
  const levels = [
    {
      num: 0,
      title: "Welcome to the C64",
      icon: "\u{1F5A5}\u{FE0F}",
      color: "#00ff00",
      desc: "Hello World, PRINT, CHR$, POKE, and your first screen memory tricks.",
      lessons: [
        { title: "Welcome", time: "~5 min", premium: false },
        { title: "PRINT & CHR$", time: "~10 min", premium: false },
        { title: "POKE & Memory", time: "~10 min", premium: false },
        { title: "PETSCII Art & Drawing", time: "~15 min", premium: false },
        { title: "Capstone: First Star", time: "~15 min", premium: false },
      ],
    },
    {
      num: 1,
      title: "BASIC Basics",
      icon: "\u{1F4DD}",
      color: "#A8A8FE",
      desc: "Variables, arrays, loops, conditionals, and your first game.",
      lessons: [
        { title: "Variables & Types", time: "~10 min" },
        { title: "Expressions", time: "~10 min" },
        { title: "INPUT & PRINT", time: "~10 min" },
        { title: "IF/THEN/GOTO", time: "~15 min" },
        { title: "FOR/NEXT Loops", time: "~15 min" },
        { title: "Arrays & DIM", time: "~15 min" },
        { title: "Strings", time: "~10 min" },
        { title: "GOSUB & RETURN", time: "~10 min" },
        { title: "Catch Number Game", time: "~20 min" },
      ],
    },
    {
      num: 2,
      title: "Memory & Color",
      icon: "\u{1F3A8}",
      color: "#FF6B6B",
      desc: "Screen memory, color RAM, PETSCII codes, and text-based UI tricks.",
      lessons: [
        { title: "Memory Map", time: "~10 min" },
        { title: "POKE to the Screen", time: "~15 min" },
        { title: "Color RAM", time: "~10 min" },
        { title: "PETSCII Codes", time: "~15 min" },
        { title: "Text UI", time: "~15 min" },
        { title: "Capstone: Text Adventure", time: "~20 min" },
      ],
    },
    {
      num: 3,
      title: "Sprites",
      icon: "\u{1F47E}",
      color: "#FFD700",
      desc: "Define, position, and animate sprites — build your first sprite-based game.",
      lessons: [
        { title: "What Is a Sprite?", time: "~10 min" },
        { title: "Defining Your Sprite", time: "~15 min" },
        { title: "Positioning Your Sprite", time: "~15 min" },
        { title: "Moving Sprites", time: "~20 min" },
        { title: "Horizontal Move Sprites", time: "~15 min" },
        { title: "Sprites vs POKE", time: "~15 min" },
        { title: "Capstone: Sprite Game", time: "~20 min" },
      ],
    },
    {
      num: 4,
      title: "Sound & Input",
      icon: "\u{1F3B5}",
      color: "#6BFFB8",
      desc: "SID chip basics, playing melodies, keyboard and joystick input, timing loops.",
      lessons: [
        { title: "SID Basics", time: "~10 min" },
        { title: "Playing Melodies", time: "~15 min" },
        { title: "Keyboard Input", time: "~15 min" },
        { title: "Joystick Input", time: "~10 min" },
        { title: "Timing & FPS", time: "~15 min" },
      ],
    },
    {
      num: 5,
      title: "Effects & Data",
      icon: "\u{2728}",
      color: "#FF8ED4",
      desc: "DATA blocks, multi-screen effects, sprite animations, text effects.",
      lessons: [
        { title: "Read DATA", time: "~10 min" },
        { title: "Multi-Screen Effects", time: "~15 min" },
        { title: "Sprite Animations", time: "~15 min" },
        { title: "Table Data", time: "~10 min" },
        { title: "Capstone: Text Effects", time: "~20 min" },
      ],
    },
    {
      num: 6,
      title: "Full Game Dev",
      icon: "\u{1F3C6}",
      color: "#726CC0",
      desc: "State machines, scoring, difficulty, polish, and your capstone game.",
      lessons: [
        { title: "State Machines", time: "~15 min" },
        { title: "Scoring Systems", time: "~15 min" },
        { title: "Difficulty Escalation", time: "~15 min" },
        { title: "Polish Techniques", time: "~15 min" },
        { title: "Capstone: Full Game", time: "~30 min" },
      ],
    },
  ];

  const tracks = [
    {
      name: "Games Track",
      icon: "\u{1F3AE}",
      color: "#FFD700",
      gradient: "linear-gradient(135deg, #726CC0, #562841)",
      desc: "Build classic C64 games from scratch — prototypes, asset packing, collision detection, level design, and polish. Capstone: STAR CHASER.",
    },
    {
      name: "Creative Coding Track",
      icon: "\u{1F3A8}",
      color: "#6BFFB8",
      gradient: "linear-gradient(135deg, #2d6a00, #562841)",
      desc: "Demoscene art, generative patterns, scrolling graphics, and color cycling — all in BASIC on a 1982 machine. Capstone: Text Effects Demo.",
    },
    {
      name: "Systems & Tools Track",
      icon: "\u{1F6E0}\u{FE0F}",
      color: "#A8A8FE",
      gradient: "linear-gradient(135deg, #383838, #726CC0)",
      desc: "Build a text editor, sprite editor, disk file I/O system, and multi-program menu system in C64 BASIC. Capstone: BASIC Toolkit.",
    },
  ];

  const stars = '\u2605';
  const trophy = '\u{1F3C6}';
  const marker = '\u25C6';
  const lock = '\u{1F512}';

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink 1.1s step-end infinite; color: #00ff00; }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1.5rem', fontFamily: "'VT323', monospace", color: '#E3DAF0' }}>
        <div style={{
          borderBottom: '3px dashed #562841',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.85rem',
            color: '#A8A8FE',
            marginBottom: '0.4rem',
          }}>READY&gt; <span className="blink">_</span></div>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.3rem',
            color: '#00ff00',
            textShadow: '4px 4px #383838',
            marginTop: '0.3rem',
          }}>FULL SYLLABUS</h1>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            color: '#D6CDE4',
            marginTop: '0.5rem',
          }}>
            7 Levels - 42 Lessons - {tracks.length} Tracks
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          padding: '0.8rem 1rem',
          background: '#2a2a2a',
          border: '2px solid #562841',
          fontSize: '1rem',
        }}>
          <span><span style={{ color: '#00ff00' }}>{'\u2713'}</span> Free</span>
          <span><span style={{ color: '#ffd700' }}>{'\u2713'}</span> Premium</span>
        </div>

        {/* Level cards */}
        {levels.map((lvl) => (
          <div key={lvl.num} style={{
            marginBottom: '1.5rem',
            border: '3px solid #562841',
            background: 'linear-gradient(180deg, #2a2a2a 0%, #383838 100%)',
            boxShadow: '5px 5px 0 #726CC0',
          }}>
            <div style={{
              padding: '1rem 1.3rem',
              borderBottom: '2px solid #562841',
              background: `linear-gradient(135deg, ${lvl.color}22, #2a2a2a)`,
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.7rem',
                color: lvl.color,
                textShadow: '2px 2px #383838',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{lvl.icon}</span>
                LEVEL {lvl.num}: {lvl.title}
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#D6CDE4', marginTop: '0.3rem' }}>
                {lvl.desc}
              </div>
            </div>

            <div style={{ padding: '1rem 1.3rem' }}>
              {lvl.lessons.map((lesson, idx) => {
                const isPremium = lvl.num > 1;
                const isCap = lesson.title.includes('Capstone');
                const isFree = !isPremium;

                return (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.7rem',
                    borderBottom: idx < lvl.lessons.length - 1 ? '1px solid #56284133' : 'none',
                    opacity: isPremium ? 0.5 : 1,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: '0.9rem',
                        color: '#A8A8FE',
                        width: '2em',
                        textAlign: 'right',
                      }}>{String(idx + 1).padStart(2, ' ')}</span>
                      <span style={{
                        color: isCap ? '#ffd700' : (isPremium ? '#555' : '#E3DAF0'),
                        fontWeight: isCap ? 'bold' : 'normal',
                      }}>
                        {isPremium ? `${lock} ` : isCap ? `${trophy} ` : `${marker} `}{lesson.title}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: '0.9rem',
                      color: isPremium ? '#ffd700' : isFree ? '#A8A8FE' : '#555',
                    }}>{isPremium ? 'PREMIUM' : lesson.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Tracks */}
        <div style={{
          marginTop: '2.5rem',
          borderTop: '3px dashed #562841',
          paddingTop: '2rem',
        }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.9rem',
            color: '#ffd700',
            textShadow: '3px 3px #383838',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>{stars} PROJECT TRACKS {stars}</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1rem',
          }}>
            {tracks.map(t => (
              <div key={t.name} style={{
                border: '3px solid #562841',
                background: `linear-gradient(180deg, ${t.color}11, #383838)`,
                boxShadow: '4px 4px 0 #726CC0',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '1rem 1.2rem',
                  borderBottom: '2px solid #562841',
                  background: t.gradient,
                }}>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.65rem',
                    color: '#ffd700',
                    textShadow: '2px 2px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                    {t.name}
                  </div>
                </div>
                <div style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#D6CDE4', lineHeight: 1.6 }}>
                    {t.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#383838',
          border: '3px solid #562841',
          boxShadow: '4px 4px 0 #726CC0',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.15rem', color: '#D6CDE4', lineHeight: 1.7 }}>
            All lessons use <strong style={{ color: '#00ff00' }}>real C64 BASIC code</strong> that runs in the browser emulator.<br />
            Capstone projects give you something <strong style={{ color: '#ffd700' }}>tangible to build</strong> at the end of each level!
          </div>
        </div>
      </div>
    </>
  );
}
