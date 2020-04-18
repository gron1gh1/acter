import CSS from 'csstype';

export interface IDragging {
    state: boolean;
    item: string | null;
}

export interface IMainComponent {
    layout: JSX.Element | null;
    content: JSX.Element[] | null;
}

export interface IMainState{
   Layout : React.ReactElement | null;
   Content: React.ReactElement[];
}

export interface IItem {
    item?: boolean;
    style?: CSS.Properties;
}

export interface IDroppable {
    id: string;
    type: string;
    children: React.ReactNode;
}