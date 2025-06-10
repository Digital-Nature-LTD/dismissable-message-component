import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";
import template from './digital-nature-dismissable-message-component-template.html?raw';

console.log("DigitalNatureDismissableMessageComponent");

export default class DigitalNatureDismissableMessageComponent extends DigitalNatureWebComponent
{
    static tagName = 'digital-nature-dismissable-message';

    constructor(options = {}) {
        super({template: template, ...options});

        this.addEventListener("click", this);
    }

    handleClick (event)
    {
        this.remove();
    }
}

console.log("DigitalNatureDismissableMessageComponent adding to registry");

// add the custom element to the registry
customElements.define(DigitalNatureDismissableMessageComponent.tagName, DigitalNatureDismissableMessageComponent);