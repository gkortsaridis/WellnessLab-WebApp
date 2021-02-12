import * as React from 'react';
import {Seminar} from "../../Entities/Entities";
import {getAllSeminars} from "../../Repositories/SeminarsRepository";
import {wellnessLabPrimary} from "../../Entities/Colors";
import {isMobile} from "react-device-detect";
import WellnessCard from "../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import WellnessCardSeminar from "../CustomUIComponents/WellnessCardSeminar";

type SeminarsProps = {
    history: any
}

type SeminarsState = {
    seminars: Seminar[]
}


class Seminars extends React.Component<SeminarsProps, SeminarsState> {

    constructor(props: SeminarsProps, state: SeminarsState) {
        super(props, state);

        this.state = {seminars : []}
    }

    componentDidMount() {
        getAllSeminars()
            .then((seminars: Seminar[]) => {
                this.setState({seminars: seminars})
            })
    }

    render() {
        const seminarItems: JSX.Element[]= [];

        for(let i=0; i<this.state.seminars.length; i++) {
            var seminar = this.state.seminars[i]
            var seminarCard = (
                <div>
                    <div style={this.styles.seminarCardContainer} >
                        <WellnessCardSeminar seminar={seminar} />
                    </div>
                </div>
            )
            seminarItems.push(seminarCard)
        }

        return (
            <div style={this.styles.container}>
                <h2 style={{color: wellnessLabPrimary, fontWeight: 400, paddingTop: 20, paddingLeft: 20}}>Σεμινάρια</h2>
                <h3 style={this.styles.introText}> Σύντομο κείμενο για τα σεμινάρια </h3>
                <div style={this.styles.seminarsContainer}> {seminarItems} </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7'},
        introText: {fontWeight: 100, paddingLeft: 20},
        seminarCardContainer: {display: 'flex', flexGrow: 1, height: '600px', width: isMobile ? '100%' : '500px', alignItems: 'center', justifyContent: 'center'},
        seminarsContainer: {width: isMobile ? '100%' : '75%', flexDirection: isMobile ? 'column' as 'column' : 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},
    }
}

export default Seminars