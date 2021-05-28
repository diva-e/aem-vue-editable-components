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
import Vue, { CreateElement, RenderContext } from 'vue'
import { ComponentMapping } from '@adobe/aem-spa-component-mapping'
import { EditConfig, withEditable } from './components/EditableComponent'
import {
  ReloadableModelProperties,
  withModel
} from './components/ModelProvider'
import { withEditorContext } from './EditorContext'
import { VueConstructor } from 'vue/types/umd'

/**
 * @private
 */
const wrappedMapFct = ComponentMapping.map
/**
 * @private
 */
const wrappedGetFct = ComponentMapping.get

/**
 * Makes a Vue component mappable to AEM resourceTypes by adding Model config and AEM editing capabilities to it.
 *
 * @param component Vue representation for the component
 * @param editConfig Configuration object for enabling the edition capabilities.
 * @param config Model configuration object.
 * @returns The resulting decorated Component
 */
const withMappable = (
  component: VueConstructor,
  editConfig?: EditConfig,
  config?: ReloadableModelProperties
): VueConstructor => {
  const { injectPropsOnInit = true, forceReload = false, ...rest } =
    config || {}
  const configToUse: ReloadableModelProperties = { injectPropsOnInit, forceReload, ...rest }

  return withEditorContext(withModel(withEditable(component, editConfig), configToUse))
}

/**
 * Map a Vue component with the given resource types.
 * If an {@link EditConfig} is provided the component is wrapped to provide editing capabilities on the AEM Page Editor
 *
 * @param resourceTypes List of resource types for which to use the given component.
 * @param component Vue representation for the given resource types.
 * @param editConfig Configuration object for enabling the edition capabilities.
 * @param config Model configuration object.
 * @returns The resulting decorated Component
 */
ComponentMapping.map = function map (
  resourceTypes: string | string[],
  component: VueConstructor,
  editConfig?: EditConfig,
  config?: ReloadableModelProperties
) {
  const { injectPropsOnInit = true, ...rest } = config || {}
  const innerComponent = withMappable(component, editConfig, {
    injectPropsOnInit,
    ...rest
  })

  wrappedMapFct.call(ComponentMapping, resourceTypes, innerComponent)

  return innerComponent
}

ComponentMapping.get = wrappedGetFct

/**
 * @private
 */
type MapperFunction = (component: VueConstructor, editConfig?: EditConfig) => void;

const MapTo = (resourceTypes: string | string[]): MapperFunction => {
  return (clazz: VueConstructor, config?: EditConfig) => {
    // @ts-ignore
    return ComponentMapping.map(resourceTypes, clazz, config)
  }
}

function withComponentMappingContext (Component: VueConstructor) {
  return Vue.extend({
    functional: true,
    name: 'ComponentMappingContext',
    render (createElement: CreateElement, context: RenderContext) {
      return createElement(Component, {
        props: {
          ...context.props,
          componentMapping: context.props.componentMapping || ComponentMapping
        }
      })
    }
  })
}

export { ComponentMapping, MapTo, withMappable, withComponentMappingContext }
