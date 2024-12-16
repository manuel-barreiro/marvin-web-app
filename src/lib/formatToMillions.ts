export const formatToMillions = (value: number) => {
  return `${(value / 1000000).toFixed(1)}M`
}
