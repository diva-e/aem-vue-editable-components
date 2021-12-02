import { Vue } from 'vue-property-decorator';
import { Container } from '../Container';
/**
 * Component that is allowed to be used on the page by the editor.
 */
export interface AllowedComponent {
    path: string;
    title: string;
}
export interface AllowedComponents {
    /**
     * Should AllowedComponents list be applied.
     */
    applicable: boolean;
    components: AllowedComponent[];
}
export declare class AllowedComponentsPropertiesMixin extends Vue {
    _allowedComponentPlaceholderListEmptyLabel?: string;
    allowedComponents?: AllowedComponents;
    title?: string;
}
declare const AllowedComponentsContainer_base: import("vue-class-component/lib/declarations").VueClass<Container & AllowedComponentsPropertiesMixin>;
/**
 * Represents allowed components container in AEM.
 */
export declare class AllowedComponentsContainer extends AllowedComponentsContainer_base {
    render(createElement: Function): JSX.Element;
}
export {};
//# sourceMappingURL=AllowedComponentsContainer.d.ts.map