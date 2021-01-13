import * as React from 'react';
import {
    createSubject,
    deleteSubject,
    emptySubject,
    getSubjectById,
    updateSubject
} from "../../Repositories/SubjectsRepository";
import {Article, Subject} from "../../Entities/Entities";
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
import {wellnessLabPrimary} from "../../Entities/Colors";
import logoWhite from "../../Images/logo_white.png";

type SubjectDetailsProps = {
    history: any
}

type SubjectDetailsState = {
    subject: Subject,
    tipsImages: string[],
    articleImage: string[],
    subjectImage: string[],
    deleteAlertOpen: boolean
}


class AdminPanelSubjectEditing extends React.Component<SubjectDetailsProps, SubjectDetailsState> {

    constructor(props: SubjectDetailsProps, state: SubjectDetailsState) {
        super(props, state);

        let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))
        this.state = {subject: subjectObj, tipsImages: [], articleImage: [], subjectImage: [], deleteAlertOpen: false}

        this.createUpdateSubject = this.createUpdateSubject.bind(this)
        this.showDeleteSubjectDialog = this.showDeleteSubjectDialog.bind(this)
        this.deleteActiveSubject = this.deleteActiveSubject.bind(this)

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

                    this.setState({subject: subject, articleImage: articleImg, subjectImage: subjectImg})
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
        this.setState({deleteAlertOpen: true})
    }

    private deleteActiveSubject(shouldDelete: boolean) {
        this.setState({deleteAlertOpen: false})
        if(shouldDelete) {
            deleteSubject(this.state.subject.id)
                .then((result) => {
                    console.log(result)
                    window.location.reload(false)
                })
                .catch((error) => {
                    console.log(error)
                    window.location.reload(false)
                })
        }
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

        if(this.state.subject.id !== emptySubject.id) {
            console.log(updatedSubject)
            //Update
            updateSubject(updatedSubject)
                .then((result) => {
                    console.log(result)
                    alert('Success')
                    window.location.reload(false)
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
                    alert('success')
                    window.location.reload(false)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                    window.location.reload(false)
                })
        }
    }

    render() {
        return (
            <div style={this.styles.container}>
                <div>
                    <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                        <TopAppBarRow>
                            <TopAppBarSection>
                                <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                <TopAppBarTitle>WellnessLab</TopAppBarTitle>


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
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div>
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
                                <div>
                                    <ul>
                                        <Typography use="subtitle1" style={this.styles.input}>Φωτογραφία Άρθρου</Typography>
                                        <MultiImageInput
                                            images={this.state.articleImage}
                                            setImages={(images: any) => this.setState({articleImage: images})}
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
                                    </ul>
                                </div>
                                <div>
                                    <ul>
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
                                    </ul>
                                </div>
                            </div>
                        </ul>

                        <ul>
                            <TextField
                                style={this.styles.input}
                                label="Suggestions"
                                multiline={true}
                                value={this.state.subject.suggestions}
                                onChange={(e) => {
                                    const subject = this.state.subject
                                    subject.suggestions = e.target.value
                                    this.setState({subject: subject})
                                }}
                            />
                        </ul>
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