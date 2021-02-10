import * as React from 'react';
import {Seminar} from "../../../Entities/Entities";
import {getAllSeminars} from "../../../Repositories/SeminarsRepository";
import {Button} from "rmwc";
import {ADMIN_SEMINARS} from "../../../Entities/AppRoutes";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";

type AdminPanelSeminarsListProps = {
    history: any
}

type AdminPanelSeminarsListState = {
    seminars: Seminar[]
}

class AdminPanelSeminarsList extends React.Component<AdminPanelSeminarsListProps , AdminPanelSeminarsListState> {

    constructor(props: AdminPanelSeminarsListProps, state: AdminPanelSeminarsListState) {
        super(props, state);

        this.state = {seminars : []}

        this.goToSeminarEdit = this.goToSeminarEdit.bind(this)
    }

    componentDidMount() {
        getAllSeminars()
            .then((seminars: Seminar[]) => {
                this.setState({seminars: seminars})
            })
    }

    private goToSeminarEdit(seminarId: string) {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SEMINARS+"/"+seminarId)
    }

    render() {
        const seminarItems: JSX.Element[]= [];

        for(let i=0; i<this.state.seminars.length; i++) {
            var seminar = this.state.seminars[i]
            var seminarCard = (
                <div>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}} >
                        <WellnessCard id={seminar.id} width={'90%'} height={'90%'} borderRadius={15} onCardClick={() => {
                            this.goToSeminarEdit(this.state.seminars[i].id)
                        }}>
                            <ReactCardFlip key={"f"} isFlipped={false} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>

                                <div key={"a"} style={{display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%'}}>
                                    <img key={"b"} alt={seminar.title} src={seminar.img} style={{width: '100%', height: '90%' }}/>
                                    <div key={"c"} style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignItems: 'center', justifyContent: 'center', height: '10%', fontWeight: 400, display: 'flex'}}>
                                        <div>
                                            {seminar.title}
                                        </div>

                                    </div>
                                </div>

                                <div key={"g"} style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}}>
                                    { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                                    <div key={"h"}  style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{seminar.description}</div>
                                </div>
                            </ReactCardFlip>
                        </WellnessCard>
                    </div>
                </div>
            )
            seminarItems.push(seminarCard)
        }

        return (
            <div style={this.styles.container}>
                <div style={this.styles.introText}>Δημιουργία / Επεξεργασία Σεμιναρίων</div>
                <Button label={"ΔΗΜΙΟΥΡΓΙΑ"} onClick={() => {this.goToSeminarEdit("-1")}}/>
                <div style={this.styles.articlesContainer}> {seminarItems} </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7'},
        introText: {fontWeight: 100, padding: 20},
        articlesContainer: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},
    }
}

export default AdminPanelSeminarsList