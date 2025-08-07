import { useStore } from "zustand";
import { schemaStore } from "@/store/schemaStore";

export const useSchema = <T>(selector: (store: any) => T): T =>
  useStore(schemaStore, selector);
