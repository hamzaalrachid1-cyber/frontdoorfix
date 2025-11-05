import InnerPagesLayout from "@/components/InnerPagesLayout";

export default function ReparationerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InnerPagesLayout>
      {children}
    </InnerPagesLayout>
  );
}

