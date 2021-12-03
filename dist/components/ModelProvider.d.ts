import 'reflect-metadata';
import Vue, { VueConstructor } from 'vue';
/**
 * Configuration object of the withModel function.
 */
export interface ReloadableModelProperties {
    forceReload?: boolean;
    /**
     * Should the component data be retrieved from the aem page model
     * and passed down as props on componentMount
     */
    injectPropsOnInit?: boolean;
}
export declare class ModelProviderTypeMixin extends Vue {
    wrappedComponent: VueConstructor;
    cqPath: string;
    injectPropsOnInit?: boolean;
    pagePath?: string;
    itemPath?: string;
    cqForceReload?: boolean;
    containerProps?: {};
    itemKey?: string;
}
declare const ModelProvider_base: import("vue-class-component/lib/declarations").VueClass<ModelProviderTypeMixin>;
/**
 * Wraps a portion of the page model into a Component.
 * Fetches content from AEM (using ModelManager) and inject it into the passed Vue Component.
 *
 * @private
 */
export declare class ModelProvider extends ModelProvider_base {
    isInEditor?: boolean;
    aemNoDecoration?: boolean;
    propsToState(props: any): any;
    state: Record<string, any>;
    get childProps(): any;
    set childProps(props: any);
    /**
     * Update model based on given resource path.
     * @param cqPath resource path
     */
    updateData(cqPath?: string): void;
    mounted(): void;
    destroyed(): void;
    /**
     *  Computed getter used to keep track of changes with the CSS classes.
     */
    get className(): any;
    render(createElement: Function): JSX.Element;
}
/**
 * @param WrappedComponent Vue representation for the AEM resource types.
 * @param modelConfig General configuration object.
 */
export declare const withModel: (WrappedComponent: VueConstructor, modelConfig?: ReloadableModelProperties) => import("vue/types/vue").ExtendedVue<Vue, {}, {}, {}, Record<string, any>>;
export {};
//# sourceMappingURL=ModelProvider.d.ts.map