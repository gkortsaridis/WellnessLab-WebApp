import * as React from 'react';
import {useRef, useState} from "react";
import { useSpring, animated } from 'react-spring'
import './styles.css'

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function WellnessCard(props) {
    const inputRef = useRef()

    const [hovering, setHover] = useState(false)

    const [stuff, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

    const cardStyle = {
        card: {
            width: props.width,
            height: props.height,
            backgroundPosition: 'center center',
            boxShadow: props.disabled ? '0px 5px 10px -5px rgba(0, 0, 0, 0.3)' : hovering ? '10px 10px 30px -5px rgba(0, 0, 0, 0.7)': '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.5s',
            willChange: 'transform',
            borderRadius: props.borderRadius,
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column'
        }
    }

    function calc(x,y) {
        if(!props.disableMove) {
            const a = (inputRef.current).getBoundingClientRect()
            const offsetTop = a.top
            const offsetLeft = a.left
            //console.log(x,y, offsetTop, offsetLeft)

            //Calculating Y percentage [-10,10]
            const height = props.height
            let percentageInsideY = offsetTop+height-y
            if(percentageInsideY < 0) { percentageInsideY = 0 }
            else if(percentageInsideY > height) { percentageInsideY = height }

            let old_value = percentageInsideY
            let old_min = 0
            let old_max = height
            let new_min = -10
            let new_max = 10
            let new_valueY = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min

            //Calculating X percentage [-10,10]
            const width = props.width
            let percentageInsideX = offsetLeft+width-x
            if(percentageInsideX < 0) { percentageInsideX = 0 }
            else if(percentageInsideX > width) { percentageInsideX = width }

            old_value = percentageInsideX
            old_min = 0
            old_max = width
            new_min = -10
            new_max = 10
            let new_valueX = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min

            return [-new_valueY, new_valueX, 1]
        } else {
            return [0,0,1]
        }

    }

    return (
        <animated.div
            ref={inputRef}
            class="card"
            onMouseMove={(e) => {
                set({ xys: calc(e.clientX, e.clientY) })
            }}
            onMouseLeave={() => {
                if(!props.disabled) { setHover(false) }
                set({ xys: [0, 0, 1] })
            }}
            onMouseEnter={() => {
                if(!props.disabled) { setHover(true) }
            }}
            style={Object.assign(props.style | {}, cardStyle.card, { transform: stuff.xys.interpolate(trans) })}
            onClick={props.onCardClick}>
            {props.children}
        </animated.div>
    )

}