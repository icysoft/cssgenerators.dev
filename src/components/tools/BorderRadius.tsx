import { useState } from 'react';

type Unit = 'px' | '%';
type Corner = 'tl' | 'tr' | 'br' | 'bl';

const CORNERS: { key: Corner; label: string }[] = [
  { key: 'tl', label: 'Top left' },
  { key: 'tr', label: 'Top right' },
  { key: 'br', label: 'Bottom right' },
  { key: 'bl', label: 'Bottom left' },
];

type Radii = Record<Corner, number>;

const PRESETS: { name: string; unit: Unit; h: Radii; v: Radii | null }[] = [
  { name: 'Rounded', unit: 'px', h: { tl: 12, tr: 12, br: 12, bl: 12 }, v: null },
  { name: 'Pill', unit: 'px', h: { tl: 999, tr: 999, br: 999, bl: 999 }, v: null },
  { name: 'Circle', unit: '%', h: { tl: 50, tr: 50, br: 50, bl: 50 }, v: null },
  { name: 'Leaf', unit: 'px', h: { tl: 48, tr: 0, br: 48, bl: 0 }, v: null },
  { name: 'Squircle', unit: '%', h: { tl: 30, tr: 30, br: 30, bl: 30 }, v: null },
  { name: 'Blob', unit: '%', h: { tl: 60, tr: 40, br: 30, bl: 70 }, v: { tl: 40, tr: 60, br: 70, bl: 30 } },
];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

const label = { font: '500 12.5px/1 Inter', color: '#9b9bab' } as React.CSSProperties;
const mono = { font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' } as React.CSSProperties;

export default function BorderRadius() {
  const [unit, setUnit] = useState<Unit>('px');
  const [linked, setLinked] = useState(true);
  const [elliptical, setElliptical] = useState(false);
  const [h, setH] = useState<Radii>({ tl: 12, tr: 12, br: 12, bl: 12 });
  const [v, setV] = useState<Radii>({ tl: 12, tr: 12, br: 12, bl: 12 });
  const [copied, setCopied] = useState(false);

  const max = unit === '%' ? 100 : 200;

  const setAxis = (axis: 'h' | 'v', corner: Corner, value: number) => {
    const apply = (prev: Radii): Radii =>
      linked ? { tl: value, tr: value, br: value, bl: value } : { ...prev, [corner]: value };
    if (axis === 'h') setH(apply); else setV(apply);
  };

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setUnit(p.unit);
    setH(p.h);
    setV(p.v ?? p.h);
    setElliptical(p.v !== null);
    setLinked(new Set(Object.values(p.h)).size === 1 && p.v === null);
  };

  // A pill uses a radius larger than half the box, which the browser clamps —
  // px values are emitted as-is so the copied CSS matches the preview exactly.
  const fmt = (r: Radii) => `${r.tl}${unit} ${r.tr}${unit} ${r.br}${unit} ${r.bl}${unit}`;
  const uniform = new Set(Object.values(h)).size === 1;

  const radius = elliptical
    ? `${fmt(h)} / ${fmt(v)}`
    : uniform
      ? `${h.tl}${unit}`
      : fmt(h);

  const css = `.element {\n  border-radius: ${radius};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slider = (axis: 'h' | 'v', corner: Corner, text: string) => {
    const val = (axis === 'h' ? h : v)[corner];
    return (
      <div key={`${axis}-${corner}`} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={label}>{text}</span>
          <span style={mono}>{val}{unit}</span>
        </div>
        <input type="range" min={0} max={max} value={Math.min(val, max)}
          onChange={e => setAxis(axis, corner, Number(e.target.value))}
          style={{ accentColor: '#6366f1' } as React.CSSProperties} />
      </div>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>

          <div style={{ marginBottom: 18 }}>
            <div style={{ ...label, marginBottom: 9 }}>Presets</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p)}
                  style={{ padding: '7px 4px', border: '1px solid #2e2e3e', borderRadius: 7, background: '#191921', cursor: 'pointer', color: '#9b9bab', font: '500 10.5px/1 Inter' }}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={label}>Unit</span>
            {(['px', '%'] as Unit[]).map(u => (
              <button key={u} onClick={() => setUnit(u)}
                style={{ padding: '5px 12px', border: unit === u ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 7, background: unit === u ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: unit === u ? '#a5b4fc' : '#6b6b7b', font: '500 11px/1 JetBrains Mono,monospace' }}>
                {u}
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} style={{ accentColor: '#6366f1' }} />
            <span style={label}>Link all corners</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18, cursor: 'pointer' }}>
            <input type="checkbox" checked={elliptical} onChange={e => setElliptical(e.target.checked)} style={{ accentColor: '#6366f1' }} />
            <span style={label}>Elliptical corners</span>
          </label>

          {elliptical && <div style={{ ...label, color: '#6b6b7b', marginBottom: 10 }}>Horizontal radii</div>}
          {CORNERS.map(c => slider('h', c.key, c.label))}

          {elliptical && (
            <>
              <div style={{ ...label, color: '#6b6b7b', margin: '18px 0 10px' }}>Vertical radii</div>
              {CORNERS.map(c => slider('v', c.key, c.label))}
            </>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#6366f1,#22d3ee)', borderRadius: radius }} />
          </div>

          <div style={{ marginTop: 16, border: '1px solid #232330', borderRadius: 14, background: '#14141b', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #232330' }}>
              <span style={{ font: '600 12.5px/1 Inter', color: '#9b9bab' }}>CSS</span>
              <button onClick={copy} style={copyBtn(copied)}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <pre style={{ margin: 0, padding: '16px', font: '400 13px/1.7 JetBrains Mono,monospace', color: '#a5b4fc', overflowX: 'auto' }}>{css}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
