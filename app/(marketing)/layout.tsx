import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteractiveBackground } from "@/components/InteractiveBackground";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-neutral-100 flex flex-col font-sans relative">
      <InteractiveBackground />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
