import DashboardLayout from "@/blocks/sections/dashboard/layout/DashboardLayout";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
