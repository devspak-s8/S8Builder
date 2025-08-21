import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { X, Upload, Image, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TemplateUploadProgress } from "./TemplateUploadProgress"
import API from "@/utils/axios"

export function TemplateUploadModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    images: [],
    zipFile: null
  })
  const [currentTag, setCurrentTag] = useState("")
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)
// eslint-disable-next-line no-unused-vars
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
const categories = [
  "Landing Pages", "SaaS Dashboards", "E-commerce", "Portfolios",
  "Mobile Apps", "Gaming", "Blog Templates", "Corporate Sites", "Admin Dashboards"
];

// ------------------ Tags ------------------
const addTag = () => {
  const tag = currentTag.trim();
  if (tag && !formData.tags.includes(tag)) {
    setFormData({ ...formData, tags: [...formData.tags, tag] });
    setCurrentTag("");
  }
};

const removeTag = (tag) => {
  setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
};

// ------------------ Form Submit ------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.zipFile) return alert("Please upload a ZIP file");

  setShowProgress(true);
  setProgress(0);

  try {
    // Prepare FormData for single request
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("tags", formData.tags.join(","));
    data.append("zip_file", formData.zipFile);

    formData.images.forEach((img) => data.append("images", img));

    // Send to FastAPI
    await API.post("/templates/upload-template", data, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      },
    });

    setIsComplete(true);
    setProgress(100);
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};

// ------------------ Progress Close ------------------
const handleProgressClose = () => {
  setShowProgress(false);
  setIsComplete(false);
  setProgress(0);
  onClose();
};

  return (
    <>
      <Dialog open={isOpen && !showProgress} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto border border-border text-foreground">
          <DialogHeader>
            <DialogTitle>Upload New Template</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Title, Category, Description, Tags */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} placeholder="Add tags..." onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                    <Button type="button" onClick={addTag}><Tag /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag}>{tag}<button type="button" onClick={() => removeTag(tag)}><X /></button></Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <Label>Images</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div key={i} className="relative border-2 border-dashed rounded-lg p-6 text-center">
                    <Image className="w-12 h-12 mx-auto mb-2" />
                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => { const file = e.target.files[0]; if (file) setFormData({ ...formData, images: [...formData.images, file] }) }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ZIP Upload */}
            <div className="space-y-4">
              <Label>ZIP File</Label>
              <motion.div className="relative border-2 border-dashed p-6 text-center">
                <Upload className="w-12 h-12 mx-auto mb-2" />
                <input
                  type="file"
                  accept=".zip"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && (file.type === "application/zip" || file.type === "application/x-zip-compressed" || file.name.endsWith(".zip"))) {
                      setFormData({ ...formData, zipFile: file });
                    } else {
                      alert("Please upload a valid ZIP file");
                      e.target.value = "" // reset input
                    }
                  }}
                />

                {formData.zipFile && <p>Selected: {formData.zipFile.name}</p>}
              </motion.div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">Upload Template</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <TemplateUploadProgress
        isOpen={showProgress}
        onClose={handleProgressClose}
        progress={progress}
        currentStep={currentStep}
        totalSteps={formData.images.length + 1}
        isComplete={isComplete}
      />
    </>
  )
}
