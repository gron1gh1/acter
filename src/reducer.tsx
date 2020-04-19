import { createStore } from "redux";
import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { IMainState } from './Interface';

// State Init
const InitState: IMainState = {
    Layout: null,
    Content: []
}

// immer-Reducer
class MainReducer extends ImmerReducer<IMainState>{
    addComponent(target: string, item: JSX.Element): void { // ${item} in ${target}
        let draft = this.draftState[target as keyof IMainState];

        if (Array.isArray(draft)) // IMainState >> React.ReactElement or React.ReactElement[] Check
        {
            let draft_array = draft as Array<JSX.Element>;
            draft_array.push(item);
        }
        else
            this.draftState[target as keyof IMainState] = item as any;
    }
}

// Export (Store) and (Function for Dispatch)
export const ActionCreators = createActionCreators(MainReducer);
const reducerFunction = createReducerFunction(MainReducer, InitState);
export const store = createStore(reducerFunction);
