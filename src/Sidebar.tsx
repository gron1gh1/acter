import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Menu } from 'antd';
import { Droppable, Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { ItemList } from './StaticData';
const { SubMenu } = Menu;

const grid = 8;

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    //    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

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

export default function Sidebar() {
    return (
        <Scrollbars style={{ height: '100vh' }} autoHide>
            <Menu mode="inline" style={{ width: 256, borderRight: 'white 1px solid' }}>
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
                                {Object.keys(ItemList.MAINVIEW).map((v, idx) => {
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
                                                        
                                                    {React.cloneElement(ItemList['MAINVIEW'][v] as React.ReactElement, { item: true })}
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
                                {Object.keys(ItemList.COMPONENT).map((v, idx) => {
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
                                                    {React.cloneElement(ItemList['COMPONENT'][v] as React.ReactElement, { item: true })}
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
    )
}