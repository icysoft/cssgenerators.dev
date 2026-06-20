import { useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';

const DIRECTIONS: { val: Direction; label: string; icon: string }[] = [
  { val: 'up', label: 'Up', icon: '▲' },
  { val: 'down', label: 'Down', icon: '▼' },
  { val: 'left', label: 'Left', icon: '◀' },
  { val: 'right', label: 'Right', icon: '▶' },
  { val: 'up-left', label: 'Up-Left', icon: '◤' },
  { val: 'up-right', label: 'Up-Right', icon: '◥' },
  { val: 'down-left', label: 'Down-Left', icon: '◣' },
  { val: 'down-right', label: 'Down-Right', icon: '◢' },
];

function getTriangleStyle(dir: Direction, size: number, color: string): React.CSSProperties {
  const t = `${size}px solid ${color}`;
  const n = `${size}px solid transparent`;
  switch (dir) {
    case 'up': return { width: 0, height: 0, borderLeft: n, borderRight: n, borderBottom: t };
    case 'down': return { width: 0, height: 0, borderLeft: n, borderRight: n, borderTop: t };
    case 'left': return { width: 0, height: 0, borderTop: n, borderBottom: n, borderRight: t };
    case 'right': return { width: 0, height: 0, borderTop: n, borderBottom: n, borderLeft: t };
    case 'up-left': return { width: 0, height: 0, borderTop: t, borderRight: `${size}px solid transparent` };
    case 'up-right': return { width: 0, height: 0, borderTop: t, borderLeft: `${size}px solid transparent` };
    case 'down-left': return { width: 0, height: 0, borderBottom: t, borderRight: `${size}px solid transparent` };
    case 'down-right': return { width: 0, height: 0, borderBottom: t, borderLeft: `${size}px solid transparent` };
  }
}

function getTriangleCSS(dir: Direction, size: number, color: string): string {
  const s = getTriangleStyle(dir, size, color);
  const props = Object.entries(s).map(([k, v]) => {
    const kebab = k.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `  ${kebab}: ${v};`;
  }).join('\n');
  return `.triangle {\n  width: 0;\n  height: 0;\n${props}\n}`;
}

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Triangle() {
  const [direction, setDirection] = useState<Direction>('up');
  const [size, setSize] = useState(40);
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState(false);

  const css = getTriangleCSS(direction, size, color);

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>Direction</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {DIRECTIONS.map(d => (
                <button key={d.val} onClick={() => setDirection(d.val)}
                  style={{ height: 48, border: direction === d.val ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: direction === d.val ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: direction === d.val ? '#a5b4fc' : '#6b6b7b', fontSize: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <span>{d.icon}</span>
                  <span style={{ font: '500 9px/1 Inter' }}>{d.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Size</span>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{size}px</span>
            </div>
            <input type="range" min={10} max={120} value={size} onChange={e => setSize(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{color}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <div style={getTriangleStyle(direction, size, color)} />
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
