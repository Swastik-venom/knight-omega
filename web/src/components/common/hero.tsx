"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";

export default function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      title: "Interactive Components",
      description: "Beautifully designed UI components with smooth animations",
      icon: "✨"
    },
    {
      title: "Responsive Design",
      description: "Looks great on all device sizes and screen orientations",
      icon: "📱"
    },
    {
      title: "Performance Optimized",
      description: "Built with performance in mind for the best user experience",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-950/20 dark:to-cyan-950/20 p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400 mb-6">
            Welcome to Knight Omega
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            A modern React application with Skipper UI features, designed for performance and beautiful user experiences.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="p-6 border-0 bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}