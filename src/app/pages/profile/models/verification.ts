export interface VerificationModalData {
  fieldType: 'phone' | 'email';
  currentValue: string;
  label: string;
}

export interface VerificationModalResult {
  newValue: string;
  verified: boolean;
}
