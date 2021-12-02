import 'reflect-metadata';
import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { Model } from '@adobe/aem-spa-page-model-manager';
import { ComponentMapping } from '../ComponentMapping';
import { PlaceHolderModel } from './ContainerPlaceholder';
/**
 * Hold force reload state.
 */
export declare class ReloadForceAbleMixin extends Vue {
    cqForceReload?: boolean;
}
declare const MappedComponentPropertiesMixin_base: import("vue-class-component/lib/declarations").VueClass<ReloadForceAbleMixin>;
/**
 * Properties given to every component runtime by the SPA editor.
 */
export declare class MappedComponentPropertiesMixin extends MappedComponentPropertiesMixin_base {
    isInEditor: boolean;
    cqPath: string;
}
export declare class ContainerStateMixin extends Vue {
    componentMapping?: ComponentMapping;
}
declare const ContainerPropertiesMixins_base: import("vue-class-component/lib/declarations").VueClass<MappedComponentPropertiesMixin>;
export declare class ContainerPropertiesMixins extends ContainerPropertiesMixins_base {
    cqItems: {
        [key: string]: Model;
    };
    cqItemsOrder?: string[];
    componentMapping?: {} | ComponentMapping;
}
declare const Container_base: import("vue-class-component/lib/declarations").VueClass<ContainerStateMixin & ContainerPropertiesMixins>;
export declare class Container extends Container_base {
    readonly state: {
        componentMapping: ComponentMapping;
    };
    /**
     * Returns the child components of this Container.
     * It will instantiate the child components if mapping exists.
     *
     * @returns An array with the components instantiated to JSX
     */
    get childComponents(): VNode[];
    /**
     * Connects a child component with the item data.
     *
     * @param ChildComponent
     * @param itemProps
     * @param itemKey
     * @returns The Vue element constructed by connecting the values of the input with the Component.
     */
    protected connectComponentWithItem(ChildComponent: any, itemProps: any, itemKey: any): VNode;
    /**
     * Returns the properties to add on a specific child component.
     *
     * @param item
     * @param itemKey
     * @param itemPath
     * @returns The map of properties.
     */
    getItemComponentProps(item: any, itemKey: string, itemPath: string): {
        [key: string]: string;
    };
    /**
     * Returns the path of given item.
     *
     * @param itemKey
     * @returns The computed path.
     */
    getItemPath(itemKey: string): string;
    /**
     * The properties for the root element of the container.
     *
     * @returns The map of properties.
     */
    get containerAttrs(): any;
    /**
     * The properties for the placeholder component in root element.
     *
     * @returns The map of properties to be added.
     */
    get placeholderProps(): PlaceHolderModel;
    placeholderComponent(): VNode | null;
    render(createElement: Function): JSX.Element;
}
export {};
//# sourceMappingURL=Container.d.ts.map