import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    Keyboard,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions,
    ActivityIndicator

} from 'react-native';
import api from '../../Services/api';
import Modal from 'react-native-modal';
import io from "socket.io-client";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { useSavedUser } from '../../Context/contextAuth';
import Dialog from "react-native-dialog";
import * as EmailValidator from 'email-validator';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface USERS {
    id: string,
    disabled: boolean,
    email: string,
    name: string,
    password: string
}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Users: React.FC = () => {
    const navigation = useNavigation();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [visibleDialog2, setVisibleDialog2] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [isVisibleModal2, setISVisibleModal2] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<string>('');
    const emailInputRef = useRef().current;
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const passwordInputRef = useRef().current;
    const nameInputRef = useRef().current;
    const [password, setPassword] = useState<string>('');
    const { setUserSaved } = useSavedUser();
    const socket = io("http://apimedicalrtr-com-co.umbler.net");
    const [users, setUsers] = useState<USERS[]>([]);

    function handleLogin2() {
        setISVisibleModal2(true);

    }

    useEffect(() => {
        loadUsers()
        return () => {
            setUsers([])
            setVisibleDialog(false);

        }
    }, [])
    useEffect(() => {
        socket.on(`userss`, (res: USERS[]) => {
            setUsers(res)
        })
    }, [])


    function loadUsers() {

        api.get('/users').then(res => {
            res.data.forEach((element: any) => {
                if (String(element.email).toLowerCase() !== 'medicalrtr@gmail.com') {
                    setUsers(users => [...users, element]);
                    // console.log(element)
                }
            });
        })
        // firestore().collection('users').onSnapshot((response) => {
        //     setUsers([]);
        //     response.docs.forEach((res: any) => {
        //         const user = res.data();
        //         if (String(user.email).toLowerCase() !== 'medicalrtr@gmail.com') {
        //             setUsers(users => [...users, user]);
        //         }
        //     })

        // })
    }

    function exitModal2() {
        Keyboard.dismiss();
        setISVisibleModal2(!isVisibleModal2)

    }
    function handleRegister() {
        if (loadingAuth) {
            return;
        }
        setLoadingAuth(true);
        const valid = EmailValidator.validate(`${email}`); // true
        if (name.length == 0) {
            setLoadingAuth(false);
            return Toast.showWithGravity('Nombre inválido', Toast.LONG, Toast.TOP);
        }
        if (!valid) {
            setLoadingAuth(false);
            return Toast.showWithGravity('Email inválido', Toast.LONG, Toast.TOP);
        }
        if (password.length < 6) {
            setLoadingAuth(false);
            Toast.showWithGravity('Contraseña invalida', Toast.LONG, Toast.TOP);
            return Toast.showWithGravity('Ingrese una contraseña con más de 6 dígitos', Toast.LONG, Toast.TOP);
        }
        api.post('/users/create', {
            name: name,
            email: email.toLowerCase(),
            password,
        }).then(res => {
            if (res.data.message == 'success') {
                setLoadingAuth(false);
                setEmail('');
                setPassword('');
                setName('');
                setISVisibleModal2(false)
                Toast.showWithGravity('Sucesso', Toast.LONG, Toast.TOP);
            } else {
                setLoadingAuth(false);
                setISVisibleModal2(false)
                return Toast.showWithGravity('Se produjo un error al crear un usuario', Toast.LONG, Toast.TOP);
            }
        })
    }




  
    async function exitAccount() {
        try{
            AsyncStorage.removeItem('@userID')
            setVisibleDialog(false);
            setUserSaved(false);
        }catch(e){
            console.log(e)
        }
    }

    function removeUser() {
        setVisibleDialog2(false);
        api.post('/users/status/update', {
            userID: idUser,
            status: true
        }).then((res) => {
            if (res.data.message == 'success') {
                Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
            } else {
                Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP)
            }
        }).catch(() => {
            Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP)
        })
    }

    function addUser(id: string) {
        api.post('/users/status/update', {
            userID: id,
            status: false
        }).then((res) => {
            if (res.data.message == 'success') {
                Toast.showWithGravity('Éxito', Toast.LONG, Toast.TOP)
            } else {
                Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP)
            }
        }).catch(() => {
            Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP)
        })


    }

    function RenderUsers(item: USERS) {
        if (item.email == null) {
            return null
        }
        if (item.email == undefined) {
            return null
        }
        return (
            <>
                <View style={styles.separator} />
                <View style={styles.containerList}>
                    <View style={[styles.itemContain]}>
                        <View style={[styles.borderColorStatus, { backgroundColor: 'blue' }]} />
                        <View style={styles.bodyContainerItem}>
                            <View style={styles.containerEmail}>
                                <Text numberOfLines={1} style={[styles.textEmail]}>{item.email.toLowerCase()}</Text>
                            </View>
                            <View style={styles.containerName}>
                                <Text numberOfLines={1} style={styles.textName}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={[styles.containerEXCUI]}>
                            {item.disabled ?
                                <TouchableWithoutFeedback onPress={() => addUser(item.id)}>
                                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/waste.png')} />
                                </TouchableWithoutFeedback> :
                                <TouchableWithoutFeedback onPress={() => {
                                    setVisibleDialog2(true);
                                    setIdUser(item.id);
                                }}>
                                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/trash.png')} />
                                </TouchableWithoutFeedback>}
                        </View>

                    </View>
                </View>
                <View style={styles.separator} />
            </>
        );
    }


    return (
        <>
            <View style={{ backgroundColor: '#141414', width: '100%', height: getStatusBarHeight(true) }} />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Lista de Usuarios</Text>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => setVisibleDialog(true)} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/salir.png')} />
                </TouchableOpacity>
            </View>
            {users.length === 0 ? <>
                <View style={{ width: '100%', height: '8%' }} />
                <ActivityIndicator size='large' color='#141414' /></> :
                <FlatList
                    style={{ flex: 1, backgroundColor: '#E5E5E5' }}
                    data={users}

                    ListHeaderComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => RenderUsers(item)}
                    keyExtractor={(item: USERS) => String(item.id)}

                />}

            <View>
                <Dialog.Container visible={visibleDialog}>
                    <Dialog.Title>Cerrar sesión</Dialog.Title>
                    <Dialog.Description>
                        desea cerrar la sesión de la aplicación?
          </Dialog.Description>
                    <Dialog.Button label="  Cancelar  " onPress={() => setVisibleDialog(false)} />
                    <Dialog.Button label="  No  " onPress={() => setVisibleDialog(false)} />
                    <Dialog.Button label="  Si  " onPress={exitAccount} />
                </Dialog.Container>
            </View>
            <View>
                <Dialog.Container visible={visibleDialog2}>
                    <Dialog.Title>Borrar Usuario</Dialog.Title>
                    <Dialog.Description>
                        desea eliminar ese usuario?
          </Dialog.Description>
                    <Dialog.Button label="  Cancelar  " onPress={() => setVisibleDialog2(false)} />
                    <Dialog.Button label="  No  " onPress={() => setVisibleDialog2(false)} />
                    <Dialog.Button label="  Si  " onPress={() => removeUser()} />
                </Dialog.Container>
            </View>




            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={exitModal2}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModal2}
                onBackButtonPress={exitModal2}
                onSwipeComplete={exitModal2}>
                <View style={styles.conatainerModalAdd}>
                    <View style={[styles.containerModal2, { top: getStatusBarHeight(true) }]} >
                        <View style={[styles.inputView, { flexDirection: 'row' }]}>
                            <View style={styles.inputViewImage}>
                                <Image resizeMode={'contain'} source={require('../../assets/person-24px.png')} />
                            </View>
                            <TextInput
                                style={styles.input}
                                ref={nameInputRef}
                                maxLength={20}
                                placeholder={'Nombre'}
                                onChangeText={(e) => setName(e)}
                                value={name}
                            />
                        </View>
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
                        <TouchableWithoutFeedback onPress={handleRegister}>
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

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList} onPress={() => handleLogin2()}>
                <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/more.png')} />
            </TouchableOpacity>
        </>
    );
}

export default Users;