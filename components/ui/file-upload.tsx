import { ChangeEvent, useState, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  id: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  showPreview?: boolean;
}

export function FileUpload({
  id,
  value,
  onChange,
  className = "",
  accept = "image/*",
  maxSize = 5, // 5MB default
  showPreview = true,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, GIF, etc.)");
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        // Create preview
        if (showPreview) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }

        // Pass the file object directly
        onChange(file);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <div className="relative w-full h-32 border border-neutral-300 rounded-md overflow-hidden bg-gray-50">
            <img
              src={preview}
              alt="Logo preview"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Click to change or remove the image
          </p>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex flex-col items-center justify-center w-full h-32 px-3 py-2 bg-white border-2 border-dashed border-neutral-300 rounded-md cursor-pointer hover:border-neutral-400 transition-colors"
        >
          <div className="flex flex-col items-center text-sm text-[rgba(17,17,19,0.6)]">
            <Upload className="w-8 h-8 mb-2 text-neutral-400" />
            <span className="font-medium">Upload Logo</span>
            <span className="text-xs mt-1">
              PNG, JPG, GIF up to {maxSize}MB
            </span>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {value && !preview && (
        <div className="flex items-center justify-between p-2 bg-gray-50 border border-neutral-300 rounded-md">
          <div className="flex items-center">
            <ImageIcon className="w-4 h-4 mr-2 text-neutral-400" />
            <span className="text-sm text-neutral-600">{value.name}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
