import React, { useState } from 'react';
import { Volume2, Copy, Check, MessageSquareReply } from 'lucide-react';
import { speechService } from '../utils/speech';

export default function ReplyList({ replies }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  if (!replies || replies.length === 0) return null;

  const handleCopy = async (kannadaText, index) => {
    try {
      await navigator.clipboard.writeText(kannadaText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(null);
    }
  };

  const handleSpeak = (kannadaText, index) => {
    if (speakingIndex === index) {
      speechService.stop();
      setSpeakingIndex(null);
      return;
    }

    setSpeakingIndex(index);
    speechService.speak(
      kannadaText,
      () => setSpeakingIndex(null),
      () => setSpeakingIndex(null)
    );
  };

  return (
    <section className="replies-section" aria-labelledby="replies-heading">
      <div className="replies-header">
        <h3 className="replies-title" id="replies-heading">
          <MessageSquareReply size={20} color="var(--color-forest)" />
          <span>What they might say</span>
        </h3>
        <p className="replies-subtitle">
          Plausible Kannada responses you might hear in this scenario (to help you understand what comes next):
        </p>
      </div>

      <div className="replies-grid">
        {replies.map((reply, idx) => (
          <div key={idx} className="reply-card">
            <div>
              <div className="reply-kannada kannada-text">
                {reply.kannada}
              </div>

              <div className="reply-translit">
                {reply.transliteration}
              </div>

              <div className="reply-meaning">
                <strong>Meaning:</strong> "{reply.englishMeaning || reply.meaning}"
              </div>
            </div>

            <div className="reply-actions">
              <button
                type="button"
                className="btn-icon-xs"
                onClick={() => handleSpeak(reply.kannada, idx)}
                title="Listen to this reply"
                aria-label={`Listen to reply: ${reply.transliteration}`}
              >
                <Volume2 size={14} color={speakingIndex === idx ? 'var(--color-forest)' : 'currentColor'} />
              </button>

              <button
                type="button"
                className="btn-icon-xs"
                onClick={() => handleCopy(reply.kannada, idx)}
                title="Copy reply text"
                aria-label="Copy reply text"
              >
                {copiedIndex === idx ? (
                  <Check size={14} color="var(--color-forest)" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
