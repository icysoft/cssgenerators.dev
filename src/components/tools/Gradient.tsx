import { useState } from 'react';

type GradType = 'linear' | 'radial' | 'conic';

interface Stop {
  id: number;
  color: string;
  pos: number;
}

let stopId = 3;

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Gradient() {
  const [type, setType] = useState<GradType>('linear');
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<Stop[]>([
    { id: 1, color: '#6366f1', pos: 0 },
    { id: 2, color: '#22d3ee', pos: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const stopsStr = stops.map(s => `${s.color} ${s.pos}%`).join(', ');

  const gradValue = type === 'linear'
    ? `linear-gradient(${angle}deg, ${stopsStr})`
    : type === 'radial'
    ? `radial-gradient(circle, ${stopsStr})`
    : `conic-gradient(from ${angle}deg, ${stopsStr})`;

  const css = `.element {\n  background: ${gradValue};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStop = (id: number, key: 'color' | 'pos', val: string | number) =>
    setStops(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s));

  const addStop = () => {
    const mid = Math.round((stops[stops.length - 2]?.pos ?? 0 + stops[stops.length - 1]?.pos ?? 100) / 2);
    setStops(prev => [...prev, { id: ++stopId, color: '#f472b6', pos: Math.min(mid, 99) }]);
  };

  const removeStop = (id: number) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>Type</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['linear', 'radial', 'conic'] as GradType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  style={{ flex: 1, padding: '8px 4px', border: type === t ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: type === t ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: type === t ? '#a5b4fc' : '#6b6b7b', font: '500 11.5px/1 JetBrains Mono,monospace' }}>{t}</button>
              ))}
            </div>
          </div>

          {(type === 'linear' || type === 'conic') && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{type === 'conic' ? 'Start angle' : 'Angle'}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{angle}deg</span>
              </div>
              <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          )}

          <div style={{ font: '600 13px/1 Inter', color: '#e6e6ee', marginBottom: 12 }}>Color stops</div>
          {stops.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <input type="color" value={s.color} onChange={e => updateStop(s.id, 'color', e.target.value)}
                style={{ width: 30, height: 28, border: '1px solid #2e2e3e', borderRadius: 6, background: '#0f0f13', cursor: 'pointer', padding: 2, flex: 'none' }} />
              <input type="range" min={0} max={100} value={s.pos} onChange={e => updateStop(s.id, 'pos', Number(e.target.value))}
                style={{ flex: 1, accentColor: s.color } as React.CSSProperties} />
              <span style={{ font: '500 11px/1 JetBrains Mono,monospace', color: '#e6e6ee', width: 32, textAlign: 'right', flex: 'none' }}>{s.pos}%</span>
              {stops.length > 2 && (
                <button onClick={() => removeStop(s.id)} style={{ font: '500 11px/1 Inter', color: '#6b6b7b', background: 'none', border: 'none', cursor: 'pointer', flex: 'none' }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={addStop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, border: '1px dashed #2e2e3e', borderRadius: 8, background: 'none', color: '#9b9bab', cursor: 'pointer', width: '100%', marginTop: 8, font: '500 12px/1 Inter' }}>
            <span style={{ color: '#6366f1', fontSize: 16 }}>+</span> Add color stop
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', minHeight: 240, background: gradValue }} />
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
