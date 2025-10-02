import { Navigation } from "@/components/navigation";
import Footer from "@/components/shared/Footer";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
