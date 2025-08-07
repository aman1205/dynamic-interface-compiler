'use client'
import { useForm } from "react-hook-form"
import { executeLogic } from "@/utils/logicExecutor"

export const DynamicForm = ({ fields = [], submitText = "Submit", onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitHandler = (values: any) => {
    try {
      const result = executeLogic(values, onSubmit);
      if (result) {
        alert(result);
      } else {
        console.log("Form Submitted:", values);
        alert("Success!");
      }
    } catch (err) {
      alert("Error in logic: " + (err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {fields.map((field: any, i: number) => (
        <div key={field.name || field.label || i} className="flex flex-col">
          <label>{field.label}</label>
          <input
            type={field.type}
            {...register(field.name || field.label?.toLowerCase() || `field${i}`, {
              required: field.required,
              min: field.min,
              max: field.max,
            })}
            min={field.min}
            max={field.max}
            className="p-2 border rounded"
          />
          {errors[field.name || field.label?.toLowerCase() || `field${i}`] && (
            <span className="text-red-500 text-sm">Invalid value</span>
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">
        {submitText}
      </button>
    </form>
  );
}
