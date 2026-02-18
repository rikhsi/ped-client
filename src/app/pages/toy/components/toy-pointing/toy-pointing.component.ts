import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompetitionsApiService } from '@api/controllers';
import { VotingVideoSource, VotingVideoSourcePayload } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { StepperComponent } from '@shared/components';
import { SafeResourceUrlPipe } from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';

@Component({
  selector: 'ped-toy-pointing',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    StepperComponent,
    TranslocoDirective,
    SafeResourceUrlPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './toy-pointing.component.html',
  styleUrl: './toy-pointing.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToyPointingComponent implements OnInit {
  votingVideoSource = signal<VotingVideoSource>(null);
  currentStepIndex = signal<number>(0);
  form!: FormGroup;

  constructor(
    private nmRef: NzModalRef<any, VotingVideoSourcePayload>,
    private api: CompetitionsApiService,
    private fb: FormBuilder,
    @Inject(NZ_MODAL_DATA)
    private data: number,
  ) {}

  ngOnInit(): void {
    this.initVotingVideoSource();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      videoSourceId: [this.data],
      videoSourceVotes: this.fb.array([]),
    });
  }

  get votesArray(): FormArray {
    return this.form.get('videoSourceVotes') as FormArray;
  }

  private initVotingVideoSource(): void {
    this.api
      .getVotingVideoSource$(this.data)
      .pipe(
        tap(({ result }) => {
          this.votingVideoSource.set(result);

          result.questions.forEach((q) => {
            this.votesArray.push(
              this.fb.group({
                questionId: [q.id],
                score: [null, Validators.required],
              }),
            );
          });
        }),
      )
      .subscribe();
  }

  close(): void {
    this.nmRef.close();
  }

  submit(): void {
    const form: VotingVideoSourcePayload = this.form.getRawValue();
    this.nmRef.close(form);
  }

  next(): void {
    if (this.currentStepIndex() < 9) {
      this.currentStepIndex.set(this.currentStepIndex() + 1);
    }
  }

  back(): void {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.set(this.currentStepIndex() - 1);
    }
  }
}
