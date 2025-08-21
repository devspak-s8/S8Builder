// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function TemplateUploadProgress({ isOpen, onClose, progress, currentStep, totalSteps, isComplete }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="w-full max-w-md">
        <div className="bg-card p-8 rounded-lg border border-border text-center">
          <h2 className="text-xl font-semibold mb-2">{isComplete ? "Upload Complete!" : `Uploading (${currentStep+1}/${totalSteps})`}</h2>
          <p>{isComplete ? "All files uploaded successfully." : "Uploading your files..."}</p>

          <div className="relative w-24 h-24 mx-auto my-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
              <circle
                cx="50" cy="50"
                r="40"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2*Math.PI*40}
                strokeDashoffset={2*Math.PI*40*(1-progress/100)}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {isComplete ? <CheckCircle className="w-8 h-8 text-success" /> : <Loader2 className="w-6 h-6 text-primary animate-spin" />}
            </div>
          </div>

          <div className="text-2xl font-bold mb-4">{Math.round(progress)}%</div>
          <Progress value={progress} className="w-full h-2 mb-4" />

          {isComplete && <Button className="w-full" onClick={onClose}>Finish</Button>}
        </div>
      </motion.div>
    </div>
  )
}
