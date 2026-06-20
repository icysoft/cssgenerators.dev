import { useState } from 'react';

const DIRECTIONS = [
  { val: 'right', label: '→', rotate: '45deg' },
  { val: 'down', label: '↓', rotate: '135deg' },
  { val: 'left', label: '←', rotate: '225deg' },
  { val: 'up', label: '↑', rotate: '315deg' },
  { val: 'up-right', label: '↗', rotate: '0deg' },
  { val: 'down-right', label: '↘', rotate: '90deg' },
  { val: 'down-left', label: '↙', rotate: '180deg' },
  { val: 'up-left', label: '↖', rotate: '270deg' },
];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Arrow() {
  const [direction, setDirection] = useState('right');
  const [size, setSize] = useState(28);
  const [thickness, setThickness] = useState(4);
  const [color, setColor] = useState('#22d3ee');
  const [borderRadius, setBorderRadius] = useState(2);
  const [copied, setCopied] = useState(false);

  const dir = DIRECTIONS.find(d => d.val === direction) ?? DIRECTIONS[0];
  const css = `.arrow {\n  width: ${size}px;\n  height: ${size}px;\n  border-top: ${thickness}px solid ${color};\n  border-right: ${thickness}px solid ${color};\n  border-radius: ${borderRadius}px;\n  transform: rotate(${dir.rotate});\n}`;

  const arrowStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderTop: `${thickness}px solid ${color}`,
    borderRight: `${thickness}px solid ${color}`,
    borderRadius,
    transform: `rotate(${dir.rotate})`,
  };

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
                  style={{ height: 46, border: direction === d.val ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: direction === d.val ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: direction === d.val ? '#a5b4fc' : '#6b6b7b', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          {[
            { label: 'Size', val: size, set: setSize, min: 10, max: 100, unit: 'px' },
            { label: 'Thickness', val: thickness, set: setThickness, min: 1, max: 20, unit: 'px' },
            { label: 'Border radius', val: borderRadius, set: setBorderRadius, min: 0, max: 20, unit: 'px' },
          ].map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{color}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <div style={arrowStyle} />
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
