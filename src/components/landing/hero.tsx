
'use client';

// components/landing/hero.tsx
import { useState, useEffect } from "react";
import { TransitionLink } from "@/components/shared/transition-link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Sparkles, Camera } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: heroImage ? `url(${heroImage.imageUrl})` : "",
      }}
      data-ai-hint={heroImage?.imageHint}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      
      <div className="relative z-10 container px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center text-white space-y-8 md:space-y-10 flex flex-col items-center justify-center">
          {/* Logo for mobile only */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mb-4"
          >
            <Logo className="text-white" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-small"
          >
            <Camera className="h-3.5 w-3.5 mr-2" />
            AI-Powered Nutrition Tracking
            <Sparkles className="h-3.5 w-3.5 ml-2 text-yellow-300" />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-h1 font-bold tracking-tight leading-tight"
          >
            Eat Smart.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500 mt-2">
              Live Healthy.
            </span>
          </motion.h1>
          
          {/* Description - hidden on mobile for hero-only app feel */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden md:block text-body text-white/90 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Discover the rich world of Ghanaian cuisine and take control of your
            health. Nutrify helps you understand, track, and improve your diet
            with smart, AI-powered tools.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-4 w-full max-w-xs sm:max-w-none"
          >
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-5 sm:py-6 text-body rounded-full group"
            >
              <TransitionLink href="/signup">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </TransitionLink>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/30 px-6 sm:px-8 py-5 sm:py-6 text-body rounded-full transition-all duration-300"
            >
              <TransitionLink href="/login">Login</TransitionLink>
            </Button>
          </motion.div>

          {/* PWA Install Button - Mobile Only */}
          {deferredPrompt && !isInstalled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="md:hidden w-full max-w-xs px-4"
            >
              <Button
                onClick={handleInstallClick}
                className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 w-full text-body"
              >
                Install Our App
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
