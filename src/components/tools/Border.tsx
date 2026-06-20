import { useState } from 'react';

type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none';

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Border() {
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('solid');
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#6366f1');
  const [radiusTL, setRadiusTL] = useState(8);
  const [radiusTR, setRadiusTR] = useState(8);
  const [radiusBR, setRadiusBR] = useState(8);
  const [radiusBL, setRadiusBL] = useState(8);
  const [allCorners, setAllCorners] = useState(true);
  const [copied, setCopied] = useState(false);

  const setAllRadius = (v: number) => { setRadiusTL(v); setRadiusTR(v); setRadiusBR(v); setRadiusBL(v); };

  const radiusVal = allCorners
    ? `${radiusTL}px`
    : `${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px`;

  const css = `.element {\n  border: ${borderWidth}px ${borderStyle} ${borderColor};\n  border-radius: ${radiusVal};\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles: BorderStyle[] = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>Border style</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
              {styles.map(s => (
                <button key={s} onClick={() => setBorderStyle(s)}
                  style={{ padding: '7px 4px', border: borderStyle === s ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 7, background: borderStyle === s ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: borderStyle === s ? '#a5b4fc' : '#6b6b7b', font: '500 10px/1 JetBrains Mono,monospace' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Border width</span>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{borderWidth}px</span>
            </div>
            <input type="range" min={1} max={20} value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Border color</span>
            <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} style={{ width: 36, height: 30, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            <span style={{ font: '500 11px/1 JetBrains Mono,monospace', color: '#9ece6a' }}>{borderColor}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Border radius</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ font: '400 11.5px/1 Inter', color: '#6b6b7b' }}>All corners</span>
              <div onClick={() => setAllCorners(!allCorners)} style={{ width: 34, height: 19, borderRadius: 100, background: allCorners ? '#6366f1' : '#2a2a38', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: 2, left: allCorners ? 17 : 2, width: 15, height: 15, borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
              </div>
            </div>
          </div>
          {allCorners ? (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>All corners</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{radiusTL}px</span>
              </div>
              <input type="range" min={0} max={100} value={radiusTL} onChange={e => setAllRadius(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ) : (
            [
              { label: 'Top left', val: radiusTL, set: setRadiusTL },
              { label: 'Top right', val: radiusTR, set: setRadiusTR },
              { label: 'Bottom right', val: radiusBR, set: setRadiusBR },
              { label: 'Bottom left', val: radiusBL, set: setRadiusBL },
            ].map(ctrl => (
              <div key={ctrl.label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ font: '500 12px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                  <span style={{ font: '500 11.5px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}px</span>
                </div>
                <input type="range" min={0} max={100} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
              </div>
            ))
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <div style={{ width: 160, height: 120, border: `${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius: radiusVal }} />
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
