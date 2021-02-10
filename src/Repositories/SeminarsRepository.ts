import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import { Seminar } from "../Entities/Entities";

export const emptySeminar: Seminar = {title: "UNKNOWN", img: "", description: "", id: "-1"}
export let allSeminars: Seminar[] = []

let DB_NAME = "seminars"

export function getAllSeminars() {
    if(allSeminars.length === 0) {
        return new Promise<Seminar[]>((resolve, reject) => {
            firebase.firestore().collection(DB_NAME).get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                const seminarsArr: Seminar[] = [];

                for(let cnt=0; cnt< snapshot.docs.length; cnt++) {
                    const doc = snapshot.docs[cnt]
                    let seminarObj: Seminar = JSON.parse(JSON.stringify(emptySeminar))

                    const title = doc.data().title
                    const img = doc.data().img
                    const desc = doc.data().description

                    seminarObj.title = title
                    seminarObj.img = img
                    seminarObj.description = desc
                    seminarObj.id = doc.id

                    seminarsArr.push(seminarObj)

                    if(cnt === snapshot.docs.length - 1) {
                        allSeminars = seminarsArr
                        console.log("CACHING SEMINAR")
                        resolve(seminarsArr)
                    }
                }
            })
        })
    } else {
        console.log("SEMINARS CACHED")
        return new Promise<Seminar[]>((resolve, reject) => { resolve(allSeminars) })
    }
}

export function getSeminarID(seminarID: string) {
    return new Promise<Seminar>((resolve, reject) => {
        getAllSeminars()
            .then((seminars: Seminar[]) => {
                seminars.map((st: Seminar) => {
                    if (st.id === seminarID) {
                        resolve(st)
                    }
                })

                reject("No seminar with ID: "+seminarID)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function updateSeminar(seminar: Seminar) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).doc(seminar.id).set({
            title: seminar.title,
            img: seminar.img,
            description: seminar.description
        })
            .then((result) => {
                allSeminars = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}

export function createSeminar(seminar: Seminar) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).add({
            title: seminar.title,
            img: seminar.img,
            description: seminar.description
        })
            .then((result) => {
                allSeminars = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}

export function deleteSeminar(seminarID: string) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).doc(seminarID).delete()
            .then((result) => {
                allSeminars = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}
