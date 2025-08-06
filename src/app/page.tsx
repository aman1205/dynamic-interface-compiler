"use client";
import { useState, useEffect } from "react";
import { Editor } from "@/component/Editor";
import { Renderer } from "@/component/Renderer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { downloadJSON } from "@/utils/downloadJson";

const DEFAULT_SCHEMA = JSON.stringify(
  {
    type: "form",
    fields: [
      { label: "Email", type: "email", required: true },
      { label: "Age", type: "number", min: 18 },
    ],
    submitText: "Register",
    onSubmit: "if (values.age < 21) return 'Too young';",
  },
  null,
  2
);

export default function Home() {
  const [schemaText, setSchemaText] = useLocalStorage<string>(
    "json-schema",
    DEFAULT_SCHEMA
  );
  const [parsedSchema, setParsedSchema] = useState<any>(null);

  useEffect(() => {
    try {
      setParsedSchema(JSON.parse(schemaText));
    } catch (e) {
      setParsedSchema(null);
    }
  }, [schemaText]);

  return (
    <div className="w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">⚙️ Dynamic Interface Compiler</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Editor schema={schemaText} setSchema={setSchemaText} />
        <div className="border p-4 rounded-md min-h-80">
          <Renderer schema={parsedSchema} />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => parsedSchema && downloadJSON(parsedSchema)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
