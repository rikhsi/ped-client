import { ApplicationType, ApplicationTypeName } from '@api/models';

export const APPLICATION_TYPE_TO_ROUTE: Partial<
  Record<ApplicationType, ApplicationTypeName>
> = {
  [ApplicationType.ATTESTATION]: ApplicationTypeName.ATTESTATION,
  [ApplicationType.DISTANT_AREAS]: ApplicationTypeName.DISTANT_AREAS,
  [ApplicationType.MMTV]: ApplicationTypeName.MMTV,
};
