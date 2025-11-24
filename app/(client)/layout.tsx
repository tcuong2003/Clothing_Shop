import Header from "@/components/Header/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto">{children}</div>
    </>
  );
}
