import React, { useState, Fragment } from 'react';
import { Row, Col, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Layout_1, Layout_2, Layout_3, Layout_4, LoginItem, ButtonItem, MenuItem } from './ItemComponent';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import produce from 'immer';
import CSS from 'csstype';
import { Scrollbars } from 'react-custom-scrollbars';

const grid = 8;
const { SubMenu } = Menu;


const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    //    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

const getMainViewStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "white",

    height: '768px',
    display: 'flex',
    flexDirection: 'column',
});

interface IDragging {
    state: boolean;
    item: string | null;
}

interface IMainComponent {
    layout: JSX.Element | null;
    content: JSX.Element[] | null;
}

function App() {
    const [dragging, SetDragging] = useState<IDragging>({ state: false, item: null });
    const ItemList: any = {
        Layout: {
            layout_1: <Layout_1 />,
            layout_2: <Layout_2 />,
            layout_3: <Layout_3 />,
            layout_4: <Layout_4 />,
        },
        Component: {
            login: <LoginItem />,
            menu: <ButtonItem />,
            button: <MenuItem />,

        }
    };
    const [MainComponents, AddComponent] = useState<IMainComponent>(
        {
            layout: null,
            content: []
        }
    );
    function onDragEnd(result: DropResult) {
        const { source, destination, type } = result;
        if (!destination || source.droppableId === destination.droppableId) return;
        console.log(type, dragging.item);
        AddComponent(produce(MainComponents, draft => {
            draft.layout = dragging.item && ItemList.Layout[dragging.item];
        }));

        SetDragging({ state: false, item: null });
    }

    function onDragUpdate(result: DropResult) {
    }

    function onDragStart(result: DropResult) {
        SetDragging({ state: true, item: result.draggableId });
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
            <Fragment>
                <Row style={{ height: '100vh' }}>
                    <Col flex="264px" style={{ background: 'white',overflowY:'hidden',height:'100vh' }}>
                        <Scrollbars style={{ height:'100vh' }} autoHide>
                        <Menu mode="inline" style={{ width: 256,borderRight: 'white 1px solid' }}>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <span>Layout</span>
                                    </span>
                                }
                            >
                                <Droppable droppableId="MAINVIEW" type="MAINVIEW">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {Object.keys(ItemList.Layout).map((v, idx) => {
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
                                                                {React.cloneElement(ItemList.Layout[v], { item: true })}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>

                                    )}
                                </Droppable>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <span>Component</span>
                                    </span>
                                }
                            >
                                <Droppable droppableId="COMPONENT" type="COMPONENT">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {Object.keys(ItemList.Component).map((v, idx) => {
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
                                                                {React.cloneElement(ItemList.Component[v], { item: true })}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}


                                            {provided.placeholder}
                                        </div>

                                    )}
                                </Droppable>
                            </SubMenu>
                        </Menu>
                        </Scrollbars>
                    </Col>
                    <Col flex="auto" style={{ background: 'lightgray' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', width: '1024px', height: '768px', background: 'white' }}>
                            <Droppable droppableId="main-droppable" type="MAINVIEW">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getMainViewStyle(snapshot.isDraggingOver)}>

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
