import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  input,
  output,
  viewChild,
  ElementRef,
} from '@angular/core';
import type { Swiper, SwiperOptions } from 'swiper/types';
import type { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'ped-swiper-container',
  standalone: true,
  template: `
    <swiper-container
      #swiperEl
      (swiperinit)="onInit($any($event))"
      (swiperslidechange)="onSlideChange($any($event))"
      (swiperprogress)="onProgress($any($event))"
      (swiperreachend)="reachEnd.emit($any($event).detail?.at(0))"
      (swiperreachbeginning)="reachBeginning.emit($any($event).detail?.at(0))"
    >
      <ng-content />
    </swiper-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperContainerComponent {
  private swiperEl = viewChild<ElementRef<SwiperContainer>>('swiperEl');
  private initialized = false;

  readonly options = input<SwiperOptions>({});

  readonly slideChange = output<Swiper>();
  readonly progress = output<Swiper>();
  readonly swiperReady = output<Swiper>();
  readonly reachEnd = output<Swiper>();
  readonly reachBeginning = output<Swiper>();

  public swiperRef?: Swiper;

  constructor() {
    effect(() => {
      const elRef = this.swiperEl();
      if (!elRef || this.initialized) return;

      const swiperElement = elRef.nativeElement;

      Object.assign(swiperElement, this.options());
      swiperElement.initialize();

      this.initialized = true;
    });

    effect(() => {
      const elRef = this.swiperEl();
      const config = this.options();

      if (!elRef || !this.initialized) return;

      const swiper = elRef.nativeElement.swiper;
      if (!swiper) return;

      Object.assign(swiper.params, config);
      swiper.update();
    });
  }

  next(): void {
    this.swiperRef?.slideNext();
  }

  prev(): void {
    this.swiperRef?.slidePrev();
  }

  onSlideChange(event: CustomEvent<[Swiper]>) {
    this.slideChange.emit(event.detail?.at(0));
  }

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper] = event.detail;
    this.progress.emit(swiper);
  }

  onInit(event: CustomEvent<[Swiper]>) {
    this.swiperRef = event.detail?.at(0);

    this.swiperReady.emit(this.swiperRef);
  }
}
