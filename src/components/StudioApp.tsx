import { Studio, type Config } from "sanity";
import config from "../../sanity/sanity.config";

export function StudioApp() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden">
      <Studio config={config as Config} />
    </div>
  );
}
