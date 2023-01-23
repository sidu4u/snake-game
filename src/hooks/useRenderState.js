import { useState, useRef, useMemo } from 'react';
import { useCallback } from "react";
import { DIRECTIONS } from "../constants";
import { getRandomNumberInRange } from '../utils';


const updateSnakeState = (direction, state, width, height, eating, increment) => {
    let newPosition;
    const newState = [...state];
    if (eating) {
        newState.push({});
    }
    const mappedState = { ...state[0] };
    if (mappedState.x < 0) {
        mappedState.x = width - 1;
    }
    if (mappedState.x > width) {
        mappedState.x = 0;
    }
    if (mappedState.y < 0) {
        mappedState.y = height - 1;
    }
    if (mappedState.y > height) {
        mappedState.y = 0;
    }

    switch (direction) {
        case DIRECTIONS.DOWN:
            newPosition = { ...mappedState, y: mappedState.y + increment };
            break;
        case DIRECTIONS.RIGHT:
            newPosition = { ...mappedState, x: mappedState.x + increment };
            break;
        case DIRECTIONS.LEFT:
            newPosition = { ...mappedState, x: mappedState.x - increment };
            break;
        case DIRECTIONS.UP:
            newPosition = { ...mappedState, y: mappedState.y - increment };
            break;
        default:
            return state;
    }

    updateSnakeBody(newState, newPosition);

    return newState;

}

const updateSnakeBody = (snakeBody, newPosition) => {

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = newPosition;
}

const isEqual = (lhs, rhs, margin) => {
    if (rhs <= lhs + margin && rhs >= lhs - margin) {
        return true;
    }

    return false;
}

const updateFoodPosition = (foodPosition, width, height) => {
    foodPosition.current = { x: getRandomNumberInRange(width), y: getRandomNumberInRange(height) }
}


export const useRenderState = (width, height) => {
    const [snakePosition, updateSnakePosition] = useState([{ x: 0, y: 0 }]);
    const foodPosition = useRef({});
    const direction = useRef(DIRECTIONS.RIGHT);
    const increment = useRef(0.3);

    useMemo(() => updateFoodPosition(foodPosition, width, height), [width, height])

    const updateDirection = useCallback((event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.current !== DIRECTIONS.DOWN) {
                    direction.current = DIRECTIONS.UP;
                }
                break;
            case 'ArrowDown':
                if (direction.current !== DIRECTIONS.UP) {
                    direction.current = DIRECTIONS.DOWN;
                }
                break;
            case 'ArrowLeft':
                if (direction.current !== DIRECTIONS.RIGHT) {
                    direction.current = DIRECTIONS.LEFT;
                }
                break
            case 'ArrowRight':
                if (direction.current !== DIRECTIONS.LEFT) {
                    direction.current = DIRECTIONS.RIGHT;
                }
                break;
            default:
                break;
        }

    }, []);

    window.requestAnimationFrame(() => {
        if (isEqual(foodPosition.current.x, snakePosition[0].x, 5) && isEqual(foodPosition.current.y, snakePosition[0].y, 5)) {
            updateFoodPosition(foodPosition, width, height);
            updateSnakePosition(state => updateSnakeState(direction.current, state, width, height, true, increment.current));
            increment.current += 0.2;
            return;
        }
        updateSnakePosition(state => updateSnakeState(direction.current, state, width, height, false, increment.current));
    });

    return {
        updateDirection,
        foodPosition: foodPosition.current,
        snakePosition,
    };

}