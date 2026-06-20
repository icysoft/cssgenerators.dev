import { useState } from 'react';

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return alpha < 100 ? `rgba(${r},${g},${b},${(alpha / 100).toFixed(2)})` : hex;
}

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function DropShadow() {
  const [h, setH] = useState(6);
  const [v, setV] = useState(8);
  const [blur, setBlur] = useState(8);
  const [color, setColor] = useState('#22d3ee');
  const [opacity, setOpacity] = useState(50);
  const [copied, setCopied] = useState(false);

  const sc = hexToRgba(color, opacity);
  const filterVal = `drop-shadow(${h}px ${v}px ${blur}px ${sc})`;
  const css = `.element {\n  filter: ${filterVal};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sliders = [
    { label: 'Horizontal offset', val: h, set: setH, min: -50, max: 50, unit: 'px' },
    { label: 'Vertical offset', val: v, set: setV, min: -50, max: 50, unit: 'px' },
    { label: 'Blur radius', val: blur, set: setBlur, min: 0, max: 80, unit: 'px' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '12px 16px', border: '1px solid #2a2a38', borderRadius: 10, background: 'rgba(34,211,238,.06)', marginBottom: 24, font: '400 13.5px/1.5 Inter', color: '#9b9bab' }}>
        <strong style={{ color: '#22d3ee' }}>vs box-shadow:</strong> <code style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, background: '#1a1a24', padding: '1px 5px', borderRadius: 3, color: '#a5b4fc' }}>filter: drop-shadow()</code> follows the actual shape outline — perfect for SVGs, PNGs with transparency, and clip-path elements.
      </div>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          {sliders.map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val}
                onChange={e => ctrl.set(Number(e.target.value))}
                style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Opacity</span>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{opacity}%</span>
            </div>
            <input type="range" min={0} max={100} value={opacity}
              onChange={e => setOpacity(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{color}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#101015', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ filter: filterVal }}>
              <polygon points="50,5 95,35 80,90 20,90 5,35" fill="linear-gradient(135deg,#6366f1,#22d3ee)" />
              <defs>
                <linearGradient id="pgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <polygon points="50,5 95,35 80,90 20,90 5,35" fill="url(#pgrad)" />
            </svg>
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
