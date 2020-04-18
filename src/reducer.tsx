import {createStore} from "redux";
import {createActionCreators,createReducerFunction,ImmerReducer} from "immer-reducer";
import {IMainState} from './Interface';
// State Init

const InitState : IMainState = {
    Component: {
        Layout: null,
        Content: []
    }
}
// immer-Reducer

class MainReducer extends ImmerReducer<IMainState>{
    addComponent(target: string,item : JSX.Element)
    {
        
    }

    setLayout(item : JSX.Element)
    {
        this.draftState.Component.Layout = item;
    }
}


export const ActionCreators = createActionCreators(MainReducer);
const reducerFunction = createReducerFunction(MainReducer, InitState);

export const store = createStore(reducerFunction);
