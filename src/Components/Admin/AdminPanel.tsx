import * as React from 'react';
import {Button, List, ListItem, SimpleDialog, Typography} from 'rmwc';
import MultiImageInput from 'react-multiple-image-input';
import TextField from '@material-ui/core/TextField';

import {
    createSubject,
    deleteSubject,
    emptySubject,
    getAllSubjects,
    updateSubject
} from "../../Repositories/SubjectsRepository";
import {Article, Subject} from "../../Entities/Entities";
import {ChangeEvent} from "react";

type AdminPanelState = {
    subjects: Subject[],
    activeSubject: Subject,
    images: string[],
    deleteAlertOpen: boolean
}

class AdminPanel extends React.Component<{}, AdminPanelState> {

    constructor(props: {}, state: AdminPanelState) {
        super(props, state);

        this.state = {subjects: [], activeSubject: emptySubject, images: [], deleteAlertOpen: false}

        this.onRowClicked = this.onRowClicked.bind(this)
        this.createUpdateSubject = this.createUpdateSubject.bind(this)
        this.createNewSubject = this.createNewSubject.bind(this)
        this.deleteActiveSubject = this.deleteActiveSubject.bind(this)
        this.showDeleteSubjectDialog = this.showDeleteSubjectDialog.bind(this)
    }

    componentDidMount() {
        getAllSubjects().then(subjects => {
            console.log(subjects)
            this.setState({
                subjects: subjects,
                activeSubject: subjects.length > 0 ? subjects[0] : emptySubject,
                images: subjects.length > 0 ? subjects[0].tips : []
            })
        });
    }

    private createNewSubject() {
        this.setState({activeSubject: emptySubject, images: []})
    }

    private showDeleteSubjectDialog() {
        this.setState({deleteAlertOpen: true})
    }

