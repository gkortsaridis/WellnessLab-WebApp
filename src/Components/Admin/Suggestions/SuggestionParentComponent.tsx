import * as React from 'react';

import addIcon from '../../../Images/plus.png'
import deleteImg from '../../../Images/deleteIcon.png'
import {TextField} from "@material-ui/core";
import {SuggestionParent} from "../../../Entities/Entities";
import ReactHtmlParser from 'react-html-parser';
import {urlify} from "../../../Repositories/UIRepository";

type SuggestionParentProp = {
    edit: boolean
    suggestionParent: SuggestionParent
    onSuggestionParentChanged: (suggestionParent: SuggestionParent) => void
    onSuggestionParentDelete: (suggestionParent: SuggestionParent) => void
}

type SuggestionParentState = { }

class SuggestionParentComponent extends React.Component<SuggestionParentProp, SuggestionParentState> {

    constructor(props: SuggestionParentProp, state: SuggestionParentState) {
        super(props, state);
    }

    render() {
        return(
            <div style={this.styles.container}>
                <div style={this.styles.topRowContainer}>
                    {
                        this.props.edit
                            ? <img
                                alt={"delete"}
                                style={this.styles.deleteBtn}
                                src={deleteImg}
                                onClick={(e) => { this.props.onSuggestionParentDelete(this.props.suggestionParent) }}/>
                            : null
                    }

                    <img style={this.styles.suggestionTypeIcon} src={this.props.suggestionParent. suggestionType.img}/>
                    <div style={{fontWeight: 600, fontSize: 18}}>{ this.props.suggestionParent.suggestionType.name}</div>
                </div>
                <div>
                    {
                        this.props.suggestionParent.suggestionsText.map((suggestionTxt: string, index: number) => {
                            return(
                                <ul>
                                    <div style={this.styles.suggestionParentLineContainer}>
                                        {
                                            this.props.edit
                                                ? <img
                                                    alt={"delete"}
                                                    style={this.styles.deleteBtn}
                                                    src={deleteImg}
                                                    onClick={(e) => {
                                                        const suggestionParent = this.props.suggestionParent
                                                        const index = suggestionParent.suggestionsText.indexOf(suggestionTxt)
                                                        suggestionParent.suggestionsText.splice(index,1)
                                                        this.props.onSuggestionParentChanged(suggestionParent)
                                                    }}/>
                                                : null
                                        }

                                        {
                                            this.props.edit
                                                ? <TextField
                                                    style={this.styles.textField}
                                                    value={suggestionTxt}
                                                    onChange={(e) => {
                                                        const suggestionParent = this.props.suggestionParent
                                                        suggestionParent.suggestionsText[index] = e.target.value
                                                        this.props.onSuggestionParentChanged(suggestionParent)
                                                    }}
                                                />
                                                : <div>- {ReactHtmlParser(urlify(suggestionTxt))}</div>
                                        }
                                    </div>

                                </ul>
                            )
                        })
                    }

                    {
                        this.props.edit
                            ? <ul>
                                <img style={this.styles.deleteBtn} src={addIcon} onClick={(e) => {
                                    const suggestionParent = this.props.suggestionParent
                                    suggestionParent.suggestionsText.push("")
                                    this.props.onSuggestionParentChanged(suggestionParent)
                                }}/>
                            </ul>
                            : null
                    }

                </div>
            </div>
        )
    }

    styles = {
        container: {display: 'flex', flexDirection: 'column' as 'column' },
        topRowContainer: {display: 'flex', flexDirection: 'row' as 'row', alignItems: 'center' as 'center', marginLeft: 10, marginRight: 10},
        deleteBtn: {width: 20, height: 20, marginRight: 10},
        suggestionTypeIcon: {width: 30, height: 30, marginRight: 10},
        suggestionParentLineContainer: {display: 'flex', flexDirection: 'row' as 'row'},
        textField: {flexGrow: 1, marginRight: 10}
    }
}

export default SuggestionParentComponent