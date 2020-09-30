import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    Keyboard,
    ActivityIndicator,
    StatusBar,
    ImageStore
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as EmailValidator from 'email-validator';
import styles from './styles';
import api from '../../Services/api';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSavedUser, useUserID } from '../../Context/contextAuth';
import auth from '@react-native-firebase/auth';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



const Auth: React.FC = () => {
    const { setUserID } = useUserID();
    const [isVisibleModal, setISVisibleModal] = useState<boolean>(false);
    const [isVisibleModal2, setISVisibleModal2] = useState<boolean>(false);
    const emailInputRef = useRef().current;
    const [name, setName] = useState<string>('');
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const passwordInputRef = useRef().current;
    const nameInputRef = useRef().current;
    const { userSaved, setUserSaved } = useSavedUser();
    useEffect(() => {
    }, [userSaved])

    function handleLogin() {
        setISVisibleModal(true);

    }

    function exitModal() {
        Keyboard.dismiss();
        setISVisibleModal(!isVisibleModal)

    }
    function exitModal2() {
        Keyboard.dismiss();
        setISVisibleModal2(!isVisibleModal2)

    }
    async function store(data: any) {
        try {
            await AsyncStorage.setItem('@userID', JSON.stringify(data.id));
            setUserID(String(data.id))
            console.log(data)
            setUserSaved(true)
        }
        catch (e) {
            console.log(e)
        }

    }








    const backup = () => {
        console.log('TOUCH')
        function getIDUSEr(name: string) {
            if (name === 'Stella') {
                return 1
            }
            if (name === 'Jorge') {
                return 2
            }
            if (name === 'Wilson') {
                return 3
            }
            if (name === 'Yeison') {
                return 4
            }
            if (name === 'Henry') {
                return 5
            }
            if (name === 'Luis') {
                return 6
            }
            if (name === 'Admin') {
                return 7
            }
            if (name === 'Sandro') {
                return 8
            }
            if (name === 'Juliana Álvarez') {
                return 9
            }
            if (name === 'Ruben') {
                return 10
            }
            if (name === 'Juliana') {
                return 11
            }
            if (name === 'Jorge') {
                return 12
            }
            if (name === 'Martha') {
                return 13
            }
            if (name === 'Fernando') {
                return 14
            }
            if (name === 'Sofia') {
                return 15
            }
            if (name === 'Luis Santos - Developer') {
                return 16
            }
            if (name === 'Teste') {
                return 17
            }
            if (name === 'Teste 2') {
                return 18
            }

        }
        // var i = 1;
        // for (i; i <= 18; i++) {
        //     api.post('/users/status/update', {
        //         userID: i,
        //         status: false
        //     })
        // }

        // firestore().collection('list').get().then((res) => {
        //     res.docs.forEach((e, index) => {
        //         const a = e.data()
        //         if (a.userID == undefined) {
        //             const DATA = {
        //                 userID: getIDUSEr(a.name),
        //                 numberStatus: a.numberStatus,
        //                 status: a.status,
        //                 timestamp: a.timestamp,
        //                 timestampTarea: a.timestampTarea,
        //                 description: a.description,
        //                 date: a.dates,
        //                 dateAtual: a.dateAtual == null ? a.dates : a.dateAtual,
        //                 title: a.title
        //             }
        //  console.log(index)
        // const ID = 'wtya4v329niph9694dxg3'
        // firestore().collection('comments').where('idPost', '==', ID).get().then(res => {
        //      console.log('===================')
        //     res.docs.forEach(e => {
        //         const b = e.data();
        //         //  console.log(b)
        //         const DATACOMMENT = {
        //             userID: getIDUSEr(b.nameUser),
        //             postID: 13,
        //             color: b.color,
        //             comment: b.comment,
        //             date: b.date,
        //             numberStatus: b.numberStatus,
        //             solit: b.solit,
        //             status: b.status,
        //             statusText: b.statusText
        //         }
        //         if (b.postID == undefined) {
        //             api.post('/comments/create', DATACOMMENT).then((e) => {
        //                 // console.log('===================')
        //                 console.log(e.data)
        //                 // console.log('===================')
        //             }).catch((ERRRRROOO) => console.log('ERRRRROOO COOMMEM', ERRRRROOO))
        //         }
        //     });



        // api.post('/posts/create', DATA).then((e) => {
        //     console.log('===================')
        //     console.log('===================')
        // }).catch((ERRRRROOO) => console.log('ERRRRROOO', ERRRRROOO))
        // }
        // })

        // })

        console.log(new Date().getTime())

    };





    function handleSubmitLogin() {
        if (loadingAuth) {
            return;
        }
        setLoadingAuth(true);
        const valid = EmailValidator.validate(`${email}`); // true
        if (!valid) {
            setLoadingAuth(false);
            return Toast.showWithGravity('Email inválido', Toast.LONG, Toast.TOP);
        }
        if (password.length == 0) {
            setLoadingAuth(false);
            return Toast.showWithGravity('Contraseña invalida', Toast.LONG, Toast.TOP);
        }
        api.post('/users/login', {
            email: email.toLowerCase(),
            password: password
        }).then(res => {
            setLoadingAuth(false);
            setEmail('');
            setPassword('');
            if (res.data.message == 'error') {
                return Toast.showWithGravity('Error', Toast.LONG, Toast.TOP);
            }
            if (res.data.disabled == true) {
                return Toast.showWithGravity('Este usuario está deshabilitado', Toast.LONG, Toast.TOP);
            }
            return store(res.data.data)

        })
        // auth().signInWithEmailAndPassword(email.toLowerCase(), password).then(() => {
        //     setLoadingAuth(false);
        //     setEmail('');
        //     setPassword('');
        //     firestore().collection('users').doc(`${auth().currentUser?.uid}`).get().then((response: any) => {
        //         if (response.data().disabled == true) {
        //             Toast.showWithGravity('Este usuario está deshabilitado', Toast.LONG, Toast.TOP);
        //             setUserSaved(false);
        //         } else {
        //             Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
        //             setUserSaved(true);
        //         }
        //     }).catch(() => {
        //         Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
        //     })
        // }).catch((e) => {
        //     setLoadingAuth(false);
        //     console.log(e)
        //     return Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP);
        // })
    }
    return (
        <>

            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#E5E5E5' />

                <View style={styles.containerViewOptions}>
                    <View style={styles.containerLogo}>

                        <Image resizeMode={'contain'} style={styles.logo} source={require('../../assets/icones.png')} />

                    </View>
                    <TouchableWithoutFeedback onPress={handleLogin} >
                        <View style={[styles.inputLogin, { backgroundColor: 'green' }]} >
                            <Text style={styles.textInput}>Iniciar sesión</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={exitModal}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModal}
                onBackButtonPress={exitModal}
                onSwipeComplete={exitModal}>
                <View style={styles.conatainerModal}>
                    <View style={[styles.containerModal, { top: getStatusBarHeight(true) }]} >
                        <View style={[styles.inputView, { flexDirection: 'row' }]}>
                            <View style={styles.inputViewImage}>
                                <Image resizeMode={'contain'} source={require('../../assets/logoemail.png')} />
                            </View>
                            <TextInput
                                style={styles.input}
                                ref={emailInputRef}
                                placeholder={'Email'}
                                maxLength={35}
                                keyboardType='email-address'
                                onChangeText={(e) => setEmail(e)}
                                value={email}
                            />
                        </View>
                        <View style={[styles.inputView, { flexDirection: 'row' }]}>
                            <View style={styles.inputViewImage}>
                                <Image resizeMode={'contain'} source={require('../../assets/logopassword.png')} />
                            </View>
                            <TextInput
                                style={styles.input}
                                ref={passwordInputRef}
                                placeholder={'Password'}
                                secureTextEntry
                                maxLength={15}
                                onChangeText={(e) => setPassword(e)}
                                value={password}
                            />
                        </View>
                        <TouchableWithoutFeedback onPress={handleSubmitLogin}>
                            <View style={styles.submit}>
                                {loadingAuth ?
                                    <ActivityIndicator size='large' color='white' />
                                    :
                                    <Text style={styles.textInput}>Seguir</Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>


        </>
    );
}
export default Auth;