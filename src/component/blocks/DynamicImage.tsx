export const DynamicImage = ({ src, alt = "", width = "100%" }: any) => {
  return <img src={src} alt={alt} style={{ width }} className="rounded shadow" />
}
