"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    level: "",
    goal: "",
    channelSize: "",
    studyTime: ""
  });

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    setIsGenerating(true);
    // Simulate AI Curriculum Generation delay
    setTimeout(() => {
      router.push("/student");
    }, 2500);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {step === 1 && "Welcome to the Academy"}
            {step === 2 && "What is your primary goal?"}
            {step === 3 && "Tell us about your channel"}
            {step === 4 && "Building your AI Roadmap..."}
          </h1>
          {step < 4 && <span className="text-sm font-medium text-muted-foreground">Step {step} of 3</span>}
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-muted-foreground mb-6">How would you describe your current skill level?</p>
          {["Beginner (Just starting out)", "Intermediate (Consistent uploads, some growth)", "Advanced (Full-time creator)", "Developer/Entrepreneur (Building tools & businesses)"].map(level => (
            <button
              key={level}
              onClick={() => { updateForm("level", level); setStep(2); }}
              className="w-full p-4 text-left border rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span className="font-medium text-foreground">{level.split(" (")[0]}</span>
              <span className="block text-sm text-muted-foreground mt-1">{level.match(/\((.*?)\)/)?.[1]}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-muted-foreground mb-6">What do you want to achieve?</p>
          {["Grow my audience rapidly", "Master YouTube monetization & business", "Learn AI automation for video production", "Build a Software/AI product for creators"].map(goal => (
            <button
              key={goal}
              onClick={() => { updateForm("goal", goal); setStep(3); }}
              className="w-full p-4 text-left border rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span className="font-medium text-foreground">{goal}</span>
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-muted-foreground mb-6">How many subscribers do you currently have?</p>
          {["0 - 1,000", "1,000 - 10,000", "10,000 - 100,000", "100,000+"].map(size => (
            <button
              key={size}
              onClick={() => { updateForm("channelSize", size); setStep(4); handleComplete(); }}
              className="w-full p-4 text-left border rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span className="font-medium text-foreground">{size}</span>
            </button>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute h-full w-full rounded-full border-4 border-muted"></div>
            <div className="absolute h-full w-full rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Analyzing your profile</h3>
            <p className="text-muted-foreground shimmer-text">The Academic Architecture Agent is generating your bespoke curriculum...</p>
          </div>
        </div>
      )}

      {step > 1 && step < 4 && (
        <div className="mt-8 pt-6 border-t flex justify-start">
          <button 
            onClick={() => setStep(s => s - 1)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
