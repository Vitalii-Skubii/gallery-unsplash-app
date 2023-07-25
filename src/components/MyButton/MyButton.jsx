import React from 'react';


export const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className='page'>
            {children}
        </button>
    );
};