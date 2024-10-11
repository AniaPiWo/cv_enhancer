import { FAQ } from "@/components/ui/FAQ";
import { Hero } from "@/components/ui/Hero";
import { InfoCards } from "@/components/ui/InfoCards";
import { ResumePitfalls } from "@/components/ui/ResumePitfalls";

export default function Home() {
  return (
    <div className="flex items-start justify-between flex-col w-full h-full min-h-[calc(100vh-328px)]">
      <Hero />
      <InfoCards />
      <ResumePitfalls />
      <FAQ />
    </div>
  );
}
