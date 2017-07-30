import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
import { LongPressDirective } from './directives/long-press.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LongPressDirective],
    exports: [LongPressDirective]
})
export class LongPressModule { }