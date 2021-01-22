import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import { SubjectSuggestion, SuggestionParent, SuggestionType} from "../Entities/Entities";

export const emptySuggestionType: SuggestionType = {name: "UNKNOWN_TYPE", img: "", id: ""}
export const emptySuggestionParent: SuggestionParent = {suggestionType: emptySuggestionType, suggestionsText: []}
export const emptySubjectSuggestion: SubjectSuggestion = {mainText: "", suggestions: []}

export let allSuggestionTypes: SuggestionType[] = []

export function getAllSuggestionTypes() {
    if(allSuggestionTypes.length === 0) {
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
                        allSuggestionTypes = suggestionTypesArr
                        console.log("CACHING SUGGESTION TYPES")
                        resolve(suggestionTypesArr)
                    }
                }
            })
        })
    } else {
        console.log("SUGGESTION TYPES CACHED")
        return new Promise<SuggestionType[]>((resolve, reject) => { resolve(allSuggestionTypes) })
    }

}

export function getSuggestionTypeByID(suggestionTypeID: string) {
    return new Promise<SuggestionType>((resolve, reject) => {
        getAllSuggestionTypes()
            .then((suggestionTypes: SuggestionType[]) => {
                suggestionTypes.map((st: SuggestionType) => {
                    if (st.id === suggestionTypeID) {
                        resolve(st)
                    }
                })

                reject("No suggestion type with ID: "+suggestionTypeID)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function updateSuggestionType(suggestionType: SuggestionType) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').doc(suggestionType.id).set({
            name: suggestionType.name,
            img: suggestionType.img
        })
            .then((result) => {
                allSuggestionTypes = []
                resolve(result)
            })
            .catch((error) => reject(error))

    })
}

export function createSuggestionType(suggestionType: SuggestionType) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').add({
            name: suggestionType.name,
            img: suggestionType.img
        })
            .then((result) => {
                allSuggestionTypes = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}

export function deleteSuggestionType(suggestionTypeID: string) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('suggestion_types').doc(suggestionTypeID).delete()
            .then((result) => {
                allSuggestionTypes = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}
