import { useState } from 'react';

const PRESETS = [
  { name: 'Neon Blue', h: 0, v: 0, blur: 10, color: '#22d3ee', opacity: 100 },
  { name: 'Neon Pink', h: 0, v: 0, blur: 10, color: '#f472b6', opacity: 100 },
  { name: 'Retro', h: 3, v: 3, blur: 0, color: '#6366f1', opacity: 100 },
  { name: '3D', h: 2, v: 2, blur: 0, color: '#374151', opacity: 100 },
  { name: 'Soft', h: 0, v: 2, blur: 6, color: '#000000', opacity: 40 },
  { name: 'Embossed', h: -1, v: -1, blur: 1, color: '#ffffff', opacity: 30 },
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return alpha < 100 ? `rgba(${r},${g},${b},${(alpha / 100).toFixed(2)})` : hex;
}

const S = {
  panel: { flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 } as React.CSSProperties,
  label: { font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 } as React.CSSProperties,
  inputText: { width: '100%', padding: '8px 12px', border: '1px solid #2e2e3e', borderRadius: 8, background: '#0f0f13', color: '#e6e6ee', font: '400 14px/1 Inter', outline: 'none' } as React.CSSProperties,
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } as React.CSSProperties,
  valLabel: { font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' } as React.CSSProperties,
  copyBtn: (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties),
};

export default function TextShadow() {
  const [h, setH] = useState(0);
  const [v, setV] = useState(0);
  const [blur, setBlur] = useState(10);
  const [color, setColor] = useState('#22d3ee');
  const [opacity, setOpacity] = useState(100);
  const [text, setText] = useState('Hello World');
  const [fontSize, setFontSize] = useState(56);
  const [copied, setCopied] = useState(false);

  const sc = hexToRgba(color, opacity);
  const isNeon = h === 0 && v === 0;
  const shadowStyle = isNeon ? `0 0 ${blur}px ${sc}, 0 0 ${blur * 2}px ${sc}` : `${h}px ${v}px ${blur}px ${sc}`;
  const css = isNeon
    ? `.text {\n  text-shadow:\n    0 0 ${blur}px ${sc},\n    0 0 ${blur * 2}px ${sc};\n}`
    : `.text {\n  text-shadow: ${h}px ${v}px ${blur}px ${sc};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (p: (typeof PRESETS)[0]) => {
    setH(p.h); setV(p.v); setBlur(p.blur); setColor(p.color); setOpacity(p.opacity);
  };

  const sliders = [
    { label: 'Horizontal offset', val: h, set: setH, min: -50, max: 50, unit: 'px' },
    { label: 'Vertical offset', val: v, set: setV, min: -50, max: 50, unit: 'px' },
    { label: 'Blur radius', val: blur, set: setBlur, min: 0, max: 80, unit: 'px' },
    { label: 'Font size', val: fontSize, set: setFontSize, min: 16, max: 96, unit: 'px' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 24 }}>
        {PRESETS.map(p => {
          const ps = p.h === 0 && p.v === 0
            ? `0 0 ${p.blur}px ${p.color}, 0 0 ${p.blur * 2}px ${p.color}`
            : `${p.h}px ${p.v}px ${p.blur}px ${p.color}`;
          return (
            <button key={p.name} onClick={() => applyPreset(p)}
              style={{ padding: '10px 8px', border: '1px solid #232330', borderRadius: 10, background: '#13131a', cursor: 'pointer', color: '#e6e6ee', font: '600 11px/1 Inter' }}>
              <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ font: '700 22px/1 JetBrains Mono,monospace', color: '#fff', textShadow: ps }}>Aa</span>
              </div>
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={S.panel}>
          <div style={{ marginBottom: 18 }}>
            <label style={S.label}>Preview text</label>
            <input value={text} onChange={e => setText(e.target.value)} style={S.inputText} />
          </div>
          {sliders.map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={S.row}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={S.valLabel}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val}
                onChange={e => ctrl.set(Number(e.target.value))}
                style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <div style={S.row}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Opacity</span>
              <span style={S.valLabel}>{opacity}%</span>
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
          <div style={{ minHeight: 200, border: '1px solid #232330', borderRadius: 14, background: '#0a0a0e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <span style={{ font: `700 ${fontSize}px/1.1 JetBrains Mono,monospace`, color: '#fff', textShadow: shadowStyle, textAlign: 'center', wordBreak: 'break-word' }}>
              {text || 'Hello World'}
            </span>
          </div>
          <div style={{ border: '1px solid #232330', borderRadius: 14, background: '#0c0c10', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #1c1c26', background: '#101015' }}>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#6b6b7b' }}>CSS</span>
              <button onClick={copy} style={S.copyBtn(copied)}>{copied ? '✓ Copied!' : '⎘ Copy CSS'}</button>
            </div>
            <pre style={{ padding: '16px 20px', font: '500 13px/1.85 JetBrains Mono,monospace', margin: 0, overflowX: 'auto', color: '#e6e6ee', whiteSpace: 'pre-wrap' }}>{css}</pre>
          </div>
          <p style={{ font: '400 11.5px/1.4 Inter', color: '#5b5b6b', margin: 0 }}>CSS generated is free to use in any project — no attribution required.</p>
        </div>
      </div>
    </div>
  );
}
