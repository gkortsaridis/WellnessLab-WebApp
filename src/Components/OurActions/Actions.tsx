import * as React from 'react';
import {isMobile} from "react-device-detect";
import WellnessCard from "../CustomUIComponents/WellnessCard/WellnessCard";
import {HEALTH_EXPERIENCES, SEMINARS, TV_INTERVIEW} from "../../Entities/AppRoutes";

import health_experiences from '../../Images/health_experiences.png'
import seminars from '../../Images/seminars.png'
import tvInterview from '../../Images/tv_interview.png'

type ActionsProps = { history: any}

class Actions extends React.Component<ActionsProps, {}> {

    constructor(props: ActionsProps, state: {}) {
        super(props, state);

        this.goToHealthExperiences = this.goToHealthExperiences.bind(this)
        this.goToTalks = this.goToTalks.bind(this)
        this.goToTVInterview = this.goToTVInterview.bind(this)
    }

    private goToHealthExperiences() {
        const appHistory = this.props.history
        appHistory.push(HEALTH_EXPERIENCES)
    }

    private goToTalks() {
        const appHistory = this.props.history
        appHistory.push(SEMINARS)
    }

    private goToTVInterview() {
        const appHistory = this.props.history
        appHistory.push(TV_INTERVIEW)
    }

    render() {
        return (
            <div style={this.styles.container}>
                <h3 style={this.styles.introText}>Αυτό είναι ένα σύντομο κείμενο που θα περιγραφει τις δράσεις</h3>
                <div style={isMobile ? this.styles.dataContainerMobile : this.styles.dataContainer}>
                    <div style={isMobile ? this.styles.articleDivMobile : this.styles.articleDiv}>
                        <WellnessCard width={'80%'} height={500} borderRadius={this.cardRadius} disableMove onCardClick={this.goToHealthExperiences}>
                            <div style={{width: '100%', height: '100%',  background: 'url('+health_experiences+') center / cover', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                <div style={this.styles.title}>{"Εμπειρίες\nΥγείας"}</div>
                            </div>
                        </WellnessCard>
                    </div>
                    <div style={isMobile ? this.styles.tipsDivMobile : this.styles.tipsDiv}>
                        <WellnessCard width={'80%'} height={500} borderRadius={this.cardRadius} disableMove onCardClick={this.goToTalks}>
                            <div style={{width: '100%', height: '100%',  background: 'url('+seminars+') center / cover', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                <div style={this.styles.title}>{"Σεμιναρια"}</div>
                            </div>
                        </WellnessCard>
                    </div>
                    <div style={isMobile ? this.styles.suggestionsDivMobile : this.styles.suggestionsDiv}>
                        <WellnessCard width={'80%'} height={500} borderRadius={this.cardRadius} disableMove onCardClick={this.goToTVInterview}>
                            <div style={{width: '100%', height: '100%',  background: 'url('+tvInterview+') center / cover', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                <div style={this.styles.title}>{"Τηλεοπτική\nΣυνέντευξη"}</div>
                            </div>
                        </WellnessCard>
                    </div>
                </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {display: 'flex', flexDirection: 'column' as 'column', flex: 1, background: '#F7F7F7'},
        introText: {fontWeight: 100, padding: 20},
        dataContainer: {display: 'flex', flexDirection: 'row' as 'row', flexGrow: 1, backgroundColor: '#F7F7F7'},
        dataContainerMobile: {display: 'flex', flexDirection: 'column' as 'column', flexGrow: 1, backgroundColor: '#F7F7F7'},
        articleDiv: {display: 'flex', width: '33%', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center'},
        articleDivMobile: {display: 'flex', width: '100%', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center'},
        title: {fontSize: 35, fontWeight: 600, whiteSpace: 'pre-line' as 'pre-line', textAlign: 'center' as 'center'},
        tipsDiv: {display: 'flex', flexGrow: 1, width: '33%', flexDirection: 'column' as 'column', alignItems: 'center'},
        tipsDivMobile: {display: 'flex', flexGrow: 1, width: '100%', flexDirection: 'column' as 'column', alignItems: 'center', marginTop: 20},
        suggestionsDiv: {display: 'flex', flexGrow: 1, width: '33%', alignItems: 'center', flexDirection: 'column' as 'column'},
        suggestionsDivMobile: {display: 'flex', flexGrow: 1, width: '100%', alignItems: 'center', flexDirection: 'column' as 'column', marginTop: 20, marginBottom: 40},
    }
}

export default Actions