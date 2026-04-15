import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface Props {
  onFileSelect: (file: File) => void;
  file?: File | null;
}

export default function UploadZone({ onFileSelect, file }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];

    // basic validation
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.endsWith(".docx")
    ) {
      alert("Only PDF or DOCX files are allowed");
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  return (
    <Card
      className="border-2 border-dashed cursor-pointer hover:border-primary transition"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleBrowseClick}
    >
      <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        
        {/* Icon */}
        <div className="text-4xl">📄</div>

        {/* Text */}
        {!file ? (
          <>
            <p className="text-primary font-medium">
              Drop your resume here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse (PDF or DOCX)
            </p>
          </>
        ) : (
          <>
            <p className="font-medium text-primary">
              {file.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Click to change file
            </p>
          </>
        )}

        {/* Button (optional but nice UX) */}
        <Button variant="outline" type="button">
          Choose File
        </Button>

        {/* Hidden input */}
        <Input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />
      </CardContent>
    </Card>
  );
}