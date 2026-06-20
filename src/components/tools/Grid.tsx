import { useState } from 'react';

const COLORS = ['#6366f1', '#22d3ee', '#f472b6', '#facc15', '#4ade80', '#fb923c', '#a78bfa', '#38bdf8', '#34d399', '#f87171', '#fbbf24', '#818cf8'];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Grid() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [colTemplate, setColTemplate] = useState('1fr 1fr 1fr');
  const [copied, setCopied] = useState(false);
  const [customTemplate, setCustomTemplate] = useState(false);

  const template = customTemplate ? colTemplate : Array(cols).fill('1fr').join(' ');
  const css = `.grid {\n  display: grid;\n  grid-template-columns: ${template};\n  grid-template-rows: repeat(${rows}, auto);\n  column-gap: ${colGap}px;\n  row-gap: ${rowGap}px;\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCols = (n: number) => {
    setCols(n);
    setColTemplate(Array(n).fill('1fr').join(' '));
    setCustomTemplate(false);
  };

  const totalCells = cols * rows;

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          {[
            { label: 'Columns', val: cols, set: handleCols, min: 1, max: 12, unit: '' },
            { label: 'Rows', val: rows, set: setRows, min: 1, max: 8, unit: '' },
            { label: 'Column gap', val: colGap, set: setColGap, min: 0, max: 64, unit: 'px' },
            { label: 'Row gap', val: rowGap, set: setRowGap, min: 0, max: 64, unit: 'px' },
          ].map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>grid-template-columns</label>
            <input value={customTemplate ? colTemplate : Array(cols).fill('1fr').join(' ')}
              onChange={e => { setColTemplate(e.target.value); setCustomTemplate(true); }}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #2e2e3e', borderRadius: 8, background: '#0f0f13', color: '#e6e6ee', font: '400 13px/1 JetBrains Mono,monospace', outline: 'none' }} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: template, gridTemplateRows: `repeat(${rows}, auto)`, columnGap: colGap, rowGap: rowGap }}>
              {Array.from({ length: totalCells }, (_, i) => (
                <div key={i} style={{ height: 40, borderRadius: 6, background: COLORS[i % COLORS.length], opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 11px/1 JetBrains Mono,monospace', color: '#fff' }}>
                  {i + 1}
                </div>
              ))}
            </div>
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
