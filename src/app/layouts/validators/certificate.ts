import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AttestationType } from '@api/models';

export const attestationCertificateValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const group = control as any;

  const attestationType = group.get('attestationType')?.value;
  const usePrivilege = group.get('usePrivilege')?.value;
  const dtmCertificateId = group.get('dtmCertificateId')?.value;
  const nationalCertificateId = group.get('nationalCertificateId')?.value;

  // ✅ если условия НЕ выполнены — валидатор НЕ вмешивается
  if (attestationType !== AttestationType.ANOTHERONE || !usePrivilege) {
    return null;
  }

  // ❌ если не заполнено ни одно
  if (!dtmCertificateId && !nationalCertificateId) {
    return {
      certificateRequired: true,
    };
  }

  return null;
};

export const privilegeRequiredForDirectAttestationValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const form = control as any;

  const attestationType = form.get('attestationData.attestationType')?.value;

  const privilegeId = form.get('privilegeId')?.value;

  // ✅ если НЕ DIRECT — валидатор не вмешивается
  if (attestationType !== AttestationType.DIRECT) {
    return null;
  }

  // ❌ DIRECT, но privilegeId не указан
  if (!privilegeId) {
    return {
      privilegeRequired: true,
    };
  }

  return null;
};
