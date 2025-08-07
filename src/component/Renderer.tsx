import { DynamicForm } from "./blocks/DynamicForm"
import { DynamicText } from "./blocks/DynamicText"
import { DynamicImage } from "./blocks/DynamicImage"

export const Renderer = ({ schema }: { schema: any }) => {
  if (!schema?.type) return <p>No schema loaded</p>

  switch (schema.type) {
    case 'form':
      return <DynamicForm fields={schema.fields} submitText={schema.submitText} onSubmit={schema.onSubmit} />
    case 'text':
      return <DynamicText {...schema} />
    case 'image':
      return <DynamicImage {...schema} />
    default:
      return <p>Unknown type: {schema.type}</p>
  }
}
