const ruDateFormatter = new Intl.DateTimeFormat("ru-RU");

export function formatDate(date: Date) {
  return ruDateFormatter.format(date);
}