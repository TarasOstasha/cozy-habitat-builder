import { createFileRoute } from "@tanstack/react-router";
import { StudioRoute } from "@/components/StudioRoute";

export const Route = createFileRoute("/studio/")({
  component: StudioRoute,
});
