import React, { useState, Fragment } from 'react';
import { Row, Col, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { IDragging, IMainState, IMenuState, IMainView, IMemoryShow } from './Interface';
import { ActionCreators } from './reducer';
import Sidebar from './Sidebar';
import { ItemList } from './StaticData';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,
    
} from 'react-live'
import { PrismTheme} from 'prism-react-renderer';


import ReactDOMServer from 'react-dom/server';
import reactElementToJSXString from 'react-element-to-jsx-string';
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import { store } from './reducer';
import { Provider } from 'react-redux';
import { Layout_1 } from './ItemComponent';
import Adapter from 'enzyme-adapter-react-16';

import ShallowRenderer from 'react-test-renderer/shallow';

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

const reactLiveHome : PrismTheme= {
    plain: {
      color: '#e7d2ed'
    },
    styles: [
      {
        types: ['prolog', 'comment', 'doctype', 'cdata'],
        style: {
          color: 'hsl(30, 20%, 50%)'
        }
      },
      {
        types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
        style: { color: '#f677e1' }
      },
      {
        types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
        style: {
          color: 'hsl(75, 70%, 70%)'
        }
      },
      {
        types: [
          'operator',
          'entity',
          'url',
          'string',
          'variable',
          'language-css'
        ],
        style: {
          color: 'hsl(40, 90%, 70%)'
        }
      },
      {
        types: ['deleted'],
        style: {
          color: 'rgb(255, 85, 85)'
        }
      },
      {
        types: ['italic'],
        style: {
          fontStyle: 'italic'
        }
      },
      {
        types: ['important', 'bold'],
        style: {
          fontWeight: 'bold'
        }
      },
      {
        types: ['regex', 'important'],
        style: {
          color: '#e90'
        }
      },
      {
        types: ['atrule', 'attr-value', 'keyword'],
        style: {
          color: '#f677e1'
        }
      },
      {
        types: ['punctuation', 'symbol'],
        style: {
          opacity: 0.7
        }
      }
    ]
  };
const scope = {Radio};
function CodeView() {
    return (
        <div style={{width:'1024px',minHeight:'240px',display:'flex',flexDirection:'column'}}>
            <LiveProvider code="<strong>Hello World!</strong>" scope={scope} >
                <LiveEditor style={{background:'rgb(50,42,56)',caretColor: 'rgb(197,200,198)'}}/>
                <LiveError />
                <LivePreview/>
            </LiveProvider>
        </div>
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
    const MainLayout: React.ReactElement = useSelector((state: IMainState) => state['Layout']) as React.ReactElement; // Get Data from Reducer to this 
    const MainArea: Array<JSX.Element | null> = useSelector((state: IMainState) => state['Area'] as Array<JSX.Element | null>);

    function onDragEnd(result: DropResult) {
        const { source, destination, type } = result;
        let _type = type as keyof IMenuState;

        if (!destination || source.droppableId === destination.droppableId) return;

        console.log(type, dragging.item, destination.droppableId);

        let parser = destination.droppableId.split('-');

        if (parser.length === 1) {
            if (dragging.item) {
                ItemList[_type] && dispatch(ActionCreators.addComponent(parser[0], ItemList[_type][dragging.item]));


                // console.log(prettyFormat(
                //     en.getElement(), {
                //     plugins: [prettyFormat.plugins.ReactElement],
                //     printFunctionName: true
                // }));
                // const en = mount(<Provider store={store}>
                //     <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                //         <MainView MainLayout={ItemList[_type][dragging.item]} />
                //     </DragDropContext>
                // </Provider>);
                // console.log(en.debug());


                // const FIND = shallow(en2.find('Layout_1').dive().find('Area').dive().getElement(), { wrappingComponent: WrappingComponent });
                // const provider = FIND.getWrappingComponent();
                // provider.setProps({ customStore: store })
                // console.log(
                //     FIND
                //         .debug());

            }
        }
        else if (parser.length > 1) {
            dragging.item && ItemList[_type] && dispatch(ActionCreators.addComponent(parser[0], ItemList[_type][dragging.item], parseInt(parser[1])));

            const en2 = shallow(
                <MemoryShow MainArea={MainArea} />);
            console.log(en2.debug());


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
                        <Scrollbars >
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
                </Row>
            </Fragment>
        </DragDropContext>
    )
}

export default App;
