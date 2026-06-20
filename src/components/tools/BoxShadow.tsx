import { useState } from 'react';

interface Layer {
  id: number;
  h: number;
  v: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const PRESETS: Layer[][] = [
  [{ id: 1, h: 0, v: 1, blur: 3, spread: 0, color: '#000000', opacity: 30, inset: false }],
  [{ id: 1, h: 0, v: 10, blur: 24, spread: -4, color: '#000000', opacity: 55, inset: false }],
  [{ id: 1, h: 0, v: 14, blur: 30, spread: -6, color: '#6366f1', opacity: 60, inset: false }],
  [{ id: 1, h: 8, v: 8, blur: 0, spread: 0, color: '#6366f1', opacity: 100, inset: false }],
  [{ id: 1, h: 4, v: 4, blur: 12, spread: 0, color: '#000000', opacity: 70, inset: true }],
  [{ id: 1, h: 0, v: 0, blur: 0, spread: 3, color: '#6366f1', opacity: 40, inset: false }, { id: 2, h: 0, v: 8, blur: 20, spread: 0, color: '#22d3ee', opacity: 40, inset: false }],
];
const PRESET_NAMES = ['Soft', 'Lifted', 'Glow Indigo', 'Retro Hard', 'Inner', 'Glow Cyan'];

let nextId = 10;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return alpha < 100 ? `rgba(${r},${g},${b},${(alpha / 100).toFixed(2)})` : hex;
}

