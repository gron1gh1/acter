import CSS from 'csstype';

export interface IDragging {
    state: boolean;
    item: string | null;
}

export interface IMainState {
    Layout: React.ReactElement | null;
    Header: React.ReactElement[];
    Content: React.ReactElement[];
    Sidebar: React.ReactElement[];
    Footer: React.ReactElement[];
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
    id: keyof T;
    type: keyof Q;
}