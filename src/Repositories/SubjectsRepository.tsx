import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import {Article, Subject, SubjectSuggestion} from "../Entities/Entities";
import {emptySubjectSuggestion} from "./SuggestionsRepository";

export const emptyArticle: Article = {title: "", imgUrl: "", articleUrl: ""}
export const emptySubject: Subject = {id: "", title: "", imgUrl: "", article: emptyArticle, suggestions: JSON.parse(JSON.stringify(emptySubjectSuggestion)), tips: [], createdDate: Date.now(), modifiedDate: Date.now() }

 export function getAllSubjects() {

     return new Promise<Subject[]>((resolve, reject) => {
         firebase.firestore().collection('subjects').get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
             const subjectsArray: Subject[] = [];

             for(let cnt=0; cnt< snapshot.docs.length; cnt++) {
                 const doc = snapshot.docs[cnt]
                 let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))

                 const title = doc.data().title
                 const imgUrl = doc.data().imgUrl
                 const tips = doc.data().tips
                 const suggestions = doc.data().suggestions
                 const creationDate = doc.data().createdDate
                 const modifiedDate = doc.data().modifiedDate

                 const articleTitle = (doc.data() as any).article.title
                 const articleImgUrl = (doc.data() as any).article.imgUrl
                 const articleUrl = (doc.data() as any).article.articleUrl
                 const article: Article = {title: articleTitle, articleUrl: articleUrl, imgUrl: articleImgUrl }

                 subjectObj.title = title
                 subjectObj.imgUrl = imgUrl
                 subjectObj.id = doc.id
                 subjectObj.article = article
                 subjectObj.tips = tips
                 subjectObj.suggestions = (suggestions === undefined || suggestions === null || typeof suggestions === 'string') ? JSON.parse(JSON.stringify(emptySubjectSuggestion)) : suggestions
                 subjectObj.createdDate = creationDate
                 subjectObj.modifiedDate = modifiedDate
                 subjectsArray.push(subjectObj)

                 if(cnt === snapshot.docs.length - 1) {
                     subjectsArray.sort((a: Subject, b: Subject) => a.modifiedDate < b.modifiedDate ? 1 : -1)
                     resolve(subjectsArray)
                 }
             }
         })
     })
 }

 export function updateSubject(subject: Subject) {

     return new Promise<any>((resolve, reject) => {
         firebase.firestore().collection('subjects').doc(subject.id).set({
             suggestions: subject.suggestions,
             tips: subject.tips,
             title: subject.title,
             imgUrl: subject.imgUrl,
             createdDate: subject.createdDate,
             modifiedDate: subject.modifiedDate,
             article: {
                 title: subject.article.title,
                 imgUrl: subject.article.imgUrl,
                 articleUrl: subject.article.articleUrl
             }
         })
             .then((result) => resolve(result))
             .catch((error) => reject(error))

     })
 }

 export function createSubject(subject: Subject) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('subjects').add({
            suggestions: subject.suggestions,
            tips: subject.tips,
            title: subject.title,
            imgUrl: subject.imgUrl,
            createdDate: subject.createdDate,
            modifiedDate: subject.modifiedDate,
            article: {
                title: subject.article.title,
                imgUrl: subject.article.imgUrl,
                articleUrl: subject.article.articleUrl
            }
        })
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}

 export function deleteSubject(subjectID: string) {
     return new Promise<any>((resolve, reject) => {
         firebase.firestore().collection('subjects').doc(subjectID).delete()
             .then((result) => resolve(result))
             .catch((error) => reject(error))
     })
 }

 export function getSubjectById(subjectID: string) {
     return new Promise<any>((resolve, reject) => {
         firebase.firestore().collection('subjects').doc(subjectID).get()
             .then((result: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
                 let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))

                 let data = result.data() as any
                 const title = data.title
                 const imgUrl = data.imgUrl
                 const tips = data.tips
                 const suggestions = data.suggestions
                 const creationDate = data.createdDate
                 const modifiedDate = data.modifiedDate

                 const articleTitle = data.article.title
                 const articleImgUrl = data.article.imgUrl
                 const articleUrl = data.article.articleUrl
                 const article: Article = {title: articleTitle, articleUrl: articleUrl, imgUrl: articleImgUrl }

                 subjectObj.title = title
                 subjectObj.imgUrl = imgUrl
                 subjectObj.id = result.id
                 subjectObj.article = article
                 subjectObj.tips = tips
                 subjectObj.suggestions = (suggestions === undefined || suggestions === null || typeof suggestions === 'string') ? JSON.parse(JSON.stringify(emptySubjectSuggestion)) : suggestions
                 subjectObj.createdDate = creationDate
                 subjectObj.modifiedDate = modifiedDate

                 resolve(subjectObj)
             })
             .catch((error) => reject(error))
     })
 }

 export function updateSubjectSuggestion(subjectID: string, subjectSuggestion: SubjectSuggestion) {

     return new Promise<any>((resolve, reject) => {
         getSubjectById(subjectID)
             .then((subject: Subject) => {
                 firebase.firestore().collection('subjects').doc(subjectID).set({
                     tips: subject.tips,
                     title: subject.title,
                     imgUrl: subject.imgUrl,
                     createdDate: subject.createdDate,
                     modifiedDate: subject.modifiedDate,
                     article: {
                         title: subject.article.title,
                         imgUrl: subject.article.imgUrl,
                         articleUrl: subject.article.articleUrl
                     },
                     suggestions: subjectSuggestion,
                 })
                     .then((result) => resolve(result))
                     .catch((error) => reject(error))
             })
             .catch((error) => {

             })
     })


 }