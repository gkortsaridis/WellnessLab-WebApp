import * as React from 'react';
import {Button} from 'rmwc';
import {ADMIN_HEALTH_EXPERIENCES, ADMIN_SEMINARS, ADMIN_SUBJECTS, ADMIN_SUGGESTIONS} from "../../Entities/AppRoutes";

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
            <div style={this.styles.app}>
                <div style={this.styles.container}>
                    <div style={this.styles.toolbar}>
                    </div>

                    <div style={this.styles.dataUI}>
                        <Button label={"ΘΕΜΑΤΑ"} onClick={this.goToSubjectList}/>
                        <Button label={"SUGGETSIONS"} onClick={this.goToSuggestionTypes}/>
                        <Button label={"ΣΕΜΙΝΑΡΙΑ"} onClick={this.goToSeminars}/>
                        <Button label={"ΕΜΠΕΙΡΙΕΣ ΥΓΕΙΑΣ"} onClick={this.goToHealthExperiences}/>
                    </div>
                </div>
            </div>
        )
    }

    styles = {
        app: { width: '100vw', height: '100vh', display: 'flex'},
        container: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column' as 'column'
        },
        toolbar: {
            display: 'flex',
            height: '10vh',
            backgroundColor: 'rgb(99,148,140)'
        },
        dataUI: {
            display: 'flex',
            flexGrow: 1,
            height: '90vh',
            flexDirection: 'row' as 'row',
        }
    }
}

export default AdminPanel