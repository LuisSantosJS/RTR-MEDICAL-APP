import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    ActivityIndicator,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import styles from './styles';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import SwitchSelector from "react-native-switch-selector";
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Dialog from "react-native-dialog";
import GestureRecognizer from 'react-native-swipe-gestures';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNameUser, useEmailUser, useSavedUser, useList } from '../../Context/contextAuth';
import { FlatList } from 'react-native-gesture-handler';

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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const List: React.FC = () => {
    const navigation = useNavigation();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const { emailUser, setEmailUser } = useEmailUser();
    const [enabledStatesItems, setEnabledStatesItems] = useState<boolean>(false);
    const { nameUser, setNameUser } = useNameUser();
    const { userSaved, setUserSaved } = useSavedUser();
    const { list } = useList();
    const [isVisibleModal3, setISVisibleModal3] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [okIOS, setOkIOS] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    var mark: any = {};
    const [date, setDate] = useState<any>(new Date());
    const [dateIOS, setDateIOS] = useState<any>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [showIOS, setShowIOS] = useState<boolean>(false);
    const [ItemDelete, setItemDelete] = useState<LIST>();
    const [isVisibleModalDelete, setISVisibleModalDelete] = useState<boolean>(false);




    function loadDaysAgend() {
        list.reverse().forEach(res => {
            mark[res.dates] = { selected: true, selectedColor: res.status };
        });
    }


    useEffect(() => {
        loadDaysAgend();
    }, [mark]);


    const modalizeRef = useRef<Modalize>(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onChangeIOS = (event: any, selectedDate: any) => {
        console.log('data', date, selectedDate);
        setDateIOS(selectedDate)
        if (event.type == "set") {
            setISVisibleModal3(true)
        }
    };
    const onChange = (event: any, selectedDate: any) => {
        console.log('data', date, selectedDate)
        setShow(false)
        if (event.type == "set") {
            setDate(selectedDate);
            setShow(false)
            setISVisibleModal3(true)
        }
    };
    useEffect(() => {
        return () => {

        }
    }, [userSaved])

    function exitModal3() {
        setEnabledStatesItems(true)
        setISVisibleModal3(false)
        setEnabledStatesItems(false)

    }

    function handleADDIOS() {
        setEnabledStatesItems(true)
        if (okIOS === false) {
            setShowIOS(true);
            setOkIOS(true)
        } else {
            setShowIOS(false);
            setOkIOS(false);
            setShowIOS(false);
            setISVisibleModal3(true);
        }
        setEnabledStatesItems(false)
    }

    function handleADDAndroid() {
        setEnabledStatesItems(true)
        setShow(true);
        setEnabledStatesItems(false)
    }



    function exitAccount() {
        setVisibleDialog(false);
        setInterval(() => { }, 1000);
        auth().signOut().then(() => {
            setEmailUser('');
            setNameUser('');
            setUserSaved(false);
        })
    }


    function createList() {
        setEnabledStatesItems(true)
        if (loading) {
            setEnabledStatesItems(false)
            return;
        }
        setLoading(true);
        if (description.length == 0) {
            setLoading(false)
            setEnabledStatesItems(false)
            return Toast.showWithGravity('Ingrese una descripción', Toast.LONG, Toast.TOP);
        }
        if (title.length == 0) {
            setLoading(false)
            setEnabledStatesItems(false)
            return Toast.showWithGravity('Inserta un título', Toast.LONG, Toast.TOP);
        }
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        var result = '';
        for (var i = 0; i < 21; i++) {
            var x = Math.floor(Math.random() * chars.length);
            result += chars[x];
        }
        const ID = result;
        const DATA = {
            id: ID,
            date: Platform.OS == 'ios' ? dateIOS : date,
            name: nameUser,
            email: emailUser,
            statusText: 'Pendiente',
            title: title,
            numberStatus: 1,
            description: description,
            timestamp: firestore.Timestamp.now().toMillis(),
            status: 'orange',
            dates: moment(Platform.OS == 'ios' ? dateIOS : date).format('YYYY-MM-DD')
        }
        firestore().collection('list').doc(`${ID}`).set(DATA).then(() => {
            setDescription('');
            setTitle('');
            Toast.showWithGravity('Tarea registrada con éxito', Toast.LONG, Toast.TOP);
            firestore().collection('notification').add({
                dates: moment(Platform.OS == 'ios' ? dateIOS : date).format('YYYY-MM-DD'),
                email: emailUser,
                title: title,
            });
        }).catch(() => {
            Toast.showWithGravity('Se produjo un error al registrar la tarea', Toast.LONG, Toast.TOP);
        })
        setISVisibleModal3(false)
        setEnabledStatesItems(false)
        return setLoading(false)
    }




    function updateTarefa(number: number, item: string) {
        if (number == 0) {
            return firestore().collection('list').doc(`${item}`).update({
                statusText: 'Concluido',
                status: 'green',
                numberStatus: 0,

            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 1) {
            return firestore().collection('list').doc(`${item}`).update({
                statusText: 'Pendiente',
                numberStatus: 1,
                status: 'orange'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 2) {
            return firestore().collection('list').doc(`${item}`).update({
                statusText: 'No Hecho',
                numberStatus: 2,
                status: 'red'
            }).then(() => {
                Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }

    }

    function deleteListItem(item: LIST) {
        setItemDelete(item);
        setISVisibleModalDelete(true);
    }

    function deleteItem() {
        firestore().collection('list').doc(`${ItemDelete?.id}`).delete().then(() => {
            Toast.showWithGravity('Tarea eliminada con éxito', Toast.LONG, Toast.TOP);
            return setISVisibleModalDelete(false);
        }).catch(() => {
            Toast.showWithGravity('Se produjo un error al eliminar la tarea', Toast.LONG, Toast.TOP);
            return setISVisibleModalDelete(false);
        })

    }
    const configSWIPE = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50
    };


    function RenderItems(item: LIST) {

        return (
            <>
                <View style={styles.separator} />
                <View style={styles.containerList}>
                    <GestureRecognizer
                        onSwipeRight={() => deleteListItem(item)}
                        config={configSWIPE}>
                        <View style={[styles.itemContain]}>
                            <View style={[styles.borderColorStatus, { backgroundColor: item.status }]} />
                            <View style={styles.bodyContainerItem}>
                                <View style={styles.containerEmail}>
                                    <Text numberOfLines={1} style={[styles.textEmail]}>{item.email.toLowerCase()}</Text>
                                </View>
                                <View style={styles.containerName}>
                                    <Text style={styles.textName}>{item.title}</Text>
                                </View>
                                <View style={styles.containerDescrip}>
                                    <Text
                                        numberOfLines={Number(item.description.length <= 35 ? 1 : 2)}
                                        style={styles.textDesc}>
                                        {item.description}
                                    </Text>


                                </View>
                            </View>
                            <Animated.View style={[styles.viewOpcacityItem]} >
                                <Text style={styles.textEmail}>{item.dates}</Text>
                                <SwitchSelector
                                    options={[
                                        { label: "C", value: "0", activeColor: 'green' },
                                        { label: "P", value: "1", activeColor: 'orange' },
                                        { label: "N", value: "2", activeColor: 'red' }
                                    ]}
                                    disabled={enabledStatesItems}
                                    buttonColor={item.status}
                                    initial={Number(item.numberStatus)}
                                    onPress={(value: number) => updateTarefa(value, String(item.id))}

                                />
                                <Text style={styles.textEmail}>{item.statusText}</Text>
                            </Animated.View>
                        </View>
                    </GestureRecognizer>
                </View>
                <View style={styles.separator} />
            </>
        );
    }
    return (
        <>
            <View style={{ backgroundColor: 'grey', width: '100%', height: getStatusBarHeight(true) }} />
            <View style={[styles.header, emailUser.toLowerCase() !== 'medicalrtr@gmail.com' && { paddingLeft: width * 0.05, }]}>
                {emailUser.toLowerCase() == 'medicalrtr@gmail.com' && <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.navigate('Users')} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/team.png')} />
                </TouchableOpacity>}
                <Text style={styles.textHeader}>Lista de Tareas</Text>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => setVisibleDialog(true)} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/salir.png')} />
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ flex: 1, backgroundColor: '#E5E5E5' }}
                data={list}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={{ height: width * 0.5, width: '100%' }} />}
                renderItem={({ item }) => RenderItems(item)}
                keyExtractor={(item: LIST) => String(item.id)}

            />
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


            {show &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    minimumDate={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            }

            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={exitModal3}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModal3}
                onBackButtonPress={exitModal3}
                onSwipeComplete={exitModal3}>
                <View style={styles.conatainerModal3}>
                    <View style={[styles.containerModal3, { top: getStatusBarHeight(true) }]} >

                        <TextInput
                            style={styles.inputAddTitle}
                            placeholder={'Título'}
                            maxLength={18}
                            value={title}
                            onChangeText={(e) => setTitle(e)}
                        />
                        <TextInput
                            style={styles.inputAddDesc}
                            placeholder={'Descripción'}
                            multiline={true}
                            maxLength={65}
                            value={description}
                            onChangeText={(e) => setDescription(e)}
                        />
                        <View onTouchStart={() => createList()} style={styles.submitList}>
                            {loading ?
                                <ActivityIndicator size={'large'} color='white' />
                                :
                                <Text style={styles.textLive}>Registrar esta tarea</Text>}
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setISVisibleModalDelete(false)}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModalDelete}
                onBackButtonPress={() => setISVisibleModalDelete(false)}
                onSwipeComplete={() => setISVisibleModalDelete(false)}>
                <View style={styles.conatainerModalDel}>
                    <View style={[styles.containerModalDel, { top: getStatusBarHeight(true) }]} >
                        <View style={[styles.itemContain]}>
                            <View style={[styles.borderColorStatus, { backgroundColor: ItemDelete?.status }]} />
                            <View style={styles.bodyContainerItem}>
                                <View style={styles.containerEmail}>
                                    <Text numberOfLines={1} style={[styles.textEmail]}>{ItemDelete?.email.toLowerCase()}</Text>
                                </View>
                                <View style={styles.containerName}>
                                    <Text numberOfLines={1} style={styles.textName}>{ItemDelete?.title}</Text>
                                </View>
                                <View style={styles.containerDescrip}>
                                    <Text
                                        numberOfLines={Number(String(ItemDelete?.description).length <= 35 ? 1 : 2)}
                                        style={styles.textDesc}>
                                        {ItemDelete?.description}
                                    </Text>
                                </View>
                            </View>
                            <Animated.View style={[styles.viewOpcacityItem]} >
                                <Text style={styles.textEmail}>{ItemDelete?.dates}</Text>
                                <SwitchSelector
                                    options={[
                                        { label: "C", value: "0", activeColor: 'green' },
                                        { label: "P", value: "1", activeColor: 'orange' },
                                        { label: "N", value: "2", activeColor: 'red' }
                                    ]}
                                    disabled={true}
                                    buttonColor={ItemDelete?.status}
                                    initial={Number(ItemDelete?.numberStatus)}
                                    onPress={(value: number) => updateTarefa(value, String(ItemDelete?.id))}

                                />
                                <Text style={styles.textEmail}>{ItemDelete?.statusText}</Text>
                            </Animated.View>
                        </View>
                        <View style={styles.containerRowModalDel}>
                            <TouchableWithoutFeedback onPress={() => setISVisibleModalDelete(false)}>
                                <View style={[styles.buttomModalDel, { backgroundColor: 'green' }]}>
                                    <Text style={styles.textButtomDel}>CANCELAR</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={deleteItem}>
                                <View style={[styles.buttomModalDel, { backgroundColor: 'red' }]}>
                                    <Text style={styles.textButtomDel}>ELIMINAR</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                </View>
            </Modal>


            <TouchableOpacity activeOpacity={0.7} style={styles.buttomList} onPress={() => onOpen()}>
                <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/calendar.png')} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttomAdd} onPress={() => Platform.OS == 'ios' ? handleADDIOS() : handleADDAndroid()}>
                {okIOS ?
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/success.png')} />
                    :
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/add.png')} />
                }
            </TouchableOpacity>

            {showIOS &&
                <View style={styles.IOSPickerData}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateIOS}
                        minimumDate={new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeIOS}
                    />
                </View>}
            <Modalize
                ref={modalizeRef}
                onOpen={() => loadDaysAgend()}
                onClose={() => loadDaysAgend()}
                snapPoint={height / 2.4}>
                <CalendarList
                    markedDates={mark}
                    horizontal={true}
                    pagingEnabled
                />
            </Modalize>

        </>
    );
}
export default List;