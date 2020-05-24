import { IUpdateThemeAction } from '../action/appActions'
import { UPDATE_THEME } from '../action/actionTypes'

let initState = {
  appTheme: 'light'
}

export interface IAppState {
  appTheme: string
}

export default function appReducer(state = initState, action: IUpdateThemeAction) {
  switch (action.type) {
    case UPDATE_THEME: 
      state = {
        ...state,
        appTheme: action.appTheme
      }
    break
    default:
      break
  }
  return state
}