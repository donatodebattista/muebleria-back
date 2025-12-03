export function isValidDDMMYYYY(value: unknown): boolean {
  if (typeof value !== "string") return false

  const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
  const m = re.exec(value)
  if (!m) return false

  const day = Number(m[1])
  const month = Number(m[2])
  const year = Number(m[3])

  const d = new Date(Date.UTC(year, month - 1, day))
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
  )
}