    private deleteActiveSubject(shouldDelete: boolean) {
        this.setState({deleteAlertOpen: false})
        if(shouldDelete) {
            deleteSubject(this.state.activeSubject.id)
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
        Object.keys(this.state.images).map((value: string, index: number) => {
            tipsArr.push(this.state.images[index])
            return ""
        })

        const updateArticle: Article = {
            title: this.state.activeSubject.article.title,
            imgUrl: this.state.activeSubject.article.imgUrl,
            articleUrl: this.state.activeSubject.article.articleUrl
        }

        const updatedSubject: Subject = {
            title: this.state.activeSubject.title,
            imgUrl: this.state.activeSubject.imgUrl,
            id: this.state.activeSubject.id,
            article: updateArticle,
            tips: tipsArr,
            suggestions: this.state.activeSubject.suggestions,
            modifiedDate: Date.now(),
            createdDate: this.state.activeSubject.createdDate
        }

        if(this.state.activeSubject.id !== emptySubject.id) {
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

    private onRowClicked(index: number) {
        this.setState({activeSubject: this.state.subjects[index], images: this.state.subjects[index].tips})
    }

    render() {
        return (
            <div style={this.styles.app}>
                <div style={this.styles.container}>
                    <div style={this.styles.toolbar}>
                        <Button label={"Νέο Θέμα"} onClick={this.createNewSubject}/>
                    </div>

                    <div style={this.styles.dataUI}>
                        <div style={this.styles.subjectsTable}>
                            <List onAction={(evt) => this.onRowClicked((evt.target as any).index)} style={this.styles.subjectsTable}>
                                { this.state.subjects.map((subject: Subject) => {
                                    return <ListItem style={this.state.activeSubject.id === subject.id ? this.styles.selectedSubject : this.styles.notSelectedSubject} key={1}>{subject.title}</ListItem> }) }
                            </List>
                        </div>

                        <div style={this.styles.detailsContainer}>
                            <ul>
                                <TextField
                                    value={this.state.activeSubject.title}
                                    onChange={(e) => {
                                        const subject = this.state.activeSubject
                                        subject.title = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}
                                    style={this.styles.input} variant="outlined"
                                    label="Τίτλος Θέματος"/>
                            </ul>

                            <ul>
                                <TextField
                                    value={this.state.activeSubject.imgUrl}
                                    onChange={(e) => {
                                        const subject = this.state.activeSubject
                                        subject.imgUrl = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}
                                    style={this.styles.input} variant="outlined"
                                    label="Φωτογραφία Θέματος" />
                            </ul>

                            <ul>
                                <TextField
                                    style={this.styles.input}
                                    variant="outlined"
                                    label="Τίτλος Άρθρου"
                                    value={this.state.activeSubject.article.title}
                                    onChange={(e) => {
                                        const subject = this.state.activeSubject
                                        subject.article.title = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}/>
                            </ul>

                            <ul>
                                <TextField
                                    style={this.styles.input}
                                    variant="outlined"
                                    label="Link Άρθρου"
                                    value={this.state.activeSubject.article.articleUrl}
                                    onChange={(e) => {
                                        const subject = this.state.activeSubject
                                        subject.article.articleUrl = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}/>
                            </ul>

                            <ul>
                                <TextField
                                    style={this.styles.input}
                                    variant="outlined"
                                    label="Φωτογραφία Άρθρου"
                                    value={this.state.activeSubject.article.imgUrl}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                        const subject = this.state.activeSubject
                                        subject.article.imgUrl = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}/>
                            </ul>

                            <ul>
                                <Typography use="subtitle1" style={this.styles.input}>TIPS</Typography>
                                <MultiImageInput
                                    images={this.state.images}
                                    setImages={(images: any) => this.setState({images: images})}
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

                            <ul>
                                <TextField
                                    style={this.styles.input}
                                    label="Suggestions"
                                    multiline={true}
                                    value={this.state.activeSubject.suggestions}
                                    onChange={(e) => {
                                        const subject = this.state.activeSubject
                                        subject.suggestions = e.target.value
                                        this.setState({activeSubject: subject})
                                    }}
                                />
                            </ul>

                            <ul> <Button label={this.state.activeSubject === emptySubject ? "ΔΗΜΙΟΥΡΓΙΑ" : "ΕΠΕΞΕΡΓΑΣΙΑ" } onClick={this.createUpdateSubject} /> </ul>
                            {
                                this.state.activeSubject !== emptySubject
                                    ? <ul> <Button label="ΔΙΑΓΡΑΦΗ" onClick={this.showDeleteSubjectDialog} /> </ul>
                                    : null
                            }

                        </div>

                    </div>
                </div>
                <SimpleDialog
                    title="Είσαι πολύ σίγουρη ότι θες να το διαγράψεις?"
                    body="ΠΟΛΥ ΠΟΛΥ ΣΙΓΟΥΡΗ?!?!"
                    open={this.state.deleteAlertOpen}
                    onClose={evt => {this.deleteActiveSubject(evt.detail.action !== "close")}}
                />

            </div>
        )
    }

    styles = {
        app: { width: '100vw', height: '100vh', display: 'flex'},
        container: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column' as 'column'
        },
        toolbar: {
            display: 'flex',
            height: '10vh',
            backgroundColor: 'rgb(99,148,140)'
        },
        dataUI: {
            display: 'flex',
            flexGrow: 1,
            height: '90vh',
            flexDirection: 'row' as 'row',
        },
        subjectsTable: {
            display: 'flex',
            width: '20vw',
            flexDirection: 'column' as 'column',
            backgroundColor: '#CBF5F4'
        },
        selectedSubject: {
            color: 'blue'
        },
        notSelectedSubject: {
            color: 'black'
        },
        detailsContainer: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column' as 'column',
            paddingLeft: '20px',
            paddingRight: '20px',
            overflowY: 'scroll' as 'scroll',
            scrollBehavior: 'smooth' as "smooth"
        },
        input: {
            display: 'flex'
        }
    }
}

export default AdminPanel