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

Or using js you can create your component with message/styles in the configuration
```javascript
let myMessage = DigitalNatureDismissableMessageComponent.create({
    'message': 'This was successful!',
    'classes': ['success']
});
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
The component supports custom styles using css variable, the full list of variables and their default values are below.
```css
digital-nature-dismissable-message {
    --message-background-colour: #FFF;
    --message-border-colour: #000;
    --message-border-radius: 1rem;
    --message-border-width: 2px;
    --message-border-style: solid;
    --message-font-weight: 400;
    --message-margin: 1rem 0;
    --message-grid-size: 3rem auto 3rem;
    --message-grid-rows: auto;
    --message-grid-areas: "icon message close";
    --message-grid-areas-gap: 1rem;
    --message-cursor: pointer;
    --message-font-colour: #000;
    --message-font-size: 1rem;
    --message-padding: 0.5rem 0;

    --button-background-colour: #FFF;
    --button-background-size: 20px;
    --button-image-background-url: url(/assets/img/close.svg);
    --button-image-background-repeat: no-repeat;
    --button-image-background-position: center center;
    --button-opacity: 0.5;

    --image-background-colour: #000;
    --image-background-url: url(/assets/img/digital-nature-logo-primary.svg);
    --image-background-repeat: no-repeat;
    --image-background-position: center center;
    --image-background-size: 50%;
}
```


### Custom Template
You can pass a custom template to the component by using the `template` property in the configuration object.

The example below is the default template <i>excluding styles</i>. You can modify it to suit your needs.
```javascript
let myMessage = DigitalNatureDismissableMessageComponent.create({
    'template': `
        <div class="message-container" title="Click to dismiss this message">
            <slot name="message"></slot>
        </div>
        <slot name="dismiss-button">
            <button></button>
        </slot>
    `
});
```
