import { useRenderState } from '../hooks/useRenderState';
import Snake from "./Snake";
import Food from "./Food";

const Board = ({ width, height }) => {
    const { updateDirection, snakePosition, foodPosition } = useRenderState(width, height);


    return <div style={{
        position: 'relative',
        width,
        height,
        border: '1px solid red',
        padding: '5px'
    }
    }
        autoFocus
        tabIndex='0'
        onKeyUp={updateDirection}
    >
        <Snake body={snakePosition}/>
        <Food position={foodPosition}/>
    </div>

}

export default Board;