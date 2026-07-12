import { Link } from "@tanstack/react-router";
import { featuredProjects } from "@/lib/featured-projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function WorkCarousel() {
  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-[1300px]"
        aria-label="Featured portfolio projects"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {featuredProjects.map((project) => (
            <CarouselItem
              key={project.id}
              className="basis-full pl-4 md:basis-1/2 md:pl-6 lg:basis-[45%]"
            >
              <article className="group h-full border border-border/60 bg-background">
                <figure className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </figure>
                <div className="px-6 py-8 md:px-8 md:py-10">
                  <span className="eyebrow">{project.category}</span>
                  <h3 className="mt-4 font-display text-3xl leading-tight">{project.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  {project.href && (
                    <Link
                      to={project.href}
                      className="eyebrow link-underline mt-8 inline-block"
                    >
                      View Project Gallery
                    </Link>
                  )}
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 border-border/80 bg-background/95 md:-left-5" />
        <CarouselNext className="right-2 border-border/80 bg-background/95 md:-right-5" />
      </Carousel>
    </div>
  );
}
