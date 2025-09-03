'use client';

import { useState } from 'react';

export default function Home() {
  const [safetyInput, setSafetyInput] = useState('');
  const [cultureInput, setCultureInput] = useState('');
  const [cultureContext, setCultureContext] = useState('');
  const [safetyResult, setSafetyResult] = useState('');
  const [cultureResult, setCultureResult] = useState('');
  const [safetyLoading, setSafetyLoading] = useState(false);
  const [cultureLoading, setCultureLoading] = useState(false);

  const checkSafety = async () => {
    setSafetyLoading(true);
    setSafetyResult('');
    try {
      const response = await fetch('/api/safety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: safetyInput }),
      });
      const data = await response.json();
      setSafetyResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setSafetyResult(JSON.stringify({ error: 'Failed to check safety' }, null, 2));
    }
    setSafetyLoading(false);
  };

  const checkCulture = async () => {
    setCultureLoading(true);
    setCultureResult('');
    try {
      const response = await fetch('/api/culture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: cultureInput,
          context: cultureContext 
        }),
      });
      const data = await response.json();
      setCultureResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setCultureResult(JSON.stringify({ error: 'Failed to check culture' }, null, 2));
    }
    setCultureLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
          marginBottom: '3rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          🚀 AI Safety & Culture Checker
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Safety Checker Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #667eea, #764ba2)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
              🛡️ Safety Checker
            </h2>
            <textarea
              value={safetyInput}
              onChange={(e) => setSafetyInput(e.target.value)}
              placeholder="Enter text to check for safety..."
              style={{ 
                width: '100%', 
                minHeight: '120px', 
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                resize: 'none'
              }}
            />
            <button
              onClick={checkSafety}
              disabled={safetyLoading || !safetyInput}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                background: safetyLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: safetyLoading || !safetyInput ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                transform: safetyLoading ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              {safetyLoading ? '⏳ Analyzing...' : 'Analyze Safety'}
            </button>
            {safetyResult && (
              <pre style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                fontSize: '0.875rem',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {safetyResult}
              </pre>
            )}
          </div>

          {/* Culture Coach Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #10b981, #14b8a6)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>
              🌍 Culture Coach
            </h2>
            <textarea
              value={cultureInput}
              onChange={(e) => setCultureInput(e.target.value)}
              placeholder="Enter text to analyze..."
              style={{ 
                width: '100%', 
                minHeight: '100px', 
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                resize: 'none'
              }}
            />
            <input
              type="text"
              value={cultureContext}
              onChange={(e) => setCultureContext(e.target.value)}
              placeholder="Context (optional)"
              style={{ 
                width: '100%', 
                marginTop: '0.5rem',
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <button
              onClick={checkCulture}
              disabled={cultureLoading || !cultureInput}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                background: cultureLoading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #14b8a6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: cultureLoading || !cultureInput ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                transform: cultureLoading ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              {cultureLoading ? '⏳ Analyzing...' : 'Analyze Culture'}
            </button>
            {cultureResult && (
              <pre style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                fontSize: '0.875rem',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {cultureResult}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
