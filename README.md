# Digital Nature - Dismissable Message Web Component
This package contains a dismissable message web component.

The component supports adding and removing of messages, and will rotate through the given messages in a loop.


## Usage

### Simple usage
Import the component, this will register the custom element `<digital-nature-dismissable-message>`.
```javascript
// js
import DigitalNatureDismissableMessageComponent from '@digital-nature-ltd/dismissable-message-component';
```

Use the message slot to add a message to the dismissable message component.

```html
<!-- html file -->
<digital-nature-dismissable-message>
    <slot name="message">This is a dismissable message.</slot>
</digital-nature-dismissable-message>
```

### Custom buttons
You can add a custom button to the dismissable message by using the `button` slot.
```html
<digital-nature-dismissable-message>
    <slot name="message">This is a dismissable message.</slot>
    <slot name="button">
        <button class="custom-button">Custom Button</button>
    </slot>
</digital-nature-dismissable-message>
```

