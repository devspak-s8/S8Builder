import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { GitBranch, Github, Info, Loader2, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function GitHubModal({ isOpen, onClose }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [branch, setBranch] = useState("main");
  const [projectPath, setProjectPath] = useState("/");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setIsConnected(true);

    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsConnected(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-3">
            <Github className="h-6 w-6" />
            Connect to GitHub
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-4"
            >
              {/* Repository URL */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-semibold">Repository URL</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Full GitHub repository URL (e.g., https://github.com/user/repo)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="glass-card border-white/20 focus:border-primary/50"
                />
              </div>

              {/* Personal Access Token */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-semibold">Personal Access Token</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub Personal Access Token with repo permissions</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Generate at: Settings → Developer settings → Personal access tokens
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="glass-card border-white/20 focus:border-primary/50"
                />
              </div>

              <Separator className="border-white/10" />

              {/* Branch Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">Branch</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Target branch for deployment</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger className="glass-card border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">main</SelectItem>
                      <SelectItem value="master">master</SelectItem>
                      <SelectItem value="develop">develop</SelectItem>
                      <SelectItem value="staging">staging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Path */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">Project Path</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Folder path within the repository</p>
                        <p className="text-xs text-muted-foreground mt-1">Use "/" for root</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={projectPath}
                    onChange={(e) => setProjectPath(e.target.value)}
                    placeholder="/src or /"
                    className="glass-card border-white/20 focus:border-primary/50"
                  />
                </div>
              </div>

              {/* Commit Message */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Commit Message (Optional)</Label>
                <Textarea
                  placeholder="Updated template content via text editor"
                  className="glass-card border-white/20 focus:border-primary/50 resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="glass-card border-white/20"
                  disabled={isConnecting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConnect}
                  disabled={!repoUrl || !accessToken || isConnecting}
                  className="bg-primary hover:bg-primary/80 neon-glow min-w-[120px]"
                >
                  {isConnecting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4" />
                      Connecting...
                    </motion.div>
                  ) : (
                    <>
                      <GitBranch className="h-4 w-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-4"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Successfully Connected!
              </h3>
              <p className="text-muted-foreground">
                Your GitHub repository is now connected and ready for deployment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
