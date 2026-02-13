export interface EkadrContractItem {
  orderDocumentId: number;
  registrationDate: string;
  orderStatus: string;
  spInstitutionLabel: string;
  spTypeOrderLabel: string;
  isSigner: boolean;
  contractNumber: string;
  dateOfDrawingUpContract: string;
  spTypeOfWeeklyWorkName: string;
  spTypeOfEmploymentContractName: string;
}

export interface EkadrCommandItem {
  createdBy: number;
  createdFullName: string;
  active: boolean;
  id: number;
  registrationDate: string;
  registrationDateTime: string;
  sendPetitionToEmployee: boolean;
  spInstitutionLabel: string;
  typeOrder: string;
  platformType: string;
  governorDocumentType: string;
  typeOrderLabel: string;
  codeOrder: string;
  orderDate: string;
  createOrderDate: string;
  descreption: string;
  orderLifeCycle: string;
  documentLifeCycle: string;
  delettionBasisFileId: string;
  documentStatusForUser: string;
  isImportedFromMehnat: boolean;
  isHidden: boolean;
  isDeleted: boolean;
  spInstitutionId: string;
  fileId: string;
  branchId: string;
  branchName: string;
  syncedWithAnotherPlatform: boolean;
  executedRemoveForStaff: boolean;
  openUrl: string;
  cancelingAnOrderId: string;
  lastModifiedDate: string;
}

export interface EkadrApplication {
  id: number;
  createdDate: string;
  petitionTypeLabel: string;
  ownerInstitution: string;
  ownerName: string;
  statusLabel: string;
  isForSign: boolean;
  status: number;
}

export enum EkadrType {
  COMMAND = 1,
  APPLICATION = 2,
  CONTRACT = 4,
}
