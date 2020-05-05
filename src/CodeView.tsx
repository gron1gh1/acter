import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,
    
} from 'react-live'
import { PrismTheme} from 'prism-react-renderer';

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
    return (
        <WrapperCode>
            <LiveProvider code="<strong>Hello World!</strong>" scope={scope} >
                <StyledLiveEditor />
                <LiveError />
                <LivePreview/>
            </LiveProvider>
        </WrapperCode>
    )
}