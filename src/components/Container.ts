/*
 *  Copyright 2021 Mavice LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import 'reflect-metadata'
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import { CreateElement, VueConstructor } from 'vue'
import { Model } from '@adobe/aem-spa-page-model-manager'
import { ComponentMapping } from '../ComponentMapping'
import { Constants } from '../Constants'
import Utils from '../Utils'
import { ContainerPlaceholder, PlaceHolderModel } from './ContainerPlaceholder'

/**
 * Hold force reload state.
 */
@Component({
  components: {}
})
export class ReloadForceAbleMixin extends Vue {
  @Prop({ default: false }) cqForceReload?: boolean;
}

/**
 * Properties given to every component runtime by the SPA editor.
 */
@Component({
  components: {}
})
export class MappedComponentPropertiesMixin extends Mixins(ReloadForceAbleMixin) {
  @Prop({ default: false }) isInEditor!: boolean;
  @Prop({ default: '' }) cqPath!: string;
}

@Component({
  components: {}
})
export class ContainerStateMixin extends Vue {
  @Prop({}) componentMapping?: ComponentMapping;
}

@Component({
  components: {}
})
export class ContainerPropertiesMixins extends Mixins(MappedComponentPropertiesMixin) {
  @Prop({ default: () => {} }) cqItems!: { [key: string]: Model };
  @Prop({ default: () => [] }) cqItemsOrder?: string[];
  @Prop({ default: () => {} }) componentMapping?: {} | ComponentMapping;
}

@Component({
  components: {}
})
export class Container extends Mixins(ContainerPropertiesMixins, ContainerStateMixin) {
  readonly state = {
    componentMapping: this.componentMapping || ComponentMapping
  };

  /**
   * Returns the child components of this Container.
   * It will instantiate the child components if mapping exists.
   *
   * @returns An array with Vue components
   */
  get childComponents (): VueConstructor[] {
    if (!this.cqItems || !this.cqItemsOrder) {
      return []
    }

    const childComponents: Array<any> = []

    this.cqItemsOrder.forEach((itemKey) => {
      const itemProps = Utils.modelToProps(this.cqItems[itemKey])

      if (itemProps) {
        const ItemComponent = this.state.componentMapping.get(itemProps.cqType)

        if (ItemComponent) {
          childComponents.push(this.connectComponentWithItem(ItemComponent, itemProps, itemKey))
        }
      }
    })

    return childComponents
  }

  /**
   * Connects a child component with the item data.
   *
   * @param ChildComponent
   * @param itemProps
   * @param itemKey
   * @returns The Vue element constructed by connecting the values of the input with the Component.
   */
  protected connectComponentWithItem (
    ChildComponent: any,
    itemProps: any,
    itemKey: string
  ): VueConstructor {
    const itemPath = this.getItemPath(itemKey)
    const isInEditor = this.isInEditor
    const containerProps = this.getItemComponentProps(itemPath, itemKey, itemPath)

    return Vue.extend({
      name: 'ChildComponent',
      render (createElement: CreateElement) {
        return createElement(ChildComponent, {
          props: {
            ...itemProps,
            cqPath: itemPath,
            isInEditor,
            containerProps
          },
          key: itemPath + '-container'
        })
      }
    })
  }

  /**
   * Returns the properties to add on a specific child component.
   *
   * @returns The map of properties.
   * @param _item
   * @param _itemKey
   * @param _itemPath
   */
  getItemComponentProps (
    _item: any,
    _itemKey: string,
    _itemPath: string
  ): { [key: string]: string } {
    return {}
  }

  /**
   * Returns the path of given item.
   *
   * @param itemKey
   * @returns The computed path.
   */
  getItemPath (itemKey: string) {
    return this.cqPath ? this.cqPath + '/' + itemKey : itemKey
  }

  /**
   * The properties for the placeholder component in root element.
   *
   * @returns The map of properties to be added.
   */
  get placeholderProps (): PlaceHolderModel {
    return {
      cqPath: this.cqPath,
      placeholderClassNames: Constants.NEW_SECTION_CLASS_NAMES
    }
  }

  placeholderComponent (): VueConstructor | null {
    const placeholderProps = this.placeholderProps

    if (!this.isInEditor) {
      return null
    }

    return Vue.extend({
      name: 'PlaceholderComponent',
      render (createElement: CreateElement) {
        return createElement(ContainerPlaceholder, {
          props: {
            ...placeholderProps
          }
        })
      }
    })
  }

  /**
   * The properties for the root element of the container.
   *
   * @returns The map of properties.
   */
  containerAttrs (): {[key: string]: string} {
    const dataObject: { [key: string]: any } = {
      class: Constants._CONTAINER_CLASS_NAMES,
      attrs: {}
    }

    if (this.isInEditor) {
      dataObject.attrs[Constants.DATA_PATH_ATTR] = this.cqPath
    }

    return dataObject
  }

  render (createElement: CreateElement) {
    const childComponentsToRender = this.childComponents.map(component =>
      createElement(component)
    )
    const placeholderComponent = this.placeholderComponent()

    if (placeholderComponent) { 
      childComponentsToRender.push(createElement(placeholderComponent))
    }

    return createElement(
      'div',
      {
        ...this.containerAttrs()
      },
      [
        ...childComponentsToRender
      ]
    )
  }
}
