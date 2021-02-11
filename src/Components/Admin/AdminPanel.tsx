import * as React from 'react';
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from 'rmwc';
import {ADMIN_HEALTH_EXPERIENCES, ADMIN_SEMINARS, ADMIN_SUBJECTS, ADMIN_SUGGESTIONS} from "../../Entities/AppRoutes";
import {wellnessLabPrimary} from "../../Entities/Colors";
import logoWhite from "../../Images/logo_white.png";

type AdminPanelState = { }
type AdminPanelProps = {
    history: any
}

class AdminPanel extends React.Component<AdminPanelProps, AdminPanelState> {

    constructor(props: AdminPanelProps, state: AdminPanelState) {
        super(props, state);

        this.goToSubjectList = this.goToSubjectList.bind(this)
        this.goToSuggestionTypes = this.goToSuggestionTypes.bind(this)
        this.goToHealthExperiences = this.goToHealthExperiences.bind(this)
        this.goToSeminars = this.goToSeminars.bind(this)
    }

    private goToSubjectList() {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SUBJECTS)
    }

    private goToSuggestionTypes() {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SUGGESTIONS)
    }

    private goToHealthExperiences() {
        const appHistory = this.props.history
        appHistory.push(ADMIN_HEALTH_EXPERIENCES)
    }

    private goToSeminars() {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SEMINARS)
    }

    render() {
        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab   - ΚΕΝΤΡΙΚΗ ΕΠΕΞΕΡΓΑΣΙΑ wellnesslab.eu</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>

                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <Button label={"ΘΕΜΑΤΑ"} onClick={this.goToSubjectList}/>
                        <Button label={"SUGGESTION TYPES"} onClick={this.goToSuggestionTypes}/>
                        <Button label={"ΣΕΜΙΝΑΡΙΑ"} onClick={this.goToSeminars}/>
                        <Button label={"ΕΜΠΕΙΡΙΕΣ ΥΓΕΙΑΣ"} onClick={this.goToHealthExperiences}/>
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
    }
}

export default AdminPanel