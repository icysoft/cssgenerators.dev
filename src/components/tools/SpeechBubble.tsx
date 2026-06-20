import { useState } from 'react';

type TailPos = 'bottom' | 'top' | 'left' | 'right';

const copyBtn = (copied: boolean) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: copied ? '#16a34a' : '#6366f1', border: 'none', cursor: 'pointer', color: '#fff', font: '600 12px/1 Inter' } as React.CSSProperties);

export default function SpeechBubble() {
  const [text, setText] = useState('Hello! 👋');
  const [bgColor, setBgColor] = useState('#6366f1');
  const [textColor, setTextColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(12);
  const [tailPos, setTailPos] = useState<TailPos>('bottom');
  const [tailOffset, setTailOffset] = useState(20);
  const [tailSize, setTailSize] = useState(10);
  const [copied, setCopied] = useState(false);

  const getTailStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = { content: '""', position: 'absolute', width: 0, height: 0 };
    switch (tailPos) {
      case 'bottom':
        return { ...base, bottom: -tailSize, left: `${tailOffset}%`, borderLeft: `${tailSize}px solid transparent`, borderRight: `${tailSize}px solid transparent`, borderTop: `${tailSize}px solid ${bgColor}` };
      case 'top':
        return { ...base, top: -tailSize, left: `${tailOffset}%`, borderLeft: `${tailSize}px solid transparent`, borderRight: `${tailSize}px solid transparent`, borderBottom: `${tailSize}px solid ${bgColor}` };
      case 'left':
        return { ...base, left: -tailSize, top: `${tailOffset}%`, borderTop: `${tailSize}px solid transparent`, borderBottom: `${tailSize}px solid transparent`, borderRight: `${tailSize}px solid ${bgColor}` };
      case 'right':
        return { ...base, right: -tailSize, top: `${tailOffset}%`, borderTop: `${tailSize}px solid transparent`, borderBottom: `${tailSize}px solid transparent`, borderLeft: `${tailSize}px solid ${bgColor}` };
    }
  };

  const getTailCSS = () => {
    switch (tailPos) {
      case 'bottom': return `  bottom: -${tailSize}px;\n  left: ${tailOffset}%;\n  border-left: ${tailSize}px solid transparent;\n  border-right: ${tailSize}px solid transparent;\n  border-top: ${tailSize}px solid ${bgColor};`;
      case 'top': return `  top: -${tailSize}px;\n  left: ${tailOffset}%;\n  border-left: ${tailSize}px solid transparent;\n  border-right: ${tailSize}px solid transparent;\n  border-bottom: ${tailSize}px solid ${bgColor};`;
      case 'left': return `  left: -${tailSize}px;\n  top: ${tailOffset}%;\n  border-top: ${tailSize}px solid transparent;\n  border-bottom: ${tailSize}px solid transparent;\n  border-right: ${tailSize}px solid ${bgColor};`;
      case 'right': return `  right: -${tailSize}px;\n  top: ${tailOffset}%;\n  border-top: ${tailSize}px solid transparent;\n  border-bottom: ${tailSize}px solid transparent;\n  border-left: ${tailSize}px solid ${bgColor};`;
    }
  };

  const css = `.bubble {\n  position: relative;\n  background: ${bgColor};\n  color: ${textColor};\n  border-radius: ${borderRadius}px;\n  padding: 14px 20px;\n  display: inline-block;\n}\n.bubble::after {\n  content: "";\n  position: absolute;\n  width: 0;\n  height: 0;\n${getTailCSS()}\n}`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tailStyle = getTailStyle();

  return (
    <div style={{ width: '100%' }}>
      <div className="tool-cols" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div className="tool-controls" style={{ flex: 'none', width: 340, border: '1px solid #232330', borderRadius: 14, background: '#14141b', padding: 22 }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Text</label>
            <input value={text} onChange={e => setText(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #2e2e3e', borderRadius: 8, background: '#0f0f13', color: '#e6e6ee', font: '400 14px/1 Inter', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', marginBottom: 9 }}>Tail position</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {(['bottom', 'top', 'left', 'right'] as TailPos[]).map(p => (
                <button key={p} onClick={() => setTailPos(p)}
                  style={{ padding: '8px 4px', border: tailPos === p ? '1.5px solid #6366f1' : '1px solid #2e2e3e', borderRadius: 8, background: tailPos === p ? 'rgba(99,102,241,.14)' : '#191921', cursor: 'pointer', color: tailPos === p ? '#a5b4fc' : '#6b6b7b', font: '500 11px/1 JetBrains Mono,monospace' }}>{p}</button>
              ))}
            </div>
          </div>
          {[
            { label: 'Tail offset', val: tailOffset, set: setTailOffset, min: 5, max: 90, unit: '%' },
            { label: 'Tail size', val: tailSize, set: setTailSize, min: 5, max: 30, unit: 'px' },
            { label: 'Border radius', val: borderRadius, set: setBorderRadius, min: 0, max: 50, unit: 'px' },
          ].map(ctrl => (
            <div key={ctrl.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: '500 12.5px/1 Inter', color: '#9b9bab' }}>{ctrl.label}</span>
                <span style={{ font: '500 12px/1 JetBrains Mono,monospace', color: '#e6e6ee' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} style={{ accentColor: '#6366f1' } as React.CSSProperties} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Background</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: '100%', height: 36, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            </div>
            <div>
              <label style={{ font: '500 12.5px/1 Inter', color: '#9b9bab', display: 'block', marginBottom: 8 }}>Text color</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ width: '100%', height: 36, border: '1px solid #2e2e3e', borderRadius: 7, background: '#0f0f13', cursor: 'pointer', padding: 2 }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ minHeight: 240, border: '1px solid #232330', borderRadius: 14, background: '#13131a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
            <div style={{ position: 'relative', background: bgColor, color: textColor, borderRadius, padding: '14px 20px', font: '500 15px/1.4 Inter', display: 'inline-block' }}>
              {text || 'Hello!'}
              <div style={{ position: 'absolute', width: 0, height: 0, ...tailStyle }} />
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
