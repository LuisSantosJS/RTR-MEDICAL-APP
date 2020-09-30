import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';

import io from "socket.io-client";
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import Notification from '../Services/notification';
import { Platform } from 'react-native';
import api from '../Services/api';


interface LIST {
    userID: string,
    description: string,
    email: string,
    status: string,
    name: string,
    title: string,
    statusText: string,
    id: string,
    timestamp: string,
    timestampTarea: string,
    views: string,
    dateAtual: string,
    date: string,
    numberStatus: number,
}


type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    infoList: string;
    setInfoList: (value: string) => void;
    userID: string;
    setUserID: (value: string) => void;
    emailUser: string;
    setEmailUser: (value: string) => void;
};

const ContextApp = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    loading: false,
    setLoading: (value: boolean) => { },
    infoList: '',
    setInfoList: (value: string) => { },
    userID: '',
    setUserID: (value: string) => { },
    emailUser: '',
    setEmailUser: (value: string) => { },

});


const ProviderAuth: React.FC = ({ children }) => {

    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const socket = io("http://apimedicalrtr-com-co.umbler.net");
    const [infoList, setInfoList] = useState<string>('');
    const [userID, setUserID] = useState<string>('');
    const [emailUser, setEmailUser] = useState<string>('');

    useEffect(() => {
        messaging().subscribeToTopic('medical').then(() => {
            messaging().onMessage(async remoteMessage => {
                //  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
                Notification.configure().localNotification({
                    message: remoteMessage.notification?.body,
                    showWhen: true,
                    autoCancel: true,
                    largeIcon: "ic_launcher",
                    smallIcon: "ic_notification",
                    color: "grey",
                    vibrate: true,
                    vibration: 300,
                    priority: "high",
                    visibility: "private",
                    importance: "high",
                    title: remoteMessage.notification?.title,
                    playSound: true,
                    soundName: "default",
                    number: 10,
                })
            });
        })

    }, [])


    



    // useEffect(() => { }, [list, nameUser, loading, emailUser, userSaved, ])

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // console.log('Authorization status:', authStatus);
        }
    }


    // async function saveTokenToDatabase(token: any) {
    //     await firestore()
    //         .collection('users')
    //         .doc(`${auth().currentUser?.uid}`)
    //         .update({
    //             tokens: String(token),
    //         });
    // }


    async function loadInfoUser() {
        try {
            const value = await AsyncStorage.getItem('@userID')
            console.log('id', value)
            if (value == null) {
                return setLoading(false)
            }
            setUserID(JSON.stringify(Number(value)));
            loadInfo(value)
        } catch (e) {
            console.log(e)
        }



        // messaging()
        //     .getToken()
        //     .then(token => {
        //         return saveTokenToDatabase(token);
        //     });

        // firestore().collection('users').doc(`${auth().currentUser?.uid}`).onSnapshot((response: any) => {
        //     if (response.data().disabled === true) {
        //         setUserSaved(false);
        //         setLoading(false);
        //         setNameUser('');
        //         setEmailUser('');
        //         Toast.showWithGravity('Este usuario ha sido deshabilitado', Toast.LONG, Toast.TOP);
        //     } else {
        //         setNameUser(response.data().name);
        //         setEmailUser(response.data().email);
        //         setUserSaved(true);
        //         setLoading(false);
        //     }
        // })
    }

    function loadInfo(value: string) {
        api.get(`/users/unique?userID=${value}`).then(res => {
            console.log(res.data.data.disabled)
            if (Boolean(res.data.data.disabled) === true) {
                setUserSaved(false);
                setLoading(false);
                // setNameUser('');

                Toast.showWithGravity('Este usuario ha sido deshabilitado', Toast.LONG, Toast.TOP);
            } else {
                // setEmailUser(String(res.data.email));
                // setNameUser(String(res.data.name));
                // // setUserID(String(res.data.id));
                setEmailUser(String(res.data.data.email));
                setUserSaved(true);
                setLoading(false);
            }
        })
        let val = value;
        socket.on(`users-${Number(val)}`, (res: any) => {
            if (res.disabled == true) {
                setUserSaved(false);
                Toast.showWithGravity('Este usuario ha sido deshabilitado', Toast.LONG, Toast.TOP);
            } else {
                setUserSaved(true);
            }
        })

        return requestUserPermission();
    }


    useEffect(() => {

        loadInfoUser();

    }, []);



    return (
        <ContextApp.Provider value={{
            userSaved, setUserSaved,
            loading, setLoading,
            infoList, setInfoList,
            userID, setUserID,
            emailUser, setEmailUser
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderAuth;


export function useSavedUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}

export function useLoading() {
    const infoUser: ContextType = useContext(ContextApp);
    const { loading, setLoading } = infoUser;
    return { loading, setLoading };
}


export function useInfoList() {
    const infoUser: ContextType = useContext(ContextApp);
    const { infoList, setInfoList } = infoUser;
    return { infoList, setInfoList };
}

export function useUserID() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userID, setUserID } = infoUser;
    return { userID, setUserID };
}
export function useEmailUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { emailUser, setEmailUser } = infoUser;
    return { emailUser, setEmailUser };
}














