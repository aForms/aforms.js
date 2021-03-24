import {AFormModel, AFormModelClass} from "../../../a-form.model";
import {ClassesHelper} from "../../../helpers/classes.helper";

export interface PanelModal {
    collapsible?: boolean,
    buttonSettings?: {
        cancel?: boolean,
        next?: boolean,
        previous?: boolean
    }
}

export class PanelBuilder {

    constructor(private aFormModel: AFormModel | undefined, private aFormModalClass: AFormModelClass) { }

    createPanel(): HTMLDivElement {
        const segment = document.createElement('div')
        segment.classList.add('ui', 'attached', 'segment', 'a-form-content-holder')
        this.addInternalComponents(segment)
        const container = document.createElement('div')
        if (this.aFormModel?.customClass) {
            new ClassesHelper().addClasses(this.aFormModel?.customClass, container)
        }
        if (typeof this.aFormModel?.label === "string") {
            const h3 = document.createElement('h3')
            h3.classList.add('ui', 'top', 'attached', 'header')
            h3.innerText = this.aFormModel.label
            container.append(h3)
        }
        container.tabIndex = -1
        container.append(segment)
        return container
    }

    /**
     *   Add if any components available inside panel
     */
    addInternalComponents(container: HTMLDivElement) {
        this.aFormModel?.components?.forEach(value => {
            this.aFormModalClass.renderer.renderComponent(value, container)
        })
    }

}
