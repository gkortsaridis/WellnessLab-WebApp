import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import WellnessCard from "../../../CustomUIComponents/WellnessCard/WellnessCard";
import {SuggestionType} from "../../../../Entities/Entities";
import {
    createSuggestionType,
    emptySuggestionType,
    getSuggestionTypeByID, updateSuggestionType, deleteSuggestionType
} from "../../../../Repositories/SuggestionsRepository";
import MultiImageInput from "react-multiple-image-input";
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {wellnessLabPrimary} from "../../../../Entities/Colors";
import logoWhite from "../../../../Images/logo_white.png";

type AdminPanelSuggestionTypeProps = {
    history: any,
    alert: (title: string, message: string, yesBtn: string, noBtn: string, action: (yes: boolean) => void) => void
}

type AdminPanelSuggestionTypeState = {
    suggestionType: SuggestionType,
    suggestionTypeImgArr: string[]
}

class AdminPanelSuggestionType extends React.Component<AdminPanelSuggestionTypeProps , AdminPanelSuggestionTypeState> {

    constructor(props: AdminPanelSuggestionTypeProps, state: AdminPanelSuggestionTypeState) {
        super(props, state);

        this.state = {suggestionType : JSON.parse(JSON.stringify(emptySuggestionType)), suggestionTypeImgArr: []}

        this.saveSuggestionType = this.saveSuggestionType.bind(this)
        this.deleteSuggestionType = this.deleteSuggestionType.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const id = paths[paths.length - 1]
        console.log("Opened Suggestion type",id)
        if(id !== "-1") {
            getSuggestionTypeByID(id)
                .then((suggestionType: SuggestionType) => {
                    let suggestionTypeImageArr = [suggestionType.img]
                    this.setState({suggestionType: suggestionType, suggestionTypeImgArr: suggestionTypeImageArr})
                })
                .catch((error) => {

                })
        }
    }

    saveSuggestionType() {

        if(this.state.suggestionTypeImgArr.length === 0 || this.state.suggestionType.name === "") {
            alert("Το suggestion type δεν είναι ετοιμο ακόμα")
        } else {
            const suggestionType = this.state.suggestionType
            suggestionType.img = this.state.suggestionTypeImgArr[0]

            if(this.state.suggestionType.id !== "") {
                //ΕΠΕΞΕΡΓΑΣΙΑ
                updateSuggestionType(suggestionType)
                    .then((response) => {
                        alert("Το Suggestion type επεξεργάστηκε επιτυχώς")
                        this.props.history.goBack()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            } else {
                //ΔΗΜΙΟΥΡΓΙΑ
                createSuggestionType(suggestionType)
                    .then((response) => {
                        alert("Το Suggestion type δημιουργήθηκε επιτυχώς")
                        this.props.history.goBack()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }
        }


    }

    deleteSuggestionType() {
        this.props.alert("Διαγραφή", "Το suggestion type θα διαγραφεί οριστικά", "ΔΙΑΓΡΑΦΗ", "ΑΚΥΡΟ", (del: boolean) => {
            if(del) {
                deleteSuggestionType(this.state.suggestionType.id)
                    .then((response) => {
                        alert("Το Suggestion type διαγράφηκε επιτυχώς")
                        this.props.history.goBack()
                    })
                    .catch((error) => {
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
                                <TopAppBarTitle>WellnessLab - {this.state.suggestionType.id === "" ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} SUGGESTION TYPE</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΑΠΟΘΗΚΕΥΣΗ"} onClick={() => {this.saveSuggestionType()}}/>
                                {
                                    this.state.suggestionType.id === ""
                                        ? null
                                        : <Button label={"ΔΙΑΓΡΑΦΗ"} style={{color: 'red'}} onClick={() => {this.deleteSuggestionType()}}/>
                                }
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={{height: 40}}></div>
                        <WellnessCard width={200} height={200} borderRadius={15}>
                            <div style={this.styles.articleCard}>
                                <div style={Object.assign({background: 'url('+this.state.suggestionTypeImgArr[0]+') center / contain'}, this.styles.articleImage)}></div>
                                <div style={this.styles.articleTitleContainer}>
                                    {this.state.suggestionType.name}
                                </div>
                            </div>
                        </WellnessCard>

                        <TextField
                            variant="outlined"
                            label={'Όνομα'}
                            style={{width: '80%', marginTop: 40}}
                            value={this.state.suggestionType.name}
                            onChange={(e) => {
                                const suggestionType = this.state.suggestionType
                                suggestionType.name = e.target.value
                                this.setState({suggestionType: suggestionType})
                            }}/>

                        <div style={{width: '80%', marginTop: 40}}>
                            <MultiImageInput
                                images={this.state.suggestionTypeImgArr}
                                setImages={(images: any) => this.setState({suggestionTypeImgArr: images})}
                                cropConfig={{ minWidth: 50 }}
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
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7', height: '100vh'},
        introText: {fontWeight: 400, padding: 20, fontSize: 25, textAlign: 'center' as 'center'},
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center' as 'center'},
        logo: {width: 40, height: 40, marginRight: 20 },

        articleCard: { width: '200px', height: '200px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {margin: 25, height: '80px', overflow: 'hidden', borderRadius: 15, backgroundRepeat: 'no-repeat' },
        articleTitleContainer: {width: '200px', height: '100px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center', textAlign: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default AdminPanelSuggestionType