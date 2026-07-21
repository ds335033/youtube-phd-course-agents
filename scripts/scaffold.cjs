const fs = require('fs');
const layouts = ['student', 'creator-lab', 'developer-lab', 'admin'];

layouts.forEach(l => {
  const componentPrefix = l.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const title = l.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  fs.writeFileSync(`app/${l}/layout.tsx`, `export default function ${componentPrefix}Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 p-4">
        <span className="font-bold">${title} Area</span>
      </header>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}`);

  fs.writeFileSync(`app/${l}/page.tsx`, `export default function ${componentPrefix}Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">${title} Dashboard</h1>
      <p className="mt-4 text-muted-foreground">Welcome to the ${title} area.</p>
    </div>
  );
}`);
});
