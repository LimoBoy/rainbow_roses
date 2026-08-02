import CreativeStudioSection from "@/components/home/CreativeStudio";
import FooterBottomBar from "@/components/home/FooterBottomBar";
import HeroSection from "@/components/home/HeroSection";
import TheBenefits from "@/components/home/TheBenefits";
import TheCarousel from "@/components/home/TheCarousel";
import TheMenu from "@/components/home/TheMenu";
import ThePreFooter from "@/components/home/ThePreFooter";
import TheReviews from "@/components/home/TheReviews";
import { TopBar } from "@/components/home/TopBar";

export default function Home() {
  // const users = await prisma.user.findMany();

  return (
   <div>
      <HeroSection/>
      <div className="pl-4 py-8">
        <TheCarousel/>
      </div>
      <div>
        <CreativeStudioSection/>
      </div>
      <div className="pl-4 py-8">
        <TheBenefits/>
      </div>
      <div className="pl-4 py-8">
        <TheReviews/>
      </div>
   </div>
  );
}
