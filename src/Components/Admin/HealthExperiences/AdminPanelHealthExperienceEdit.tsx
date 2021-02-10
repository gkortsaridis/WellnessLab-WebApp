import * as React from 'react';
import {HealthExperience, Seminar} from "../../../Entities/Entities";
import {createSeminar, deleteSeminar, emptySeminar, getSeminarID, updateSeminar} from "../../../Repositories/SeminarsRepository";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {Button, Typography} from "rmwc";
import MultiImageInput from "react-multiple-image-input";
import TextField from "@material-ui/core/TextField";
import {
    createHealthExperience,
    deleteHealthExperience,
    emptyHealthExperience,
    getHealthExperienceByID, updateHealthExperience
} from "../../../Repositories/HealthExperiencesRepository";

type AdminPanelHealthExperienceEditProps = {
    history: any
}

type AdminPanelHealthExperienceEditState = {
    healthExperience: HealthExperience,
    isCardFlipped: boolean,
    healthExperienceImg: string
}

class AdminPanelHealthExperienceEdit extends React.Component<AdminPanelHealthExperienceEditProps , AdminPanelHealthExperienceEditState> {

    constructor(props: AdminPanelHealthExperienceEditProps, state: AdminPanelHealthExperienceEditState) {
        super(props, state);
        this.state = {healthExperience: JSON.parse(JSON.stringify(emptyHealthExperience)), isCardFlipped: false, healthExperienceImg: ""}

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
                .then((healthExperience: HealthExperience) => {this.setState({healthExperience: healthExperience})})
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
                    alert("Health Experience saved")
                })
                .catch((error: any) => {
                    alert(error)
                })
        } else {
            updateHealthExperience(this.state.healthExperience)
                .then((result: any) => {
                    alert("Health Experience updated")
                })
                .catch((error: any) => {
                    alert("Error")
                })

        }
    }

    deleteHealthExperience() {
        deleteHealthExperience(this.state.healthExperience.id)
            .then(() => {
                alert("Seminar deleted")
            })
            .catch((error : any) => {
                alert(error)
            })
    }

    render() {
        return (
            <div style={this.styles.container}>
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
                        <Button label={this.state.healthExperience.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} onClick={this.saveHealthExperience}/>
                        {
                            this.state.healthExperience.id !== "-1" ? <Button style={{color: 'red'}} label={"ΔΙΑΓΡΑΦΗ"} onClick={this.deleteHealthExperience}/> : null
                        }
                    </ul>

                </div>

                <div style={{width: '40%', height: '100%'}}>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}}>
                        <WellnessCard width={'90%'} height={'90%'} borderRadius={15}>
                            <ReactCardFlip key={"f"} isFlipped={this.state.isCardFlipped} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>

                                <div key={"a"} style={{display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%'}} onClick={this.handleClick}>
                                    <img key={"b"} alt={this.state.healthExperience.title} src={this.state.healthExperience.img} style={{width: '100%', height: '90%' }}/>
                                    <div key={"c"} style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignItems: 'center', justifyContent: 'center', height: '10%', fontWeight: 400, display: 'flex'}}>
                                        <div>
                                            {this.state.healthExperience.title}
                                        </div>

                                    </div>
                                </div>

                                <div key={"g"} style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}} onClick={this.handleClick}>
                                    { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                                    <div key={"h"}  style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{this.state.healthExperience.description}</div>
                                </div>
                            </ReactCardFlip>
                        </WellnessCard>
                    </div>
                </div>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white',
            display: 'flex',
            flexDirection: 'row' as 'row'
        },
        input: {
            display: 'flex',
            marginRight: 40
        },
    }
}

export default AdminPanelHealthExperienceEdit