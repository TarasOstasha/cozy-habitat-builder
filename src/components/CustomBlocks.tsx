import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { isSectionEnabled } from "@/lib/sanity/defaults";
import { sanityImageUrl } from "@/lib/sanity/image";
import type {
  CustomBlock,
  CustomBlockPlacement,
  CustomCtaBlock,
  CustomHtmlBlock,
  CustomImageTextBlock,
  CustomTextBlock,
} from "@/lib/sanity/types";

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-base leading-relaxed text-muted-foreground last:mb-0 md:text-lg">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 font-display text-2xl text-foreground last:mb-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 font-display text-xl text-foreground last:mb-0">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-3 list-disc space-y-1 pl-5 text-left text-base text-muted-foreground last:mb-0 md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-left text-base text-muted-foreground last:mb-0 md:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const openInNewTab = Boolean(value?.openInNewTab);
      if (!href) return <>{children}</>;
      return (
        <a
          href={href}
          className="link-underline"
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function blockAnchorId(block: CustomBlock): string | undefined {
  return block.sectionId?.current || undefined;
}

function PortableBody({ value }: { value?: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as PortableTextBlock[]} components={portableComponents} />;
}

function TextBlock({ block }: { block: CustomTextBlock }) {
  const id = blockAnchorId(block);
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
        {block.title ? (
          <h2 className={`font-display text-4xl md:text-5xl ${block.eyebrow ? "mt-6" : ""}`}>
            {block.title}
          </h2>
        ) : null}
        <div className="mt-8">
          <PortableBody value={block.body} />
        </div>
      </div>
    </section>
  );
}

function ImageTextBlock({ block }: { block: CustomImageTextBlock }) {
  const id = blockAnchorId(block);
  const imageUrl = sanityImageUrl(block.image, 1600);
  const imageFirst = block.imagePosition !== "right";

  const figure = imageUrl ? (
    <figure className={`md:col-span-7 ${imageFirst ? "" : "md:order-2"}`}>
      <img
        src={imageUrl}
        alt={block.image?.alt || block.title || "SEMTA"}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </figure>
  ) : null;

  const copy = (
    <div
      className={`flex items-center justify-center px-8 py-20 md:col-span-5 md:px-16 md:py-24 ${
        imageFirst ? "" : "md:order-1"
      }`}
    >
      <div className="max-w-md">
        {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
        {block.title ? (
          <h2
            className={`font-display text-4xl leading-tight md:text-5xl ${block.eyebrow ? "mt-6" : ""}`}
          >
            {block.title}
          </h2>
        ) : null}
        <div className="mt-8 text-left">
          <PortableBody value={block.body} />
        </div>
        {block.ctaLabel && block.ctaHref ? (
          <a href={block.ctaHref} className="eyebrow link-underline mt-10 inline-block">
            {block.ctaLabel}
          </a>
        ) : null}
      </div>
    </div>
  );

  return (
    <section id={id} className="scroll-mt-24 border-t border-border/60">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {imageFirst ? (
          <>
            {figure}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {figure}
          </>
        )}
      </div>
    </section>
  );
}

function CtaBlock({ block }: { block: CustomCtaBlock }) {
  const id = blockAnchorId(block);
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-2xl text-center">
        {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
        {block.title ? (
          <h2 className={`font-display text-4xl md:text-5xl ${block.eyebrow ? "mt-6" : ""}`}>
            {block.title}
          </h2>
        ) : null}
        {block.body ? (
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            {block.body}
          </p>
        ) : null}
        {block.buttonLabel && block.buttonHref ? (
          <div className="mt-10">
            <a
              href={block.buttonHref}
              className="inline-flex items-center justify-center bg-[color:var(--color-gold)] px-7 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-colors hover:bg-[color:var(--color-gold-deep)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2"
            >
              {block.buttonLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function HtmlBlock({ block }: { block: CustomHtmlBlock }) {
  const id = blockAnchorId(block);
  const html = block.html?.trim();
  if (!html) return null;

  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-[1100px]">
        {(block.eyebrow || block.heading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
            {block.heading ? (
              <h2
                className={`font-display text-4xl md:text-5xl ${block.eyebrow ? "mt-6" : ""}`}
              >
                {block.heading}
              </h2>
            ) : null}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}

function renderBlock(block: CustomBlock) {
  switch (block._type) {
    case "customTextBlock":
      return <TextBlock key={block._key} block={block as CustomTextBlock} />;
    case "customImageTextBlock":
      return <ImageTextBlock key={block._key} block={block as CustomImageTextBlock} />;
    case "customCtaBlock":
      return <CtaBlock key={block._key} block={block as CustomCtaBlock} />;
    case "customHtmlBlock":
      return <HtmlBlock key={block._key} block={block as CustomHtmlBlock} />;
    default:
      return null;
  }
}

export function blocksForPlacement(
  blocks: CustomBlock[] | null | undefined,
  placement: CustomBlockPlacement,
) {
  return (blocks ?? []).filter(
    (block) =>
      isSectionEnabled(block.enabled) && (block.placement || "beforeContact") === placement,
  );
}

export function customNavSections(blocks: CustomBlock[] | null | undefined) {
  return (blocks ?? [])
    .filter((block) => isSectionEnabled(block.enabled) && block.navLabel && block.sectionId?.current)
    .map((block) => ({
      id: block.sectionId!.current!,
      label: block.navLabel!,
    }));
}

type CustomBlocksProps = {
  blocks?: CustomBlock[] | null;
  placement: CustomBlockPlacement;
};

export function CustomBlocks({ blocks, placement }: CustomBlocksProps) {
  const matched = blocksForPlacement(blocks, placement);
  if (!matched.length) return null;
  return <>{matched.map(renderBlock)}</>;
}
