import * as React from 'react';
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from 'rmwc';
import {wellnessLabPrimary} from "../../Entities/Colors";
import logoWhite from "../../Images/logo_white.png";


import firebase from 'firebase/app';
import 'firebase/auth';
import WellnessCard from "../CustomUIComponents/WellnessCard/WellnessCard";


type AdminPanelState = { }
type AdminPanelProps = {
    history: any
}

class AdminPanel extends React.Component<AdminPanelProps, AdminPanelState> {

    constructor(props: AdminPanelProps, state: AdminPanelState) {
        super(props, state);
        this.signIn = this.signIn.bind(this)
    }

    private signIn() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })

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
                        <h3>
                            {"ΓΙΑ ΝΑ ΚΑΝΕΤΕ ΟΠΟΙΑΔΗΠΟΤΕ ΑΛΛΑΓΗ ΣΤΟ SITE ΤΟΥ WELLNESS LAB ΠΡΕΠΕΙ ΝΑ ΣΥΝΔΕΘΕΙΤΕ ΜΕ ΤΟΝ GOOGLE ΛΟΓΑΡΙΑΣΜΟ ΣΑΣ"}
                        </h3>
                        <h3>
                            {
                                this.isAuthenticated()
                                    ? "Είστε συνδεδεμένος ώς χρήστης: "+JSON.parse(localStorage.getItem("authUser") || "{}").email+". αλλά αύτο το email δεν έχει δικαιώματα διαχειρηστή στο σύστημα."
                                    : null
                            }
                        </h3>

                        <Button label={"ΣΥΝΔΕΣΗ"} onClick={this.signIn}/>
                    </div>
                </div>
            </div>
        )
    }

    private isAuthenticated(): boolean {
        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}")
        return authUser.email !== undefined
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7', height: '100vh'},
        introText: {fontWeight: 400, padding: 20, fontSize: 25, textAlign: 'center' as 'center'},
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center' as 'center'},
        logo: {width: 40, height: 40, marginRight: 20 },
    }
}

export default AdminPanel