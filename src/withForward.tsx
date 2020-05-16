import React from 'react';
import withForwardedRef from 'react-with-forwarded-ref';

interface Props<A = any> {
    children: React.ReactNode;
    forwardedRef?: React.RefObject<A>;
}

const WrapperFoward: React.FC<Props> = ({ children, forwardedRef }) => (
    <div ref={forwardedRef}>
      {children}
    </div>
);

export const withForward = withForwardedRef(WrapperFoward);
