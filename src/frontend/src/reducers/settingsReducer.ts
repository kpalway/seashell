import {mergeBetter} from "../helpers/utils";

export interface settingsReducerState {[key: string]: any;
  font?: string;
  fontSize?: number;
  editorMode?: number;
  tabWidth?: number;
  theme?: number;
  editorRatio?: number;
  offlineMode?: number;
  updated?: number;
};
export const settingsActions = {
  updateSettings: "settings_update",
  updateEditorRatio: "settings_editor_ratio_update"
};

export interface settingsReducerAction {type: string; payload: settingsReducerState; };


export default function settingsReducer(state: settingsReducerState = {font: "Consolas", fontSize: 13, editorMode: 0, tabWidth: 1, theme: 1, offlineMode: 0, editorRatio: 0.5, updated: 0}, action: settingsReducerAction = {type: "", payload: {}}) {
  switch (action.type) {
    case settingsActions.updateSettings:
      state.updated = (new Date()).getTime();
      return mergeBetter(state, action.payload);
    case settingsActions.updateEditorRatio:
      state.updated = (new Date()).getTime();
      return mergeBetter(state, {editorRatio: action.payload});
    default:
      return state;
  }
}