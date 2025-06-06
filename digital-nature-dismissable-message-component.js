import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";
import template from './digital-nature-dismissable-message-component-template.html?raw';

export default class DigitalNatureDismissableMessageComponent extends DigitalNatureWebComponent
{
    static tagName = 'digital-nature-dismissable-message';

    constructor(options = {}) {
        super({...options, template: template});

        this.addEventListener("click", this);
    }

    handleClick (event)
    {
        this.remove();
    }
}

// add the custom element to the registry
customElements.define(DigitalNatureDismissableMessageComponent.tagName, DigitalNatureDismissableMessageComponent);