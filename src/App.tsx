import React, { useState, Fragment, useEffect } from 'react';
import { Row, Col, Radio,Input } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { IDragging, IMenuState, IMainView, IMemoryShow, ISelect } from './Interface';
import { MainActions, CodeActions } from './reducer';
import Sidebar from './Sidebar';
import { ItemList } from './StaticData';
import { Scrollbars } from 'react-custom-scrollbars';
import { CodeView } from './CodeView';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

const getMainViewStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "white",
    width: '1024px',
    minHeight: '105px',
    display: 'flex',
    flexDirection: 'column',
});

function MainView({ MainLayout }: IMainView) {
    return (
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
    )
}

function MemoryShow({ MainArea }: IMemoryShow) {
    return (
        <div>

            {MainArea.map((v, idx) => {
                if (v)
                    return React.cloneElement(v)
            })}

        </div>
    )
}

function App() {
    const [dragging, SetDragging] = useState<IDragging>({ state: false, item: null }); // Item information at start of drag
    const [showState, SetShowState] = useState('PREVIEW');

    const dispatch = useDispatch();
    const MainLayout: React.ReactElement = useSelector((state: ISelect) => state.mainReducer['Layout']) as React.ReactElement; // Get Data from Reducer to this 
    const MainArea: Array<JSX.Element | null> = useSelector((state: ISelect) => state.mainReducer['Area'] as Array<JSX.Element | null>);
    const StyleTextArea: string = useSelector((state: ISelect) => state.mainReducer['TextArea'] as string);


    useEffect(() => {
        const virtual = shallow(
            <MemoryShow MainArea={MainArea} />);
        console.log(virtual.children().map(v=>v.name()));
        virtual.children().forEach(v=>{
            console.log(virtual.find(v.name()).dive().debug());
        })
        dispatch(CodeActions.SetCode(virtual.debug()));
    }, [MainArea])

    function onDragEnd(result: DropResult) {
        const { source, destination, type } = result;
        let _type = type as keyof IMenuState;

        if (!destination || source.droppableId === destination.droppableId) return;

        console.log(type, dragging.item, destination.droppableId);

        let parser = destination.droppableId.split('-');

        if (parser.length === 1) {
            if (dragging.item) {
                ItemList[_type] && dispatch(MainActions.addComponent(parser[0], ItemList[_type][dragging.item]));

            }
        }
        else if (parser.length > 1) {
            dragging.item && ItemList[_type] && dispatch(MainActions.addComponent(parser[0], ItemList[_type][dragging.item], parseInt(parser[1])));

        }
        SetDragging({ state: false, item: null });
    }

    function onDragStart(result: DropResult) { // Item information at start of drag
        SetDragging({ state: true, item: result.draggableId });
    }

    function onRadioChange(e: RadioChangeEvent) {
        SetShowState(e.target.value);
    }
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Fragment>
                <Row style={{ height: '100vh' }}>
                    <Col flex="264px" style={{ background: 'white', height: '100vh' }}>
                        <Sidebar />
                    </Col>
                    <Col flex="auto" style={{
                        background: 'lightgray'
                    }}>
                        <Scrollbars autoHide>
                            <div style={{ marginLeft: '50px', marginTop: '50px' }}>

                                <Radio.Group defaultValue="PREVIEW" buttonStyle="solid" onChange={onRadioChange}>
                                    <Radio.Button value="PREVIEW">PREVIEW</Radio.Button>
                                    <Radio.Button value="CODE">CODE</Radio.Button>
                                </Radio.Group>
                                {showState === 'PREVIEW' && <MainView MainLayout={MainLayout} />}
                                {showState === 'CODE' && <CodeView />}
                            </div>

                        </Scrollbars>
                        
                    </Col>
                    <Col flex="264px" style={{ background: 'white', height: '100vh' }}>
                        <Input.TextArea rows={12} value={StyleTextArea !== null ? StyleTextArea : ""}/>
                    </Col>
                </Row>
            </Fragment>
        </DragDropContext>
    )
}

export default App;
