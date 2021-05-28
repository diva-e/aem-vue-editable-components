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
import { Component, Prop } from 'vue-property-decorator'
import {
  Model,
  ModelManager,
  PathUtils
} from '@adobe/aem-spa-page-model-manager'
import { Constants } from '../Constants'
import Utils from '../Utils'
import Vue, { RenderContext, VueConstructor } from 'vue'

/**
 * Configuration object of the withModel function.
 */
export interface ReloadableModelProperties {
  /*
   * Should the model cache be ignored when processing the component.
   */
  forceReload?: boolean;
  /**
   * Should the component data be retrieved from the aem page model
   * and passed down as props on componentMount
   */
  injectPropsOnInit?: boolean;
}


/**
 * Wraps a portion of the page model into a Component.
 * Fetches content from AEM (using ModelManager) and inject it into the passed Vue Component.
 *
 * @private
 */
@Component({
  components: {}
})
export class ModelProvider extends Vue {
  @Prop() isInEditor?: boolean;
  @Prop({ default: {} }) wrappedComponent!: VueConstructor;
  @Prop() cqPath!: string;
  @Prop({ default: true }) injectPropsOnInit?: boolean;
  @Prop() pagePath?: string;
  @Prop() itemPath?: string;
  @Prop({ default: false }) cqForceReload?: boolean;
  @Prop() containerProps!: { [key: string]: string };

  public propsToState (props: any) {
    // Keep private properties from being passed as state
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { wrappedComponent, cqForceReload, injectPropsOnInit, ...state } = props

    return state
  }

  state = this.propsToState(this.$props);

  /**
   * Update model based on given resource path.
   * @param cqPath resource path
   */
  updateData (cqPath?: string): void {
    const { pagePath, itemPath, injectPropsOnInit } = this.$props
    const path =
      cqPath ||
      this.cqPath ||
      (pagePath && Utils.getCQPath({ pagePath, itemPath, injectPropsOnInit }))

    if (!path) {
      return
    }

    ModelManager.getData({ path, forceReload: this.cqForceReload })
      .then((data: Model) => {
        if (data && Object.keys(data).length > 0) {
          this.state = {
            ...this.state,
            ...Utils.modelToProps(data)
          }
          // Fire event once component model has been fetched and rendered to enable editing on AEM
          if (injectPropsOnInit && Utils.isInEditor()) {
            PathUtils.dispatchGlobalCustomEvent(
              Constants.ASYNC_CONTENT_LOADED_EVENT,
              {}
            )
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  mounted () {
    const { pagePath, itemPath, injectPropsOnInit } = this.$props
    let { cqPath } = this.$props
    this.state = this.propsToState(this.$props)

    cqPath = Utils.getCQPath({ pagePath, itemPath, injectPropsOnInit, cqPath })
    this.state.cqPath = cqPath

    if (this.injectPropsOnInit) {
      this.updateData(cqPath)
    }

    ModelManager.addListener(cqPath, this.updateData)
  }

  destroyed () {
    ModelManager.removeListener(this.cqPath, this.updateData)
  }

  render (createElement: Function) {
    return createElement(this.wrappedComponent, {
      props: {
        ...this.state
      },
      key: this.cqPath +'-model-provider'
    })
  }
}

/**
 * @param WrappedComponent Vue representation for the AEM resource types.
 * @param modelConfig General configuration object.
 */
export const withModel = (WrappedComponent: VueConstructor, modelConfig: ReloadableModelProperties = {}) => {
  return Vue.extend({
    functional: true,
    name: 'ModelProvider',
    render (createElement: Function, context: RenderContext) {
      const forceReload = context.props.cqForceReload || modelConfig.forceReload || false
      const injectPropsOnInit = context.props.injectPropsOnInit || modelConfig.injectPropsOnInit || true
      return createElement(ModelProvider, {
        attrs: {
          ...context.data.attrs
        },
        props: {
          ...context.props,
          cqForceReload: forceReload,
          injectPropsOnInit,
          wrappedComponent: WrappedComponent
        },
        key: context.props.cqPath + '-model-provider-wrapper-'
      })
    }
  })
}
