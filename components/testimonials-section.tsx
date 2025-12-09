"use client"

import { useState, useEffect } from "react"
import { Badge } from "./shared/badge"

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "In just a few minutes, we transformed our data into actionable insights. The process was seamless and incredibly efficient!",
      name: "Jamie Marshall",
      company: "Co-founder, Exponent",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2011_35_19%20AM-z4zSRLsbOQDp7MJS1t8EXmGNB6Al9Z.png",
    },
    {
      quote: "Brillance has revolutionized how we handle custom contracts. The automation saves us hours every week and eliminates errors completely.",
      name: "Sarah Chen",
      company: "VP Operations, TechFlow",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2010_54_18%20AM-nbiecp92QNdTudmCrHr97uekrIPzCP.png",
    },
    {
      quote: "The billing automation is a game-changer. What used to take our team days now happens automatically with perfect accuracy.",
      name: "Marcus Rodriguez",
      company: "Finance Director, InnovateCorp",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2011_01_05%20AM-TBOe92trRxKn4G5So1m9D2h7LRH4PG.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="w-full py-16 flex justify-center bg-foreground/5">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
          <img
            src={testimonials[activeTestimonial].image}
            alt={testimonials[activeTestimonial].name}
            className="w-48 h-48 rounded-lg object-cover transition-opacity duration-500"
          />
          
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-sentient italic transition-opacity duration-500">
              "{testimonials[activeTestimonial].quote}"
            </p>
            <div>
              <p className="font-mono text-sm font-medium">{testimonials[activeTestimonial].name}</p>
              <p className="font-mono text-xs text-foreground/60">{testimonials[activeTestimonial].company}</p>
            </div>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === activeTestimonial ? "w-8 bg-primary" : "w-1 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
