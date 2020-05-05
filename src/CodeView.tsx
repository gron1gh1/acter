import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,
    
} from 'react-live'
import { PrismTheme} from 'prism-react-renderer';
import { ICodeState, ISelect } from './Interface';

const scope = {};

const WrapperCode = styled.div`
    display:flex;
    flex-direction:column;
    width:1024px;
    minHeight:240px;
`;

const StyledLiveEditor = styled(LiveEditor)`
    background: rgb(50,42,56);
    caret-color: rgb(197,200,198);
`;
export function CodeView() {
    const CodeData : string = useSelector((state: ISelect) => state.codeReducer.Code as string); // Get Data from Reducer to this 
    
    return (
        <WrapperCode>
            <LiveProvider code={CodeData ? CodeData : "Hello World"} scope={scope} >
                <StyledLiveEditor />
                <LiveError />
                <LivePreview/>
            </LiveProvider>
        </WrapperCode>
    )
}