import { useState, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-8 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Premium Templates
        </h1>
        <p className="text-lg text-purple-300 max-w-2xl mx-auto">
          Discover cutting-edge website templates with futuristic designs, glassmorphism effects, and next-gen user experiences.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-purple-200">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>{templates.length} Templates</span>
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Premium Quality</span>
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span>Instant Download</span>
          </span>
        </div>
      </motion.div>

      <FilterBar />

      {/* Templates Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <TemplateCard {...template} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;