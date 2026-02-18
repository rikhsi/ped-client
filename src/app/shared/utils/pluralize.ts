/**
 * Склонение слова по числу (например: 1 день, 2 дня, 5 дней).
 *
 * @param count - число (количество)
 * @param forms - массив из трёх форм слова:
 *   [0] — единственное число (1 день),
 *   [1] — несколько (2–4 дня),
 *   [2] — много (5+ дней).
 * @returns строка с правильной формой слова
 */
export function pluralize(
  count: number,
  forms: [string, string, string],
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}
