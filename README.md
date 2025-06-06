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
    <p slot="message">This is a dismissable message.</p>
</digital-nature-dismissable-message>
```

### Custom buttons
You can add a custom button to the dismissable message by using the `button` slot.
```html
<digital-nature-dismissable-message>
    <p slot="message">This is a dismissable message.</p>
    <button slot="button" class="custom-button">Custom Button</button>
</digital-nature-dismissable-message>
```

### Custom styles
The component supports custom styles using css variable, the full list of variables and their default values can be found in the source code of the component.

There are four main message types: `info`, `warning`, `error`, and `success`. Each type has its own set of CSS variables that can be customised.

The example below shows how to set the success message styles.
```css
digital-nature-dismissable-message {
    --success-image-background-colour: green;
    --success-image-background-url: url('path/to/success-image.png');
    --success-image-background-repeat: no-repeat;
    --success-image-background-position: center center;
    --success-image-background-size: 1rem;
    --success-border-colour: green;
    --success-font-colour: green;
}
```

and the HTML to use the `success` message type:
```html
<!-- other classes are `info`, `warning`, and `error` -->
<digital-nature-dismissable-message class="success">
    <p slot="message">This is a success message.</p>
</digital-nature-dismissable-message>
```


