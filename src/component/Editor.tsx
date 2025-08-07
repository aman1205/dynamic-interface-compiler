import EditorMonaco from "@monaco-editor/react";
import { useSchema } from "@/hooks/useSchema";

export const Editor = () => {
  const schema = useSchema((state) => state.schema);
  const setSchema = useSchema((state) => state.setSchema);
  const jsonValue = JSON.stringify(schema, null, 2);
  return (
    <div className="border rounded">
      <EditorMonaco
        height="320px"
        defaultLanguage="json"
        theme="vs-dark"
        value={jsonValue}
        onChange={(val) => {
          if (!val) return;
          try {
            let parsed = JSON.parse(val);
            if (
              Array.isArray(parsed) &&
              parsed.length === 1 &&
              typeof parsed[0] === "string"
            ) {
              try {
                parsed = JSON.parse(parsed[0]);
              } catch {}
            }
            setSchema(Array.isArray(parsed) ? parsed : [parsed]);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
    </div>
  );
};
