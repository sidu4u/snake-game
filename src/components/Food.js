import React from "react";

const Food = ({ position }) => {

    return <div
        style={{
            position: 'absolute',
            borderRadius: '5px',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '10px',
            height: '10px',
            background: 'blue'
        }}
    ></div>
}

export default React.memo(Food);