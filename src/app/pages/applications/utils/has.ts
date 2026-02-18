export function transformTextToBool(text: string): boolean {
  return text === 'yes';
}

export function transformBoolToText(state: boolean): string {
  if (state !== null && state !== undefined) {
    return state ? 'yes' : 'no';
  }

  return null;
}
