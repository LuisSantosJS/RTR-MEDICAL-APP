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
    StatusBar
} from 'react-native';
import * as EmailValidator from 'email-validator';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSavedUser, useEmailUser, useNameUser } from '../../Context/contextAuth';
import auth from '@react-native-firebase/auth';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



const Auth: React.FC = () => {
    const { setNameUser } = useNameUser();
    const { setEmailUser } = useEmailUser();
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
        setEmailUser(email);
        setNameUser(name);
        auth().signInWithEmailAndPassword(email.toLowerCase(), password).then(() => {
            setLoadingAuth(false);
            setEmail('');
            setPassword('');
            setName('');
            firestore().collection('users').doc(`${auth().currentUser?.uid}`).get().then((response: any) => {
                if (response.data().disabled == true) {
                    Toast.showWithGravity('Este usuario está deshabilitado', Toast.LONG, Toast.TOP);
                    setUserSaved(false);
                } else {
                    Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
                    setUserSaved(true);
                }
            }).catch(() => {
                Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
            })
        }).catch((e) => {
            setLoadingAuth(false);
            console.log(e)
            return Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP);
        })
    }
    return (
        <>

            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#E5E5E5'/>

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