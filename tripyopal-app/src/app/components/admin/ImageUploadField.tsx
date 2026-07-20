"use client";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  compact?: boolean;
};

export default function ImageUploadField({ value, onChange, className, compact }: Props) {
  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
        ) : null}
        <label className={`flex-1 cursor-pointer rounded-2xl border border-dashed border-forest-700 bg-forest-950 text-center text-sm text-slate-400 transition hover:border-brand-400 hover:text-slate-200 ${compact ? "px-3 py-2" : "px-4 py-3"}`}>
          Subir imagen desde tu dispositivo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
      <input
        className={inputClass}
        placeholder="O pega la URL de una imagen"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
