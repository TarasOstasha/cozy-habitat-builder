import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
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

type CategoryDescriptionProps = {
  mode?: "richText" | "html" | string | null;
  richText?: PortableTextBlock[] | null;
  html?: string | null;
};

export function CategoryDescription({ mode, richText, html }: CategoryDescriptionProps) {
  if (mode === "html") {
    const trimmed = html?.trim();
    if (!trimmed) return null;
    return (
      <div
        className="category-description mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg [&_a]:underline [&_em]:italic [&_li]:my-1 [&_ol]:mx-auto [&_ol]:mb-3 [&_ol]:inline-block [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-left [&_p]:mb-3 [&_p]:last:mb-0 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:mx-auto [&_ul]:mb-3 [&_ul]:inline-block [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-left"
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  if (!richText?.length) return null;

  return (
    <div className="mx-auto mt-8 max-w-2xl text-center">
      <PortableText value={richText} components={components} />
    </div>
  );
}
