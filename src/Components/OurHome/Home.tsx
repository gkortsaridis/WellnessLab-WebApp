import * as React from 'react';
import "rmwc/styles";
import { Typography } from 'rmwc';
import {Subject} from "../../Entities/Entities";
import {emptySubject, getAllSubjects } from "../../Repositories/SubjectsRepository";

import Facebook from "../../Images/facebook.png";
import Twitter from "../../Images/twitter.png";
import Instagram from "../../Images/instagram.png";
import LinkedIn from "../../Images/linkedin.png";
import Email from "../../Images/email.png";
import cover from '../../Images/front_cover.png'

import WellnessCard from "../CustomUIComponents/WellnessCard/WellnessCard";
import {SUBJECTS} from "../../Entities/AppRoutes";
import {wellnessLabLightBackground} from "../../Entities/Colors";
import WellnessCardSubject from "../CustomUIComponents/WellnessCardSubject";
import {isMobile} from "react-device-detect";

type HomeState = { latestSubject: Subject }
type HomeProps = { history: any }

const socialMedia = require('../ConfigurableData/social.json')
const staticText = require('../ConfigurableData/staticText.json')

class Home extends React.Component<HomeProps, HomeState> {

    private socialItems: JSX.Element[] = [];

    constructor(props: HomeProps, state: HomeState) {
        super(props, state);

        this.state = { latestSubject: emptySubject}
        this.openSubject = this.openSubject.bind(this)
    }

    componentDidMount() {
        getAllSubjects()
            .then((subjects: Subject[]) => {
                this.setState({latestSubject: subjects[0]})
            })
            .catch((error) => {
                alert("Could not retrieve latest subject")
            })

        for (let i=0; i<socialMedia.length; i++) {
            this.socialItems.push(
                <div key={socialMedia[i].name} style={this.styles.itemCardContainer} >
                    <WellnessCard width={150} height={150} borderRadius={this.cardRadius} onCardClick={() => { this.clickedLink(socialMedia[i].url)}}>
                        <div style={this.styles.socialMediaCard}>
                            <img alt={socialMedia[i].name} style={this.styles.socialMediaImg} src={
                                socialMedia[i].name === "Facebook"
                                    ? Facebook
                                    : socialMedia[i].name === "Twitter"
                                    ? Twitter
                                    : socialMedia[i].name === "Instagram"
                                        ? Instagram
                                        : socialMedia[i].name === "LinkedIn"
                                            ? LinkedIn
                                            : Email
                            }/>
                            <div style={this.styles.socialMediaTxt}>{socialMedia[i].name}</div>
                        </div>
                    </WellnessCard>
                </div>
            )
        }
    }

    openSubject(e: any) {
        const appHistory = this.props.history
        appHistory.push(SUBJECTS+"/"+this.state.latestSubject.id)
    }

    clickedLink(url: string) {
        window.open(url, "_blank", "noopener")
    }

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.leftSide}>
                    <div style={this.styles.topTextContainer}>
                        <div style={this.styles.topText} >{staticText.welcomeText}</div>
                    </div>
                    <div style={this.styles.findUsContainer}>
                        <Typography use="headline5" style={{fontWeight: 100, marginLeft: 10}}>Βρείτε μας εδώ</Typography>
                        <div style={this.styles.socialMediaContainer}>{this.socialItems}</div>
                    </div>
                </div>
                <div style={this.styles.rightSide}>
                    <Typography style={this.styles.topTextSubject} use="headline4">Διαβάστε σχετικά<br/>με το τελευταίο μας θέμα</Typography>
                    <div style={this.styles.itemCardContainer}>
                        <WellnessCardSubject subject={this.state.latestSubject} onSubjectClicked={this.openSubject}/>
                    </div>
                </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            flexDirection: isMobile ? 'column' as 'column' : 'row' as 'row',
            backgroundColor: wellnessLabLightBackground,
            background: `url(${cover})`,
            backgroundSize: 'cover',
            alignItems : isMobile ? 'center' : 'start'
        },
        topTextContainer: {display: 'flex',  flexGrow: 1, alignItems: 'center' as 'center', justifyContent: 'center' as 'center', textAlign: 'center' as 'center', marginTop: isMobile ? 20 : 0},
        topText: {fontWeight: 100, textAlign: 'center' as 'center', fontSize: isMobile ? 30 : 35},
        topTextSubject: {fontWeight: 100, textAlign: 'center' as 'center', fontSize: isMobile ? 23 : 28},
        leftSide: {display: 'flex', width: isMobile ? '95%' : '70%', flexDirection: 'column' as 'column', height: '100%'},
        rightSide: {display: 'flex', width: isMobile ? '95%' : '30%', height: '100%', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        findUsContainer: {padding: isMobile ? 0 : 10, display: 'flex', flexDirection: 'column' as 'column', alignItems: isMobile ? 'center' : 'start', marginTop: isMobile ? 20 : 0},
        itemCardContainer: {padding: '10px', marginBottom: isMobile ? 20 : 0},
        socialMediaContainer: {display: 'flex', flexDirection: 'row' as 'row', flexWrap: 'wrap' as 'wrap', justifyContent: isMobile ? 'center' : 'start'},
        socialMediaCard: {display: 'flex', flexDirection: 'column' as 'column',flexGrow: 1, backgroundColor: 'white', justifyContent: 'center' as 'center', alignItems: 'center' as 'center' },
        socialMediaImg: {width: '50px', height: '50px', marginBottom: '15px'},
        socialMediaTxt: {textDecoration:'none', fontSize: '20px'},
    }
}

export default Home