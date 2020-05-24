import {UPDATE_THEME, UPDATE_THEME_TYPE} from './actionTypes'

export interface IUpdateThemeAction {
  type: UPDATE_THEME_TYPE,
  appTheme: string
}

const updateThemeAction = (appTheme: string): IUpdateThemeAction => {
  return {
    type: UPDATE_THEME,
    appTheme,
  }
}

export default {
  updateThemeAction
}