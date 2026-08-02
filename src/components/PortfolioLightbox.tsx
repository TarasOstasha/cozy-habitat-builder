import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

export type PortfolioLightboxSlide = SlideImage & { thumbnail?: string };

type PortfolioLightboxProps = {
  open: boolean;
  close: () => void;
  index: number;
  slides: PortfolioLightboxSlide[];
};

export function PortfolioLightbox({ open, close, index, slides }: PortfolioLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Captions, Counter, Thumbnails, Zoom]}
      carousel={{ finite: slides.length <= 1, padding: 0 }}
      animation={{ fade: 320 }}
      controller={{ closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: "center", descriptionMaxLines: 2 }}
      counter={{ container: { style: { top: 16, bottom: "unset" } } }}
      thumbnails={{
        position: "bottom",
        border: 0,
        borderRadius: 2,
        padding: 0,
        gap: 8,
        imageFit: "cover",
      }}
      zoom={{ maxZoomPixelRatio: 2.5, scrollToZoom: true }}
      styles={{
        container: { backgroundColor: "rgba(10, 10, 10, 0.94)" },
        captionsTitle: {
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        },
      }}
    />
  );
}
