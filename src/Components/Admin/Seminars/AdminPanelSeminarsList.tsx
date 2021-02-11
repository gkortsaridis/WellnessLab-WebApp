import * as React from 'react';
import {Seminar} from "../../../Entities/Entities";
import {getAllSeminars} from "../../../Repositories/SeminarsRepository";
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {ADMIN_SEMINARS} from "../../../Entities/AppRoutes";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";
import WellnessCardSeminar from "../../CustomUIComponents/WellnessCardSeminar";

type AdminPanelSeminarsListProps = {
    history: any
}

type AdminPanelSeminarsListState = {
    seminars: Seminar[]
}

class AdminPanelSeminarsList extends React.Component<AdminPanelSeminarsListProps , AdminPanelSeminarsListState> {

    constructor(props: AdminPanelSeminarsListProps, state: AdminPanelSeminarsListState) {
        super(props, state);

        this.state = {seminars : []}

        this.goToSeminarEdit = this.goToSeminarEdit.bind(this)
    }

    componentDidMount() {
        getAllSeminars()
            .then((seminars: Seminar[]) => {
                this.setState({seminars: seminars})
            })
    }

    private goToSeminarEdit(seminarId: string) {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SEMINARS+"/"+seminarId)
    }

    render() {
        const seminarItems: JSX.Element[]= [];

        for(let i=0; i<this.state.seminars.length; i++) {
            var seminar = this.state.seminars[i]
            var seminarCard = (
                <div>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}} onClick={() => {this.goToSeminarEdit(this.state.seminars[i].id)}}>
                        <WellnessCardSeminar seminar={seminar} />
                    </div>
                </div>
            )
            seminarItems.push(seminarCard)
        }

        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab  - ΛΙΣΤΑ ΣΕΜΙΝΑΡΙΩΝ</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΔΗΜΙΟΥΡΓΙΑ ΣΕΜΙΝΑΡΙΟΥ"} onClick={() => {this.goToSeminarEdit("-1")}}/>
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={this.styles.articlesContainer}> {seminarItems} </div>
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

export default AdminPanelSeminarsList