export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 p-4">
        <span className="font-bold">Admin Area</span>
      </header>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}