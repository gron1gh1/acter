import React from 'react';
import withForwardedRef from 'react-with-forwarded-ref';


interface Props<A = any> {
    children: React.ReactNode;
    forwardedRef?: React.RefObject<A>;
  }
  
  const Comp: React.FC<Props> = ({ children, forwardedRef }) => (
    <div ref={forwardedRef}>
      {children}
    </div>
  )
  
export default withForwardedRef(Comp)
  