"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Renderer } from "./Renderer";
import { v4 as uuid } from "uuid";

export function DnDRenderer({
  schema,
  setSchema,
  setSchemaText,
}: {
  schema: any[];
  setSchema: (val: any[]) => void;
  setSchemaText?: (val: string) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const updateSchema = (newSchema: any[]) => {
    setSchema(newSchema);
    if (setSchemaText) {
      setSchemaText(JSON.stringify(newSchema, null, 2));
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = schema.findIndex((b) => b.id === active.id);
      const newIndex = schema.findIndex((b) => b.id === over.id);
      const newSchema = arrayMove(schema, oldIndex, newIndex);
      updateSchema(newSchema);
    }
  };

  const addBlock = (type: "text" | "form" | "image") => {
    const newBlock =
      type === "text"
        ? { id: uuid(), type: "text", content: "New text block" }
        : type === "image"
        ? {
            id: uuid(),
            type: "image",
            src: "https://picsum.photos/200",
            alt: "New Image",
          }
        : {
            id: uuid(),
            type: "form",
            fields: [
              { label: "Name", type: "text", required: true },
              { label: "Age", type: "number" },
            ],
            submitText: "Submit",
          };
    updateSchema([...schema, newBlock]);
  };

  const handleDelete = (id: string) => {
    console.log("object " + id);
    const newSchema = schema.filter((block) => block.id !== id);
    console.log("Deleting block with id:", id, "New schema:", newSchema);
    updateSchema(newSchema);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => addBlock("form")} className="btn-primary">
          + Form
        </button>
        <button onClick={() => addBlock("text")} className="btn-primary">
          + Text
        </button>
        <button onClick={() => addBlock("image")} className="btn-primary">
          + Image
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={schema.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {schema.map((block) => (
              <SortableBlock key={block.id} id={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

const SortableBlock = ({ id, block }: { id: string; block: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 border rounded shadow-sm bg-white relative"
    >
      <div className="text-xs font-bold uppercase text-gray-500 mb-2">
        {block.type.toUpperCase()}
      </div>
      <Renderer schema={block} />
    </div>
  );
};
