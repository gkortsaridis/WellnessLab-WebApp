import * as React from 'react';
import {HealthExperience} from "../../../Entities/Entities";
import {getAllSeminars} from "../../../Repositories/SeminarsRepository";
import {Button} from "rmwc";
import {ADMIN_HEALTH_EXPERIENCES, ADMIN_SEMINARS} from "../../../Entities/AppRoutes";
import WellnessCard from "../../CustomUIComponents/WellnessCard/WellnessCard";
import ReactCardFlip from "react-card-flip";
import {getAllHealthExperiences} from "../../../Repositories/HealthExperiencesRepository";

type AdminPanelHealthExperiencesListProps = {
    history: any
}

type AdminPanelHealthExperiencesListState = {
    healthExperiences: HealthExperience[]
}

class AdminPanelHealthExperiencesList extends React.Component<AdminPanelHealthExperiencesListProps , AdminPanelHealthExperiencesListState> {

    constructor(props: AdminPanelHealthExperiencesListProps, state: AdminPanelHealthExperiencesListState) {
        super(props, state);

        this.state = {healthExperiences : []}

        this.goToHealthExperienceEdit = this.goToHealthExperienceEdit.bind(this)
    }

    componentDidMount() {
        getAllHealthExperiences()
            .then((healthExperiences: HealthExperience[]) => {
                this.setState({healthExperiences: healthExperiences})
            })
    }

    private goToHealthExperienceEdit(seminarId: string) {
        const appHistory = this.props.history
        appHistory.push(ADMIN_HEALTH_EXPERIENCES+"/"+seminarId)
    }

    render() {
        const healthExperienceItems: JSX.Element[]= [];

        for(let i=0; i<this.state.healthExperiences.length; i++) {
            var healthExperience = this.state.healthExperiences[i]
            var healthExperienceCard = (
                <div>
                    <div style={{display: 'flex', flexGrow: 1, height: '600px', width: '500px', alignItems: 'center', justifyContent: 'center'}} >
                        <WellnessCard id={healthExperience.id} width={'90%'} height={'90%'} borderRadius={15} onCardClick={() => {
                            this.goToHealthExperienceEdit(this.state.healthExperiences[i].id)
                        }}>
                            <ReactCardFlip key={"f"} isFlipped={false} flipDirection="vertical" containerStyle={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>

                                <div key={"a"} style={{display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%'}}>
                                    <img key={"b"} alt={healthExperience.title} src={healthExperience.img} style={{width: '100%', height: '90%' }}/>
                                    <div key={"c"} style={{fontSize: 25, color: 'rgb(99, 148, 140)', alignItems: 'center', justifyContent: 'center', height: '10%', fontWeight: 400, display: 'flex'}}>
                                        <div>
                                            {healthExperience.title}
                                        </div>

                                    </div>
                                </div>

                                <div key={"g"} style={{display: 'flex', flexGrow: 1, backgroundColor: 'white', height: '100%', flexDirection: 'column'}}>
                                    { /* <img src={back} style={{width: 20, height: 20, marginTop: 25, marginLeft: 25}}/> */}
                                    <div key={"h"}  style={{ whiteSpace: 'pre-line', overflowY: 'scroll', padding: 25}}>{healthExperience.description}</div>
                                </div>
                            </ReactCardFlip>
                        </WellnessCard>
                    </div>
                </div>
            )
            healthExperienceItems.push(healthExperienceCard)
        }

        return (
            <div style={this.styles.container}>
                <div style={this.styles.introText}>Δημιουργία / Επεξεργασία Εμπειριών Υγείας</div>
                <Button label={"ΔΗΜΙΟΥΡΓΙΑ"} onClick={() => {this.goToHealthExperienceEdit("-1")}}/>
                <div style={this.styles.articlesContainer}> {healthExperienceItems} </div>
            </div>
        )
    }

    styles = {
        container: {flex: 1, backgroundColor: '#F7F7F7'},
        introText: {fontWeight: 100, padding: 20},
        articlesContainer: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' as 'center'},
    }
}

export default AdminPanelHealthExperiencesList