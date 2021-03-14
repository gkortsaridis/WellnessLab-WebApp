import * as React from 'react';
import {
    createSubject,
    deleteSubject,
    emptySubject,
    getSubjectById,
    updateSubject
} from "../../../Repositories/SubjectsRepository";
import {Article, Subject} from "../../../Entities/Entities";
import TextField from "@material-ui/core/TextField";
import {
    Button,
    TopAppBar,
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    Typography
} from "rmwc";
import MultiImageInput from "react-multiple-image-input";
import {wellnessLabPrimary} from "../../../Entities/Colors";
import logoWhite from "../../../Images/logo_white.png";
import { ADMIN_SUBJECTS } from "../../../Entities/AppRoutes";
import empty from "firebase/empty-import";

type SubjectDetailsProps = {
    history: any,
    alert: (title: string, message: string, yesBtn: string, noBtn: string, action: (yes: boolean) => void) => void
}

type SubjectDetailsState = {
    subject: Subject,
    tipsImages: string[],
    articleImage: string[],
    subjectImage: string[]
}


class AdminPanelSubjectEditing extends React.Component<SubjectDetailsProps, SubjectDetailsState> {

    constructor(props: SubjectDetailsProps, state: SubjectDetailsState) {
        super(props, state);

        let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))
        this.state = {subject: subjectObj, tipsImages: [], articleImage: [], subjectImage: []}

        this.createUpdateSubject = this.createUpdateSubject.bind(this)
        this.showDeleteSubjectDialog = this.showDeleteSubjectDialog.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const subjectId = paths[paths.length - 1]
        console.log("Opened subject",subjectId)

        if(subjectId !== "-1") {
            getSubjectById(subjectId)
                .then((subject: Subject) => {
                    console.log(subject)
                    const articleImg = Array()
                    articleImg.push(subject.article.imgUrl)

                    const subjectImg = Array()
                    subjectImg.push(subject.imgUrl)

                    const tipsImg = Array()
                    subject.tips.forEach((value: string, index: number, array: string[]) =>{
                        tipsImg.push(value)
                    })



                    this.setState({subject: subject, articleImage: articleImg, subjectImage: subjectImg, tipsImages: tipsImg})
                })
                .catch((error) => {
                    console.log(error)
                    alert("Could not get subject")
                })
        } else {
            this.setState({subject: emptySubject})
        }

    }

    private showDeleteSubjectDialog() {
        this.props.alert("Διαγραφή", "Αυτό το θέμα θα διαγραφεί οριστικά.", "ΔΙΑΓΡΑΦΗ", "ΑΚΥΡΟ", (del: boolean) => {
            if(del) {
                deleteSubject(this.state.subject.id)
                    .then((result) => {
                        alert('Το θέμα διαγράφηκε επιτυχώς')
                        this.props.history.goBack()
                    })
                    .catch((error) => {
                        console.log(error)
                        window.location.reload(false)
                    })
            }
        })
    }

    private createUpdateSubject() {
        const tipsArr: string[] = []
        Object.keys(this.state.tipsImages).map((value: string, index: number) => {
            tipsArr.push(this.state.tipsImages[index])
            return ""
        })

        const articleImg: string = this.state.articleImage[0]
        const subjectImg: string = this.state.subjectImage[0]

        const updateArticle: Article = {
            title: this.state.subject.article.title,
            imgUrl: articleImg,
            articleUrl: this.state.subject.article.articleUrl
        }

        const updatedSubject: Subject = {
            title: this.state.subject.title,
            imgUrl: subjectImg,
            id: this.state.subject.id,
            article: updateArticle,
            tips: tipsArr,
            suggestions: this.state.subject.suggestions,
            modifiedDate: Date.now(),
            createdDate: this.state.subject.createdDate
        }

        if(updatedSubject.imgUrl === undefined) {
            updatedSubject.imgUrl = ""
        } else if (updatedSubject.article.imgUrl === undefined) {
            updatedSubject.article.imgUrl = ""
        }

        if(this.state.subject.id !== emptySubject.id) {
            console.log(updatedSubject)
            //Update
            updateSubject(updatedSubject)
                .then((result) => {
                    console.log(result)
                    alert('Το θέμα επεξεργάστηκε επιτυχώς')
                    this.props.history.goBack()
                    //window.location.reload(false)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                    window.location.reload(false)
                })

        } else {
            updatedSubject.createdDate = Date.now()
            //Create
            createSubject(updatedSubject)
                .then((result) => {
                    console.log(result)
                    alert('Το θέμα δημιουργήθηκε επιτυχώς')
                    this.props.history.goBack()
                    //window.location.reload(false)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                    window.location.reload(false)
                })
        }
    }

    private goToSuggestions() {
        const appHistory = this.props.history
        appHistory.push(ADMIN_SUBJECTS+"/"+this.state.subject.id+"/suggestions")
    }


    render() {
        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab - { this.state.subject !== emptySubject ? "ΕΠΕΞΕΡΓΑΣΙΑ" : "ΔΗΜΙΟΥΡΓΙΑ"} ΘΕΜΑΤΟΣ</TopAppBarTitle>


                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <Button style={{color: 'white'}} label={this.state.subject === emptySubject ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ" } onClick={this.createUpdateSubject} />
                                { this.state.subject !== emptySubject ? <Button style={{color: 'white'}} label="ΔΙΑΓΡΑΦΗ" onClick={this.showDeleteSubjectDialog} /> : null }

                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />
                    <div style={this.styles.dataUI}>
                        <ul>
                            <TextField
                                value={this.state.subject.title}
                                onChange={(e) => {
                                    const subject = this.state.subject
                                    subject.title = e.target.value
                                    this.setState({subject: subject})
                                }}
                                style={this.styles.input} variant="outlined"
                                label="Τίτλος Θέματος"/>
                        </ul>

                        <ul>
                            <TextField
                                style={this.styles.input}
                                variant="outlined"
                                label="Τίτλος Άρθρου"
                                value={this.state.subject.article.title}
                                onChange={(e) => {
                                    const subject = this.state.subject
                                    subject.article.title = e.target.value
                                    this.setState({subject: subject})
                                }}/>
                        </ul>

                        <ul>
                            <TextField
                                style={this.styles.input}
                                variant="outlined"
                                label="Link Άρθρου"
                                value={this.state.subject.article.articleUrl}
                                onChange={(e) => {
                                    const subject = this.state.subject
                                    subject.article.articleUrl = e.target.value
                                    this.setState({subject: subject})
                                }}/>
                        </ul>

                        <ul>
                            <div style={{display: 'flex', flexDirection: 'row', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{marginLeft: 10, marginRight: 10}}>
                                    <Typography use="subtitle1" style={this.styles.input}>Φωτογραφία Θέματος</Typography>
                                    <MultiImageInput
                                        images={this.state.subjectImage}
                                        setImages={(images: any) => this.setState({subjectImage: images})}
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

                                <div style={{marginLeft: 10, marginRight: 10}}>
                                    <Typography use="subtitle1" style={this.styles.input}>TIPS</Typography>
                                    <MultiImageInput
                                        images={this.state.tipsImages}
                                        setImages={(images: any) => this.setState({tipsImages: images})}
                                        allowCrop={false}
                                        max={10}
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
                        </ul>

                        {
                            this.state.subject !== emptySubject ? <ul> <Button label={"SUGGESTIONS"} onClick={(e) => {this.goToSuggestions()}}/> </ul> : null
                        }

                    </div>
                </div>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white'
        },
        input: {
            display: 'flex',
            marginRight: 40
        },
        dataUI: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column' as 'column',
        },
        logo: {width: 40, height: 40, marginRight: 20 },

    }
}

export default AdminPanelSubjectEditing