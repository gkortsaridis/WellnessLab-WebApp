import * as React from 'react';
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";

import {emptySubject, getAllSubjects} from "../../../Repositories/SubjectsRepository";
import {Subject} from "../../../Entities/Entities";
import { ADMIN } from "../../../Entities/AppRoutes";

import plus from '../../../Images/plus.png'
import {
    Button,
    TopAppBar,
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    Typography
} from "rmwc";
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";
import TextField from "@material-ui/core/TextField";
import MultiImageInput from "react-multiple-image-input";

type OurSubjectsState = { subjects: Subject[] }
type OurSubjectProps = { history: any }

class AdminPanelSubjectsList extends React.Component<OurSubjectProps, OurSubjectsState> {

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
        const appHistory = this.props.history
        appHistory.push(ADMIN+"/subjects/"+link)
    }

    render() {
        const articleItems: JSX.Element[]= [];

        for (let i=0; i<this.state.subjects.length; i++) {
            articleItems.push(
                <div style={this.styles.itemCardContainer} onClick={(e) => this.clickedLink(this.state.subjects[i].id)}>
                    <WellnessCard width={300} height={500} borderRadius={this.cardRadius}>
                        <div style={this.styles.articleCard}>
                            <div style={Object.assign({background: 'url('+this.state.subjects[i].imgUrl+') center / cover'}, this.styles.articleImage)}></div>
                            <div style={this.styles.articleTitleContainer}>
                                <p style={this.styles.articleTitleText}>{this.state.subjects[i].title}</p>
                            </div>
                        </div>
                    </WellnessCard>
                </div>
            );
        }


        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab - ΛΙΣΤΑ ΘΕΜΑΤΩΝ</TopAppBarTitle>


                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΔΗΜΙΟΥΡΓΙΑ ΝΕΟΥ ΘΕΜΑΤΟΣ"} onClick={() => {this.clickedLink("-1")}}/>
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={this.styles.articlesContainer}> {articleItems} </div>
                    </div>
                </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7', height: '100vh'},
        introText: {fontWeight: 400, padding: 20, fontSize: 25, textAlign: 'center' as 'center'},
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column',},
        logo: {width: 40, height: 40, marginRight: 20 },
        articlesContainer: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleCard: { width: '300px', height: '500px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {height: '400px', overflow: 'hidden', borderRadius: this.cardRadius},
        articleTitleContainer: {width: '300px', height: '100px', backgroundColor: 'white', display: 'table', textAlign: 'center' as 'center', borderRadius: this.cardRadius},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default AdminPanelSubjectsList