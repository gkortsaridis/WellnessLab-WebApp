import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';

import {Router, Switch, Route } from "react-router-dom";

import WLToolbar from "./WLToolbar/WLToolbar";
import Home from "./OurHome/Home";
import Subjects from "./OurSubjects/Subjects";
import Actions from "./OurActions/Actions";
import Videos from "./OurVideos/Videos";
import Team from "./OurTeam/Team";
import UIv1 from "./UIv1/UIv1";
import AdminPanel from "./Admin/AdminPanel";
import { createBrowserHistory } from 'history'
import SubjectDetails from "./OurSubjects/SubjectDetails";
import {
    ACTIONS,
    ADMIN,
    ADMIN_SUBJECT_EDIT, ADMIN_SUBJECT_EDIT_SUGGESTIONS,
    ADMIN_SUBJECTS, ADMIN_SUGGESTION, ADMIN_SUGGESTIONS, HEALTH_EXPERIENCES,
    HOME,
    SUBJECT_DETAILS,
    SUBJECTS, SEMINARS,
    TEAM, TV_INTERVIEW,
    VIDEOS, ADMIN_SEMINARS, ADMIN_SEMINARS_EDIT, ADMIN_HEALTH_EXPERIENCES, ADMIN_HEALTH_EXPERIENCES_EDIT
} from "../Entities/AppRoutes";
import AdminPanelSubjectsList from "./Admin/Subjects/AdminPanelSubjectsList";
import AdminPanelSubjectEditing from "./Admin/Subjects/AdminPanelSubjectEditing";
import AdminPanelSuggestionTypes from "./Admin/Suggestions/SuggestionTypes/AdminPanelSuggestionTypes";
import AdminPanelSuggestionType from "./Admin/Suggestions/SuggestionTypes/AdminPanelSuggestionType";
import AdminPanelSubjectEditingSuggestions from "./Admin/Suggestions/AdminPanelSubjectEditingSuggestions";
import HealthExperiences from "./OurActions/HealthExperiences";
import Seminars from "./OurActions/Seminars";
import TVInterview from "./OurActions/TVInterview";
import AdminPanelSeminarsList from "./Admin/Seminars/AdminPanelSeminarsList";
import AdminPanelSeminarEdit from "./Admin/Seminars/AdminPanelSeminarEdit";
import AdminPanelHealthExperiencesList from "./Admin/HealthExperiences/AdminPanelHealthExperiencesList";
import AdminPanelHealthExperienceEdit from "./Admin/HealthExperiences/AdminPanelHealthExperienceEdit";
import {Dialog, DialogActions, DialogButton, DialogContent, DialogTitle} from "rmwc";

type WellnessLabAppState = {
    renderFlag: boolean,
    alertOpen: boolean,
    alertTitle: string,
    alertMsg: string,
    yesBtn: string,
    noBtn: string,
    action: (yes: boolean) => void
}

const firebaseConfigPROD = {
    apiKey: "AIzaSyDY9zLRl7EOpKR02SWCGpwW2jkrh-YU2uY",
    authDomain: "wellness-lab.firebaseapp.com",
    projectId: "wellness-lab",
    storageBucket: "wellness-lab.appspot.com",
    messagingSenderId: "885154242879",
    appId: "1:885154242879:web:0986faa0998be6476e338a",
    measurementId: "G-P1FY85Q6PG"
};

const firebaseConfigDEV = {
    apiKey: "AIzaSyDr-ubdaSt7rdBtOZMEFQdZEa8oTfK8QIc",
    authDomain: "wellneab-dev.firebaseapp.com",
    projectId: "wellneab-dev",
    storageBucket: "wellneab-dev.appspot.com",
    messagingSenderId: "72411347801",
    appId: "1:72411347801:web:2f3956bfb0de2e75826a48",
    measurementId: "G-X0QZZ72V16"
};

class WellnessLabApp extends React.Component<{}, WellnessLabAppState> {

    private appHistory = createBrowserHistory()

