export function formatDate(date: string): string {
  const dateToBeFormatted = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateToBeFormatted);
}
