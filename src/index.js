import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";
import template from './template.html?raw';

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