import { useState } from 'react';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const COLORS = ['#6366f1', '#22d3ee', '#f472b6', '#facc15', '#4ade80', '#fb923c', '#a78bfa', '#38bdf8'];

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function Flexbox() {
  const [direction, setDirection] = useState<Direction>('row');
  const [justify, setJustify] = useState<Justify>('center');
  const [align, setAlign] = useState<Align>('stretch');
  const [wrap, setWrap] = useState<Wrap>('nowrap');
  const [gap, setGap] = useState(16);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState(false);

  const css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dirOptions = [
    { val: 'row' as Direction, label: '→', title: 'row' },
    { val: 'column' as Direction, label: '↓', title: 'column' },
    { val: 'row-reverse' as Direction, label: '←', title: 'row-reverse' },
    { val: 'column-reverse' as Direction, label: '↑', title: 'column-reverse' },
  ];

  const justifyOptions: Justify[] = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
  const alignOptions: Align[] = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'];

  const OptionBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} style={{ padding: '8px 6px', border: active ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: active ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: active ? '#a5b4fc' : '#6b6b7b', font: '500 10px/1 JetBrains Mono,monospace', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
      {children}
    </button>
  );

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 380, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>flex-direction</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {dirOptions.map(d => (
                <OptionBtn key={d.val} active={direction === d.val} onClick={() => setDirection(d.val)}>
                  <span style={{ fontSize: 18 }}>{d.label}</span>
                  <span>{d.title}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>justify-content</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              {justifyOptions.map(j => (
                <OptionBtn key={j} active={justify === j} onClick={() => setJustify(j)}>
                  <div style={{ display: 'flex', gap: 2, width: '100%', justifyContent: j }}>
                    {[1, 2, 3].map(i => <span key={i} style={{ width: 4, height: 12, background: justify === j ? '#a5b4fc' : '#6b6b7b', borderRadius: 1 }} />)}
                  </div>
                  <span>{j.replace('flex-', '').replace('space-', 'sp-')}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>align-items</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
              {alignOptions.map(a => (
                <OptionBtn key={a} active={align === a} onClick={() => setAlign(a)}>
                  <div style={{ height: 32, display: 'flex', alignItems: a === 'stretch' ? 'stretch' : a, justifyContent: 'center', gap: 2, padding: '3px 0' }}>
                    {a === 'stretch' ? (
                      <><span style={{ width: 4, background: '#a5b4fc', borderRadius: 1 }} /><span style={{ width: 4, background: '#a5b4fc', borderRadius: 1 }} /></>
                    ) : (
                      <><span style={{ width: 4, height: 10, background: '#6b6b7b', borderRadius: 1 }} /><span style={{ width: 4, height: 16, background: '#6b6b7b', borderRadius: 1 }} /></>
                    )}
                  </div>
                  <span>{a.replace('flex-', '')}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>flex-wrap</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['nowrap', 'wrap', 'wrap-reverse'] as Wrap[]).map(w => (
                <button key={w} onClick={() => setWrap(w)}
                  style={{ flex: 1, padding: '8px 4px', border: wrap === w ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: wrap === w ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: wrap === w ? '#a5b4fc' : '#6b6b7b', font: '500 10.5px/1 JetBrains Mono,monospace' }}>{w}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>gap</span>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{gap}px · {(gap / 16).toFixed(gap % 16 === 0 ? 0 : 3).replace(/\.?0+$/, '')}rem</span>
            </div>
            <input type="range" min={0} max={64} value={gap} onChange={e => setGap(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>Demo items</span>
              <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{count}</span>
            </div>
            <input type="range" min={2} max={8} value={count} onChange={e => setCount(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 280, border: '1px solid #232330', borderRadius: 14, background: '#13131a', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: align, flexWrap: wrap, gap }}>
              {Array.from({ length: count }, (_, i) => (
                <div key={i} style={{ width: direction.includes('column') ? '100%' : 60, height: direction.includes('column') ? 40 : 80, borderRadius: 9, background: `linear-gradient(160deg,${COLORS[i % COLORS.length]},${COLORS[(i + 2) % COLORS.length]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 16px/1 JetBrains Mono,monospace', color: '#fff', opacity: 1 - i * 0.1, flexShrink: 0 }}>
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
