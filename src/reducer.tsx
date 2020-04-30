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
    addComponent(target: string, item: JSX.Element | null, index?: number) { // ${item} in ${target} , index is start point
        let draft = this.draftState[target];

        if (Array.isArray(draft)) // IMainState >> React.ReactElement or React.ReactElement[] Check
        {
            let draft_array = draft as Array<JSX.Element | null>;
            draft_array.some((v,i)=>{
                if (i === index)
                {
                    draft_array[i] = item;
                    return true;
                }
            });
        }
        else {
            this.draftState[target] = item;
        }
    }

    removeArea(index : number) {
        let draft = this.draftState['Area'] as Array<JSX.Element | null>;
        draft.splice(index,1);
    }

    makeArea() {
        let draft = this.draftState['Area'] as Array<JSX.Element | null>;
        draft.push(null);
    }
}

// Export (Store) and (Function for Dispatch)
export const ActionCreators = createActionCreators(MainReducer);
const reducerFunction = createReducerFunction(MainReducer, InitState);
export const store = createStore(reducerFunction);
