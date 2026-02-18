import {
  Directive,
  forwardRef,
  HostListener,
  Renderer2,
  input,
  output,
  OnDestroy,
  AfterViewInit,
  effect,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlBaseDirective } from './control-base.directive';

/**
 * Директива для работы с файловым вводом, поддерживает:
 * - стандартный <input type="file">
 * - drag & drop
 * - множественный выбор
 * - фильтрацию по типу файлов (accept)
 *
 * Наследуется от ControlBaseDirective для интеграции с Angular Forms.
 */
@Directive({
  selector: '[pedFileInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputDirective),
      multi: true,
    },
  ],
})
export class FileInputDirective
  extends ControlBaseDirective<File | File[]>
  implements AfterViewInit, OnDestroy
{
  /** accept=".pdf,.zip" / "image/*" — типы файлов, которые разрешены */
  accept = input<string>('*');

  /** Разрешить множественный выбор файлов */
  multiple = input<boolean>(false);

  /** Включить поддержку Drag & Drop */
  enableDrop = input<boolean>(false);

  /** Событие выбора файла/файлов */
  fileChange = output<File | File[]>();

  /** Скрытый input[type=file], создается динамически */
  public fileInput!: HTMLInputElement;

  /** Указатель на функцию отписки от события change */
  private unlistenChange?: () => void;

  constructor(private renderer: Renderer2) {
    super();
    this.syncInputs(); // реактивная синхронизация accept/multiple/disabled
  }

  // ------------------------
  // HostListener: клик → открытие диалога выбора файлов
  // ------------------------
  @HostListener('click')
  onClick(): void {
    if (this.disabled()) return;

    // сброс предыдущего значения
    this.fileInput.value = '';
    this.fileInput.click(); // открытие диалога
    this.markAsTouched();
  }

  // ------------------------
  // Drag & Drop
  // ------------------------
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled() || !this.enableDrop()) return;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled() || !this.enableDrop()) return;

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const filtered = this.filterFiles(files);
    if (!filtered.length) return;

    const value = this.multiple() ? filtered : filtered[0];
    this.applyValue(value);
  }

  // ------------------------
  // Lifecycle Hooks
  // ------------------------
  ngAfterViewInit(): void {
    this.initFileInput(); // создание скрытого input[type=file]
  }

  ngOnDestroy(): void {
    this.unlistenChange?.(); // отписка от события change
    if (this.fileInput) {
      this.renderer.removeChild(document.body, this.fileInput);
    }
  }

  // ------------------------
  // Private методы
  // ------------------------

  /** Создание и настройка скрытого input[type=file] */
  private initFileInput(): void {
    this.fileInput = this.renderer.createElement('input');
    this.renderer.setAttribute(this.fileInput, 'type', 'file');
    this.renderer.setStyle(this.fileInput, 'display', 'none');
    this.renderer.appendChild(document.body, this.fileInput);

    this.unlistenChange = this.renderer.listen(
      this.fileInput,
      'change',
      (event: Event) => {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        if (!files || files.length === 0) return;

        const filtered = this.filterFiles(files);
        if (!filtered.length) return;

        const value = this.multiple() ? filtered : filtered[0];
        this.applyValue(value);
      },
    );
  }

  /** Реактивная синхронизация accept / multiple / disabled */
  private syncInputs(): void {
    effect(() => {
      if (!this.fileInput) return;

      this.renderer.setAttribute(
        this.fileInput,
        'accept',
        this.accept() ?? '*',
      );

      if (this.multiple()) {
        this.renderer.setAttribute(this.fileInput, 'multiple', '');
      } else {
        this.renderer.removeAttribute(this.fileInput, 'multiple');
      }

      this.fileInput.disabled = this.disabled();
    });
  }

  /**
   * Проверка файла по accept
   * Поддерживается:
   * - расширения (.pdf, .zip)
   * - mime-типы (image/*)
   * - точные mime-типы (application/pdf)
   */
  private isFileAccepted(file: File): boolean {
    const accept = this.accept();
    if (!accept || accept === '*') return true;

    const rules = accept.split(',').map((v) => v.trim().toLowerCase());

    return rules.some((rule) => {
      if (rule.startsWith('.')) {
        return file.name.toLowerCase().endsWith(rule);
      }
      if (rule.endsWith('/*')) {
        return file.type.startsWith(rule.replace('/*', ''));
      }
      return file.type === rule;
    });
  }

  /** Фильтрация выбранных файлов по accept */
  private filterFiles(files: FileList | File[]): File[] {
    return Array.from(files).filter((file) => this.isFileAccepted(file));
  }

  /**
   * Применение значения:
   * - обновление value в форме
   * - вызов onChange (Forms API)
   * - эмит события fileChange
   */
  private applyValue(value: File | File[]): void {
    this.value.set(value);
    this.onChange(value);
    this.fileChange.emit(value);
    this.markAsTouched();
  }
}
