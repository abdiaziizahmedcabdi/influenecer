import {
  Navbar,
  Hero,
  PlatformShowcase,
  DemoBooking,
  TrustReassurance,
  BackupContact,
  Footer,
} from "@/components/sections";

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
