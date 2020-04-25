import CSS from 'csstype';
import { ReactElement } from 'react';

export interface IDragging {
    state: boolean;
    item: string | null;
}

export interface IMainState {
    [key:string]: React.ReactElement[] | ReactElement | null;
}
export interface IMenuState{
    MAINVIEW: {
        [key: string]: React.ReactElement | null
    };
    COMPONENT : {
        [key: string]: React.ReactElement | null
    };
}

export interface IItem {
    item?: boolean;
    style?: CSS.Properties;
}

export interface IDroppable<T,Q> {
    id: string;
    type: keyof Q;
}