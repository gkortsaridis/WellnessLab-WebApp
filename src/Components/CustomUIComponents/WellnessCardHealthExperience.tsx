import * as React from 'react';
import {HealthExperience} from "../../Entities/Entities";
import ReactCardFlip from "react-card-flip";
import WellnessCard from "./WellnessCard/WellnessCard";

type WellnessCardHealthExperienceProps = {
    healthExperience: HealthExperience
}

type WellnessCardHealthExperienceState = {
    cardFlipped: boolean
}

class WellnessCardHealthExperience extends React.Component<WellnessCardHealthExperienceProps, WellnessCardHealthExperienceState> {

    constructor(props: WellnessCardHealthExperienceProps, state: WellnessCardHealthExperienceState) {
        super(props, state);

        this.state = {cardFlipped: false}
    }

    render() {
        return (
            <WellnessCard id={this.props.healthExperience.id} width={'90%'} height={'90%'} borderRadius={15} onCardClick={() => {
                this.setState({cardFlipped: !this.state.cardFlipped})
            }}>
                <ReactCardFlip key={"f"} isFlipped={this.state.cardFlipped} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>

                    <div key={"a"} style={{display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%'}}>
                        <div key={"b"}  style={Object.assign({background: 'url('+this.props.healthExperience.img+') center / cover'}, this.styles.cardImage)} />
                        <div key={"c"} style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignItems: 'center', justifyContent: 'center', height: '10%', fontWeight: 400, display: 'flex', padding: 20, textAlign: 'center' as 'center'}}>
                            <div>
                                {this.props.healthExperience.title}
                            </div>

                        </div>
                    </div>

                    <div key={"g"} style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}}>
                        { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                        <div key={"h"}  style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{this.props.healthExperience.description}</div>
                    </div>
                </ReactCardFlip>
            </WellnessCard>
        )
    }

    styles = {
        cardImage: {width: '100%', height: '90%', overflow: 'hidden', borderRadius: 15}
    }
}

export default WellnessCardHealthExperience