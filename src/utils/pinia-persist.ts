import type { PiniaPlugin, StateTree } from 'pinia'

const STORE_PREFIX = 'PINIA_STORE_'

export const PiniaPersistPlugin: PiniaPlugin = (context) => {
  const { options, store } = context

  if (!options.persist)
    return

  const paths = Array.isArray(options.persist) ? options.persist : undefined

  if (paths && !paths.length)
    return

  const key = `${STORE_PREFIX}${store.$id}`

  const reserveState = () => {
    try {
      const state = store.$state
      let real: StateTree
      if (paths) {
        real = {}
        paths.forEach((path) => {
          real[path] = state[path]
        })
      }
      else {
        real = state
      }
      localStorage.setItem(key, JSON.stringify(real))
    }
    catch (error) {
      console.error(`Error reserve state for store ${store.$id}:`, error)
    }
  }

  const restoreState = () => {
    try {
      const staled = localStorage.getItem(key)
      if (staled) {
        const parsed = JSON.parse(staled)

        if (paths) {
          const partialState: Partial<StateTree> = {}
          paths.forEach((path) => {
            if (path in parsed) {
              partialState[path] = parsed[path]
            }
          })
          store.$patch(partialState)
        }
        else {
          store.$patch(parsed)
        }
      }
    }
    catch (error) {
      console.error(`Error restoring state for store ${store.$id}:`, error)
    }
  }

  restoreState()

  window.addEventListener('beforeunload', reserveState)
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | Array<keyof S extends string ? keyof S : string>
    // Eliminate type errors
    _storeType?: Store
  }
}
