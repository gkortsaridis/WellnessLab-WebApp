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
import {Button} from "rmwc";

type AdminPanelSuggestionTypeProps = {
    history: any
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
                        alert("Suggestion type updated")
                    })
                    .catch((error) => {
                        alert(error)
                    })
            } else {
                //ΔΗΜΙΟΥΡΓΙΑ
                createSuggestionType(suggestionType)
                    .then((response) => {
                        alert("Suggestion type created")
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }
        }


    }

    deleteSuggestionType() {
        deleteSuggestionType(this.state.suggestionType.id)
            .then((response) => {
                alert("Suggestion type deleted")
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {

        return (
            <div style={this.styles.container}>
                <h1>{this.state.suggestionType.id === "" ? "Δημιουργία" : "Επεξεργασία"} Suggestion type</h1>

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
                    style={{width: '80%', marginTop: 40, marginLeft: '10%'}}
                    value={this.state.suggestionType.name}
                    onChange={(e) => {
                        const suggestionType = this.state.suggestionType
                        suggestionType.name = e.target.value
                        this.setState({suggestionType: suggestionType})
                    }}/>

                <div style={{width: '80%', marginTop: 40, marginLeft: '10%'}}>
                    <MultiImageInput
                        images={this.state.suggestionTypeImgArr}
                        setImages={(images: any) => this.setState({suggestionTypeImgArr: images})}
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

                <Button label={"ΑΠΟΘΗΚΕΥΣΗ"} onClick={() => {this.saveSuggestionType()}}/>

                {
                    this.state.suggestionType.id === ""
                        ? null
                        : <Button label={"ΔΙΑΓΡΑΦΗ"} style={{color: 'red'}} onClick={() => {this.deleteSuggestionType()}}/>
                }


            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white',
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center' as 'center'
        },
        articleCard: { width: '200px', height: '200px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {margin: 25, height: '80px', overflow: 'hidden', borderRadius: 15, backgroundRepeat: 'no-repeat'},
        articleTitleContainer: {width: '200px', height: '100px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default AdminPanelSuggestionType