import 'reflect-metadata';
import { Model } from '@adobe/aem-spa-page-model-manager';
import { ComponentMapping } from '../ComponentMapping';
import { Container, ContainerPropertiesMixins } from './Container';
import { VNode } from 'vue';
export interface PageModel extends Model {
    ':type': string;
    'id': string;
    ':path': string;
    ':children'?: {
        [key: string]: PageModel;
    };
}
declare const PagePropertiesMixin_base: import("vue-class-component/lib/declarations").VueClass<ContainerPropertiesMixins>;
export declare class PagePropertiesMixin extends PagePropertiesMixin_base {
    cqChildren: {
        [key: string]: PageModel;
    };
}
declare const Page_base: import("vue-class-component/lib/declarations").VueClass<Container & PagePropertiesMixin>;
export declare class Page extends Page_base {
    readonly state: {
        componentMapping: ComponentMapping;
    };
    get containerAttrs(): {};
    /**
     * @returns The child pages of a page.
     */
    get childPages(): VNode[];
    getItemPath(itemKey: string): string;
    render(createElement: Function): JSX.Element;
}
export {};
//# sourceMappingURL=Page.d.ts.map