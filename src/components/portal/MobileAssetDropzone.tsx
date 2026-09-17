import { useState } from "react";
import { UploadCloud, Image, CheckCircle2, Send, Star, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/site/PillButton";

interface MobileAssetDropzoneProps {
  companyName: string;
  token: string;
}

export function MobileAssetDropzone({ companyName, token }: MobileAssetDropzoneProps) {
  const [description, setDescription] = useState("");
  const [selectedFileCount, setSelectedFileCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFileCount(e.target.files.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFileCount === 0 && !description.trim()) {
      toast.error("Please select a photo or write a description.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Assets received! Added to your production queue.");
      setDescription("");
      setSelectedFileCount(0);
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 md:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">Mobile Fast-Drop</span>
          <h3 className="text-xl font-bold text-white tracking-tight">Upload Job Photos & Customer Reviews</h3>
        </div>
      </div>
      <p className="text-xs md:text-sm text-neutral-400 mb-6">
        No complicated logins. Snap a completed job on site or take a screenshot of a WhatsApp review. Our production team will crop, optimize, and publish it to your website within 24 hours.
      </p>

      {isSuccess ? (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-6 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white">Photos & Notes Received!</h4>
          <p className="text-xs text-neutral-300 mt-1">
            Our web producer is adding these to <strong>{companyName}</strong>'s live build queue now.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File input box */}
          <label className="border-2 border-dashed border-neutral-700 hover:border-gold-500/60 bg-neutral-950/60 hover:bg-neutral-950/90 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center">
            <Image className="h-8 w-8 text-neutral-400 mb-2" />
            <span className="text-xs font-semibold text-white">
              {selectedFileCount > 0 ? `📁 ${selectedFileCount} photo(s) selected` : "Tap here to select photos from phone or computer"}
            </span>
            <span className="text-[11px] text-neutral-500 mt-1">Accepts JPG, PNG, HEIC from mobile camera (up to 25MB)</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Description text */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Job Description or Review Quote (Optional):
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 'Completed this 3-bed house rewire in Didsbury today. Customer gave 5 stars on Google.'"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
              <span>Included in your Done-For-You Care Plan</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold text-xs px-5 py-3 transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? <span className="animate-spin">⏳</span> : <Send className="h-3.5 w-3.5" />}
              <span>{isSubmitting ? "Uploading…" : "Send to Production Team"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
