import { FormControl } from '@angular/forms';
import { PedagogueCategory } from '@api/models';

export type AttestationInfoForm = {
  subjectId: FormControl<number>;
  attestationType: FormControl<number>;
  language: FormControl<number>;
  category: FormControl<PedagogueCategory>;
};
