import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  useEffect(() => {
    // Only animate if user prefers motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Page Load sequence
      // Navbar
      gsap.fromTo(
        ".gsap-nav",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: "power2.out" }
      );

      // Hero eyebrow — slide down only (no opacity hide)
      gsap.from(".gsap-hero-eyebrow", {
        y: -16, duration: 0.6, delay: 0.3, ease: "power2.out"
      });

      // Hero H1 words — slide up with skew, no opacity trick
      gsap.from(".gsap-hero-h1-word", {
        y: 50, skewY: 4, duration: 1.0, stagger: 0.08, delay: 0.5, ease: "power3.out"
      });

      // Hero script subtitle — slide in from left
      gsap.from(".gsap-hero-script", {
        x: -40, duration: 1.0, delay: 0.9, ease: "power2.out"
      });

      // Hero description texts — slide up only
      gsap.from(".gsap-hero-desc-1, .gsap-hero-desc-2", {
        y: 20, duration: 0.7, stagger: 0.2, delay: 1.0, ease: "power2.out"
      });

      // Hero image — subtle scale settle
      gsap.from(".gsap-hero-image", {
        scale: 1.05, opacity: 0, duration: 1.2, delay: 0.4, ease: "power2.out"
      });

      // 2. ScrollTrigger Animations
      
      // Section headings
      gsap.utils.toArray(".gsap-section-heading").forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Room cards stagger
      gsap.fromTo(
        ".gsap-room-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-rooms-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Timeline cells stagger
      gsap.fromTo(
        ".gsap-timeline-cell",
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-timeline-container",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Contact section photo and form
      gsap.fromTo(
        ".gsap-contact-photo",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-contact-container",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".gsap-contact-form",
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-contact-container",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Year CountUp (simple implementation)
      gsap.utils.toArray(".gsap-year-number").forEach((el: any) => {
        const targetYear = parseInt(el.getAttribute("data-year") || "2026", 10);
        const startYear = targetYear - 10;
        
        gsap.fromTo(
          el,
          { innerHTML: startYear },
          {
            innerHTML: targetYear,
            duration: 1.2,
            ease: "power1.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Hero Parallax
      gsap.to(".gsap-hero-image-parallax", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: ".gsap-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);
}
