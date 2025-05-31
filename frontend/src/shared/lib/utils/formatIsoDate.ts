export function formatIsoDate(isoString: string): string {
  const date = new Date(isoString)

  const datePart = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(' г.', ' г.')

  const timePart = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  return `${datePart} ${timePart}`
}
