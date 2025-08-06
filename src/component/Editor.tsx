import EditorMonaco from "@monaco-editor/react"

interface EditorProps {
  schema: string;
  setSchema: (val: string) => void;
}

export const Editor = ({ schema, setSchema }: EditorProps) => {
  return (
    <div className="border rounded ">
      <EditorMonaco
        height="320px"
        defaultLanguage="json"
        theme="vs-dark"
        value={schema}
        onChange={(val) => val && setSchema(val)}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
    </div>
  )
}