    constructor(props: {}, state: WellnessLabAppState) {
        super(props, state);

        console.log("Localhost : ", window.location.hostname)

        this.onPageSelected = this.onPageSelected.bind(this)
        this.state = {
            renderFlag : false,
            alertOpen: false,
            alertTitle: "",
            alertMsg: "",
            yesBtn: "",
            noBtn: "",
            action: (yes: boolean) => {}
        }

        this.showAlert = this.showAlert.bind(this)

        // Initialize Firebase
        if (!firebase.apps.length) { firebase.initializeApp(this.isLocalhost() ? firebaseConfigDEV : firebaseConfigPROD) }
        else { firebase.app(); }

        firebase.analytics().setAnalyticsCollectionEnabled(true)

        this.appHistory.listen((listener) => {
            firebase.analytics().setCurrentScreen(window.location.pathname)
            firebase.analytics().logEvent("openedPage", {page: window.location.pathname})
            this.setState({ renderFlag: !this.state.renderFlag })
        })
    }

    private isLocalhost(){
        return window.location.hostname === "localhost" || window.location.hostname === "0.0.0.0" || window.location.hostname === "127.0.0.0"
    }

    private onPageSelected(page: string) {
        if(page !== this.appHistory.location.pathname) {
            this.appHistory.push(page)
            this.setState({ renderFlag: !this.state.renderFlag })
        }
    }

    showAlert(title: string, message: string, yesBtn: string, noBtn: string, action: (yes: boolean) => void) {
        this.setState({
            alertOpen: true,
            alertTitle: title,
            alertMsg: message,
            yesBtn: yesBtn,
            noBtn: noBtn,
            action: action
        })
    }

    render() {
        console.log("LOCATION: ",this.appHistory.location)
        return (
            <div>
                <Router history={this.appHistory}>
                    <Switch>
                        <Route exact path={HOME}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Home history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={SUBJECTS}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Subjects history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={SUBJECT_DETAILS}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <SubjectDetails history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={ACTIONS}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Actions history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={HEALTH_EXPERIENCES}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <HealthExperiences history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={SEMINARS}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Seminars history={this.appHistory}/>
                            </div>
                        </Route>

                        <Route exact path={TV_INTERVIEW}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <TVInterview/>
                            </div>
                        </Route>

                        <Route exact path={VIDEOS}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Videos/>
                            </div>
                        </Route>

                        <Route exact path={TEAM}>
                            <div style={this.styles.container}>
                                <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Team/>
                            </div>
                        </Route>

                        <Route exact path={ADMIN}>
                            <AdminPanel history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_SUBJECTS}>
                            <AdminPanelSubjectsList history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_SUGGESTIONS}>
                            <AdminPanelSuggestionTypes history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_SUGGESTION}>
                            <AdminPanelSuggestionType history={this.appHistory} alert={this.showAlert}/>
                        </Route>


                        <Route exact path={ADMIN_SUBJECT_EDIT}>
                            <AdminPanelSubjectEditing history={this.appHistory} alert={this.showAlert}/>
                        </Route>

                        <Route exact path={ADMIN_SUBJECT_EDIT_SUGGESTIONS}>
                            <AdminPanelSubjectEditingSuggestions history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_SEMINARS}>
                            <AdminPanelSeminarsList history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_SEMINARS_EDIT}>
                            <AdminPanelSeminarEdit history={this.appHistory} alert={this.showAlert}/>
                        </Route>

                        <Route exact path={ADMIN_HEALTH_EXPERIENCES}>
                            <AdminPanelHealthExperiencesList history={this.appHistory}/>
                        </Route>

                        <Route exact path={ADMIN_HEALTH_EXPERIENCES_EDIT}>
                            <AdminPanelHealthExperienceEdit history={this.appHistory} alert={this.showAlert}/>
                        </Route>

                        <Route path="*">
                            <UIv1 history={this.appHistory}/>
                        </Route>

                    </Switch>
                </Router>

                <Dialog
                    open={this.state.alertOpen}
                    onClose={evt => {
                        this.state.action(evt.detail.action === "yes")

                        this.setState({
                            renderFlag : false,
                            alertOpen: false,
                            alertTitle: "",
                            alertMsg: "",
                            yesBtn: "",
                            noBtn: "",
                            action: (yes: boolean) => {}
                        })

                    }}>
                    <DialogTitle>{this.state.alertTitle}</DialogTitle>
                    <DialogContent>{this.state.alertMsg}</DialogContent>
                    <DialogActions>
                        <DialogButton action="no">{this.state.noBtn}</DialogButton>
                        <DialogButton action="yes" isDefaultAction>{this.state.yesBtn}</DialogButton>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    styles = {
        container: {
            display: 'flex',
            height: '100vh',
            flex: 1,
            flexDirection: 'column' as 'column',
            background: 'white'
        }
    }
}

export default WellnessLabApp