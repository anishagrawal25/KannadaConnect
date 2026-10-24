import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Vocabulary() {
  return (
    <div className="vocabulary-page" style={{ paddingTop: '20px' }}>
      <div className="hero-tag">
        <BookOpen size={14} />
        <span>Practical Vocabulary</span>
      </div>
      <h1 className="hero-title" style={{ fontSize: '32px', marginBottom: '8px' }}>
        Essential Everyday Vocabulary
      </h1>
      <p className="hero-subtitle" style={{ marginBottom: '24px' }}>
        Learn practical words categorized by transport, food, shopping, health, and daily life.
      </p>
    </div>
  );
}
