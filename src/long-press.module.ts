import { NgModule } from '@angular/core';
import { LongPressDirective } from './directives/long-press.directive';

@NgModule({
declarations: [LongPressDirective],
exports: [LongPressDirective]
})
export class LongPressModule { }