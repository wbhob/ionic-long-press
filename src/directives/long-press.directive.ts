import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, NgZone } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[ion-long-press]'
})
export class LongPressDirective implements OnInit, OnDestroy {

    @Input() interval: number;

    @Output() onPressStart: EventEmitter<any> = new EventEmitter();
    @Output() onPressing: EventEmitter<any> = new EventEmitter();
    @Output() onPressEnd: EventEmitter<any> = new EventEmitter();

    el: HTMLElement;
    pressGesture: Gesture;

    int: any;

    constructor(
        public zone: NgZone,
        el: ElementRef
    ) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        if (!this.interval) this.interval = 500;
        if (this.interval < 40) {
            throw new Error('A limit of 40ms is imposed so you don\'t destroy device performance. If you need less than a 40ms interval, please file an issue explaining your use case.');
        }
        this.pressGesture = new Gesture(this.el);
        this.pressGesture.listen();
        this.pressGesture.on('press', (e: any) => {
            this.onPressStart.emit(e);
            this.zone.run(() => {
                this.int = setInterval(() => {
                    this.onPressing.emit();
                }, this.interval);
            });
        });

        this.pressGesture.on('pressup', (e: any) => {
            this.zone.run(() => {
                clearInterval(this.int);
            });
            this.onPressEnd.emit();
        });
    }

    ngOnDestroy() {
        this.zone.run(() => {
            clearInterval(this.int);
        });
        this.onPressEnd.emit();
        this.pressGesture.destroy();
    }
}