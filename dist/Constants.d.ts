/**
 * Constants for interacting with AEM components.
 */
export declare class Constants {
    /**
     * Name of the data-cq-data-path data attribute.
     */
    static readonly DATA_PATH_ATTR = "data-cq-data-path";
    /**
     * Name of the data-resource-type data attribute.
     */
    static readonly DATA_CQ_RESOURCE_TYPE_ATTR = "data-cq-resource-type";
    /**
     * Class names associated with a new section component.
     */
    static readonly NEW_SECTION_CLASS_NAMES = "new section";
    /**
     * Class name used to denote aem-container root element.
     */
    static readonly _CONTAINER_CLASS_NAMES = "aem-container";
    /**
     * Class name used to identify the placeholder used to represent an empty component.
     */
    static readonly _PLACEHOLDER_CLASS_NAMES = "cq-placeholder";
    static readonly _PAGE_CLASS_NAMES = "aem-page";
    static readonly _RESPONSIVE_GRID_PLACEHOLDER_CLASS_NAMES = "aem-Grid-newComponent";
    /**
     * Event which indicates that content of remote component has been fetched and loaded in the app
     */
    static readonly ASYNC_CONTENT_LOADED_EVENT = "cq-async-content-loaded";
    /**
     * Selector for WCM mode state meta property.
     */
    static readonly _WCM_MODE_META_SELECTOR = "meta[property=\"cq:wcmmode\"]";
    static readonly TYPE_PROP = ":type";
    static readonly ITEMS_PROP = ":items";
    static readonly ITEMS_ORDER_PROP = ":itemsOrder";
    static readonly PATH_PROP = ":path";
    static readonly CHILDREN_PROP = ":children";
    static readonly HIERARCHY_TYPE_PROP = ":hierarchyType";
    static readonly JCR_CONTENT = "jcr:content";
}
//# sourceMappingURL=Constants.d.ts.map