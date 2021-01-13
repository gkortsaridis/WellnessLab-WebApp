import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import {SuggestionType} from "../Entities/Entities";

export const emptySuggestionType: SuggestionType = {name: "UNKNOWN_TYPE", img: "", id: ""}


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