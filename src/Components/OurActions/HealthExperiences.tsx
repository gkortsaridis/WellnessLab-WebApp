import * as React from 'react';
import {wellnessLabPrimary} from "../../Entities/Colors";
import {isMobile} from "react-device-detect";
import WellnessCard from "../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {HealthExperience} from "../../Entities/Entities";
import {getAllHealthExperiences} from "../../Repositories/HealthExperiencesRepository";
import WellnessCardHealthExperience from "../CustomUIComponents/WellnessCardHealthExperience";

type HealthExperiencesProps = {
    history: any
}

type HealthExperiencesState = {
    healthExperiences: HealthExperience[]
}

class HealthExperiences extends React.Component<HealthExperiencesProps, HealthExperiencesState> {

    constructor(props: HealthExperiencesProps, state: HealthExperiencesState) {
        super(props, state);

        this.state = {healthExperiences : []}
    }

    componentDidMount() {
        getAllHealthExperiences()
            .then((healthExperiences: HealthExperience[]) => {
                this.setState({healthExperiences: healthExperiences})
            })
    }

    render() {
        const healthExperienceItems: JSX.Element[]= [];

        for(let i=0; i<this.state.healthExperiences.length; i++) {
            const healthExperience = this.state.healthExperiences[i];
            const healthExperienceCard = (
                <div>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}}>
                        <WellnessCardHealthExperience healthExperience={healthExperience}/>
                    </div>
                </div>
            );
            healthExperienceItems.push(healthExperienceCard)
        }

        return (
            <div style={this.styles.container}>
                <h2 style={{color: wellnessLabPrimary, fontWeight: 400, paddingTop: 20, paddingLeft: 20}}>Εμπειρίες Υγείας</h2>
                <h3 style={this.styles.introText}> Μοιράσου και εσύ τη δική σου εμπειρία υγείας ανώνυμα, συμπληρώνοντας την παρακάτω <a target="_blank" href={"https://forms.gle/5jbZK3NRPLDWhdrn9"} rel="noopener noreferrer">φόρμα</a></h3>
                <div style={this.styles.healthExperiencesContainer}> {healthExperienceItems} </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7'},
        introText: {fontWeight: 100, paddingLeft: 20},
        healthExperiencesContainer: {width: isMobile ? '100%' : '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},
    }
}

export default HealthExperiences