export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background glow effects for premium feel */}
      <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -top-[200px] -left-[200px] -z-10 mix-blend-screen" />
      <div className="w-full max-w-2xl bg-card p-8 md:p-12 rounded-3xl border shadow-2xl relative">
        {children}
      </div>
    </div>
  );
}
