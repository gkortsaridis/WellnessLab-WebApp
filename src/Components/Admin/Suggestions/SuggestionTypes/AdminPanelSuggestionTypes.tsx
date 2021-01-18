import * as React from 'react';
import {SuggestionType} from "../../../../Entities/Entities";
import {getAllSuggestionTypes} from "../../../../Repositories/SuggestionsRepository";
import WellnessCard from "../../../CustomUIComponents/WellnessCard/WellnessCard";

import plus from '../../../../Images/plus.png'
import TextField from "@material-ui/core/TextField";
import {Button} from "rmwc";
import {ADMIN_SUGGESTION, ADMIN_SUGGESTIONS, SUBJECTS} from "../../../../Entities/AppRoutes";

type AdminPanelSuggestionTypesProps = {
    history: any
}

type AdminPanelSuggestionTypesState = {
    suggestionTypes: SuggestionType[]
}

class AdminPanelSuggestionTypes extends React.Component<AdminPanelSuggestionTypesProps, AdminPanelSuggestionTypesState> {

    constructor(props: AdminPanelSuggestionTypesProps, state: AdminPanelSuggestionTypesState) {
        super(props, state);

        this.state = {suggestionTypes: []}
    }

    componentDidMount() {
        getAllSuggestionTypes()
            .then((suggestionTypes: SuggestionType[]) => {
                this.setState({suggestionTypes: suggestionTypes})
            })
            .catch((error) => {
                alert(error)
            })
    }

    onCardClick(id: string) {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SUGGESTIONS+"/"+id)
    }

    render() {
        const suggestionTypeItems: JSX.Element[]= [];

        suggestionTypeItems.push(
            <div style={this.styles.itemCardContainer}>
                <WellnessCard width={200} height={200} borderRadius={15} onCardClick={() => {this.onCardClick("-1")}}>
                    <div style={this.styles.articleCard}>
                        <div style={Object.assign({background: 'url('+plus+') center / contain'}, this.styles.articleImage)} ></div>
                        <div style={this.styles.articleTitleContainer}>
                            <p style={this.styles.articleTitleText}>{"Δημιουργία νέου Suggestion type"}</p>
                        </div>
                    </div>
                </WellnessCard>
            </div>
        );

        for (let i=0; i<this.state.suggestionTypes.length; i++) {
            suggestionTypeItems.push(
                <div style={this.styles.itemCardContainer}>
                    <WellnessCard width={200} height={200} borderRadius={15} onCardClick={() => {this.onCardClick(this.state.suggestionTypes[i].id)}}>
                        <div style={this.styles.articleCard}>
                            <div style={Object.assign({background: 'url('+this.state.suggestionTypes[i].img+') center / contain'}, this.styles.articleImage)}></div>
                            <div style={this.styles.articleTitleContainer}>
                                {this.state.suggestionTypes[i].name}
                            </div>
                        </div>
                    </WellnessCard>
                </div>
            );
        }

        return (
            <div style={this.styles.app}>
                <div style={this.styles.container}>
                    <div style={this.styles.toolbar}>
                    </div>

                    <div style={this.styles.dataUI}>
                        {suggestionTypeItems}
                    </div>
                </div>
            </div>
        )
    }

    styles = {
        app: { width: '100vw', height: '100vh', display: 'flex'},
        container: {display: 'flex', flexGrow: 1, flexDirection: 'column' as 'column'},
        toolbar: {display: 'flex', height: '10vh', backgroundColor: 'rgb(99,148,140)'},
        dataUI: {display: 'flex', flexGrow: 1, height: '90vh', flexDirection: 'row' as 'row' },
        articlesContainer: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleCard: { width: '200px', height: '200px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {margin: 25, height: '80px', overflow: 'hidden', borderRadius: 15, backgroundRepeat: 'no-repeat'},
        articleTitleContainer: {width: '200px', height: '100px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default AdminPanelSuggestionTypes