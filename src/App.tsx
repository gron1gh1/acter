import React, { useState, Fragment } from 'react';
import { Row, Col, Radio } from 'antd';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { IDragging, IMainState, IMenuState } from './Interface';
import { ActionCreators } from './reducer';
import Sidebar from './Sidebar';
import { ItemList } from './StaticData';
import { Scrollbars } from 'react-custom-scrollbars';

const getMainViewStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "white",
    height: '768px',
    display: 'flex',
    flexDirection: 'column',
});
interface IMainView{
    MainLayout: React.ReactElement | null;
}
function MainView({MainLayout}: IMainView) {
    return (
        <div>
            <div style={{ marginLeft: '-870px' }}>

                <Radio.Group defaultValue="PREVIEW" buttonStyle="solid">
                    <Radio.Button value="PREVIEW">PREVIEW</Radio.Button>
                    <Radio.Button value="CODE">CODE</Radio.Button>
                </Radio.Group>
            </div>
            <div style={{ width: '1024px', flexBasis: '768px', background: 'white', overflowY: 'visible' }}>
                <Droppable droppableId="Layout" type="MAINVIEW">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getMainViewStyle(snapshot.isDraggingOver)}>

                            {MainLayout && React.cloneElement(MainLayout, { item: false })}
                            {provided.placeholder}
                        </div>

                    )}
                </Droppable>
            </div>
        </div>
    )
}

function App() {
    const [dragging, SetDragging] = useState<IDragging>({ state: false, item: null }); // Item information at start of drag


    const dispatch = useDispatch();
    const MainLayout: (React.ReactElement | null) = useSelector((state: IMainState) => state.Layout); // Get Data from Reducer to this 

    function onDragEnd(result: DropResult) {
        const { source, destination, type } = result;
        let _type = type as keyof IMenuState;
        if (!destination || source.droppableId === destination.droppableId) return;

        console.log(type, dragging.item, destination.droppableId);
        dragging.item && ItemList[_type] && dispatch(ActionCreators.addComponent(destination.droppableId, ItemList[_type][dragging.item]));
        SetDragging({ state: false, item: null });
    }

    function onDragStart(result: DropResult) { // Item information at start of drag
        SetDragging({ state: true, item: result.draggableId });
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Fragment>
                <Row style={{ height: '100vh' }}>
                    <Col flex="264px" style={{ background: 'white', overflowY: 'hidden', height: '100vh' }}>
                        <Sidebar />
                    </Col>
                    <Col flex="auto" style={{
                        background: 'lightgray', height: '100vh',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                    }}>

                        <MainView MainLayout={MainLayout}/>
                    </Col>
                </Row>
            </Fragment>
        </DragDropContext>
    )
}

export default App;
