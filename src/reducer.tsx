import { createStore } from "redux";
import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { IMainState } from './Interface';

// State Init
const InitState: IMainState = {
    Layout: null,
    Area: [],
}

// immer-Reducer
class MainReducer extends ImmerReducer<IMainState>{
    addComponent(target: string, item: JSX.Element | null) { // ${item} in ${target}
        let draft = this.draftState[target];

        if (Array.isArray(draft)) // IMainState >> React.ReactElement or React.ReactElement[] Check
        {
            let draft_array = draft as Array<JSX.Element | null>;
            draft_array.forEach((v,i) => {
                if(v === null)
                    draft_array[i] = item;
            })
        }
        else
        {
            this.draftState[target] = item;
        }
    }

    removeComponent(target: string)
    {
        delete this.draftState[target];
    }

    makeArea()
    {
        let draft = this.draftState['Area'] as Array<JSX.Element | null>;
        draft.push(null);
    }
}

// Export (Store) and (Function for Dispatch)
export const ActionCreators = createActionCreators(MainReducer);
const reducerFunction = createReducerFunction(MainReducer, InitState);
export const store = createStore(reducerFunction);
