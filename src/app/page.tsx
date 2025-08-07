"use client";

import { useEffect } from "react";
import { Editor } from "@/component/Editor";
import { downloadJSON } from "@/utils/downloadJson";
import { SchemaRenderer } from "@/component/DnDRenderer";
import { useSchema } from "@/hooks/useSchema";

const DEFAULT_SCHEMA = [
  {
    id: "a7380f5c-befe-4bd4-873c-aafd5ccc89da",
    type: "form",
    fields: [
      { label: "Email", type: "email", required: true },
      { label: "Age", type: "number", min: 18 }
    ],
    submitText: "Register",
    onSubmit: "if (values.age < 21) return 'Too young';"
  }
];

export default function Home() {
  const schema = useSchema((state) => state.schema);
  const setSchema = useSchema((state) => state.setSchema);

  useEffect(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("schema");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSchema(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (_) {
        setSchema(DEFAULT_SCHEMA);
      }
    } else {
      setSchema(DEFAULT_SCHEMA);
    }
  }, [setSchema]);

  const handleApplySchema = () => {
    const editorText = localStorage.getItem("editorText");
    try {
      if (!editorText) return;
      const parsed = JSON.parse(editorText);
      const normalized = Array.isArray(parsed) ? parsed : [parsed];
      setSchema(normalized);
      localStorage.setItem("schema", JSON.stringify(normalized, null, 2));
    } catch (e: any) {
      alert(e.message || "Invalid JSON format");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          Dynamic Interface Compiler
        </h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            🧾 JSON Editor
          </h2>
          <Editor />
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Live Preview
          </h2>

          <div className="min-h-60">
            {schema.length > 0 ? (
              <SchemaRenderer />
            ) : (
              <div className="text-gray-400 italic mt-6">
                Schema preview unavailable. Fix JSON above and click "Apply
                Schema".
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => downloadJSON(schema)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition"
        >
          Export Schema as JSON
        </button>
      </div>
    </main>
  );
}
