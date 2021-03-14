import * as React from 'react';
import {SuggestionType} from "../../../../Entities/Entities";
import {getAllSuggestionTypes} from "../../../../Repositories/SuggestionsRepository";
import WellnessCard from "../../../CustomUIComponents/WellnessCard/WellnessCard";

import plus from '../../../../Images/plus.png'
import {ADMIN_SUGGESTIONS } from "../../../../Entities/AppRoutes";
import {Button, TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {wellnessLabPrimary} from "../../../../Entities/Colors";
import logoWhite from "../../../../Images/logo_white.png";

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
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab - ΛΙΣΤΑ SUGGESTION TYPES</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={"ΔΗΜΙΟΥΡΓΙΑ ΝΕΟΥ SUGGESTION TYPE"} onClick={() => {this.onCardClick("-1")}}/>
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        {suggestionTypeItems}
                    </div>
                </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7', height: '100vh'},
        introText: {fontWeight: 400, padding: 20, fontSize: 25, textAlign: 'center' as 'center'},
        dataUI: {display: 'flex', flexGrow: 1, flexDirection: 'row' as 'row',  flexWrap: 'wrap' as 'wrap'},
        logo: {width: 40, height: 40, marginRight: 20 },

        app: { width: '100vw', height: '100vh', display: 'flex'},
        toolbar: {display: 'flex', height: '10vh', backgroundColor: 'rgb(99,148,140)'},
        articlesContainer: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleCard: { width: '200px', height: '200px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white' },
        articleImage: {margin: 25, height: '80px', overflow: 'hidden', borderRadius: 15, backgroundRepeat: 'no-repeat'},
        articleTitleContainer: {width: '200px', height: '100px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center', textAlign: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
    }
}

export default AdminPanelSuggestionTypes