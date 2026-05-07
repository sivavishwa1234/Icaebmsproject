import { useState } from "react";
import { z } from "zod";
import { FileUp, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Section from "@/components/Section";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  abstract: z.string().trim().min(50, "Abstract must be at least 50 characters").max(3000),
});

const Submission = () => {
  const [form, setForm] = useState({ name: "", email: "", title: "", abstract: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f) return setFile(null);
    if (f.type !== "application/pdf") {
      setErrors((e) => ({ ...e, file: "Only PDF files are accepted" }));
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrors((e) => ({ ...e, file: "File must be under 10 MB" }));
      return;
    }
    setErrors((e) => ({ ...e, file: "" }));
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    const newErrors: Record<string, string> = {};
    if (!result.success) {
      result.error.issues.forEach((i) => (newErrors[i.path[0] as string] = i.message));
    }
    if (!file) newErrors.file = "Please upload your paper as a PDF";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("fullName", form.name);
      formData.append("email", form.email);
      formData.append("paperTitle", form.title);
      formData.append("abstract", form.abstract);
      formData.append("paperFile", file);

      await axios.post("http://localhost:5000/api/papers/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      setSubmitting(false);
      setSubmitted(true);
      toast({ title: "Submission received", description: "Your paper was uploaded successfully!" });
    } catch (error: any) {
      setSubmitting(false);
      console.error(error);
      toast({ 
        title: "Submission failed", 
        description: error.response?.data?.message || "There was an error submitting your paper.",
        variant: "destructive" 
      });
    }
  };

  if (submitted) {
    return (
      <main className="pt-20">
        <Section eyebrow="Thank You" title="Submission Received">
          <div className="max-w-xl mx-auto text-center bg-card border border-border rounded-3xl p-12 shadow-elegant">
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-5" />
            <p className="text-muted-foreground">
              Your paper has been successfully submitted to ICAEBMS 2026. Our review committee
              will contact you at <span className="text-primary font-semibold">{form.email}</span> within 2–3 weeks.
            </p>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="pt-20 bg-soft min-h-screen">
      <Section
        eyebrow="Paper Submission"
        title={<>Submit Your <span className="text-accent">Research</span></>}
        subtitle="Share your work with a global community. All papers undergo a rigorous double-blind peer review."
      >
        <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-10 shadow-elegant space-y-6">
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Dr. Jane Doe" },
            { name: "email", label: "Email Address", type: "email", placeholder: "jane@university.edu" },
            { name: "title", label: "Paper Title", type: "text", placeholder: "An interdisciplinary study on..." },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold text-primary mb-2">{f.label}</label>
              <input
                type={f.type}
                value={(form as any)[f.name]}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
              />
              {errors[f.name] && <FieldError msg={errors[f.name]} />}
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Abstract</label>
            <textarea
              value={form.abstract}
              onChange={(e) => setForm({ ...form, abstract: e.target.value })}
              rows={6}
              maxLength={3000}
              placeholder="Provide a 200–500 word abstract of your research..."
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
            />
            <div className="flex justify-between mt-1">
              {errors.abstract ? <FieldError msg={errors.abstract} /> : <span />}
              <span className="text-xs text-muted-foreground">{form.abstract.length}/3000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Upload Paper (PDF)</label>
            <label className="flex flex-col items-center justify-center w-full p-8 rounded-xl border-2 border-dashed border-input hover:border-accent bg-background cursor-pointer transition-colors">
              <FileUp className="w-10 h-10 text-accent mb-3" />
              <span className="text-sm font-medium text-primary">
                {file ? file.name : "Click to upload or drag a PDF here"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">Max 10 MB</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
            {errors.file && <FieldError msg={errors.file} />}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent-gradient text-accent-foreground font-semibold shadow-glow hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-transform"
          >
            <Send className="w-5 h-5" />
            {submitting ? "Submitting..." : "Submit Paper"}
          </button>
        </form>
      </Section>
    </main>
  );
};

const FieldError = ({ msg }: { msg: string }) => (
  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
    <AlertCircle className="w-3.5 h-3.5" /> {msg}
  </p>
);

export default Submission;
