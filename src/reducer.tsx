import {createStore} from "redux";
import {createActionCreators,createReducerFunction,ImmerReducer} from "immer-reducer";
import {IMainState} from './Interface';

// State Init
const InitState : IMainState = {
    Layout: null,
    Content: []
}

// immer-Reducer
class MainReducer extends ImmerReducer<IMainState>{
    addComponent(target: string,item : JSX.Element)
    {
        
    }

    setLayout(item : JSX.Element)
    {
        this.draftState.Layout = item;
    }
}

// Export (Store) and (Function for Dispatch)
export const ActionCreators = createActionCreators(MainReducer);
const reducerFunction = createReducerFunction(MainReducer, InitState);
export const store = createStore(reducerFunction);
