import { ChangeEvent } from "react";

interface FileUploadProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FileUpload({
  id,
  value,
  onChange,
  className = "",
}: FileUploadProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you'd handle file upload here
      // For now, we'll just pass the file name
      onChange(file.name);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input type="file" id={id} onChange={handleChange} className="hidden" />
      <label
        htmlFor={id}
        className="flex items-center justify-center w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md cursor-pointer"
      >
        <div className="flex items-center text-sm text-[rgba(17,17,19,0.6)]">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          {value || "Choisir un fichier"}
        </div>
      </label>
    </div>
  );
}
