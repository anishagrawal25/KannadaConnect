import React from 'react';
import { Mic } from 'lucide-react';

export default function GuidedPractice() {
  return (
    <div className="practice-page" style={{ paddingTop: '20px' }}>
      <div className="hero-tag">
        <Mic size={14} />
        <span>Guided Practice</span>
      </div>
      <h1 className="hero-title" style={{ fontSize: '32px', marginBottom: '8px' }}>
        Interactive Speaking Practice
      </h1>
      <p className="hero-subtitle" style={{ marginBottom: '24px' }}>
        Practice speaking Kannada in real-life scenarios with voice analysis and instant feedback.
      </p>
    </div>
  );
}
