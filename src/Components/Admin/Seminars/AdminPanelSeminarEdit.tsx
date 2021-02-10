import * as React from 'react';
import {Seminar} from "../../../Entities/Entities";
import {createSeminar, deleteSeminar, emptySeminar, getSeminarID, updateSeminar} from "../../../Repositories/SeminarsRepository";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {Button, Typography} from "rmwc";
import MultiImageInput from "react-multiple-image-input";
import TextField from "@material-ui/core/TextField";

type AdminPanelSeminarEditProps = {
    history: any
}

type AdminPanelSeminarEditState = {
    seminar: Seminar,
    isCardFlipped: boolean,
    seminarImg: string
}

class AdminPanelSeminarEdit extends React.Component<AdminPanelSeminarEditProps , AdminPanelSeminarEditState> {

    constructor(props: AdminPanelSeminarEditProps, state: AdminPanelSeminarEditState) {
        super(props, state);
        this.state = {seminar: JSON.parse(JSON.stringify(emptySeminar)), isCardFlipped: false, seminarImg: ""}

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
                .then((seminar: Seminar) => {this.setState({seminar: seminar})})
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
                    alert("Seminar saved")
                })
                .catch((error: any) => {
                    alert(error)
                })
        } else {
            updateSeminar(this.state.seminar)
                .then((result: any) => {
                    alert("Seminar updated")
                })
                .catch((error: any) => {
                    alert("Error")
                })

        }
    }

    deleteSeminar() {
        deleteSeminar(this.state.seminar.id)
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

                    <ul>
                        <Button label={this.state.seminar.id === "-1" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} onClick={this.saveSeminar}/>
                        {
                            this.state.seminar.id !== "-1" ? <Button style={{color: 'red'}} label={"ΔΙΑΓΡΑΦΗ"} onClick={this.deleteSeminar}/> : null
                        }
                    </ul>

                </div>

                <div style={{width: '40%', height: '100%'}}>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}}>
                        <WellnessCard width={'90%'} height={'90%'} borderRadius={15}>
                            <ReactCardFlip key={"f"} isFlipped={this.state.isCardFlipped} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>

                                <div key={"a"} style={{display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%'}} onClick={this.handleClick}>
                                    <img key={"b"} alt={this.state.seminar.title} src={this.state.seminar.img} style={{width: '100%', height: '90%' }}/>
                                    <div key={"c"} style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignItems: 'center', justifyContent: 'center', height: '10%', fontWeight: 400, display: 'flex'}}>
                                        <div>
                                            {this.state.seminar.title}
                                        </div>

                                    </div>
                                </div>

                                <div key={"g"} style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}} onClick={this.handleClick}>
                                    { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                                    <div key={"h"}  style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{this.state.seminar.description}</div>
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

export default AdminPanelSeminarEdit