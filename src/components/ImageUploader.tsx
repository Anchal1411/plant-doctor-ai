import { useRef, useState } from "react";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border bg-card hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-nature flex items-center justify-center shadow-soft">
            <ImageIcon className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Upload Plant Image
          </h3>
          <p className="text-muted-foreground mb-8">
            Drag and drop an image, or choose an option below
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => cameraInputRef.current?.click()}
              className="gap-3"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="gap-3"
            >
              <Upload className="w-5 h-5" />
              Upload from Gallery
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Supports JPG, PNG, WEBP • Max 10MB
      </p>
    </div>
  );
};

export default ImageUploader;
