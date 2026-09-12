import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Navigation, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface JourneySearchPanelProps {
  onSearch: (origin: string, destination: string) => void;
  appState: string;
}

const CITIES = [
  { id: 'lahore', name: 'Lahore', country: 'Pakistan' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'paris', name: 'Paris', country: 'France' },
  { id: 'newyork', name: 'New York', country: 'USA' },
  { id: 'dubai', name: 'Dubai', country: 'UAE' },
  { id: 'switzerland', name: 'Zurich', country: 'Switzerland' },
  { id: 'london', name: 'London', country: 'UK' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand' },
];

const TRAVELER_OPTIONS = [
  '1 Adult', '2 Adults', '3 Adults', '4 Adults',
  '2 Adults, 1 Child', '2 Adults, 2 Children',
];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// ─── Tiny Calendar Component ───────────────────────────────────────────────
function MiniCalendar({ value, onChange, onClose }: {
  value: Date;
  onChange: (d: Date) => void;
  onClose: () => void;
}) {
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());

  const today = new Date();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (d: number) =>
    value.getFullYear() === viewYear &&
    value.getMonth() === viewMonth &&
    value.getDate() === d;

  const isToday = (d: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === d;

  const isPast = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d);
    dt.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      style={{
        width: '240px',
        background: 'linear-gradient(180deg, rgba(20,18,30,0.97) 0%, rgba(10,9,18,0.99) 100%)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderTop: '1px solid rgba(255,255,255,0.16)',
        borderRadius: '14px',
        padding: '14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button onClick={prevMonth} style={calBtnStyle}><ChevronLeft size={13} /></button>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.04em' }}>
          {MONTHS[viewMonth].slice(0,3)} {viewYear}
        </span>
        <button onClick={nextMonth} style={calBtnStyle}><ChevronRight size={13} /></button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '6px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign:'center', fontSize:'0.60rem', color:'rgba(255,255,255,0.28)', fontWeight:500, padding:'2px 0' }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const past = isPast(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return (
            <button
              key={i}
              onClick={() => { if (!past) { onChange(new Date(viewYear, viewMonth, d)); onClose(); } }}
              style={{
                width: '30px', height: '28px',
                borderRadius: '7px',
                border: 'none',
                cursor: past ? 'not-allowed' : 'pointer',
                fontSize: '0.72rem',
                fontWeight: sel ? 700 : tod ? 600 : 400,
                background: sel
                  ? 'rgba(255,255,255,0.90)'
                  : tod
                  ? 'rgba(255,255,255,0.10)'
                  : 'transparent',
                color: sel
                  ? 'rgba(10,9,18,1)'
                  : past
                  ? 'rgba(255,255,255,0.18)'
                  : 'rgba(255,255,255,0.82)',
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={(e) => {
                if (!past && !sel) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                if (!sel) (e.currentTarget as HTMLButtonElement).style.background = tod ? 'rgba(255,255,255,0.10)' : 'transparent';
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
const calBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '7px', width: '26px', height: '26px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(255,255,255,0.65)',
};

// ─── Generic Dropdown Component ────────────────────────────────────────────
function FieldDropdown({ options, onSelect, onClose }: {
  options: string[];
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <div style={{
      minWidth: '180px',
      background: 'linear-gradient(180deg, rgba(20,18,30,0.97) 0%, rgba(10,9,18,0.99) 100%)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderTop: '1px solid rgba(255,255,255,0.16)',
      borderRadius: '14px',
      padding: '6px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.65)',
      maxHeight: '220px',
      overflowY: 'auto',
    }}>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => { onSelect(opt); onClose(); }}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '9px 12px', border: 'none', background: 'transparent',
            color: 'rgba(255,255,255,0.82)', fontSize: '0.85rem', cursor: 'pointer',
            borderRadius: '8px', transition: 'background 0.12s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── City Dropdown Component ────────────────────────────────────────────────
function CityDropdown({ onSelect, onClose, excludeId }: {
  onSelect: (name: string) => void;
  onClose: () => void;
  excludeId?: string;
}) {
  const [q, setQ] = useState('');
  const filtered = CITIES.filter(c =>
    c.id !== excludeId &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.country.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div style={{
      width: '220px',
      background: 'linear-gradient(180deg, rgba(20,18,30,0.97) 0%, rgba(10,9,18,0.99) 100%)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderTop: '1px solid rgba(255,255,255,0.16)',
      borderRadius: '14px',
      padding: '8px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.65)',
    }}>
      <input
        autoFocus
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search city..."
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '8px', padding: '7px 10px',
          color: 'rgba(255,255,255,0.88)', fontSize: '0.80rem',
          outline: 'none', marginBottom: '6px', fontFamily: 'inherit',
        }}
      />
      <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
        {filtered.map(c => (
          <button
            key={c.id}
            onClick={() => { onSelect(c.name); onClose(); }}
            style={{
              display: 'flex', width: '100%', textAlign: 'left',
              padding: '8px 10px', border: 'none', background: 'transparent',
              borderRadius: '8px', cursor: 'pointer', gap: '8px',
              alignItems: 'center', transition: 'background 0.12s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <MapPin size={12} color="rgba(255,255,255,0.35)" />
            <div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)' }}>{c.country}</div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '10px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
            No results
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Floating Dropdown Wrapper ─────────────────────────────────────────────
function FloatingPanel({ children, onClose, align = 'left' }: {
  children: React.ReactNode;
  onClose: () => void;
  align?: 'left' | 'center' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    // slight delay so the click that opened doesn't immediately close
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 50);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [onClose]);

  const alignStyle: React.CSSProperties =
    align === 'right' ? { right: 0 } :
    align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } :
    { left: 0 };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        ...alignStyle,
        zIndex: 200,
        animation: 'dropUp 0.18s cubic-bezier(0.2, 0.8, 0.2, 1) both',
      }}
    >
      {children}
    </div>
  );
}

// ─── Format date helper ────────────────────────────────────────────────────
function formatDate(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)} ${d.getFullYear()}`;
}

// ─── Main Panel ────────────────────────────────────────────────────────────
export function JourneySearchPanel({ onSearch, appState }: JourneySearchPanelProps) {
  const [origin, setOrigin] = useState('Lahore');
  const [destination, setDestination] = useState('Tokyo');
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30); return d;
  });
  const [travelers, setTravelers] = useState('2 Adults');

  const [openPanel, setOpenPanel] = useState<'from' | 'to' | 'date' | 'travelers' | null>(null);

  const togglePanel = useCallback((panel: typeof openPanel) => {
    setOpenPanel(p => (p === panel ? null : panel));
  }, []);
  const closePanel = useCallback(() => setOpenPanel(null), []);

  if (appState === 'INTRO' || appState === 'RESULT') return null;

  const isCalculating = appState === 'CALCULATING';

  const labelStyle: React.CSSProperties = {
    fontSize: '0.60rem', fontWeight: 500,
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    userSelect: 'none', pointerEvents: 'none',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '0.92rem', fontWeight: 500,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: '0.01em', userSelect: 'none',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  };

  const fieldBtnStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column', gap: '3px',
    padding: '10px 18px',
    flex: 1, minWidth: 0, textAlign: 'left',
    background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
    border: 'none', cursor: 'pointer',
    borderRadius: '12px', transition: 'background 0.15s ease',
    position: 'relative',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  });

  const dividerStyle: React.CSSProperties = {
    width: '1px', height: '32px',
    background: 'rgba(255,255,255,0.09)',
    flexShrink: 0, alignSelf: 'center',
  };

  const originId = CITIES.find(c => c.name === origin)?.id;
  const destId = CITIES.find(c => c.name === destination)?.id;

  return (
    <>
      <style>{`
        @keyframes dropUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          pointerEvents: 'auto',
          opacity: isCalculating ? 0 : 1,
          transition: 'opacity 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── THE SEARCH BAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            width: 'clamp(580px, 68vw, 780px)',
            height: '72px',
            borderRadius: '18px',
            position: 'relative',

            background: [
              'linear-gradient(180deg,',
              '  rgba(255,255,255,0.055) 0%,',
              '  rgba(8, 9, 16, 0.90) 100%',
              ')',
            ].join(''),
            backdropFilter: 'blur(32px) saturate(130%)',
            WebkitBackdropFilter: 'blur(32px) saturate(130%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.13)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.06)',
              '0 4px 24px rgba(0,0,0,0.55)',
              '0 20px 60px rgba(0,0,0,0.30)',
            ].join(', '),
          }}
        >
          {/* FROM */}
          <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
            <button
              style={fieldBtnStyle(openPanel === 'from')}
              onClick={() => togglePanel('from')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={10} color="rgba(255,255,255,0.36)" strokeWidth={1.5} />
                <span style={labelStyle}>From</span>
              </div>
              <span style={valueStyle}>{origin}</span>
            </button>
            {openPanel === 'from' && (
              <FloatingPanel onClose={closePanel}>
                <CityDropdown
                  excludeId={destId}
                  onSelect={setOrigin}
                  onClose={closePanel}
                />
              </FloatingPanel>
            )}
          </div>

          <div style={dividerStyle} />

          {/* TO */}
          <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
            <button
              style={fieldBtnStyle(openPanel === 'to')}
              onClick={() => togglePanel('to')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Navigation size={10} color="rgba(255,255,255,0.36)" strokeWidth={1.5} />
                <span style={labelStyle}>To</span>
              </div>
              <span style={valueStyle}>{destination}</span>
            </button>
            {openPanel === 'to' && (
              <FloatingPanel onClose={closePanel}>
                <CityDropdown
                  excludeId={originId}
                  onSelect={setDestination}
                  onClose={closePanel}
                />
              </FloatingPanel>
            )}
          </div>

          <div style={dividerStyle} />

          {/* TRAVEL DATE */}
          <div style={{ position: 'relative', flex: '0 0 auto', minWidth: '140px' }}>
            <button
              style={fieldBtnStyle(openPanel === 'date')}
              onClick={() => togglePanel('date')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={10} color="rgba(255,255,255,0.36)" strokeWidth={1.5} />
                <span style={labelStyle}>Travel Date</span>
              </div>
              <span style={valueStyle}>{formatDate(travelDate)}</span>
            </button>
            {openPanel === 'date' && (
              <FloatingPanel onClose={closePanel} align="center">
                <MiniCalendar
                  value={travelDate}
                  onChange={setTravelDate}
                  onClose={closePanel}
                />
              </FloatingPanel>
            )}
          </div>

          <div style={dividerStyle} />

          {/* TRAVELERS */}
          <div style={{ position: 'relative', flex: '0 0 auto', minWidth: '120px' }}>
            <button
              style={fieldBtnStyle(openPanel === 'travelers')}
              onClick={() => togglePanel('travelers')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={10} color="rgba(255,255,255,0.36)" strokeWidth={1.5} />
                <span style={labelStyle}>Travelers</span>
              </div>
              <span style={valueStyle}>{travelers}</span>
            </button>
            {openPanel === 'travelers' && (
              <FloatingPanel onClose={closePanel} align="right">
                <FieldDropdown
                  options={TRAVELER_OPTIONS}
                  onSelect={setTravelers}
                  onClose={closePanel}
                />
              </FloatingPanel>
            )}
          </div>

          {/* SUBMIT ARROW */}
          <div style={{ flexShrink: 0, padding: '0 10px 0 8px', alignSelf: 'center' }}>
            <button
              onClick={() => onSearch(origin, destination)}
              style={{
                width: '46px', height: '46px', borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: [
                  'linear-gradient(145deg,',
                  '  rgba(255,255,255,0.20) 0%,',
                  '  rgba(255,255,255,0.08) 100%)',
                ].join(''),
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 2px 10px rgba(0,0,0,0.35)',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.14) 100%)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'linear-gradient(145deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 100%)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              <ArrowRight size={17} color="rgba(255,255,255,0.90)" strokeWidth={2.2} />
            </button>
          </div>
        </div>
        {/* No "Scroll to Explore" — removed per request */}
      </div>
    </>
  );
}
