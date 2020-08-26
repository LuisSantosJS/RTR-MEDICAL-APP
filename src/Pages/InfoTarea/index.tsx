import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Animated
} from 'react-native';
import moment from 'moment';
import styles from './styles';
import Modal from 'react-native-modal';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import SwitchSelector from "react-native-switch-selector";
import GestureRecognizer from 'react-native-swipe-gestures';
import { useInfoList, useList, useEmailUser, useNameUser } from '../../Context/contextAuth';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
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
    numberStatus: number
}

interface LISTCOMMENTS {
    id: string,
    idPost: string,
    comment: string,
    date: string,
    solit: boolean,
    color: string,
    nameUser: string,
    email: string,
    numberStatus: number,
    statusText: string,
    status: string,
}


const InfoTarea: React.FC = () => {
    const { infoList, setInfoList } = useInfoList();
    const { list, setList } = useList();
    const navigation = useNavigation();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
    const { emailUser, setEmailUser } = useEmailUser();
    const { nameUser, setNameUser } = useNameUser();
    const item: LIST[] = list.filter(item => item.id == infoList);
    const [listComments, setListComments] = useState<LISTCOMMENTS[]>([]);
    const [comments, setComments] = useState<string>('');
    const [solicitud, setSolicitud] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisibleModal4, setISVisibleModal4] = useState<boolean>(false);
    const [isVisibleModal5, setISVisibleModal5] = useState<boolean>(false);
    const [ItemDelete, setItemDelete] = useState<LISTCOMMENTS | LIST>();
    const [isVisibleModalDelete, setISVisibleModalDelete] = useState<boolean>(false);
    const configSWIPE = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50
    };
    useEffect(() => { }, [listComments])



    useEffect(() => {
        firestore().collection('comments').onSnapshot(res => {
            setListComments([]);
            res.docs.forEach((e: any) => {
                if (e.data().idPost == infoList) {
                    setListComments(listComments => [...listComments, e.data()])
                }
            })
        })
        return () => {

        }
    }, [])
    function updateTarefa(number: number) {

        if (number == 2) {
            return firestore().collection('list').doc(`${item.map(item => item.id)}`).update({
                statusText: 'Finalizado',
                status: 'green',
                numberStatus: 2,

            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 1) {
            return firestore().collection('list').doc(`${item.map(item => item.id)}`).update({
                statusText: 'Pendiente',
                numberStatus: 1,
                status: 'orange'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 0) {
            return firestore().collection('list').doc(`${item.map(item => item.id)}`).update({
                statusText: 'Cancelado',
                numberStatus: 0,
                status: 'red'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }

    }
    function openModalAddComments() {
        setISVisibleModal4(true);

    }
    function openModalAddSolucitud() {
        setISVisibleModal5(true);

    }

    function updateSolit(number: number, item: LISTCOMMENTS) {

        if (number == 2) {
            return firestore().collection('comments').doc(`${item.id}`).update({
                statusText: 'Finalizado',
                status: 'green',
                numberStatus: 2,


            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 1) {
            return firestore().collection('comments').doc(`${item.id}`).update({
                statusText: 'Pendiente',
                numberStatus: 1,
                status: 'orange'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 0) {
            return firestore().collection('comments').doc(`${item.id}`).update({
                statusText: 'Cancelado',
                numberStatus: 0,
                status: 'red'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }

    }


    function addCommentsTarea() {
        if (comments.length == 0 && !toggleCheckBox) {
            return Toast.showWithGravity('Ingrese su comentario', Toast.LONG, Toast.TOP)
        }
        if (solicitud.length == 0 && toggleCheckBox) {
            return Toast.showWithGravity('Ingrese su solicitud', Toast.LONG, Toast.TOP)
        }
        setLoading(true)
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        var result = '';
        for (var i = 0; i < 21; i++) {
            var x = Math.floor(Math.random() * chars.length);
            result += chars[x];
        }
        const ID = result;
        const DATA = {
            id: ID,
            idPost: infoList,
            comment: toggleCheckBox ? solicitud : comments,
            nameUser: nameUser,
            color: toggleCheckBox ? 'blue' : '#808080',
            email: emailUser,
            solit: toggleCheckBox ? true : false,
            date: moment(new Date()).format('YYYY-MM-DD'),
            numberStatus: 1,
            statusText: 'Pendiente',
            status: 'orange',

        }

        firestore().collection('comments').doc(`${ID}`).set(DATA).then(() => {
            setISVisibleModal4(false);
            setISVisibleModal5(false);
            setComments('')
            setSolicitud('')
            setLoading(false)
            setToggleCheckBox(false)
            return Toast.showWithGravity('Comentario hecho con éxito', Toast.LONG, Toast.TOP);
        }).catch((e) => {
            setISVisibleModal4(false);
            setISVisibleModal5(false);
            setComments('')
            setSolicitud('')
            console.log('error', e)
            setLoading(false)
            setToggleCheckBox(false)
            return Toast.showWithGravity('Ocurrio un error', Toast.LONG, Toast.TOP);
        })
    }
    function deleteComments() {
        setVisibleDialog(false);
        firestore().collection('comments').doc(`${ItemDelete?.id}`).delete().then(() => {
            
            return Toast.showWithGravity('Comentario eliminado con éxito', Toast.LONG, Toast.TOP);
        }).catch(() => {
            return Toast.showWithGravity('Error al eliminar el comentario', Toast.LONG, Toast.TOP);
        })
    }

    function confirmDeleteComment(item: LISTCOMMENTS) {
        setItemDelete(item);
        setVisibleDialog(true)
    }

    function RenderComments(item: LISTCOMMENTS) {
        if (item.solit == true) {
            return (
                <View key={item.id}>
                    <View style={styles.separator} />
                    <View style={styles.separator} />
                    <View style={styles.containerList}>
                        <GestureRecognizer
                            onSwipeRight={() => confirmDeleteComment(item)}
                            config={configSWIPE}>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={[styles.itemContain]}>
                                    <TouchableWithoutFeedback onPress={() => { }}>
                                        <View style={[styles.borderColorStatus, { backgroundColor: item.status, flexDirection: 'column-reverse', alignItems: 'center' }]} >
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <View style={styles.bodyContainerItem2}>
                                        <Text numberOfLines={1} style={[styles.textEmail]}>{item.email.toLowerCase()}</Text>
                                        <TextInput
                                            value={`${item.comment}`}
                                            multiline={true}
                                            editable={Platform.OS === 'ios' ? false : true}
                                            textAlignVertical='top'
                                            scrollEnabled
                                            style={[styles.textDesc]} />

                                        <Text numberOfLines={1} style={styles.textEmail} >@{item.nameUser}</Text>
                                    </View>
                                    <Animated.View style={[styles.viewOpcacityItem2]} >

                                        <SwitchSelector
                                            options={[
                                                { label: "C", value: "0", activeColor: 'red' },
                                                { label: "P", value: "1", activeColor: 'orange' },
                                                { label: "F", value: "2", activeColor: 'green' },

                                            ]}
                                            buttonColor={item.status}
                                            initial={Number(item.numberStatus)}
                                            onPress={(value: number) => updateSolit(value, item)}

                                        />
                                        <Text style={styles.textEmail}>{item.statusText}</Text>
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        </GestureRecognizer>
                    </View>
                </View>
            )
        }
        return (
            <View key={item.id}>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.containerList}>
                    <GestureRecognizer
                        onSwipeRight={() => confirmDeleteComment(item)}
                        config={configSWIPE}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={[styles.itemContain]}>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={[styles.borderColorStatus, { backgroundColor: item.color, flexDirection: 'column-reverse', alignItems: 'center' }]} >
                                    </View>
                                </TouchableWithoutFeedback>

                                <View style={styles.bodyContainerItem3}>
                                    <Text numberOfLines={1} style={[styles.textEmail]}>{item.email.toLowerCase()}</Text>
                                    <TextInput
                                        value={`${item.comment}`}
                                        multiline={true}
                                        editable={Platform.OS === 'ios' ? false : true}
                                        textAlignVertical='top'
                                        scrollEnabled
                                        style={[styles.textDesc]} />

                                    <Text numberOfLines={1} style={styles.textEmail} >@{item.nameUser}</Text>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </GestureRecognizer>
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={{ backgroundColor: '#141414', width: '100%', height: getStatusBarHeight(true) }} />
            <View style={[styles.header]}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.goBack()} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/left-arrow.png')} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Lista de Tareas</Text>
                <View style={styles.ViewIconHeader}  >
                </View>
            </View>

            <View style={[styles.container]}>
                <FlatList style={{ flex: 1, width: width }}
                    data={listComments}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <>
                        <View style={[styles.containerList, { top: width * 0.05 }]}>
                            <GestureRecognizer
                                onSwipeRight={() => { }}
                                config={configSWIPE}>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={[styles.itemContain]}>
                                        <TouchableWithoutFeedback onPress={() => { }}>
                                            <View style={[styles.borderColorStatus, { backgroundColor: String(item.map(item => item.status)), flexDirection: 'column-reverse', alignItems: 'center' }]} >
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <View style={styles.bodyContainerItem}>
                                            <View style={styles.containerEmail}>
                                                <Text numberOfLines={1} style={[styles.textEmail]}>{item.map(item => item.email.toLowerCase())}</Text>
                                            </View>
                                            <View style={[styles.containerName]}>
                                                <TextInput
                                                    value={`${item.map(item => item.title.toLowerCase())}`}
                                                    multiline={true}
                                                    scrollEnabled
                                                    editable={Platform.OS === 'ios' ? false : true}
                                                    textAlignVertical='top'
                                                    style={styles.textName} />
                                            </View>
                                            <View style={styles.containerDescrip}>
                                                <TextInput
                                                    value={`${item.map(item => item.description)}`}
                                                    multiline={true}
                                                    scrollEnabled
                                                    editable={Platform.OS === 'ios' ? false : true}
                                                    textAlignVertical='top'
                                                    style={styles.textDesc} />

                                            </View>
                                        </View>
                                        <Animated.View style={[styles.viewOpcacityItem]} >
                                            <Text style={styles.textEmail}>{item.map(item => item.dateAtual)}</Text>
                                            <Text style={styles.textEmail}>{item.map(item => item.dates)}</Text>
                                            <SwitchSelector
                                                options={[
                                                    { label: "C", value: "0", activeColor: 'red' },
                                                    { label: "P", value: "1", activeColor: 'orange' },
                                                    { label: "F", value: "2", activeColor: 'green' },

                                                ]}
                                                buttonColor={String(item.map(item => item.status))}
                                                initial={Number(item.map(item => item.numberStatus))}
                                                onPress={(value: number) => updateTarefa(value)}
                                            />
                                            <Text style={styles.textEmail}>{item.map(item => item.statusText)}</Text>
                                        </Animated.View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </GestureRecognizer>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.separator} />
                    </>

                    }
                    ListFooterComponent={() => <View style={{ width: '100%', height: width * 0.6 }} />}
                    renderItem={({ item }) => RenderComments(item)}

                />


            </View >

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList} onPress={() => openModalAddComments()}>
                <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/more.png')} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList2} onPress={() => {
                openModalAddSolucitud();
                setToggleCheckBox(true);

            }}>
                <Image resizeMode={"contain"} style={[styles.iconHeader2]} source={require('../../assets/addrequire.png')} />
            </TouchableOpacity>
            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setISVisibleModal4(false)}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModal4}
                onBackButtonPress={() => setISVisibleModal4(false)}
                onSwipeComplete={() => setISVisibleModal4(false)}>
                <View style={styles.conatainerModal4}>
                    <View style={[styles.containerModal4, { top: getStatusBarHeight(true) }]} >
                        <TextInput
                            style={styles.inputAddComments}
                            placeholder={'Comentario'}
                            multiline
                            maxLength={265}
                            value={comments}
                            scrollEnabled
                            onChangeText={(e) => setComments(e)}
                        />

                        <View onTouchStart={addCommentsTarea} style={styles.submitList}>
                            {loading ?
                                <ActivityIndicator size={'large'} color='white' />
                                :
                                <Text style={styles.textLive}>Registrar esta comentario</Text>}
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setISVisibleModal5(false)}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModal5}
                onBackButtonPress={() => setISVisibleModal5(false)}
                onSwipeComplete={() => setISVisibleModal5(false)}>
                <View style={styles.conatainerModal4}>
                    <View style={[styles.containerModal4, { top: getStatusBarHeight(true) }]} >
                        <TextInput
                            style={styles.inputAddComments}
                            placeholder={'solicitud'}
                            multiline
                            maxLength={265}
                            value={solicitud}
                            scrollEnabled
                            onChangeText={(e) => setSolicitud(e)}
                        />

                        <View onTouchStart={() => {
                            setToggleCheckBox(true);
                            addCommentsTarea()
                        }} style={styles.submitList}>
                            {loading ?
                                <ActivityIndicator size={'large'} color='white' />
                                :
                                <Text style={styles.textLive}>Registrar esta solicitud</Text>}
                        </View>

                    </View>
                </View>
            </Modal>
            <Dialog.Container visible={visibleDialog}>
                <Dialog.Title>Eliminar?</Dialog.Title>
                <Dialog.Description>
                    Desea eliminar este comentario o solicitud?
               </Dialog.Description>
                <Dialog.Button label=" cancelar " onPress={() => setVisibleDialog(false)} />
                <Dialog.Button label="  No  " onPress={() => setVisibleDialog(false)} />
                <Dialog.Button label="  Si  " onPress={() => deleteComments()} />
            </Dialog.Container>


        </>
    )
}
export default InfoTarea;