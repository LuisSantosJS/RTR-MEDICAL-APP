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
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import styles from './styles';
import Modal from 'react-native-modal';

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
    numberStatus: number
}

interface LISTCOMMENTS {
    id: string,
    idPost: string,
    comment: string,
    date: string,
    color: string,
    nameUser: string,
    email: string,
}


const InfoTarea: React.FC = () => {
    const { infoList, setInfoList } = useInfoList();
    const { list, setList } = useList();
    const navigation = useNavigation();
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
        return ()=>{

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
            date: moment(new Date()).format('YYYY-MM-DD')
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
    function deleteComments(id: string) {
        firestore().collection('comments').doc(`${id}`).delete().then(() => {
            return Toast.showWithGravity('Comentario eliminado con éxito', Toast.LONG, Toast.TOP);
        }).catch(() => {
            return Toast.showWithGravity('Error al eliminar el comentario', Toast.LONG, Toast.TOP);
        })
    }

    function RenderComments(item: LISTCOMMENTS) {
        return (
            <View key={item.id}>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.containerList}>
                    <GestureRecognizer
                        onSwipeRight={() => deleteComments(item.id)}
                        config={configSWIPE}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={[styles.itemContain]}>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={[styles.borderColorStatus, { backgroundColor: item.color, flexDirection: 'column-reverse', alignItems: 'center' }]} >
                                    </View>
                                </TouchableWithoutFeedback>

                                <View style={styles.bodyContainerItem2}>
                                    <Text numberOfLines={1} style={[styles.textEmail]}>{item.email.toLowerCase()}</Text>
                                    <TextInput
                                        value={`${item.comment}`}
                                        multiline={true}
                                        editable={Platform.OS === 'ios' ? false : false}
                                        textAlignVertical='top'
                                        scrollEnabled
                                        style={[styles.textDesc]} />

                                    <Text numberOfLines={1} style={styles.textEmail} >@{item.nameUser}</Text>
                                </View>
                                <Animated.View style={[styles.viewOpcacityItem2]} >
                                    <Text style={styles.textEmail2}>{item.date}</Text>
                                </Animated.View>
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
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => {/*setVisibleDialog(true)*/ }} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/salir.png')} />
                </TouchableOpacity>
            </View>

            <View style={[styles.container]}>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.containerList}>
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
                <FlatList style={{ flex: 1 }}
                    data={listComments}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ width: '100%', height: width * 0.4 }} />}
                    renderItem={({ item }) => RenderComments(item)}

                />


            </View >

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList} onPress={() => openModalAddComments()}>
                <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/more.png')} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList2} onPress={() =>{ 
                openModalAddSolucitud();
                setToggleCheckBox(true);
                
                }}>
                <Image resizeMode={"contain"} style={styles.iconHeader2} source={require('../../assets/buy.png')} />
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

        </>
    )
}
export default InfoTarea;