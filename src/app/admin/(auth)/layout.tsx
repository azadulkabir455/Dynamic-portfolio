import Container from "@/blocks/elements/container/Container";

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      {children}
    </Container>
  );
}
