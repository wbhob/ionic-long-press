# Ionic Long Press

Say you need to increment something quickly while pushing a button. Or something. This directive intends to build upon the existing Hammer.JS `press` event that Ionic uses for long pressing, by giving you interval emission.

### Compatibility

This plugin should be compatible with Ionic and Angular 7+. It was tested with Ionic 4.11.5 and Angular 8.2.14.

### Installation

```sh
npm install --save ionic-long-press
```

### Include HammerJs in your Ionic project

#### Step 1

```sh
npm install --save hammerjs @types/hammerjs
```

#### Step 2

```ts
// in src/main.ts.
import 'hammerjs'
```

#### Step 3

Create an IonicGestureConfig.ts file in your utils folder and include this:

```ts
import { Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'

/**
 * @hidden
 * This class overrides the default Angular gesture config.
 */
@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    if (window) {
      const mc = new (<any>window).Hammer(element)

      for (const eventName in this.overrides) {
        if (eventName) {
          mc.get(eventName).set(this.overrides[eventName])
        }
      }
    }

    return mc
  }
}
```

#### Step 4

```ts
// in app.module.ts
import { IonicGestureConfig } from '../utils/IonicGestureConfig'
```

#### Step 5

Add to provider:

```ts

@NgModule({
  imports: [
    ...
  ],
  declarations: [
    ...,
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}],
})
export class MyModule {
}
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
<button ion-button ion-long-press [interval]="400" (pressed)="pressed()" (longPressed)="active()" (pressEnded)="released()"></button>
```

### API

| Item             | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `ion-long-press` | Directive to include the press event outputs.                                                     |
| `[interval]`     | Number. Allows you to set the interval at which the `longPressed` event will fire. Default `500`. |
| `(pressed)`      | Event fired when the element is initially pressed.                                                |
| `(longPressed)`  | Event fired on the specified interval when the element is being held.                             |
| `(pressEnded)`   | Event fired when the element is released.                                                         |

### Caveats

I have instated a 40ms interval limit to prevent poor performance. I recommend a longer interval for heavy computations. If you need this limit lowered, please open an issue explaining your use case.

### Credits

This plugin was originally developed by Wilson Hobbs in July 2017 with contributions from the open source community. Original source code is available for free on GitHub: <https://github.com/wbhob/ionic-long-press>
