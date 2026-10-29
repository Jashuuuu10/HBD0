import { BookOpen } from 'lucide-react';
import { storyMilestones } from '../data/memories';

/**
 * RETAINED & IMPROVED SECTION: OUR STORY
 * 3 editable milestone cards celebrating key chapters
 */
export default function OurStory() {
  return (
    <section id="our-story" className="story-section" aria-label="Our Story Section">
      <div className="section-header">
        <span className="section-eyebrow">
          <BookOpen size={14} /> CHAPTERS OF US
        </span>
        <h2 className="section-title">Our Story</h2>
        <p className="section-subtitle">
          From the day you stepped into my life to all the dreams we are still reaching for.
        </p>
      </div>

      <div className="story-milestones-grid">
        {storyMilestones.map((item) => (
          <div key={item.id} className="story-milestone-card">
            <div className="glass-shine" aria-hidden="true" />
            <div className="story-card-number">{item.number}</div>
            <h3 className="story-card-title">{item.title}</h3>
            <span className="story-card-tagline">{item.tagline}</span>
            <p className="story-card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
