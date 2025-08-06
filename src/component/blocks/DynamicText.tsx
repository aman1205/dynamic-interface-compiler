export const DynamicText = ({ content, size = "text-lg" }: any) => {
  return <p className={`my-2 ${size}`}>{content}</p>
}
