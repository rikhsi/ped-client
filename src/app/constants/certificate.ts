import { CertificateStatus } from '@api/models';

export const CERT_STATUS_COLOR: Record<CertificateStatus, string> = {
  [CertificateStatus.ACTIVE]: '#22C55E',

  [CertificateStatus.ARCHIVED]: '#EF4444',
};
