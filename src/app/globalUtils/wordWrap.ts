import type { LanguageCode } from "#/design/shared/language";

// Ukrainian: Cyrillic alphabet with specific Ukrainian characters (ґ, є, і, ї, ')
// Syllable-based pattern respecting soft sign (ь) and apostrophe (')
const regex_ukr =
  /[бвгґджзйклмнпрстфхцчшщ]+[аеєиіїоуюя][бвгґджзйклмнпрстфхцчшщ](?=[бвгґджзйклмнпрстфхцчшщь ])[ь']?|[бвгґджзйклмнпрстфхцчшщ]+[аеєиіїоуюя][й]?|[аеєиіїоуюя][бвгґджзйклмнпрстфхцчшщ](?=[бвгґджзйклмнпрстфхцчшщь ])[ь']?|[аеєиіїоуюя](?=[а-яґєіїь]{2})|(?<= +)[^\s]+(?= +|$)/gim;

// Spanish: Respects open syllables (CV), diphthongs, and consonant clusters
// Never splits inseparable clusters (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, tr)
const regex_esp =
  /(?:[^aeiouáéíóúüñ\s]?[lr])?[^aeiouáéíóúüñ\s]*[aeiouáéíóúü]+[^aeiouáéíóúüñ\s]?(?=[^aeiouáéíóúüñ\s]*[aeiouáéíóúü])|[^aeiouáéíóúüñ\s]+[aeiouáéíóúü]+|(?<= +)[^\s]+(?= +|$)/gim;

// English: Simplified syllable pattern with vowel recognition (including y)
// Handles basic CV patterns and common consonant-vowel boundaries
const regex_eng =
  /[bcdfghjklmnpqrstvwxz]*[aeiouy]+[bcdfghjklmnpqrstvwxz]?(?=[bcdfghjklmnpqrstvwxz][aeiouy])|[bcdfghjklmnpqrstvwxz]+[aeiouy]+|(?<= +)[^\s]+(?= +|$)/gim;

const REGEX_BY_LANGUAGE: Record<LanguageCode, RegExp> = {
  ukr: regex_ukr,
  esp: regex_esp,
  eng: regex_eng,
};

export type wordWrapOptions = {
  text: string;
  limit: number;
  language?: LanguageCode;
};
export function wordWrap({
  text,
  limit,
  language = "ukr",
}: wordWrapOptions): string {
  const regex = REGEX_BY_LANGUAGE[language] ?? regex_ukr;

  let out = "",
    offset = 0,
    prev = 0,
    pass = false;
  const matches = text.matchAll(regex);

  for (const m of matches) {
    if (m.index - offset > limit) {
      const hyphen = text[prev - 1] == " " ? "" : "-";
      out += text.substring(offset, prev) + hyphen + "\n";
      offset = prev;
    }

    if (!pass) prev = m.index;
    pass = m[0].length < 2;
  }

  out += text.substring(offset);
  return out;
}
