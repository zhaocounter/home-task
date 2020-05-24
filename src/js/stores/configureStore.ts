import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { logger } from 'redux-logger'
import rootReducer from '../reducer'
import { isLocal } from '../utils/utils'

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware()
  const middleware: Array<any> = [epicMiddleware]

  if (isLocal()) {
    middleware.push(logger)
  }
  const store = createStore(rootReducer, applyMiddleware(...middleware))
  return store
}