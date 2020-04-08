import React,{useState,Fragment} from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Layout_1, Layout_2, Layout_3, Layout_4 } from './ItemComponent';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import produce from 'immer';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'white',
    padding: grid,
    width: 250,
});

function App() {
  const [dragging, SetDragging] = useState({ state: false, item: null });
    const ItemList = {
        layout_1: <Layout_1 />,
        layout_2: <Layout_2 />,
        layout_3: <Layout_3 />,
        layout_4: <Layout_4 />,
    };
    const [MainComponents, AddComponent] = useState(
        {
            layout: null,
            content: []
        }
    );
    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination || source.droppableId === destination.droppableId) return;
        AddComponent(produce(MainComponents, draft => {
            draft.layout = ItemList[dragging.item];
        }));

        SetDragging({ state: false, item: null });
    }
    function onDragStart(result) {
        SetDragging({ state: true, item: result.draggableId });
    }
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Fragment>
                <Row style={{ height: '100vh' }}>
                    <Col xs={4} style={{ background: 'white' }}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {Object.keys(ItemList).map((v, idx) => {
                                        return (
                                            <Draggable
                                                key={v}
                                                draggableId={v}
                                                index={idx}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {React.cloneElement(ItemList[v], { item: true })}
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}


                                    {provided.placeholder}
                                </div>

                            )}
                        </Droppable>
                    </Col>
                    <Col xs={20} style={{ background: 'lightgray' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', width: '1024px', height: '768px', background: 'white' }}>
                            <Droppable droppableId="main-droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{ height: '768px', display: 'flex', flexDirection: 'column' }}>

                                        {MainComponents.layout && React.cloneElement(MainComponents.layout, { item: false, style: { flex: 1 } })}
                                        {provided.placeholder}
                                    </div>

                                )}
                            </Droppable>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        </DragDropContext>
    )
}

export default App;
