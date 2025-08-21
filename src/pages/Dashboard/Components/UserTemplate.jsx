import { useState, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { TemplateCard } from "@/components/TemplateCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import API from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTemplate = () => {
  const [mounted, setMounted] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);

    const fetchTemplates = async () => {
      try {
        const res = await API.get("/templates/my-templates", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTemplates(res.data);
      } catch (error) {
        console.error(
          "Error fetching templates:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-64 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/templates")}
          className="text-purple-300 hover:text-white hover:bg-purple-500/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          My Templates
        </h1>
        <p className="text-lg text-purple-300 max-w-2xl mx-auto">
          Manage and explore all the templates you’ve uploaded to the platform.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-purple-200">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>{templates.length} Templates</span>
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Private by Default</span>
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span>Upload & Manage</span>
          </span>
        </div>
      </motion.div>

      <FilterBar />

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <p className="text-center text-purple-300">No templates found.</p>
      ) : (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template._id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TemplateCard
                template={template} // 🔑 pass full template
                onPreview={(t) =>
                  navigate(`/user-dashboard/template/${t._id}`, { state: { template: t } })
                }
                onCustomize={(t) => console.log("Customize", t._id)}
                onBuy={(t) => console.log("Buy template", t._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UserTemplate;
