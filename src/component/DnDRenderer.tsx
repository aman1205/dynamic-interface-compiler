import { useSchema } from "@/hooks/useSchema";
import { v4 as uuid } from "uuid";
import { Renderer } from "./Renderer";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  closestCenter ,
} from "@dnd-kit/core";

const blockTypes = [
  { type: "form", label: "+ Form" },
  { type: "text", label: "+ Text" },
  { type: "image", label: "+ Image" },
];

interface Block {
  id: string;
  type: string;
  [key: string]: any;
} 

function DraggableButton({ type, label }: { type: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable-' + type,
    data: { type },   
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition opacity-${isDragging ? "50" : "100"} cursor-grab`}
      type="button"
    >
      {label}
    </button>
  );
}

export const SchemaRenderer = () => {
  const schema = useSchema((state) => state.schema);
  const addBlock = useSchema((state) => state.addBlock);

  const { isOver, setNodeRef } = useDroppable({
    id: 'main-drop-area',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active?.data?.current?.type) {
      const type = active.data.current.type;
      const id = uuid();

      const block =
        type === "text"
          ? { id, type: "text", content: "New text block" }
          : type === "image"
            ? { id, type: "image", src: "https://picsum.photos/200", alt: "Image" }
            : {
                id,
                type: "form",
                fields: [
                  { label: "Name", type: "text", required: true },
                  { label: "Email", type: "email" },
                ],
                submitText: "Submit",
              };

      addBlock(block); 
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}   collisionDetection={closestCenter}>
      
      <div className="flex gap-2 mb-4">
        {blockTypes.map((btn) => (
          <DraggableButton key={btn.type} type={btn.type} label={btn.label} />
        ))}
      </div>
      <div
        ref={setNodeRef}
        className={`space-y-4 min-h-[200px] border-2 ${
          isOver ? "border-blue-500 bg-blue-50" : "border-dashed"
        } p-4 transition-all`}
      >
        {schema.length === 0 && (
          <div className="text-gray-400 text-center py-8">
            Drag a block button here to add!
          </div>
        )}
        {schema.map((block: Block) => (
          <div key={block.id}>
            <Renderer schema={block} />
          </div>
        ))}
      </div>
    </DndContext>
  );
};
