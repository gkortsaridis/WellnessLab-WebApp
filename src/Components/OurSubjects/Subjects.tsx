import * as React from 'react';

import {getAllSubjects} from "../../Repositories/SubjectsRepository";
import {Subject} from "../../Entities/Entities";
import {SUBJECTS} from "../../Entities/AppRoutes";
import {isMobile} from "react-device-detect";
import WellnessCardSubject from "../CustomUIComponents/WellnessCardSubject";
import ReactHtmlParser from "react-html-parser";

type OurSubjectsState = { subjects: Subject[] }
type OurSubjectProps = { history: any }

const staticText = require('../ConfigurableData/staticText.json')

class Subjects extends React.Component<OurSubjectProps, OurSubjectsState> {

    constructor(props: OurSubjectProps, state: OurSubjectsState) {
        super(props, state);

        this.state = { subjects: [] }

        this.clickedLink = this.clickedLink.bind(this)
    }

    componentDidMount() {
        getAllSubjects()
            .then((subjects: Subject[]) => { this.setState({subjects: subjects}) })
            .catch((error) => { alert("Παρουσιάστηκε ένα πρόβλημα :(")})
    }

    private clickedLink(link: string) {
        console.log("CLICK!!")
        const appHistory = this.props.history
        appHistory.push(SUBJECTS+"/"+link)
    }

    render() {
        const articleItems: JSX.Element[]= [];
        for (let i=0; i<this.state.subjects.length; i++) {
            articleItems.push(
                <div key={this.state.subjects[i].title} style={this.styles.itemCardContainer}>
                    <WellnessCardSubject subject={this.state.subjects[i]} onSubjectClicked={(subject: Subject) => {this.clickedLink(subject.id)}}/>
                </div>
            );
        }


        return (
            <div style={this.styles.container}>
                <h3 style={this.styles.introText}>{staticText.subjectsText} <br/> {ReactHtmlParser(staticText.subjectsGuestText)}</h3>
                <div style={this.styles.articlesContainer}> {articleItems} </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7'},
        introText: {fontWeight: 100, padding: 20, lineHeight: 1.5},
        articlesContainer: {width: isMobile ? '100%' : '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleCard: { width: '300px', height: '500px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {width: '300px', height: '400px', overflow: 'hidden', borderRadius: this.cardRadius},
        articleTitleContainer: {width: '300px', height: '100px', backgroundColor: 'white', display: 'table', textAlign: 'center' as 'center', borderRadius: this.cardRadius},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default Subjects