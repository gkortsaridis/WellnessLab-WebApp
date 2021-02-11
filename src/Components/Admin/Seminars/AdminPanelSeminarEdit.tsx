import * as React from 'react';
import {Seminar} from "../../../Entities/Entities";
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
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";
import WellnessCardSeminar from "../../CustomUIComponents/WellnessCardSeminar";

type AdminPanelSeminarEditProps = {
    history: any,
    alert: (title: string, message: string, yesBtn: string, noBtn: string, action: (yes: boolean) => void) => void
}

type AdminPanelSeminarEditState = {
    seminar: Seminar,
    isCardFlipped: boolean,
    seminarImg: string[]
}

class AdminPanelSeminarEdit extends React.Component<AdminPanelSeminarEditProps , AdminPanelSeminarEditState> {

    constructor(props: AdminPanelSeminarEditProps, state: AdminPanelSeminarEditState) {
        super(props, state);
        this.state = {seminar: JSON.parse(JSON.stringify(emptySeminar)), isCardFlipped: false, seminarImg: []}

        this.handleClick = this.handleClick.bind(this)
        this.saveSeminar = this.saveSeminar.bind(this)
        this.deleteSeminar = this.deleteSeminar.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const seminarId = paths[paths.length - 1]
        console.log("Opened seminar",seminarId)

        if(seminarId !== "-1") {
            getSeminarID(seminarId)
                .then((seminar: Seminar) => {
                    let imgArr = [seminar.img]
                    this.setState({seminar: seminar, seminarImg: imgArr})
                })
        }else {
            this.setState({seminar: JSON.parse(JSON.stringify(emptySeminar))})
        }
    }

    handleClick() {
        this.setState({isCardFlipped: !this.state.isCardFlipped})
    }

    saveSeminar() {
        if(this.state.seminar.id === "-1") {
            createSeminar(this.state.seminar)
                .then((result: any) => {
                    alert("Το σεμινάριο δημιουργήθηκε επιτυχώς")
                    this.props.history.goBack()
                })
                .catch((error: any) => {
                    alert(error)
                })
        } else {
            updateSeminar(this.state.seminar)
                .then((result: any) => {
                    alert("Το σεμινάριο επεξεργάστηκε επιτυχώς")
                    this.props.history.goBack()
                })
                .catch((error: any) => {
                    alert("Error")
                })

        }
    }

    deleteSeminar() {
        this.props.alert("Διαγραφή", "Το σεμινάριο θα διαγραφεί οριστικά", "ΔΙΑΓΡΑΦΗ", "ΑΚΥΡΟ", (del: boolean) => {
            if(del) {
                deleteSeminar(this.state.seminar.id)
                    .then(() => {
                        alert("Το σεμινάριο διαγράφηκε επιτυχώς")
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
                                <TopAppBarTitle>WellnessLab  - {this.state.seminar.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} ΣΕΜΙΝΑΡΙΟΥ</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button label={this.state.seminar.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} onClick={this.saveSeminar}/>
                                {
                                    this.state.seminar.id !== "-1" ? <Button style={{color: 'red'}} label={"ΔΙΑΓΡΑΦΗ"} onClick={this.deleteSeminar}/> : null
                                }
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={{width: '60%', height: '100%', display: 'flex', flexDirection: 'column'}} >
                            <ul>
                                <TextField
                                    style={this.styles.input}
                                    variant="outlined"
                                    label="Τίτλος Σεμιναρίου"
                                    value={this.state.seminar.title}
                                    onChange={(e) => {
                                        const seminar = this.state.seminar
                                        seminar.title = e.target.value
                                        this.setState({seminar: seminar})
                                    }}/>
                            </ul>

                            <ul>

                                <TextField
                                    style={this.styles.input}
                                    variant="outlined"
                                    label="Περιγραφή Σεμιναρίου"
                                    multiline={true}
                                    value={this.state.seminar.description}
                                    onChange={(e) => {
                                        const seminar = this.state.seminar
                                        seminar.description = e.target.value
                                        this.setState({seminar: seminar})
                                    }}/>
                            </ul>

                            <ul>
                                <Typography use="subtitle1" style={this.styles.input}>Φωτογραφία Σεμιναρίου</Typography>

                                <MultiImageInput
                                    style={this.styles.input}
                                    images={this.state.seminarImg}
                                    setImages={(images: any) => {
                                        const seminar = this.state.seminar
                                        seminar.img = images[0]
                                        this.setState({seminar: seminar, seminarImg: images})
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
                        </div>

                        <div style={{width: '40%', height: '100%'}}>
                            <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}}>
                                <WellnessCardSeminar seminar={this.state.seminar} />
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
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'row' as 'row',},
        logo: {width: 40, height: 40, marginRight: 20 },
        articlesContainer: {width: '100%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},

        input: {
            display: 'flex',
            marginRight: 40
        },
    }
}

export default AdminPanelSeminarEdit