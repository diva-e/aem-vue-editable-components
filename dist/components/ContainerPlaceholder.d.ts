import 'reflect-metadata';
import { Vue } from 'vue-property-decorator';
export interface PlaceHolderModel {
    placeholderClassNames: string;
    cqPath: string;
}
/**
 * Placeholder of the Container component.
 *
 * @private
 */
export declare class ContainerPlaceholder extends Vue {
    placeholderClassNames: string;
    cqPath: string;
    render(createElement: Function): JSX.Element;
}
//# sourceMappingURL=ContainerPlaceholder.d.ts.map