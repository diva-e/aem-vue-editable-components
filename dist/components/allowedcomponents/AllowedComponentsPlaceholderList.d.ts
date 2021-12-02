import { Vue } from 'vue-property-decorator';
import { PlaceHolderModel } from '../ContainerPlaceholder';
import { AllowedComponent } from './AllowedComponentsContainer';
/**
 * @private
 */
export interface AllowedComponentPlaceholderListProperties {
    title: string;
    emptyLabel: string;
    components: AllowedComponent[];
    placeholderProps: PlaceHolderModel;
    cqPath: string;
}
/**
 * List of placeholder of the Allowed Component Container.
 *
 * @private
 */
export declare class AllowedComponentPlaceholderList extends Vue {
    emptyLabel?: string;
    placeholderProps: PlaceHolderModel;
    components: AllowedComponent[];
    title?: string;
    cqPath?: string;
    render(createElement: Function): JSX.Element;
}
//# sourceMappingURL=AllowedComponentsPlaceholderList.d.ts.map