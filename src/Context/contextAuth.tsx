import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import Notification from '../Services/notification';
import { Platform } from 'react-native';

interface LIST {
    dates: string,
    description: string,
    email: string,
    name: string,
    status: string,
    title: string,
    statusText: string,
    id: string,
    dateAtual: string,
    numberStatus: number,
    notificationDate: number
}

interface USERS {
    id: string,
    disabled: boolean,
    email: string,
    name: string,
    password: string
}


type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    nameUser: string;
    setNameUser: (value: string) => void;
    emailUser: string;
    setEmailUser: (value: string) => void;
    list: LIST[];
    setList: (value: LIST[]) => void;
    users: USERS[];
    setUsers: (value: USERS[]) => void;
    infoList: string;
    setInfoList: (value: string) => void;
};

const ContextApp = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    loading: false,
    setLoading: (value: boolean) => { },
    nameUser: '',
    setNameUser: (value: string) => { },
    emailUser: '',
    setEmailUser: (value: string) => { },
    list: [],
    setList: (value: LIST[]) => { },
    users: [],
    setUsers: (value: USERS[]) => { },
    infoList: '',
    setInfoList: (value: string) => { },

});


const ProviderAuth: React.FC = ({ children }) => {

    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [nameUser, setNameUser] = useState<string>('');
    const [emailUser, setEmailUser] = useState<string>('');
    const [list, setList] = useState<LIST[]>([]);
    const [users, setUsers] = useState<USERS[]>([]);
    const [infoList, setInfoList] = useState<string>('');

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
                    bigText: remoteMessage.notification?.title,
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

    }, []);



    useEffect(() => { }, [list, nameUser, loading, emailUser, userSaved, users])

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }


    async function saveTokenToDatabase(token: any) {
        await firestore()
            .collection('users')
            .doc(`${auth().currentUser?.uid}`)
            .update({
                tokens: String(token),
            });
    }


    function loadUsers() {
        firestore().collection('users').onSnapshot((response) => {
            setUsers([]);

            response.docs.forEach((res: any) => {
                const user = res.data();
                if (String(user.email).toLowerCase() !== 'medicalrtr@gmail.com') {
                    setUsers(users => [...users, user]);
                }
            })

        })
    }

    function loadInfoUser() {
        firestore().collection('users').doc(`${auth().currentUser?.uid}`).onSnapshot((response: any) => {
            if (response.data().disabled === true) {
                setUserSaved(false);
                setLoading(false);
                setNameUser('');
                setEmailUser('');
                Toast.showWithGravity('Este usuario ha sido deshabilitado', Toast.LONG, Toast.TOP);
            } else {
                setNameUser(response.data().name);
                setEmailUser(response.data().email);
                setUserSaved(true);
                setLoading(false);
            }
        })
    }


    function loadLists() {
        firestore().collection('list').orderBy('timestampTarea', 'desc').onSnapshot(res => {
            setList([]);
            res.docs.forEach((response: any) => {
                //console.log('tarefas', response.data());
                setList(list => [...list, response.data()])
            })
        })
    }
    useEffect(() => {
        if (auth().currentUser?.uid !== undefined) {
            if (Platform.OS == 'android') {
                // firestore().collection('notification').onSnapshot(() => {
                //     return pushNotificationSend();
                // })
            }
        }
    }, [userSaved])

    useEffect(() => {
        if (auth().currentUser?.uid !== undefined) {
            loadInfoUser();
            loadLists();
            loadUsers();
            requestUserPermission();
            messaging()
                .getToken()
                .then(token => {
                    return saveTokenToDatabase(token);
                });

            // Listen to whether the token changes
        } else {
            setLoading(false);
        }

        return () => {
        }
    }, [userSaved]);



    return (
        <ContextApp.Provider value={{
            userSaved, setUserSaved,
            loading, setLoading,
            nameUser, setNameUser,
            emailUser, setEmailUser,
            list, setList,
            users, setUsers,
            infoList, setInfoList
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

export function useNameUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { nameUser, setNameUser } = infoUser;
    return { nameUser, setNameUser };
}



export function useEmailUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { emailUser, setEmailUser } = infoUser;
    return { emailUser, setEmailUser };
}

export function useList() {
    const infoUser: ContextType = useContext(ContextApp);
    const { list, setList } = infoUser;
    return { list, setList };
}
export function useUsers() {
    const infoUser: ContextType = useContext(ContextApp);
    const { users, setUsers } = infoUser;
    return { users, setUsers };
}
export function useInfoList() {
    const infoUser: ContextType = useContext(ContextApp);
    const { infoList, setInfoList } = infoUser;
    return { infoList, setInfoList };
}












