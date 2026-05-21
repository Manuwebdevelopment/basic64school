import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.5rem', fontFamily: "'VT323', monospace", color: '#E3DAF0' }}>
      <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1.2rem', color: '#00ff00', textShadow: '3px 3px #383838', borderBottom: '3px dashed #562841', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        ABOUT BASIC64 SCHOOL
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#ffd700', textShadow: '2px 2px #383838', marginTop: '1.5rem' }}>
          &#9432; OUR MISSION
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#D6CDE4' }}>
          Basic64 School was born from a simple idea: <strong style={{ color: '#00ff00' }}>Commodore 64 BASIC is one of the best ways to learn programming</strong>, and almost no modern resources teach it with the fun, hands-on approach the C64 deserves.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#D6CDE4' }}>
          We make learning C64 BASIC <strong style={{ color: '#00ff00' }}>accessible to everyone</strong> through browser-based lessons with a built-in emulator. No downloads, no setup, no waiting \u2014 just type code and see it run instantly, exactly like the original C64 experience.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#ffd700', textShadow: '2px 2px #383838', marginTop: '1.5rem' }}>
          &#9432; WHAT YOU'LL LEARN
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {[
            { icon: '\u{1F5A5}\u{FE0F}', title: 'C64 Fundamentals', desc: 'PRINT, POKE, PEEK, memory addresses, screen RAM' },
            { icon: '\u{1F4BB}', title: 'BASIC Programming', desc: 'Variables, arrays, loops, conditionals, subroutines' },
            { icon: '\u{1F47E}', title: 'Sprites & Graphics', desc: 'Sprite definition, positioning, animation, color RAM' },
            { icon: '\u{1F3B5}', title: 'SID Sound', desc: 'Voice control, envelopes, frequency, playing melodies' },
            { icon: '\u{1F3AE}', title: 'Game Development', desc: 'State machines, collision detection, scoring, game loops' },
            { icon: '\u{1F3A8}', title: 'Demoscene Art', desc: 'Text effects, scrolling, color cycling, generative art' },
          ].map(item => (
            <div key={item.title} style={{
              padding: '1.2rem',
              background: '#383838',
              border: '3px solid #562841',
              boxShadow: '3px 3px 0 #726CC0',
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: '#00ff00', marginBottom: '0.4rem' }}>{item.title}</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#D6CDE4' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#ffd700', textShadow: '2px 2px #383838', marginTop: '1.5rem' }}>
          &#9432; THE COMPUTER HISTORY
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#D6CDE4' }}>
          The Commodore 64, released in <strong style={{ color: '#00ff00' }}>1982</strong> by Commodore International, sold over <strong style={{ color: '#00ff00' }}>17 million units</strong> and remains the best-selling single computer model of all time. Its 6502 processor, VIC-II graphics chip, and SID sound chip made it incredibly powerful for its price of $595 (about $1,900 today adjusted for inflation).
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#D6CDE4' }}>
          BASIC on the C64 was <strong style={{ color: '#00ff00' }}>instant and interactive</strong> \u2014 you typed commands at the READY&amp;gt; prompt and saw results immediately. There were no compilers, no build servers, no configuration files. Just you, the machine, and your imagination. <em>That's the experience we recreate in your browser.</em>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#ffd700', textShadow: '2px 2px #383838', marginTop: '1.5rem' }}>
          &#9432; STRUCTURE
        </h2>
        <div style={{ background: '#383838', border: '3px solid #562841', padding: '1.5rem', boxShadow: '3px 3px 0 #726CC0', marginTop: '1rem' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#D6CDE4', margin: '0 0 1rem' }}>
            The curriculum has <strong style={{ color: '#00ff00' }}>7 progressive levels</strong> with <strong style={{ color: '#00ff00' }}>42 total lessons</strong>. Each lesson includes:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {['Theory (kid-friendly analogies)', 'Real C64 BASIC code examples', 'Hands-on exercises', 'Quizzes & challenges', 'Capstone mini-projects'].map(item => (
              <span key={item} style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#00ff00' }}>{'\u{2713} '}{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '2px dashed #562841' }}>
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', color: '#A8A8FE', marginBottom: '1.5rem' }}>
          Still have questions? <Link href="https://github.com/basic64school" target="_blank" style={{ color: '#00ff00' }}>Check our GitHub</Link>
        </p>
        <Link href="/syllabus" style={{
          display: 'inline-block',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.7rem',
          padding: '0.75rem 2rem',
          background: '#00ff00',
          color: '#000',
          textDecoration: 'none',
          border: '3px solid #383838',
          boxShadow: '4px 4px 0 #383838',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #383838'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #383838'; }}
        >
          &#9650; GO TO SYLLABUS
        </Link>
      </div>
    </div>
  );
}
