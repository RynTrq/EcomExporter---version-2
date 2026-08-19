import type { ReactNode } from "react";

export type DisplayCardItem = {
  icon: ReactNode;
  title: string;
  description: string;
  meta: string;
  tone?: "signal" | "amber" | "coral";
};

/* A skewed, fanned stack of artifact cards. Back cards sit desaturated
   behind a veil; hovering a card slides it out of the stack and restores
   full color. */
export function DisplayCards({ cards }: { cards: DisplayCardItem[] }) {
  return (
    <div className="display-stack" data-reveal="">
      {cards.slice(0, 3).map((card, index) => (
        <article
          className={`display-card display-card-${index + 1}`}
          data-tone={card.tone ?? "signal"}
          key={card.title}
        >
          <div className="display-card-head">
            <span className="display-card-icon">{card.icon}</span>
            <p>{card.title}</p>
          </div>
          <p className="display-card-desc">{card.description}</p>
          <small>{card.meta}</small>
        </article>
      ))}
    </div>
  );
}
