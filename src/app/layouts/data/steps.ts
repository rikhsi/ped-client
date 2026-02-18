import { ApplicationStep } from '../models';

export const ATTESTATION_DEFAULT_STEPS: ApplicationStep[] = [
  {
    route: 'diploma',
  },
  {
    route: 'institution',
  },
  {
    route: 'info',
  },
  {
    route: 'additional-file',
  },
  {
    route: 'check',
  },
];

export const ATTESTATION_DIRECT_STEPS: ApplicationStep[] = [
  {
    route: 'diploma',
  },
  {
    route: 'institution',
  },
  {
    route: 'info',
  },
  {
    route: 'privilege',
  },
  {
    route: 'additional-file',
  },
  {
    route: 'check',
  },
];

export const ATTESTATION_ANOTHER_ONE_STEPS: ApplicationStep[] = [
  {
    route: 'diploma',
  },
  {
    route: 'institution',
  },
  {
    route: 'info',
  },
  {
    route: 'certificate-privilege',
  },
  {
    route: 'additional-file',
  },
  {
    route: 'check',
  },
];

export const MMTV_STEPS: ApplicationStep[] = [
  {
    route: 'diploma',
  },
  {
    route: 'institution',
  },
  {
    route: 'check',
  },
];

export const APPEAL_STEPS: ApplicationStep[] = [
  {
    route: 'select',
  },
  {
    route: 'reason',
  },
  {
    route: 'check',
  },
];
