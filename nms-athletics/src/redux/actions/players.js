
import {UPDATE_PLAYERS} from '../../config/actions';
import { db } from "../../firebase-config";
import {DB} from '../../config/constants';

import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";
import { batch } from 'react-redux';

import { async } from "@firebase/util";

const playersCollectionRef = collection(db, DB.players);

export const getPlayerList = () => async (dispatch, getState) => {
    try {
        const data = await getDocs(playersCollectionRef);
        let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('data list:', dataList)

        dispatch(updatePlayerList(dataList))
    }
    catch (error) {
        console.log('getEventList : error:', error);
    }

}

export const addPlayer = (obj) => async (dispatch, getState) => {
    try {
        await addDoc(playersCollectionRef, obj);
    }
    catch (error) {
        console.log('error:', error);
    }
}


export const updatePlayerList = (data) => {
    return {
        type: UPDATE_PLAYERS,
        data: data
    }
}

