import CSS from 'csstype';

export interface IDragging {
    state: boolean;
    item: string | null;
}

export interface IMainState {
    [key:string]: (React.ReactElement | null)[] | React.ReactElement | null;
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
    unique_n?: number;
    type: keyof Q;
}

export interface IMakeArea{
  unique_n: number;
}

export interface IMainView {
    MainLayout: React.ReactElement | null;
}

export interface IMakeBox {
    boxColor?: string;
    isClick?: boolean;

}
export interface IDroppableBox{
    isDragging?: boolean;
}
