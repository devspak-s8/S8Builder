import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Download, Heart, Eye, Monitor, Smartphone, Tablet, ExternalLink, Check, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TemplateOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔑 get template from state
  const template = location.state?.template;

  const [isLiked, setIsLiked] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState("desktop");

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Template not found</h2>
          <Button onClick={() => navigate("/user-dashboard/template")} className="bg-purple-500 hover:bg-purple-600">
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const features = template.features || [];
  const techStack = template.techStack || [];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back Button */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button
          variant="ghost"
          onClick={() => navigate("/user-dashboard/template")}
          className="text-purple-300 hover:text-white hover:bg-purple-500/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </Button>
      </motion.div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Template Preview */}
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Card className="bg-slate-800/50 border-purple-400/20 overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-purple-400/20 flex justify-between items-center gap-3">
                {/* Device Buttons */}
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {[
                    { id: "desktop", icon: Monitor, label: "Desktop" },
                    { id: "tablet", icon: Tablet, label: "Tablet" },
                    { id: "mobile", icon: Smartphone, label: "Mobile" }
                  ].map(device => (
                    <Button
                      key={device.id}
                      variant={selectedPreview === device.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedPreview(device.id)}
                      className="text-purple-300 hover:text-white text-xs sm:text-sm"
                    >
                      <device.icon className="w-4 h-4 mr-2" />
                      {device.label}
                    </Button>
                  ))}
                </div>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs sm:text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  See Live Preview
                </Button>
              </div>

              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={template.image || "/placeholder.png"}
                    alt={template.title}
                    className={`object-cover transition-all duration-500 ${
                      selectedPreview === "desktop" ? "w-full h-full" :
                      selectedPreview === "tablet" ? "w-3/4 h-5/6 rounded-lg shadow-lg" :
                      "w-1/2 sm:w-1/3 h-5/6 rounded-lg shadow-lg"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features & Tech Stack */}
          {features.length > 0 && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="bg-slate-800/50 border-purple-400/20">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Features Included</h3>
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        </div>
                        <span className="text-purple-200 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {techStack.length > 0 && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Card className="bg-slate-800/50 border-purple-400/20">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {techStack.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-purple-400/30 text-purple-300 hover:bg-purple-500/20 text-xs sm:text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="bg-slate-800/50 border-purple-400/20">
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                      <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300">{template.category}</Badge>
                      {template.isNew && <Badge className="bg-emerald-500 text-white text-xs">New</Badge>}
                      {template.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white break-words">{template.title}</h1>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)} className="text-purple-300 hover:text-red-400 flex-shrink-0">
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm sm:text-base">Price</span>
                    <span className="text-2xl sm:text-3xl font-bold text-white">${template.price || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-purple-300">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{template.downloads ? template.downloads.toLocaleString() : 0}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm sm:text-base">
                    <Download className="w-4 h-4 mr-2" />
                    Buy Now ${template.price || 0}
                  </Button>
                  <Button
  as="a"
  href={template.preview_url || "#"} // fallback if preview not ready
  target="_blank"
  rel="noopener noreferrer"
  variant="outline"
  className="w-full border-purple-400/30 text-purple-300 hover:bg-purple-500/20 text-sm sm:text-base"
  disabled={!template.preview_url} // disable if preview not ready
>
  <Eye className="w-4 h-4 mr-2" />
  {template.preview_url ? "Live Preview" : "Processing..."}
</Button>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOverview;
