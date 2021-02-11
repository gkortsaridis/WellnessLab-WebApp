import * as React from 'react';
import {HealthExperience, Seminar} from "../../../Entities/Entities";
import {createSeminar, deleteSeminar, emptySeminar, getSeminarID, updateSeminar} from "../../../Repositories/SeminarsRepository";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {
    Button,
    TopAppBar,
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    Typography
} from "rmwc";
import MultiImageInput from "react-multiple-image-input";
import TextField from "@material-ui/core/TextField";
import {
    createHealthExperience,
    deleteHealthExperience,
    emptyHealthExperience,
    getHealthExperienceByID, updateHealthExperience
} from "../../../Repositories/HealthExperiencesRepository";
import WellnessCardHealthExperience from "../../CustomUIComponents/WellnessCardHealthExperience";
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";

type AdminPanelHealthExperienceEditProps = {
    history: any,
    alert: (title: string, message: string, yesBtn: string, noBtn: string, action: (yes: boolean) => void) => void
}

type AdminPanelHealthExperienceEditState = {
    healthExperience: HealthExperience,
    isCardFlipped: boolean,
    healthExperienceImg: string[]
}

class AdminPanelHealthExperienceEdit extends React.Component<AdminPanelHealthExperienceEditProps , AdminPanelHealthExperienceEditState> {

    constructor(props: AdminPanelHealthExperienceEditProps, state: AdminPanelHealthExperienceEditState) {
        super(props, state);
        this.state = {healthExperience: JSON.parse(JSON.stringify(emptyHealthExperience)), isCardFlipped: false, healthExperienceImg: []}

        this.handleClick = this.handleClick.bind(this)
        this.saveHealthExperience = this.saveHealthExperience.bind(this)
        this.deleteHealthExperience = this.deleteHealthExperience.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const healthExperienceID = paths[paths.length - 1]
        console.log("Opened health experience",healthExperienceID)

        if(healthExperienceID !== "-1") {
            getHealthExperienceByID(healthExperienceID)
                .then((healthExperience: HealthExperience) => {
                    let imgArr = [healthExperience.img]
                    this.setState({healthExperience: healthExperience, healthExperienceImg: imgArr})
                })
        }else {
            this.setState({healthExperience: JSON.parse(JSON.stringify(emptyHealthExperience))})
        }
    }

    handleClick() {
        this.setState({isCardFlipped: !this.state.isCardFlipped})
    }

    saveHealthExperience() {
        if(this.state.healthExperience.id === "-1") {
            createHealthExperience(this.state.healthExperience)
                .then((result: any) => {
                    alert("Η εμπειρία υγείας δημιουργήθηκε επιτυχώς")
                    this.props.history.goBack()
                })
                .catch((error: any) => {
                    alert(error)
                })
        } else {
            updateHealthExperience(this.state.healthExperience)
                .then((result: any) => {
                    alert("Η εμπειρία υγείας επεξεργάστηκε επιτυχώς")
                    this.props.history.goBack()
                })
                .catch((error: any) => {
                    alert("Error")
                })

        }
    }

    deleteHealthExperience() {
        this.props.alert("Διαγραφή", "Η εμπειρία υγείας θα διαγραφεί οριστικά", "ΔΙΑΓΡΑΦΗ", "ΑΚΥΡΟ", (del: boolean) => {
            if(del) {
                deleteHealthExperience(this.state.healthExperience.id)
                    .then(() => {
                        alert("Η εμπειρία υγείας διαγράφηκε επιτυχώς")
                        this.props.history.goBack()
                    })
                    .catch((error : any) => {
                        alert(error)
                    })
            }
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
                                <TopAppBarTitle>WellnessLab  - {this.state.healthExperience.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} ΕΜΠΕΙΡΙΑΣ ΥΓΕΙΑΣ</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button label={this.state.healthExperience.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} onClick={this.saveHealthExperience}/>
                                { this.state.healthExperience.id !== "-1" ? <Button style={{color: 'red'}} label={"ΔΙΑΓΡΑΦΗ"} onClick={this.deleteHealthExperience}/> : null }
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={this.styles.articlesContainer}>

                            <div style={{width: '60%', height: '100%', display: 'flex', flexDirection: 'column'}} >
                                <ul>
                                    <TextField
                                        style={this.styles.input}
                                        variant="outlined"
                                        label="Τίτλος Εμπειρίας Υγείας"
                                        value={this.state.healthExperience.title}
                                        onChange={(e) => {
                                            const he = this.state.healthExperience
                                            he.title = e.target.value
                                            this.setState({healthExperience: he})
                                        }}/>
                                </ul>

                                <ul>

                                    <TextField
                                        style={this.styles.input}
                                        variant="outlined"
                                        label="Περιγραφή Εμπειρίας Υγείας"
                                        multiline={true}
                                        value={this.state.healthExperience.description}
                                        onChange={(e) => {
                                            const he = this.state.healthExperience
                                            he.description = e.target.value
                                            this.setState({healthExperience: he})
                                        }}/>
                                </ul>

                                <ul>
                                    <Typography use="subtitle1" style={this.styles.input}>Φωτογραφία Εμπειρίας Υγείας</Typography>

                                    <MultiImageInput
                                        style={this.styles.input}
                                        images={this.state.healthExperienceImg}
                                        setImages={(images: any) => {
                                            const he = this.state.healthExperience
                                            he.img = images[0]
                                            this.setState({healthExperience: he, healthExperienceImg: images})
                                        }}
                                        allowCrop={false}
                                        max={1}
                                        theme={{
                                            background: '#ffffff',
                                            outlineColor: '#111111',
                                            textColor: 'rgba(255,255,255,0.6)',
                                            buttonColor: '#ff0e1f',
                                            modalColor: '#ffffff'
                                        }}
                                    />
                                </ul>

                                <ul>

                                </ul>

                            </div>

                            <div style={{width: '40%', height: '100%'}}>
                                <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}}>
                                    <WellnessCardHealthExperience healthExperience={this.state.healthExperience}/>
                                </div>
                            </div>

                        </div>
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
        input: {display: 'flex', marginRight: 40},
    }
}

export default AdminPanelHealthExperienceEdit