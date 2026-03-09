import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PlatformShowcase } from "@/components/sections/PlatformShowcase";
import { DemoBooking } from "@/components/sections/DemoBooking";
import { TrustReassurance } from "@/components/sections/TrustReassurance";
import { BackupContact } from "@/components/sections/BackupContact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformShowcase />
        <DemoBooking />
        <TrustReassurance />
        <BackupContact />
      </main>
      <Footer />
    </>
  );
}
