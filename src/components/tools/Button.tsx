import { useState } from 'react';

interface Preset {
  name: string;
  bg: string;
  text: string;
  borderRadius: number;
  paddingY: number;
  paddingX: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
  hoverBg: string;
  shadow: string;
  gradient: boolean;
}

const PRESETS: Preset[] = [
  { name: 'Modern', bg: '#6366f1', text: '#ffffff', borderRadius: 8, paddingY: 12, paddingX: 24, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', hoverBg: '#4f46e5', shadow: '0 4px 12px rgba(99,102,241,.4)', gradient: true },
  { name: 'Flat', bg: '#6366f1', text: '#ffffff', borderRadius: 5, paddingY: 11, paddingX: 22, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', hoverBg: '#4f46e5', shadow: 'none', gradient: false },
  { name: 'Outline', bg: 'transparent', text: '#a5b4fc', borderRadius: 8, paddingY: 10, paddingX: 22, borderWidth: 1, borderColor: '#6366f1', borderStyle: 'solid', hoverBg: 'rgba(99,102,241,.1)', shadow: 'none', gradient: false },
  { name: 'Glass', bg: 'rgba(255,255,255,.08)', text: '#e6e6ee', borderRadius: 9, paddingY: 11, paddingX: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,.18)', borderStyle: 'solid', hoverBg: 'rgba(255,255,255,.14)', shadow: 'none', gradient: false },
  { name: 'Gradient', bg: '#6366f1', text: '#ffffff', borderRadius: 8, paddingY: 12, paddingX: 24, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', hoverBg: '#22d3ee', shadow: '0 4px 16px rgba(99,102,241,.3)', gradient: true },
  { name: 'Retro', bg: '#facc15', text: '#0f0f13', borderRadius: 4, paddingY: 11, paddingX: 22, borderWidth: 2, borderColor: '#0f0f13', borderStyle: 'solid', hoverBg: '#fbbf24', shadow: '4px 4px 0 #0f0f13', gradient: false },
];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function ButtonGen() {
  const [label, setLabel] = useState('Click me');
  const [bg, setBg] = useState('#6366f1');
  const [text, setText] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(8);
  const [paddingY, setPaddingY] = useState(12);
  const [paddingX, setPaddingX] = useState(24);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#6366f1');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [hoverBg, setHoverBg] = useState('#4f46e5');
  const [shadow, setShadow] = useState('0 4px 12px rgba(99,102,241,.4)');
  const [gradient, setGradient] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(0);

  const applyPreset = (p: Preset, i: number) => {
    setActivePreset(i);
    setBg(p.bg); setText(p.text); setBorderRadius(p.borderRadius);
    setPaddingY(p.paddingY); setPaddingX(p.paddingX);
    setBorderWidth(p.borderWidth); setBorderColor(p.borderColor);
    setBorderStyle(p.borderStyle); setHoverBg(p.hoverBg);
    setShadow(p.shadow); setGradient(p.gradient);
  };

  const bgStyle = gradient && bg !== 'transparent' && !bg.startsWith('rgba')
    ? `linear-gradient(180deg, ${bg}, ${bg}dd)`
    : bg;
  const hoverBgStyle = gradient && hoverBg !== 'transparent' && !hoverBg.startsWith('rgba')
    ? `linear-gradient(180deg, ${hoverBg}, ${hoverBg}dd)`
    : hoverBg;

  const borderProp = borderWidth > 0 ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none';
  const css = `.button {\n  background: ${bgStyle};\n  color: ${text};\n  border-radius: ${borderRadius}px;\n  padding: ${paddingY}px ${paddingX}px;\n  border: ${borderProp};\n  box-shadow: ${shadow || 'none'};\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.button:hover {\n  background: ${hoverBgStyle};\n  transform: translateY(-1px);\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnStyle: React.CSSProperties = {
    background: hovering ? hoverBgStyle : bgStyle,
    color: text,
    borderRadius,
    padding: `${paddingY}px ${paddingX}px`,
    border: borderProp,
    boxShadow: hovering ? (shadow || 'none') : (shadow || 'none'),
    cursor: 'pointer',
    font: '600 15px/1 Inter',
    transition: 'all 0.2s ease',
    transform: hovering ? 'translateY(-1px)' : 'none',
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 24 }}>
        {PRESETS.map((p, i) => (
          <button key={p.name} onClick={() => applyPreset(p, i)}
            style={{ padding: '10px 8px', border: activePreset === i ? '1.5px solid #6366f1' : '1px solid #232330', borderRadius: 10, background: activePreset === i ? 'rgba(99,102,241,.1)' : '#13131a', cursor: 'pointer', color: '#e6e6ee', font: '600 11px/1 Inter' }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <span style={{ background: p.gradient && p.bg !== 'transparent' && !p.bg.startsWith('rgba') ? `linear-gradient(180deg,${p.bg},${p.bg}dd)` : p.bg, color: p.text, padding: '5px 11px', borderRadius: p.borderRadius, border: p.borderWidth > 0 ? `${p.borderWidth}px ${p.borderStyle} ${p.borderColor}` : 'none', font: '600 11px/1 Inter', boxShadow: p.shadow }}>
                {p.name}
              </span>
            </div>
            {p.name}
          </button>
        ))}
      </div>

      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 380, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Button text</label>
            <input value={label} onChange={e => setLabel(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #2e2e3e', borderRadius: 8, background: '#0f0f13', color: '#e6e6ee', font: '400 14px/1 Inter', outline: 'none' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Background</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="color" value={bg.startsWith('#') ? bg : '#6366f1'} onChange={e => setBg(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
                <span style={{ font: '500 11px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{bg.startsWith('#') ? bg : 'rgba'}</span>
              </div>
            </div>
            <div>
              <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Text color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="color" value={text} onChange={e => setText(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
                <span style={{ font: '500 11px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{text}</span>
              </div>
            </div>
          </div>
          {[
            { label: 'Border radius', val: borderRadius, set: setBorderRadius, min: 0, max: 50, unit: 'px' },
            { label: 'Padding Y', val: paddingY, set: setPaddingY, min: 4, max: 32, unit: 'px' },
            { label: 'Padding X', val: paddingX, set: setPaddingX, min: 8, max: 64, unit: 'px' },
          ].map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Hover bg</span>
            <input type="color" value={hoverBg.startsWith('#') ? hoverBg : '#4f46e5'} onChange={e => setHoverBg(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 200, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <button style={btnStyle} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              {label || 'Click me'}
            </button>
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
