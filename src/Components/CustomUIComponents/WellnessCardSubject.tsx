import * as React from 'react';
import {Subject} from "../../Entities/Entities";
import WellnessCard from "./WellnessCard/WellnessCard";

type WellnessCardSubjectProps = {
    subject: Subject,
    onSubjectClicked: (subject: Subject) => void
}

class WellnessCardSubject extends React.Component<WellnessCardSubjectProps, {}> {

    constructor(props: WellnessCardSubjectProps, state: {}) {
        super(props, state);
    }

    render() {
        return (
            <WellnessCard width={300} height={500} borderRadius={this.cardRadius} onCardClick={() => {this.props.onSubjectClicked(this.props.subject)}}>
                <div style={this.styles.articleCard}>
                    <div style={Object.assign({background: 'url('+this.props.subject.imgUrl+') center / cover'}, this.styles.articleImage)}></div>
                    <div style={this.styles.articleTitleTextContainer}>
                        <div style={this.styles.articleTitleText}>{this.props.subject.title}</div>
                    </div>
                </div>
            </WellnessCard>
        )
    }

    cardRadius = 15

    styles = {
        articleCard: {display: "flex", flexGrow: 1, flexDirection: 'column' as 'column', backgroundColor: 'white'},
        articleImage: {width: '300px', height: '400px', overflow: 'hidden', borderRadius: this.cardRadius},
        articleTitleContainer: {width: '300px', height: '100px', backgroundColor: 'white', display: 'table', textAlign: 'center' as 'center', borderRadius: this.cardRadius},
        articleTitleTextContainer: {flexGrow: 1, display: 'flex', padding: '5px', alignItems: 'center' as 'center', justifyContent: 'center' as 'center', textAlign: 'center' as 'center'},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', fontWeight: 600},
    }
}

export default WellnessCardSubject