function buildBoxShadow(layers: Layer[]) {
  return layers.map(l => {
    const c = hexToRgba(l.color, l.opacity);
    return `${l.inset ? 'inset ' : ''}${l.h}px ${l.v}px ${l.blur}px ${l.spread}px ${c}`;
  }).join(',\n           ');
}

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function BoxShadow() {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, h: 12, v: 18, blur: 40, spread: -6, color: '#6366f1', opacity: 55, inset: false }
  ]);
  const [copied, setCopied] = useState(false);

  const updateLayer = (id: number, key: keyof Layer, val: number | boolean | string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, [key]: val } : l));
  };

  const addLayer = () => {
    setLayers(prev => [...prev, { id: ++nextId, h: 0, v: 4, blur: 12, spread: 0, color: '#000000', opacity: 30, inset: false }]);
  };

  const removeLayer = (id: number) => {
    setLayers(prev => prev.filter(l => l.id !== id));
  };

  const smoothShadow = () => {
    setLayers([
      { id: ++nextId, h: 0, v: 1, blur: 1, spread: 0, color: '#000000', opacity: 7, inset: false },
      { id: ++nextId, h: 0, v: 2, blur: 4, spread: -1, color: '#000000', opacity: 10, inset: false },
      { id: ++nextId, h: 0, v: 6, blur: 10, spread: -2, color: '#000000', opacity: 14, inset: false },
      { id: ++nextId, h: 0, v: 14, blur: 24, spread: -4, color: '#000000', opacity: 18, inset: false },
      { id: ++nextId, h: 0, v: 28, blur: 48, spread: -8, color: '#000000', opacity: 22, inset: false },
    ]);
  };

  const shadowVal = buildBoxShadow(layers);
  const css = `.box {\n  box-shadow:\n    ${shadowVal};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 24 }}>
        {PRESETS.map((p, i) => (
          <button key={PRESET_NAMES[i]} onClick={() => setLayers(p.map((l, j) => ({ ...l, id: j + 1 })))}
            style={{ padding: '10px 8px', border: '1px solid #232330', borderRadius: 10, background: '#13131a', cursor: 'pointer', color: '#e6e6ee', font: '600 11px/1 Inter' }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e6e6ee', boxShadow: buildBoxShadow(p) }} />
            </div>
            {PRESET_NAMES[i]}
          </button>
        ))}
      </div>

      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 380, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ font: '600 14px/1 Inter', color: '#e6e6ee' }}>Shadow layers</span>
            <button onClick={() => setLayers([{ id: 1, h: 12, v: 18, blur: 40, spread: -6, color: '#6366f1', opacity: 55, inset: false }])} style={{ font: '500 12px/1 Inter', color: '#6b6b7b', background: 'none', border: 'none', cursor: 'pointer' }}>Reset</button>
          </div>

          {layers.map((layer, idx) => (
            <div key={layer.id} style={{ border: '1px solid #2e2e3e', borderRadius: 11, background: '#191921', padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ font: '600 13px/1 Inter', color: '#e6e6ee' }}>Layer {idx + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ font: '500 11.5px/1 Inter', color: '#8a8a9a' }}>inset</span>
                  <div onClick={() => updateLayer(layer.id, 'inset', !layer.inset)}
                    style={{ width: 34, height: 19, borderRadius: 100, background: layer.inset ? '#6366f1' : '#2a2a38', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: 2, left: layer.inset ? 17 : 2, width: 15, height: 15, borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
                  </div>
                  {layers.length > 1 && (
                    <button onClick={() => removeLayer(layer.id)} style={{ font: '500 11px/1 Inter', color: '#6b6b7b', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                  )}
                </div>
              </div>
              {[
                { label: 'Horizontal offset', key: 'h' as const, min: -50, max: 50, unit: 'px' },
                { label: 'Vertical offset', key: 'v' as const, min: -50, max: 50, unit: 'px' },
                { label: 'Blur radius', key: 'blur' as const, min: 0, max: 100, unit: 'px' },
                { label: 'Spread radius', key: 'spread' as const, min: -50, max: 50, unit: 'px' },
              ].map(ctrl => (
                <div key={ctrl.key} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ font: '500 12px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                    <span style={{ font: '500 11.5px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{layer[ctrl.key] as number}{ctrl.unit}</span>
                  </div>
                  <input type="range" min={ctrl.min} max={ctrl.max} value={layer[ctrl.key] as number}
                    onChange={e => updateLayer(layer.id, ctrl.key, Number(e.target.value))}
                    style={{ accentColor: '#6366f1' } as React.CSSProperties} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ font: '500 12px/1 Inter', color: '#9b9bab' }}>Opacity</span>
                  <span style={{ font: '500 11.5px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{layer.opacity}%</span>
                </div>
                <input type="range" min={0} max={100} value={layer.opacity}
                  onChange={e => updateLayer(layer.id, 'opacity', Number(e.target.value))}
                  style={{ accentColor: '#6366f1' } as React.CSSProperties} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="color" value={layer.color} onChange={e => updateLayer(layer.id, 'color', e.target.value)}
                  style={{ width: 30, height: 28, border: '1px solid #2e2e3e', borderRadius: 6, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{layer.color}</span>
              </div>
            </div>
          ))}

          <button onClick={addLayer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, border: '1px dashed #2e2e3e', borderRadius: 10, background: 'none', color: '#9b9bab', cursor: 'pointer', width: '100%', marginBottom: 16, font: '500 13px/1 Inter' }}>
            <span style={{ font: '600 16px/1 Inter', color: '#6366f1' }}>+</span> Add shadow layer
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, border: '1px solid #2a2a38', borderRadius: 11, background: 'linear-gradient(135deg,rgba(99,102,241,.1),rgba(34,211,238,.05))' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                <span style={{ font: '600 13px/1 Inter', color: '#e6e6ee' }}>Smooth shadow</span>
                <span style={{ font: '600 9px/1 JetBrains Mono,monospace', color: '#22d3ee', border: '1px solid #134e4a', padding: '2px 5px', borderRadius: 4 }}>PRO TIP</span>
              </div>
              <span style={{ font: '400 11.5px/1.4 Inter', color: '#8a8a9a' }}>Auto-stacks 5 layers for a natural falloff</span>
            </div>
            <button onClick={smoothShadow} style={{ padding: '6px 12px', borderRadius: 7, background: '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 11px/1 Inter', flex: 'none' }}>Apply</button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{
            height: 280, border: '1px solid #232330', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'linear-gradient(45deg,#1c1c26 25%,transparent 25%),linear-gradient(-45deg,#1c1c26 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1c1c26 75%),linear-gradient(-45deg,transparent 75%,#1c1c26 75%)',
            backgroundSize: '22px 22px', backgroundPosition: '0 0,0 11px,11px -11px,-11px 0', backgroundColor: '#13131a'
          }}>
            <div style={{ width: 160, height: 160, borderRadius: 14, background: '#f4f4f8', boxShadow: shadowVal }} />
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
