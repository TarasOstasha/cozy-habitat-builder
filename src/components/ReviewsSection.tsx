import { hardcodedReviews, reviewsSummary, type Review } from "@/lib/reviews";

function StarRating({ rating, label }: { rating: number; label: string }) {
  const rounded = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rounded;
        return (
          <svg
            key={index}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${filled ? "text-[color:var(--color-gold)]" : "text-border"}`}
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M10 1.5l2.35 5.1 5.55.7-4.1 3.85.1 5.55L10 14.3l-4.9 2.4.1-5.55-4.1-3.85 5.55-.7L10 1.5z"
            />
          </svg>
        );
      })}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <article className="border-t border-border/60 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StarRating rating={review.rating} label={`${review.rating} out of 5 stars`} />
        <span className="text-xs tracking-wide text-muted-foreground">{review.relativeTime}</span>
      </div>
      <blockquote className="mt-5 font-display text-xl leading-relaxed md:text-2xl">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <footer className="mt-5">
        <cite className="not-italic">
          <span className="eyebrow">{review.authorName}</span>
          <span className="mt-1 block text-xs text-muted-foreground">Google review</span>
        </cite>
      </footer>
    </article>
  );
}

type ReviewsSectionProps = {
  reviews?: Review[];
  rating?: number;
  totalCount?: number;
  googleMapsUrl?: string;
};

export function ReviewsSection({
  reviews = hardcodedReviews,
  rating = reviewsSummary.rating,
  totalCount = reviewsSummary.totalCount,
  googleMapsUrl = reviewsSummary.googleMapsUrl,
}: ReviewsSectionProps) {
  if (!reviews.length) return null;

  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);

  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
      aria-label="Google reviews"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Client Reviews</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">What clients say</h2>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl leading-none text-[color:var(--color-gold-deep)]">
                {ratingLabel}
              </span>
              <StarRating rating={rating} label={`${ratingLabel} average rating`} />
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalCount} Google review{totalCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 md:gap-14">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[color:var(--color-gold)] px-7 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-colors hover:bg-[color:var(--color-gold-deep)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2"
          >
            View all reviews
          </a>
        </div>
      </div>
    </section>
  );
}
