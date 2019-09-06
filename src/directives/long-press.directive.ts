import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';

const LONG_PRESS_DEFAULT_TIMEOUT = 500;

const MIN_LONG_PRESS_TIMEOUT = 40;

@Directive({
  selector: '[ion-long-press]',
})
export class LongPressDirective implements OnInit, OnDestroy {

  @Input() longPressTimeout: number;

  @Output() pressed: EventEmitter<any> = new EventEmitter();
  @Output() longPressed: EventEmitter<any> = new EventEmitter();
  @Output() pressEnded: EventEmitter<any> = new EventEmitter();

  private readonly el: HTMLElement;
  private _hammer: HammerManager;
  private longPressTimeoutRef: number;

  constructor(public zone: NgZone,
              el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.longPressTimeout) {
      this.longPressTimeout = LONG_PRESS_DEFAULT_TIMEOUT;
    }
    if (this.longPressTimeout < MIN_LONG_PRESS_TIMEOUT) {
      throw new Error('A limit of 40ms is imposed so you don\'t destroy device performance.');
    }

    this._hammer = new Hammer.Manager(this.el, {
      recognizers: [
        [Hammer.Pan, {direction: Hammer.DIRECTION_VERTICAL}],
        [Hammer.Press],
        [Hammer.Tap],
      ],
    });

    this._hammer.on('pan', (e: any) => {
      this.onPressEnd();
    });

    this._hammer.on('press', (e: any) => {
      this.pressed.emit(e);
      this.clearInt();
      this.longPressTimeoutRef = setTimeout(() => {
        this.longPressed.emit();
      }, this.longPressTimeout) as any;
    });

    this._hammer.on('pressup', (e: any) => {
      this.onPressEnd();
    });

    this._hammer.on('release', (e: any) => {
      this.onPressEnd();
    });

    this.el.addEventListener('mouseleave', (e: any) => {
      this.onPressEnd();
    });

    this.el.addEventListener('mouseout', (e: any) => {
      this.onPressEnd();
    });
  }

  clearInt(): void {
    if (this.longPressTimeoutRef !== undefined) {
      clearTimeout(this.longPressTimeoutRef);
      this.longPressTimeoutRef = undefined;
    }
  }

  onPressEnd(): void {
    this.clearInt();
    this.pressEnded.emit();
  }

  ngOnDestroy(): void {
    this.onPressEnd();
    if (this._hammer) {
      this._hammer.destroy();
      this._hammer = null;
    }
  }
}
