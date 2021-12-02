import 'reflect-metadata';
import Vue from 'vue';
import { ComponentMapping } from '@adobe/aem-spa-component-mapping';
import { EditConfig } from './components/EditableComponent';
import { ReloadableModelProperties } from './components/ModelProvider';
import { VueConstructor } from 'vue/types/umd';
/**
 * Makes a Vue component mappable to AEM resourceTypes by adding Model config and AEM editing capabilities to it.
 *
 * @param component Vue representation for the component
 * @param editConfig Configuration object for enabling the edition capabilities.
 * @param config Model configuration object.
 * @returns The resulting decorated Component
 */
declare const withMappable: (component: VueConstructor, editConfig?: EditConfig | undefined, config?: ReloadableModelProperties | undefined) => VueConstructor;
/**
 * @private
 */
declare type MapperFunction = (component: VueConstructor, editConfig?: EditConfig) => void;
declare const MapTo: (resourceTypes: string | string[]) => MapperFunction;
declare function withComponentMappingContext(Component: VueConstructor): import("vue/types/vue").ExtendedVue<Vue, {}, {}, {}, Record<string, any>>;
export { ComponentMapping, MapTo, withMappable, withComponentMappingContext };
//# sourceMappingURL=ComponentMapping.d.ts.map