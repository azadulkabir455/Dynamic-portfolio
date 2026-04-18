import type { Metadata } from "next";
import Container from "@/blocks/elements/container/Container";

export const metadata: Metadata = {
  title: "Admin",
  description: "Portfolio admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="min-h-screen bg-secondary font-sans text-text antialiased">
      {children}
    </Container>
  );
}
