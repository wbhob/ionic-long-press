import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
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

    int: number;

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
            this.clearInt();
            this.int = setInterval(() => {
                this.onPressing.emit();
            }, this.interval) as any;
        });

        this.pressGesture.on('pressup', (e: any) => {
            this.pressEnd();
        });

        this.pressGesture.on('pan', (e: any) => {
            this.pressEnd();
        });

        this.pressGesture.on('release', (e: any) => {
            this.pressEnd();
        });

        this.el.addEventListener('mouseleave', (e: any) => {
            this.pressEnd();
        });

        this.el.addEventListener('mouseout', (e: any) => {
            this.pressEnd();
        });
    }

    clearInt() {
        if (this.int !== undefined) {
            clearInterval(this.int);
            this.int = undefined;
        }
    }

    pressEnd() {
        this.clearInt();
        this.onPressEnd.emit();
    }

    ngOnDestroy() {
        this.pressEnd();
        this.pressGesture.destroy();
    }
}