import { Type } from '@angular/core';

export type TableClickFunc = (e: any) => void;

export interface TableColumn<T = any> {
  key: string;
  label: string;
  width?: string;
  render?: Type<any>;
}

export type TableClickType<T> = { event: string; row: T };
