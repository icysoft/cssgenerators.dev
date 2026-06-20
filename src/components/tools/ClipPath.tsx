import { useState } from 'react';

const SHAPES = [
  { name: 'Triangle', clip: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { name: 'Arrow', clip: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' },
  { name: 'Pentagon', clip: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { name: 'Hexagon', clip: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { name: 'Star', clip: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
  { name: 'Parallelogram', clip: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' },
  { name: 'Chevron', clip: 'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)' },
  { name: 'Circle', clip: 'circle(50% at 50% 50%)' },
  { name: 'Ellipse', clip: 'ellipse(50% 30% at 50% 50%)' },
  { name: 'Rhombus', clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { name: 'Message', clip: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' },
  { name: 'Cross', clip: 'polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 10% 65%)' },
];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function ClipPath() {
  const [selected, setSelected] = useState(4);
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#22d3ee');
  const [copied, setCopied] = useState(false);

  const clip = SHAPES[selected].clip;
  const css = `.element {\n  clip-path: ${clip};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 24 }}>
        {SHAPES.map((s, i) => (
          <button key={s.name} onClick={() => setSelected(i)}
            style={{ padding: '10px 8px', border: selected === i ? '1.5px solid #6366f1' : '1px solid #232330', borderRadius: 10, background: selected === i ? 'rgba(99,102,241,.1)' : '#13131a', cursor: 'pointer', color: '#e6e6ee', font: '600 11px/1 Inter' }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${color1},${color2})`, clipPath: s.clip }} />
            </div>
            {s.name}
          </button>
        ))}
      </div>

      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ font: '600 14px/1 Inter', color: '#e6e6ee', marginBottom: 16 }}>Selected: {SHAPES[selected].name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Color 1</label>
                <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: '100%', height: 36, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
              </div>
              <div>
                <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Color 2</label>
                <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: '100%', height: 36, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 14px', border: '1px solid #2e2e3e', borderRadius: 10, background: '#0f0f13' }}>
            <div style={{ font: '500 11px/1 Inter', color: '#6b6b7b', marginBottom: 6 }}>clip-path value</div>
            <code style={{ font: '400 11.5px/1.5 JetBrains Mono,monospace', color: '#a5b4fc', wordBreak: 'break-all' }}>{clip}</code>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 280, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <div style={{ width: 200, height: 200, background: `linear-gradient(135deg,${color1},${color2})`, clipPath: clip }} />
          </div>
          <div style={{ border: '1px solid #232330', borderRadius: 14, background: '#0c0c10', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #1c1c26', background: '#101015' }}>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#6b6b7b' }}>CSS</span>
              <button onClick={copy} style={copyBtn(copied)}>{copied ? '✓ Copied!' : '⎘ Copy CSS'}</button>
            </div>
            <pre style={{ padding: '16px 20px', font: '500 13px/1.85 JetBrains Mono,monospace', margin: 0, overflowX: 'auto', color: '#e6e6ee', whiteSpace: 'pre-wrap' }}>{css}</pre>
          </div>
          <p style={{ font: '400 11.5px/1.4 Inter', color: '#5b5b6b', margin: 0 }}>CSS generated is free to use — no attribution required.</p>
        </div>
      </div>
    </div>
  );
}
