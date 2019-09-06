# Ionic 4 Long Press
Say you need to increment something quickly while pushing a button. Or something. This directive intends to build upon the existing Hammer.JS `press` event that Ionic uses for long pressing, by giving you interval emission.

### Compatibility
This plugin should be compatible with Ionic and Angular 7+. It was tested with Ionic 4.6.0 and Angular 7.2.2.

### Installation
```sh
npm install --save ionic4-long-press
```

### Usage
The directive should work on any HTML element.

Import the module:
```ts
import { LongPressModule } from 'ionic4-long-press';

@NgModule({
    imports: [
        ...
        LongPressModule
        ...
    ]
})
```

And use in your template:
```html
<button ion-button ion-long-press [interval]="400" (pressed)="pressed()" (longPressed)="active()" (pressEnded)="released()"></button>
```

### API
| Item | Description |
|------| ---------- |
`ion-long-press` | Directive to include the press event outputs.
`[interval]` | Number. Allows you to set the interval at which the `longPressed` event will fire. Default `500`.
`(pressed)` | Event fired when the element is initially pressed.
`(longPressed)` | Event fired on the specified interval when the element is being held.
`(pressEnded)` | Event fired when the element is released.

### Caveats
I have instated a 40ms interval limit to prevent poor performance. I recommend a longer interval for heavy computations. If you need this limit lowered, please open an issue explaining your use case.

### Credits
This plugin was originally developed by Wilson Hobbs in July 2017 and updated for Ionic 4 by Robin Giel in September 2019.
