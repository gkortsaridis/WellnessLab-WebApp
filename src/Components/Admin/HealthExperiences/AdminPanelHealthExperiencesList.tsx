import * as React from 'react';
import {HealthExperience} from "../../../Entities/Entities";
import {getAllSeminars} from "../../../Repositories/SeminarsRepository";
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {ADMIN_HEALTH_EXPERIENCES, ADMIN_SEMINARS} from "../../../Entities/AppRoutes";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {getAllHealthExperiences} from "../../../Repositories/HealthExperiencesRepository";
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";
import WellnessCardHealthExperience from "../../CustomUIComponents/WellnessCardHealthExperience";

type AdminPanelHealthExperiencesListProps = {
    history: any
}

type AdminPanelHealthExperiencesListState = {
    healthExperiences: HealthExperience[]
}

class AdminPanelHealthExperiencesList extends React.Component<AdminPanelHealthExperiencesListProps , AdminPanelHealthExperiencesListState> {

    constructor(props: AdminPanelHealthExperiencesListProps, state: AdminPanelHealthExperiencesListState) {
        super(props, state);

        this.state = {healthExperiences : []}

        this.goToHealthExperienceEdit = this.goToHealthExperienceEdit.bind(this)
    }

    componentDidMount() {
        getAllHealthExperiences()
            .then((healthExperiences: HealthExperience[]) => {
                this.setState({healthExperiences: healthExperiences})
            })
    }

    private goToHealthExperienceEdit(seminarId: string) {
        const appHistory = this.props.history
        appHistory.push(ADMIN_HEALTH_EXPERIENCES+"/"+seminarId)
    }

    render() {
        const healthExperienceItems: JSX.Element[]= [];

        for(let i=0; i<this.state.healthExperiences.length; i++) {
            var healthExperience = this.state.healthExperiences[i]
            var healthExperienceCard = (
                <div>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}} onClick={() => {this.goToHealthExperienceEdit(this.state.healthExperiences[i].id)}}>
                        <WellnessCardHealthExperience healthExperience={healthExperience}/>
                    </div>
                </div>
            )
            healthExperienceItems.push(healthExperienceCard)
        }

        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab  - ΛΙΣΤΑ ΕΜΠΕΙΡΙΩΝ ΥΓΕΙΑΣ</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΔΗΜΙΟΥΡΓΙΑ ΕΜΠΕΙΡΙΑΣ ΥΓΕΙΑΣ"} onClick={() => {this.goToHealthExperienceEdit("-1")}}/>
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={this.styles.articlesContainer}> {healthExperienceItems} </div>
                    </div>
                </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7', height: '100vh'},
        introText: {fontWeight: 400, padding: 20, fontSize: 25, textAlign: 'center' as 'center'},
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column',},
        logo: {width: 40, height: 40, marginRight: 20 },
        articlesContainer: {width: '100%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},
    }
}

export default AdminPanelHealthExperiencesList