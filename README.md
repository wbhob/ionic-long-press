# Ionic Long Press
Say you need to increment something quickly while pushing a button. Or something. This directive intends to build upon the existing Hammer.JS `press` event that Ionic uses for long pressing, by giving you interval emission.

### Compatibility
This plugin should be compatible with Ionic and Angular 2+. It was tested with Ionic 3.5.0 and Angular 4.1.3, but the APIs have not changed since Angular 2 final. If this compatibility information is wrong, please open an issue.

### Installation
```sh
npm install --save ionic-long-press
```

### Usage
The directive should work on any HTML element.

Import the module:
```ts
import { LongPressModule } from 'ionic-long-press';

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
<button ion-button ion-long-press [interval]="400" (onPressStart)="pressed()" (onPressing)="active()" (onPressEnd)="released()"></button>
```

### API
| Item | Description |
|------| ---------- |
`ion-long-press` | Directive to include the press event outputs.
`[interval]` | Number. Allows you to set the interval at which the `onPressing` event will fire. Default `500`.
`(onPressStart)` | Event fired when the element is initially pressed.
`(onPressing)` | Event fired on the specified interval when the element is being held.
`(onPressEnd)` | Event fired when the element is released.

### Caveats
I have instated a 40ms interval limit to prevent poor performance. I recommend a longer interval for heavy computations. If you need this limit lowered, please open an issue explaining your use case.

### Credits
This plugin was developed by Wilson Hobbs in July 2017.
