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

type HomeState = { latestSubject: Subject }
type HomeProps = { history: any }

const socialMedia = require('../ConfigurableData/social.json')

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
                    <div style={{display: 'flex',  flexGrow: 1, alignItems: 'center' as 'center', justifyContent: 'center' as 'center', textAlign: 'center'}}>
                        <div style={this.styles.topText} >Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.</div>
                    </div>
                    <div style={{padding: 10}}>
                        <Typography use="headline5" style={{fontWeight: 100, marginLeft: 10}}>Βρείτε μας στα</Typography>
                        <div style={this.styles.socialMediaContainer}>{this.socialItems}</div>
                    </div>
                </div>
                <div style={this.styles.rightSide}>
                    <Typography style={this.styles.topText} use="headline4">Διαβάστε για το τελευταίο μας θέμα</Typography>
                    <div style={this.styles.itemCardContainer}>
                        <WellnessCard width={300} height={500} borderRadius={this.cardRadius} onCardClick={this.openSubject}>
                            <div style={this.styles.articleCard}>
                                <div style={Object.assign({background: 'url('+this.state.latestSubject.imgUrl+') center / cover'}, this.styles.articleImage)}></div>
                                <div style={this.styles.articleTitleTextContainer}>
                                    <div style={this.styles.articleTitleText}>{this.state.latestSubject.title}</div>
                                </div>
                            </div>
                        </WellnessCard>
                    </div>
                </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {display: 'flex', flexGrow: 1, width: '100%', flexDirection: 'row' as 'row', backgroundColor: wellnessLabLightBackground, background: `url(${cover})`, backgroundSize: 'cover'},
        topText: {fontWeight: 100, textAlign: 'center' as 'center', fontSize: 35},
        leftSide: {display: 'flex', width: '70%', flexDirection: 'column' as 'column'},
        rightSide: {display: 'flex', width: '30%', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        itemCardContainer: {padding: '10px'},
        articleCard: {display: "flex", flexGrow: 1, flexDirection: 'column' as 'column', backgroundColor: 'white'},
        articleImage: {width: '300px', height: '400px', overflow: 'hidden'},
        articleTitleContainer: {width: '300px', height: '100px', backgroundColor: 'white', display: 'table', textAlign: 'center' as 'center', borderRadius: this.cardRadius},
        articleTitleTextContainer: {flexGrow: 1, display: 'flex', padding: '5px', alignItems: 'center' as 'center', justifyContent: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', fontWeight: 600},
        socialMediaContainer: {display: 'flex', flexDirection: 'row' as 'row', flexWrap: 'wrap' as 'wrap'},
        socialMediaCard: {display: 'flex', flexDirection: 'column' as 'column',flexGrow: 1, backgroundColor: 'white', justifyContent: 'center' as 'center', alignItems: 'center' as 'center' },
        socialMediaImg: {width: '50px', height: '50px', marginBottom: '15px'},
        socialMediaTxt: {textDecoration:'none', fontSize: '20px'},
    }
}

export default Home