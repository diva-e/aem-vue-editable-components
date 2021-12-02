import { Vue } from 'vue-property-decorator';
/**
 * @private
 */
export interface AllowedComponentPlaceHolderProperties {
    emptyLabel: string;
    path: string;
}
/**
 * Placeholder for one Allowed Component.
 * @private
 */
export declare class AllowedComponentPlaceholder extends Vue {
    emptyLabel?: string;
    path?: string;
    static get propTypes(): {
        emptyLabel: StringConstructor;
        path: StringConstructor;
    };
    render(createElement: Function): JSX.Element;
}
//# sourceMappingURL=AllowedComponentsPlaceholder.d.ts.map