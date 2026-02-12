import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, User as UserIcon } from "lucide-react";

export default function ProfilePhotoUploader({ photoUrl, onUpload, onDelete, disabled = false }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(photoUrl || null);
  const isDisabled = Boolean(disabled);

  useEffect(() => {
    setPreview(photoUrl || null);
  }, [photoUrl]);

  function handleFileSelect(event) {
    if (isDisabled) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType) {
      alert("Apenas JPG e PNG são permitidos.");
      return;
    }

    if (!isValidSize) {
      alert("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    onUpload(file);
  }

  function triggerFilePicker() {
    if (isDisabled) return;
    fileInputRef.current?.click();
  }

  function handleRemove() {
    if (isDisabled) return;
    setPreview(null);
    onDelete();
  }

  return (
    <div className="flex items-center gap-4">
      
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full overflow-hidden border border-purple-200 bg-purple-50 flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon className="w-16 h-16 text-purple-400" />
        )}
      </div>

      {/* Menu ⋮ */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`p-2 rounded-full border border-neutral-300 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-100"
            }`}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          >
            <EllipsisVertical className="w-6 h-6 text-neutral-700" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white shadow-lg border border-neutral-200 rounded-md p-1">
          {!preview && (
            <DropdownMenuItem
              className="px-3 py-2 cursor-pointer hover:bg-neutral-100"
              onSelect={triggerFilePicker}
            >
              Enviar foto
            </DropdownMenuItem>
          )}

          {preview && (
            <>
              <DropdownMenuItem
                className="px-3 py-2 cursor-pointer hover:bg-neutral-100"
                onSelect={triggerFilePicker}
              >
                Trocar foto
              </DropdownMenuItem>

              <DropdownMenuItem
                className="px-3 py-2 cursor-pointer text-red-600 hover:bg-red-50"
                onSelect={handleRemove}
              >
                Remover foto
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isDisabled}
      />
    </div>
  );
}
