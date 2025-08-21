"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingOverlay({
  isVisible,
  status,
  loadingText = "Processing...",
  successText = "Success!",
  errorText = "Something went wrong",
  onComplete
}) {
  const [showContent, setShowContent] = useState(false);

  // Show content when overlay is visible
  useEffect(() => {
    if (isVisible) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  // Auto-complete after success/error
  useEffect(() => {
    if ((status === "success" || status === "error") && showContent) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, showContent, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Blurred Background */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-black/20"
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/20"
          >
            <div className="flex flex-col items-center space-y-6">
              
              {/* Loading State */}
              {status === "loading" && (
                <>
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full"
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-medium text-slate-700 dark:text-slate-300"
                  >
                    {loadingText}
                  </motion.p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </>
              )}

              {/* Success State */}
              {status === "success" && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="absolute inset-0 w-16 h-16 bg-green-500 rounded-full"
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg font-medium text-green-600 dark:text-green-400"
                  >
                    {successText}
                  </motion.p>
                </>
              )}

              {/* Error State */}
              {status === "error" && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <AlertCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-medium text-red-600 dark:text-red-400 text-center"
                  >
                    {errorText}
                  </motion.p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
