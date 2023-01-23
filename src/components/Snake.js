
const Snake = ({ body }) => {

    return <div>{

        body.map(
            position => (<div style={{
                position: 'absolute',
                background: 'black',
                width: '10px',
                height: '10px',
                border: '1px solid black',
                left: `${position.x}px`,
                top: `${position.y}px`
            }}></div>))
    }</div>


}

export default Snake;