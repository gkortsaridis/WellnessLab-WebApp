import firebase from 'firebase/app';
import 'firebase/firestore'; // If using Firebase database

import {HealthExperience, Subject} from "../Entities/Entities";

export const emptyHealthExperience: HealthExperience = {title: "UNKNOWN", img: "", description: "", id: "-1", createdDate: Date.now(), modifiedDate: Date.now()}
export let allHealthExperiences: HealthExperience[] = []

let DB_NAME = "health_experiences"

export function getAllHealthExperiences() {
    if(allHealthExperiences.length === 0) {
        return new Promise<HealthExperience[]>((resolve, reject) => {
            firebase.firestore().collection(DB_NAME).get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                const healthExperiencesArr: HealthExperience[] = [];

                for(let cnt=0; cnt< snapshot.docs.length; cnt++) {
                    const doc = snapshot.docs[cnt]
                    let healthExperienceObj: HealthExperience = JSON.parse(JSON.stringify(emptyHealthExperience))

                    const title = doc.data().title
                    const img = doc.data().img
                    const desc = doc.data().description
                    const createdDate = doc.data().createdDate
                    const modifiedDate = doc.data().modifiedDate

                    healthExperienceObj.title = title
                    healthExperienceObj.img = img
                    healthExperienceObj.description = desc
                    healthExperienceObj.id = doc.id
                    healthExperienceObj.createdDate = createdDate
                    healthExperienceObj.modifiedDate = modifiedDate

                    healthExperiencesArr.push(healthExperienceObj)

                    if(cnt === snapshot.docs.length - 1) {
                        allHealthExperiences = healthExperiencesArr
                        console.log("CACHING HEALTH EXPERIENCES")
                        healthExperiencesArr.sort((a: HealthExperience, b: HealthExperience) => a.modifiedDate < b.modifiedDate ? 1 : -1)

                        resolve(healthExperiencesArr)
                    }
                }
            })
        })
    } else {
        console.log("HEALTH EXPERIENCES CACHED")
        return new Promise<HealthExperience[]>((resolve, reject) => { resolve(allHealthExperiences) })
    }

}

export function getHealthExperienceByID(healthExperienceID: string) {
    return new Promise<HealthExperience>((resolve, reject) => {
        getAllHealthExperiences()
            .then((suggestionTypes: HealthExperience[]) => {
                suggestionTypes.map((st: HealthExperience) => {
                    if (st.id === healthExperienceID) {
                        resolve(st)
                    }
                })

                reject("No health experience with ID: "+healthExperienceID)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function updateHealthExperience(healthExperience: HealthExperience) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).doc(healthExperience.id).set({
            title: healthExperience.title,
            img: healthExperience.img,
            description: healthExperience.description,
            modifiedDate: Date.now()
        })
            .then((result) => {
                allHealthExperiences = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}

export function createHealthExperience(healthExperience: HealthExperience) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).add({
            title: healthExperience.title,
            img: healthExperience.img,
            description: healthExperience.description,
            createdDate: Date.now(),
            modifiedDate: Date.now()
        })
            .then((result) => {
                allHealthExperiences = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}

export function deleteHealthExperience(healthExperienceID: string) {
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection(DB_NAME).doc(healthExperienceID).delete()
            .then((result) => {
                allHealthExperiences = []
                resolve(result)
            })
            .catch((error) => reject(error))
    })
}
