import { AllowedComponentsContainer, AllowedComponentsPropertiesMixin } from './allowedcomponents/AllowedComponentsContainer';
import { PlaceHolderModel } from './ContainerPlaceholder';
declare const ResponsiveGridPropertiesMixin_base: import("vue-class-component/lib/declarations").VueClass<AllowedComponentsPropertiesMixin>;
export declare class ResponsiveGridPropertiesMixin extends ResponsiveGridPropertiesMixin_base {
    columnClassNames: {
        [key: string]: string;
    };
    gridClassNames?: string;
}
declare const ResponsiveGrid_base: import("vue-class-component/lib/declarations").VueClass<AllowedComponentsContainer & ResponsiveGridPropertiesMixin>;
export declare class ResponsiveGrid extends ResponsiveGrid_base {
    _allowedComponentPlaceholderListEmptyLabel: string;
    get containerAttrs(): any;
    get placeholderProps(): PlaceHolderModel;
    getItemComponentProps(item: any, itemKey: string, itemPath: string): {
        [key: string]: string;
    };
}
export {};
//# sourceMappingURL=ResponsiveGrid.d.ts.map