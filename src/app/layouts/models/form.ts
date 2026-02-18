import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationPayloadAttachedFile, PedagogueCategory } from '@api/models';

export type AttachedFileForm = {
  fileId: FormControl<string>;
  fileType: FormControl<number>;
};

export type TempCertificateForm = {
  serialId: FormControl<string | null>;
  number: FormControl<string | null>;
  category: FormControl<number | null>;
  attachedFileId: FormControl<number | null>;
};

export type AttestationDataForm = {
  attestationType: FormControl<number | null>;
  dtmCertificateId: FormControl<number | null>;
  nationalCertificateId: FormControl<number | null>;
  usePrivilege: FormControl<boolean | null>;
  applyForTeacherOfTheYear: FormControl<boolean | null>;
  applyForMinisterFundAllowance: FormControl<boolean | null>;
  hasDisability: FormControl<boolean>;
};

export type ApplicationForm = {
  institutionId: FormControl<number | null>;
  language: FormControl<number | null>;
  privilegeId: FormControl<number | null>;
  category: FormControl<PedagogueCategory>;
  subjectId: FormControl<number | null>;
  externalId: FormControl<string | null>;
  diplomaId: FormControl<number | null>;
  attachedFiles: FormControl<ApplicationPayloadAttachedFile[]>;
  attestationData: FormGroup<AttestationDataForm>;
};

export type AttestationHelperForm = {
  eduDirection: FormControl<number>;
  districtId: FormControl<number>;
  regionId: FormControl<number>;
  privelegeFileType: FormControl<number>;
  privilegeFile: FormControl<File>;
  diplomaFile: FormControl<File>;
  additionalFile: FormControl<File>;
};

export type AppealForm = {
  applicationId: FormControl<number | null>;
  complaintVariantId: FormControl<number | null>;
  comment: FormControl<string | null>;
};
