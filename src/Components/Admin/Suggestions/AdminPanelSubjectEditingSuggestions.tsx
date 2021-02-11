import * as React from 'react';
import { TextField } from "@material-ui/core";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import {Subject, SubjectSuggestion, SuggestionParent, SuggestionType} from "../../../Entities/Entities";
import { emptySubjectSuggestion, emptySuggestionType, getAllSuggestionTypes } from "../../../Repositories/SuggestionsRepository";
import {Button, Select, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {wellnessLabLightBackground, wellnessLabPrimary} from "../../../Entities/Colors";
import SuggestionParentComponent from "./SuggestionParentComponent";
import {getSubjectById, updateSubjectSuggestion} from "../../../Repositories/SubjectsRepository";
import logoWhite from "../../../Images/logo_white.png";

type AdminPanelSubjectEditingSuggestionsProps = {
    history: any
}

type AdminPanelSubjectEditingSuggestionsState = {
    subjectSuggestion: SubjectSuggestion,
    allSuggestionTypes: SuggestionType[],
    selectedSuggestionType: SuggestionType
}

class AdminPanelSubjectEditingSuggestions extends React.Component<AdminPanelSubjectEditingSuggestionsProps , AdminPanelSubjectEditingSuggestionsState> {

    suggestionTypes: string[] = []
    subjectID = ""

    constructor(props: AdminPanelSubjectEditingSuggestionsProps, state: {}) {
        super(props, state);

        this.state = {
            subjectSuggestion: JSON.parse(JSON.stringify(emptySubjectSuggestion)),
            allSuggestionTypes: [],
            selectedSuggestionType: JSON.parse(JSON.stringify(emptySuggestionType))}
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        this.subjectID = paths[paths.length - 2]
        console.log("Opened subject",this.subjectID)

        getSubjectById(this.subjectID)
            .then((subject: Subject) => {
                console.log("SUBJECT", subject)
                this.setState({subjectSuggestion: subject.suggestions === undefined ? JSON.parse(JSON.stringify(emptySubjectSuggestion)) : subject.suggestions})
            })
            .catch((error) => {

            })

        getAllSuggestionTypes()
            .then((suggestionTypes: SuggestionType[]) => {
                for(let i=0; i<suggestionTypes.length; i++) {
                    this.suggestionTypes.push(suggestionTypes[i].name)
                }
                this.setState({allSuggestionTypes: suggestionTypes, selectedSuggestionType: suggestionTypes[0]})
            })
    }

    addSuggestionParent() {
        const subjectSuggestion = this.state.subjectSuggestion
        const parent: SuggestionParent = {suggestionType: this.state.selectedSuggestionType, suggestionsText: []}
        subjectSuggestion.suggestions.push(parent)
        this.setState({subjectSuggestion: subjectSuggestion})
    }

    getAllSuggestionParents(edit: boolean) {
        const suggestionParents = []
        for(let i=0; i<this.state.subjectSuggestion.suggestions.length; i++) {
            const suggestionParent = this.state.subjectSuggestion.suggestions[i]
            suggestionParents.push(
                <div>
                    <SuggestionParentComponent
                        edit={edit}
                        suggestionParent={suggestionParent}
                        onSuggestionParentChanged={(suggestionParent: SuggestionParent) => {
                            const subjectSuggestion = this.state.subjectSuggestion
                            subjectSuggestion.suggestions.map((suggestionParentMap: SuggestionParent, index: number) => {
                                if(suggestionParentMap === suggestionParent) {
                                    subjectSuggestion.suggestions[index] = suggestionParent
                                    this.setState({subjectSuggestion: subjectSuggestion})
                                }
                            })
                        }}
                        onSuggestionParentDelete={(suggestionParent: SuggestionParent) => {
                            const subjectSuggestion = this.state.subjectSuggestion
                            subjectSuggestion.suggestions.map((suggestionParentMap: SuggestionParent, index: number) => {
                                if(suggestionParentMap === suggestionParent) {
                                    subjectSuggestion.suggestions.splice(i, 1)
                                    this.setState({subjectSuggestion: subjectSuggestion})
                                }
                            })
                        }}
                    />
                </div>
            )
        }
        return suggestionParents
    }

    saveSubjectSuggestion() {
        updateSubjectSuggestion(this.subjectID, this.state.subjectSuggestion)
            .then((response) => {
                alert("Τα suggestions αποθηκεύτηκαν επιτυχώς")
                this.props.history.goBack()
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab - SUGGESTIONS ΘΕΜΑΤΟΣ</TopAppBarTitle>


                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΑΠΟΘΗΚΕΥΣΗ"} onClick={(e) => {this.saveSubjectSuggestion()}} />
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <div style={this.styles.container}>
                            <div style={this.styles.leftSide}>
                                <TextField
                                    style={this.styles.mainTextInput}
                                    label="Κυρίως κείμενο"
                                    multiline={true}
                                    value={this.state.subjectSuggestion.mainText}
                                    onChange={(e) => {
                                        const subjectSuggestion = this.state.subjectSuggestion
                                        subjectSuggestion.mainText = e.target.value
                                        this.setState({subjectSuggestion: subjectSuggestion})
                                    }}
                                />
                                <div style={this.styles.suggestionParentsBorder}>
                                    Κατηγορίες
                                    {this.getAllSuggestionParents(true)}
                                </div>
                                <div style={this.styles.addCategoryContainer}>
                                    <Select
                                        label="Outlined"
                                        outlined={true}
                                        value={this.state.selectedSuggestionType.name}
                                        onChange={(evt) => {
                                            for(let i=0; i<this.state.allSuggestionTypes.length; i++) {
                                                if(this.state.allSuggestionTypes[i].name === evt.currentTarget.value) {
                                                    this.setState({selectedSuggestionType: this.state.allSuggestionTypes[i]})
                                                }
                                            }
                                        }}
                                        options={this.suggestionTypes}
                                    />
                                    <Button
                                        label={"ΠΡΟΣΘΗΚΗ ΚΑΤΗΓΟΡΙΑΣ"}
                                        onClick={(e) => {this.addSuggestionParent()}}
                                        style={this.styles.addCategoryBtn}/>
                                </div>
                            </div>
                            <div style={this.styles.rightSide}>
                                <div style={this.styles.suggestionsTitle}>Τελικό αποτέλεσμα</div>
                                <WellnessCard width={'80%'} height={500} borderRadius={15} disableMove>
                                    <div style={this.styles.suggestionsCard}>
                                        <div style={this.styles.suggestionsMainText}>{this.state.subjectSuggestion.mainText}</div>
                                        {this.getAllSuggestionParents(false)}
                                    </div>
                                </WellnessCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }

    styles = {
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column',},
        logo: {width: 40, height: 40, marginRight: 20 },
        container: {width: '100%', display: 'flex', flexGrow: 1, background: wellnessLabLightBackground, overflowY: 'scroll' as 'scroll'},
        leftSide: {display: 'flex', width: '70%', flexGrow: 1, height: '100%', flexDirection: 'column' as 'column'},
        rightSide: {display: 'flex', width: '30%', flexGrow: 1, height: '100%', flexDirection: 'column' as 'column', alignItems: 'center' as 'center'},
        suggestionsTitle: {marginTop: 30, marginBottom: 20},
        suggestionsCard: {display: 'flex', flexGrow: 1, whiteSpace: 'pre-line' as 'pre-line', overflowY: 'scroll' as 'scroll', padding: 25, backgroundColor: 'white', flexDirection: 'column' as 'column'},
        suggestionsMainText: {margin: 10},
        mainTextInput: {margin: 20},
        suggestionParentsBorder: { border: '2px solid black', margin: 20, padding: 5},
        addCategoryContainer: {display: 'flex', marginTop: 50, marginLeft: 20, marginRight: 20, alignItems: 'center', marginBottom: 20, paddingBottom: 20},
        addCategoryBtn: {marginLeft: 20}
    }
}

export default AdminPanelSubjectEditingSuggestions