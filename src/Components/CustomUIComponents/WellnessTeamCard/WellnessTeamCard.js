import * as React from 'react';
import {useRef, useState} from "react";
import { useSpring, animated } from 'react-spring'
import './styles.css'
import ReactCardFlip from "react-card-flip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";

import cv from '../../../Images/cv.svg'

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function WellnessTeamCard(props) {

    const width = 300
    const height = 400

    const cardFront = useRef()

    const [hovering, setHover] = useState(false)
    const [isFlipped, setFlipped] = useState(false)

    const [stuff, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

    const cardStyle = {
        card: {
            width: width,
            height: height,
            backgroundPosition: 'center center',
            boxShadow: hovering ? '10px 10px 30px -5px rgba(0, 0, 0, 0.7)': '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.5s',
            willChange: 'transform',
            borderRadius: 15,
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column'
        },
        cardBackSide: {
            width: width,
            height: height,
        },
        teamMemberSocialIcon: {width: '30px', height: '30px', padding: 15, color:'rgb(99, 148, 140)'},
    }

    function calc(x,y) {
        const a = (cardFront.current).getBoundingClientRect()
        const offsetTop = a.top
        const offsetLeft = a.left
        //console.log(x,y, offsetTop, offsetLeft)

        //Calculating Y percentage [-10,10]
        var percentageInsideY = offsetTop+height-y
        if(percentageInsideY < 0) { percentageInsideY = 0 }
        else if(percentageInsideY > height) { percentageInsideY = height }

        let old_value = percentageInsideY
        let old_min = 0
        let old_max = height
        let new_min = -10
        let new_max = 10
        let new_valueY = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min

        //Calculating X percentage [-10,10]
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
    }

    function openLink(url) {
        window.open(url, "_blank", "noopener")
    }

    function handleClick(e) {
        e.preventDefault();
        setFlipped(!isFlipped)
    }

    function getSocial() {
        const personSocial = [];

        personSocial.push(
            <div onClick={handleClick}>
                <img alt={"biography icon"} src={cv} style={cardStyle.teamMemberSocialIcon}/>
            </div>
        )

        for (let j=0; j<props.person.social.length; j++) {
            personSocial.push(
                <div onClick={(e) => {openLink(props.person.social[j].url)}} >
                    <FontAwesomeIcon icon={
                        props.person.social[j].name === "facebook"
                            ? faFacebook
                            : props.person.social[j].name === "linkedin"
                            ? faLinkedin
                            : props.person.social[j].name === "instagram"
                                ? faInstagram
                                : props.person.social[j].name === "mail"
                                    ? faMailBulk
                                    : faTwitter
                    } style={cardStyle.teamMemberSocialIcon}/>

                </div>
            )
        }

        return personSocial
    }

    return (
        <animated.div
            ref={cardFront}
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
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, height: '100%'}}>
                <div style={{display: 'flex', flexGrow: 1, height: '100%', flexDirection: 'column', backgroundColor: 'white'}}>
                    <img alt={props.person.name} src={props.person.image} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center', marginTop: 35}}/>
                    <div style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignSelf: 'center', marginTop: 20, fontWeight: 400}}>{props.person.name}</div>
                    <div style={{fontSize: 20, color: 'rgb(255,63,128)', alignSelf: 'center', marginTop: 8, fontWeight: 400}}>{props.person.title}</div>
                    <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>{getSocial()}</div>
                </div>

                <div style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}} onClick={handleClick}>
                    { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                    <div style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{props.person.bio}</div>
                </div>
            </ReactCardFlip>
        </animated.div>
    )
}