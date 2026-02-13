import { BaseResult } from '@api/models';

/**
 * Элемент перевода.
 */
export interface TranslationItem {
  /** Ключ перевода (уникальный идентификатор строки) */
  key: string;

  /** Значение перевода */
  value: string;

  /** Тип системы, к которому относится перевод (числовой код) */
  systemType: number;
}

/**
 * Результат API с массивом элементов перевода.
 */
export type TranslationsResult = BaseResult<TranslationItem[]>;

/**
 * Объект с переводами на несколько языков.
 */
export type LanguageItem = {
  /** Перевод на русский язык */
  ru: string;

  /** Перевод на узбекский язык */
  uz: string;

  /** Перевод на английский язык */
  en: string;

  /** Перевод на казахский язык */
  kk: string;
};
