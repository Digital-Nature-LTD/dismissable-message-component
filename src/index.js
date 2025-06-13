import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";
// import template from './template.html?raw';



let template = `
<div class="message-container" title="Click to dismiss this message">
    <slot name="message"></slot>
</div>
<slot name="dismiss-button">
    <button></button>
</slot>



<style>
    :host {
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

        --hover-top: 1px;

        display: grid;
        grid-template-columns: var(--message-grid-size);
        grid-template-rows: var(--message-grid-rows);
        grid-template-areas: var(--message-grid-areas);
        align-items: center;
        gap: var(--message-grid-areas-gap);
        position: relative;
        cursor: var(--message-cursor);

        background: var(--message-background-colour);
        font-size: var(--message-font-size);
        border: var(--message-border-width) var(--message-border-style) var(--message-border-colour);
        border-radius: var(--message-border-radius);
        color: var(--message-font-colour);
        padding: 0;
        overflow: hidden;
        margin: var(--message-margin);
        font-weight: var(--message-font-weight);

        &:before {
            grid-area: icon;
            content: "";
            display: block;
            aspect-ratio: 1 / 1;
            height: calc(100% - (2 * var(--message-border-width)));
            max-width: 100%;
            background-color: var(--image-background-colour);
            background-image: var(--image-background-url);
            background-repeat: var(--image-background-repeat);
            background-position: var(--image-background-position);
            background-size: var(--image-background-size);
            border: var(--message-border-width) solid var(--message-background-colour);
            border-radius: var(--message-border-radius);
        }
    }

    :host(:hover) {
        top: var(--hover-top);

        slot[name="dismiss-button"] {
            button {
                opacity: 1;
            }
        }
    }

    .message-container {
        padding: var(--message-padding);
        grid-area: message;
    }

    slot[name="dismiss-button"] {
        grid-area: close;

        &:hover {
            button {
                opacity: 1;
            }
        }

        button {
            border: none;
            cursor: pointer;
            font-size: 0;
            width: 100%;
            height: 100%;
            padding: 0;
            background: var(--button-background-colour);
            background-image: var(--button-image-background-url);
            background-repeat: var(--button-image-background-repeat);
            background-position: var(--button-image-background-position);
            background-size: var(--button-background-size);
            opacity: var(--button-opacity);
        }
    }
</style>`






export default class DigitalNatureDismissableMessageComponent extends DigitalNatureWebComponent
{
    static tagName = 'digital-nature-dismissable-message';

    constructor(options = {}) {
        super({template: template, ...options});

        this.addEventListener("click", this);

        if (options.message) {
            this.setSlotTextContent('message', options.message);
        }

        if (options.classes) {
            options.classes.forEach(cls => this.classList.add(cls));
        }
    }

    handleClick (event)
    {
        this.remove();
    }
}

// add the custom element to the registry
customElements.define(DigitalNatureDismissableMessageComponent.tagName, DigitalNatureDismissableMessageComponent);

