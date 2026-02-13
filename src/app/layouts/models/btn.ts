export type ApplicationBtnItem = {
  show: boolean;
  disabled: boolean;
  loading: boolean;
};

export type ApplicationBtn = {
  cancel: ApplicationBtnItem;
  back: ApplicationBtnItem;
  next: ApplicationBtnItem;
  send: ApplicationBtnItem;
};

export type ApplicationBtnData = {
  cancel: boolean;
  back: boolean;
  next: boolean;
  send: boolean;
};

export type ApplicationBtnName = 'cancel' | 'back' | 'next' | 'send';
