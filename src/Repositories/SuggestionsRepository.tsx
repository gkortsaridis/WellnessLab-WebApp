import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import {Subject, SubjectSuggestion, SuggestionParent, SuggestionType} from "../Entities/Entities";

export const emptySuggestionType: SuggestionType = {name: "UNKNOWN_TYPE", img: "", id: ""}
export const emptySuggestionParent: SuggestionParent = {suggestionType: emptySuggestionType, suggestionsText: []}
export const emptySubjectSuggestion: SubjectSuggestion = {mainText: "", suggestions: []}

export function getAllSuggestionTypes() {

    return new Promise<SuggestionType[]>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
            const suggestionTypesArr: SuggestionType[] = [];

            for(let cnt=0; cnt< snapshot.docs.length; cnt++) {
                const doc = snapshot.docs[cnt]
                let suggestionObj: SuggestionType = JSON.parse(JSON.stringify(emptySuggestionType))

                const name = doc.data().name
                const img = doc.data().img

                suggestionObj.name = name
                suggestionObj.img = img
                suggestionObj.id = doc.id

                suggestionTypesArr.push(suggestionObj)

                if(cnt === snapshot.docs.length - 1) {
                    resolve(suggestionTypesArr)
                }
            }
        })
    })
}

export function getSuggestionTypeByID(suggestionTypeID: string) {

    return new Promise<SuggestionType>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').doc(suggestionTypeID).get().then((snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
            const doc = snapshot.data() as any
            let suggestionObj: SuggestionType = JSON.parse(JSON.stringify(emptySuggestionType))

            const name = doc.name
            const img = doc.img

            suggestionObj.name = name
            suggestionObj.img = img
            suggestionObj.id = snapshot.id

            resolve(suggestionObj)
        })
    })
}

export function updateSuggestionType(suggestionType: SuggestionType) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').doc(suggestionType.id).set({
            name: suggestionType.name,
            img: suggestionType.img
        })
            .then((result) => resolve(result))
            .catch((error) => reject(error))

    })
}

export function createSuggestionType(suggestionType: SuggestionType) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').add({
            name: suggestionType.name,
            img: suggestionType.img
        })
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}

export function deleteSuggestionType(suggestionTypeID: string) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').doc(suggestionTypeID).delete()
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}
