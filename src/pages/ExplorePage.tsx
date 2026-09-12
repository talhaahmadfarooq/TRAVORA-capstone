import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { Search } from 'lucide-react';
import { GlassInput } from '../components/ui/GlassInput';

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDestinations = mockDestinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: '#050505',
      color: '#fff',
      paddingTop: '120px',
      paddingBottom: '120px',
      overflowX: 'hidden'
    }}>
      <style>{`
        .explore-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 320px;
          gap: 24px;
          width: 100%;
        }
        .explore-card {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
        }
        .explore-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .explore-card:hover img {
          transform: scale(1.03);
        }
        .explore-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 30%);
          transition: all 0.5s ease;
        }
        .explore-card:hover .explore-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 40%);
        }
        .explore-content {
          position: absolute;
          bottom: 32px;
          left: 32px;
          right: 32px;
        }
        .explore-country {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
          display: block;
        }
        .explore-name {
          font-family: var(--font-serif, "Playfair Display", serif);
          font-size: 2.5rem;
          line-height: 1.1;
          margin: 0;
          color: #fff;
        }
        .explore-tagline {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          margin-top: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .explore-card:hover .explore-tagline {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Layout overrides based on index */
        .card-0 { grid-column: span 2; grid-row: span 2; } /* Large Tokyo */
        .card-0 .explore-name { font-size: 4rem; }
        .card-0 .explore-tagline { font-size: 1.1rem; opacity: 1; transform: none; }
        
        .card-1 { grid-column: span 2; grid-row: span 1; }
        .card-2 { grid-column: span 2; grid-row: span 1; }
        .card-3 { grid-column: span 2; grid-row: span 1; } /* Kyoto wide */
        
        .card-4 { grid-column: span 1; grid-row: span 2; } /* Lahore tall */
        .card-4 .explore-name { font-size: 3rem; }
        
        .card-5 { grid-column: span 1; grid-row: span 1; }
        .card-6 { grid-column: span 1; grid-row: span 1; }
        .card-7 { grid-column: span 2; grid-row: span 1; } /* Santorini wide */
        .card-8 { grid-column: span 1; grid-row: span 1; }
        .card-9 { grid-column: span 1; grid-row: span 1; }

        @media (max-width: 1024px) {
          .explore-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .card-0, .card-1, .card-2, .card-3, .card-4, .card-5, .card-6, .card-7, .card-8, .card-9 {
            grid-column: span 1;
            grid-row: span 1;
          }
          .card-0 { grid-column: span 2; grid-row: span 2; }
          .card-4 { grid-column: span 1; grid-row: span 2; }
        }
        @media (max-width: 768px) {
          .explore-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 400px;
          }
          .card-0, .card-1, .card-2, .card-3, .card-4, .card-5, .card-6, .card-7, .card-8, .card-9 {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
              EXPLORE
            </h1>
          </div>
          <div style={{ width: '300px' }}>
            <GlassInput 
              icon={<Search size={18} color="rgba(255,255,255,0.5)" />} 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>

        {/* Grid Section */}
        {filteredDestinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.5)' }}>
            No destinations found matching your search.
          </div>
        ) : (
          <div className="explore-grid">
            {filteredDestinations.map((dest, idx) => (
              <motion.div 
                key={dest.id}
                className={`explore-card card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => navigate(`/destination/${dest.id}`)}
              >
                <img src={dest.heroImage} alt={dest.name} />
                <div className="explore-card-overlay" />
                <div className="explore-content">
                  <span className="explore-country">{dest.country}</span>
                  <h3 className="explore-name">{dest.name}</h3>
                  <p className="explore-tagline">{dest.tagLine}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
