import { useState } from 'react';

const defaults = { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, opacity: 100, saturate: 100, sepia: 0 };

const PRESETS = [
  { name: 'Vintage', blur: 0, brightness: 90, contrast: 110, grayscale: 20, hueRotate: 10, opacity: 100, saturate: 70, sepia: 30 },
  { name: 'Cold', blur: 0, brightness: 105, contrast: 100, grayscale: 0, hueRotate: 180, opacity: 100, saturate: 90, sepia: 0 },
  { name: 'Warm', blur: 0, brightness: 105, contrast: 105, grayscale: 0, hueRotate: 20, opacity: 100, saturate: 130, sepia: 20 },
  { name: 'B&W', blur: 0, brightness: 100, contrast: 120, grayscale: 100, hueRotate: 0, opacity: 100, saturate: 100, sepia: 0 },
  { name: 'Blur', blur: 4, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, opacity: 100, saturate: 100, sepia: 0 },
  { name: 'Vivid', blur: 0, brightness: 110, contrast: 115, grayscale: 0, hueRotate: 0, opacity: 100, saturate: 180, sepia: 0 },
];

function buildFilter(s: typeof defaults) {
  const parts: string[] = [];
  if (s.blur !== 0) parts.push(`blur(${s.blur}px)`);
  if (s.brightness !== 100) parts.push(`brightness(${s.brightness}%)`);
  if (s.contrast !== 100) parts.push(`contrast(${s.contrast}%)`);
  if (s.grayscale !== 0) parts.push(`grayscale(${s.grayscale}%)`);
  if (s.hueRotate !== 0) parts.push(`hue-rotate(${s.hueRotate}deg)`);
  if (s.opacity !== 100) parts.push(`opacity(${s.opacity}%)`);
  if (s.saturate !== 100) parts.push(`saturate(${s.saturate}%)`);
  if (s.sepia !== 0) parts.push(`sepia(${s.sepia}%)`);
  return parts.length ? parts.join(' ') : 'none';
}

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Filter() {
  const [s, setS] = useState({ ...defaults });
  const [copied, setCopied] = useState(false);

  const update = (key: keyof typeof defaults, val: number) => setS(prev => ({ ...prev, [key]: val }));
  const filterVal = buildFilter(s);
  const css = `.element {\n  filter: ${filterVal};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sliders = [
    { label: 'Blur', key: 'blur' as const, min: 0, max: 20, unit: 'px' },
    { label: 'Brightness', key: 'brightness' as const, min: 0, max: 200, unit: '%' },
    { label: 'Contrast', key: 'contrast' as const, min: 0, max: 200, unit: '%' },
    { label: 'Grayscale', key: 'grayscale' as const, min: 0, max: 100, unit: '%' },
    { label: 'Hue Rotate', key: 'hueRotate' as const, min: 0, max: 360, unit: 'deg' },
    { label: 'Opacity', key: 'opacity' as const, min: 0, max: 100, unit: '%' },
    { label: 'Saturate', key: 'saturate' as const, min: 0, max: 200, unit: '%' },
    { label: 'Sepia', key: 'sepia' as const, min: 0, max: 100, unit: '%' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 24 }}>
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => setS({ blur: p.blur, brightness: p.brightness, contrast: p.contrast, grayscale: p.grayscale, hueRotate: p.hueRotate, opacity: p.opacity, saturate: p.saturate, sepia: p.sepia })}
            style={{ padding: '10px 8px', border: '1px solid #232330', borderRadius: 10, background: '#13131a', cursor: 'pointer', color: '#e6e6ee', font: '600 11px/1 Inter' }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: 'conic-gradient(from 90deg,#f472b6,#facc15,#22d3ee,#6366f1,#f472b6)', filter: buildFilter({ blur: p.blur, brightness: p.brightness, contrast: p.contrast, grayscale: p.grayscale, hueRotate: p.hueRotate, opacity: p.opacity, saturate: p.saturate, sepia: p.sepia }) }} />
            </div>
            {p.name}
          </button>
        ))}
      </div>

      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ font: '600 14px/1 Inter', color: '#e6e6ee' }}>Filters</span>
            <button onClick={() => setS({ ...defaults })} style={{ font: '500 12px/1 Inter', color: '#6b6b7b', background: 'none', border: 'none', cursor: 'pointer' }}>Reset</button>
          </div>
          {sliders.map(ctrl => (
            <div key={ctrl.key} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{s[ctrl.key]}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={s[ctrl.key]}
                onChange={e => update(ctrl.key, Number(e.target.value))}
                style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <div style={{ width: 200, height: 200, borderRadius: 16, background: 'conic-gradient(from 90deg,#f472b6,#facc15,#22d3ee,#6366f1,#f472b6)', filter: filterVal }} />
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
