import { createStore } from "zustand/vanilla";

type Block = {
  id: string;
  type: string;
  [key: string]: any;
};

type SchemaStore = {
  schema: Block[];
  setSchema: (schema: Block[]) => void;
  updateBlock: (id: string, data: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  addBlock: (block: Block) => void;
};

export const schemaStore = createStore<SchemaStore>((set) => ({
  schema: [],
  setSchema: (schema) => set(() => ({ schema })),
  addBlock: (block) =>
    set((state) => ({ schema: [...state.schema, block] })),
  updateBlock: (id, data) =>
    set((state) => ({
      schema: state.schema.map((b) => (b.id === id ? { ...b, ...data } : b)),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      schema: state.schema.filter((b) => b.id !== id),
    })),
}));