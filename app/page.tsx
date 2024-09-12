
import { Logo } from "@/components/icons";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <Logo/>
      </div>
    </section>
  );
}
