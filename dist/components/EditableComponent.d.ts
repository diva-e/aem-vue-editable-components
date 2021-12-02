import 'reflect-metadata';
import Vue, { VueConstructor } from 'vue';
/**
 * Configuration object of the withEditable function.
 *
 * @property emptyLabel - Label to be displayed on the overlay when the component is empty
 * @property isEmpty - Callback function to determine if the component is empty
 * @property resourceType - AEM ResourceType to be added as an attribute on the editable component dom
 */
export interface EditConfig {
    emptyLabel?: string;
    isEmpty(props: any): boolean;
    resourceType?: string;
    isInEditor?: boolean;
    cqPath?: string;
    cqForceReload?: boolean;
}
export declare class EditableComponentProperties extends Vue {
    componentProperties: any;
    editConfig: EditConfig;
    wrappedComponent: VueConstructor;
    containerProps: {
        [key: string]: string;
    };
    cqForceReload?: boolean;
    isInEditor: boolean;
    cqPath: string;
}
declare const EditableComponent_base: import("vue-class-component/lib/declarations").VueClass<EditableComponentProperties>;
/**
 * The EditableComponent provides components with editing capabilities.
 */
export default class EditableComponent extends EditableComponent_base {
    get state(): Record<string, any>;
    /**
     * Properties related to the editing of the component.
     */
    get editProps(): {
        attrs?: undefined;
    } | {
        attrs: {
            'data-cq-data-path': any;
            'data-cq-resource-type': string;
        };
    };
    /**
     * Should an empty placeholder be added.
     *
     * @return
     */
    useEmptyPlaceholder(): boolean;
    protected get emptyPlaceholderProps(): {
        class: string;
        attrs: {
            'data-emptytext': string | undefined;
        };
    } | null;
    /**
     *  Computed getter used to keep track of changes with the CSS classes.
     */
    get className(): string;
    render(createElement: Function): JSX.Element;
}
/**
 * Returns a component wrapper that provides editing capabilities to the component.
 *
 * @param WrappedComponent
 * @param editConfig
 */
export declare function withEditable(WrappedComponent: VueConstructor, editConfig?: EditConfig): VueConstructor;
export {};
//# sourceMappingURL=EditableComponent.d.ts.map