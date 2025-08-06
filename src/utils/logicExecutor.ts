export function executeLogic(values: any, logic?: string) {
  if (!logic) return null
  try {
    const fn = new Function("values", logic)
    return fn(values)
  } catch (err) {
    console.error("Logic execution failed", err)
    throw err
  }
}
