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
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import styles from './styles';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import SwitchSelector from "react-native-switch-selector";
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import io from "socket.io-client";
import Modal from 'react-native-modal';
import api from '../../Services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";
import GestureRecognizer from 'react-native-swipe-gestures';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSavedUser, useUserID } from '../../Context/contextAuth';
import { useListUnique } from '../../Context/contextList';
import AsyncStorage from '@react-native-community/async-storage';


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


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const List: React.FC = () => {
    const navigation = useNavigation();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const { userID } = useUserID();
    const { listUnique, setListUnique } = useListUnique();
    const [enabledStatesItems, setEnabledStatesItems] = useState<boolean>(false);
    const { userSaved, setUserSaved } = useSavedUser();
    const [comments, setComments] = useState<string>('');
    const [list, setList] = useState<LIST[]>([]);
    const [isVisibleModal3, setISVisibleModal3] = useState<boolean>(false);
    const [isVisibleModal4, setISVisibleModal4] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [okIOS, setOkIOS] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    var mark: any = {};
    const [date, setDate] = useState<any>(new Date());
    const [dateIOS, setDateIOS] = useState<any>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [showIOS, setShowIOS] = useState<boolean>(false);
    const [ItemDelete, setItemDelete] = useState<LIST>();
    const [ItemView, setItemView] = useState<LIST>();
    const [isVisibleModalDelete, setISVisibleModalDelete] = useState<boolean>(false);
    const [isVisibleModalMAIS, setISVisibleModalMAIS] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const socket = io("http://192.168.100.99:3000");
    const [idPostComments, setIdPostComments] = useState<string>('');
    // useEffect(() => {
    //     api.get('/posts').then(res=>{
    //         setItemComments([...itemComments, res.data])
    //     })
    // }, [])

    useEffect(() => {
        loadLists();
        socket.on('posts', (res: LIST[]) => {
            // console.log(res)
            setList(res)
        })
        return () => {

        }
    }, [])
    function loadLists() {
        api.get('/posts').then(res => {
            setList(res.data)
        })


        // firestore().collection('list').orderBy('timestampTarea', 'desc').onSnapshot(res => {
        //     setList([]);
        //     res.docs.forEach((response: any) => {
        //         //console.log('tarefas', response.data());
        //         setList(list => [...list, response.data()])
        //     })
        // })
    }


    const detectMultiValues = (date: string) => {

        var red: number = 0;
        var green: number = 0;
        var orange: number = 0;
        list.forEach(res => {
            if (res.date === date) {
                if (res.status === 'red') {
                    red++;
                } if (res.status === 'green') {
                    green++;
                } if (res.status === 'orange') {
                    orange++;
                }
            }
        });

        if (red !== 0) {
            return '#800080';
        }
        if (orange !== 0) {
            return 'orange';
        }
        if ((green !== 0) && (orange === 0) && (red === 0)) {
            return 'green';
        }
    }


    function loadDaysAgend() {
        list.forEach(res => {
            const cor = detectMultiValues(res.date);
            mark[res.date] = { selected: true, selectedColor: cor };
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
        Toast.showWithGravity('seleccione el plazo de entrega', Toast.LONG, Toast.TOP);
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
        Toast.showWithGravity('seleccione el plazo de entrega', Toast.LONG, Toast.TOP);
        setEnabledStatesItems(true)
        setShow(true);
        setEnabledStatesItems(false)
    }



    async function exitAccount() {
        try {
            AsyncStorage.removeItem('@userID')
            setVisibleDialog(false);
            setUserSaved(false);
        } catch (e) {
            console.log(e)
        }
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

        const DATA = {

            dateAtual: moment(new Date()).format('YYYY-MM-DD'),
            statusText: 'Pendiente',
            title: title,
            numberStatus: 1,
            userID: userID,
            description: description,
            timestamp: firestore.Timestamp.now().toMillis(),
            timestampTarea: moment(Platform.OS === 'ios' ? dateIOS : date).format('x'),
            status: 'orange',
            date: moment(Platform.OS == 'ios' ? dateIOS : date).format('YYYY-MM-DD')
        }
        console.log(JSON.stringify(userID))
        api.post('/posts/create', DATA).then(res => {
            console.log('create item', res.data)
            if (res.data.message == 'success') {
                firestore().collection('list').add(DATA);
                Toast.showWithGravity('Tarea registrada con éxito', Toast.LONG, Toast.TOP);
            }
        })

        setDescription('');
        setTitle('');

        // firestore().collection('notification').add({
        //     id: ID,
        //     dates: moment(Platform.OS == 'ios' ? dateIOS : date).format('YYYY-MM-DD'),
        //     email: emailUser,
        //     title: title,
        //     timestamp: firestore.Timestamp.now().toMillis(),
        //     description: description,
        // });
        // }).catch(() => {
        //     Toast.showWithGravity('Se produjo un error al registrar la tarea', Toast.LONG, Toast.TOP);
        // })
        setISVisibleModal3(false)
        setEnabledStatesItems(false)
        return setLoading(false)
    }




    function updateTarefa(number: number, item: LIST) {

        if (number == 2) {
            return api.post('/posts/status/update', {
                postID: item.id,
                statusText: 'Finalizado',
                status: 'green',
                numberStatus: 2,
            }).then((res) => {
                if (res.data.message == 'success') {
                    Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
                }
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 1) {
            return api.post('/posts/status/update', {
                postID: item.id,
                statusText: 'Pendiente',
                numberStatus: 1,
                status: 'orange'
            }).then((res) => {
                if (res.data.message == 'success') {
                    Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
                }
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }
        if (number == 0) {
            api.post('/posts/status/update', {
                postID: item.id,
                statusText: 'Cancelado',
                numberStatus: 0,
                status: 'red'
            }).then((res) => {
                if (res.data.message == 'success') {
                    Toast.showWithGravity('Estado cambiado', Toast.LONG, Toast.TOP)
                }
            }).catch(() => {
                Toast.showWithGravity('Se produjo un error al actualizar', Toast.LONG, Toast.TOP)
            })
        }

    }

    function deleteListItem(item: LIST) {
        console.log(item.userID, `----`, userID)
        if (Number(item.userID) !== Number(userID)) {
            return Toast.showWithGravity('No tienes autorización para eliminar esta tarea', Toast.LONG, Toast.TOP)
        }
        setItemDelete(item);
        setISVisibleModalDelete(true);
    }

    function deleteItem() {
        api.post('/posts/delete', {
            postID: ItemDelete?.id
        }).then(res => {
            console.log(res.data)
            if (res.data.message == 'success') {
                Toast.showWithGravity('Tarea eliminada con éxito', Toast.LONG, Toast.TOP);
                return setISVisibleModalDelete(false);
            }
            Toast.showWithGravity('Se produjo un error al eliminar la tarea', Toast.LONG, Toast.TOP);
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

    // function openModalAddComments(item: LIST) {
    //     setIdPostComments(String(item.id))
    //     setISVisibleModal4(true);

    // }

    function handleVisibleMais(item: LIST) {
        setListUnique(item);
        navigation.navigate('InfoTarea')
    }

    // const alertNotification = (timestamp: number) => {
    //     const initialDate = timestamp - 100000;
    //     if (Number(firestore.Timestamp.now().toMillis()) >= initialDate) {
    //         return true;
    //     }
    //     return false;
    // }


    function RenderItems(item: LIST) {

        return (
            <>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.containerList}>
                    <GestureRecognizer
                        onSwipeRight={() => deleteListItem(item)}
                        config={configSWIPE}>
                        <TouchableWithoutFeedback onPress={() => handleVisibleMais(item)}>
                            <View style={[styles.itemContain]}>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={[styles.borderColorStatus, { backgroundColor: item.status, flexDirection: 'column-reverse', alignItems: 'center' }]} >

                                    </View>
                                </TouchableWithoutFeedback>

                                <View style={styles.bodyContainerItem}>
                                    <View style={styles.containerEmail}>
                                        <Text numberOfLines={1} style={[styles.textEmail]}>{item.email}</Text>
                                    </View>
                                    <View style={styles.containerName}>
                                        <Text numberOfLines={1} style={styles.textName}>{item.title}</Text>
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
                                    <Text style={styles.textEmail}>{item.dateAtual}</Text>
                                    <Text style={styles.textEmail}>{item.date}</Text>

                                    <SwitchSelector
                                        options={[
                                            { label: "C", value: "0", activeColor: 'red' },
                                            { label: "P", value: "1", activeColor: 'orange' },
                                            { label: "F", value: "2", activeColor: 'green' },

                                        ]}
                                        disabled={enabledStatesItems}
                                        buttonColor={item.status}
                                        initial={Number(item.numberStatus)}
                                        onPress={(value: number) => updateTarefa(value, item)}

                                    />
                                    <Text style={styles.textEmail}>{item.statusText}</Text>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    </GestureRecognizer>
                </View>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />

            </>
        );
    }
    return (
        <>
            <View style={{ backgroundColor: '#141414', width: '100%', height: getStatusBarHeight(true) }} />
            <View style={[styles.header, Number(userID) === 7 && { paddingLeft: width * 0.05, }]}>
                {Number(userID) === 7 && <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.navigate('Users')} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/team.png')} />
                </TouchableOpacity>}
                <Text style={styles.textHeader}>Lista de Tareas</Text>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => setVisibleDialog(true)} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/salir.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerSearch}>
                <View style={styles.containerItemSearch}>
                    <View style={styles.searchInput}>
                        <TextInput
                            placeholder={'Buscar...'}
                            value={searchText}
                            onChangeText={(e) => setSearchText(e)}
                        />
                    </View>

                    <View style={styles.iconSearch}>
                        {searchText.length === 0 ?
                            <Image resizeMode={"contain"} style={{ height: '60%', width: '40%' }} source={require('../../assets/search.png')} /> :
                            <TouchableWithoutFeedback onPress={() => setSearchText('')}>
                                <Image resizeMode={"contain"} style={{ height: '35%', width: '25%' }} source={require('../../assets/close.png')} />
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>

            </View>
            {list.length === 0 ? <>
                <View style={{ width: '100%', height: '8%' }} />
                <ActivityIndicator size='large' color='#141414' /></> :
                <FlatList
                    style={{ flex: 1, backgroundColor: '#E5E5E5' }}
                    data={searchText.length !== 0 ? list.filter(res => (String(res.title).toLowerCase().search(String(searchText).toLowerCase()) >= 0) || (String(res.description).toLowerCase().search(String(searchText).toLowerCase()) >= 0) || (String(res.date).toLowerCase().search(String(searchText).toLowerCase()) >= 0) || (String(res.email).toLowerCase().search(String(searchText).toLowerCase()) >= 0) || (String(res.name).toLowerCase().search(String(searchText).toLowerCase()) >= 0) || (String(res.statusText).toLowerCase().search(String(searchText).toLowerCase()) >= 0)) : list}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ height: width * 0.5, width: '100%' }} />}
                    renderItem={({ item }) => RenderItems(item)}
                    keyExtractor={(item: LIST) => String(item.id)}

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
                            maxLength={150}
                            value={title}
                            onChangeText={(e) => setTitle(e)}
                        />
                        <TextInput
                            style={styles.inputAddDesc}
                            placeholder={'Descripción'}
                            multiline={true}
                            maxLength={1000}
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
                                <Text style={styles.textEmail}>{ItemDelete?.date}</Text>
                                <SwitchSelector
                                    options={[
                                        { label: "C", value: "0", activeColor: 'red' },
                                        { label: "P", value: "1", activeColor: 'orange' },
                                        { label: "F", value: "2", activeColor: 'green' },

                                    ]}
                                    disabled={true}
                                    buttonColor={ItemDelete?.status}
                                    initial={Number(ItemDelete?.numberStatus)}
                                    onPress={() => { }}

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


            <Modal
                swipeDirection={Platform.OS === 'ios' ? 'down' : 'left'}
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setISVisibleModalMAIS(false)}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    </TouchableWithoutFeedback>
                }
                isVisible={isVisibleModalMAIS}
                onBackButtonPress={() => setISVisibleModalMAIS(false)}
                onSwipeComplete={() => setISVisibleModalMAIS(false)}>
                <View style={styles.conatainerModalMAIS}>
                    <View style={[styles.containerModalMAIS, { top: getStatusBarHeight(true) }]} >
                        <View style={[styles.itemContainView]}>
                            <View style={[styles.borderColorStatusView, { backgroundColor: ItemView?.status }]} />
                            <View style={styles.bodyContainerItemView}>
                                <View style={styles.containerEmail}>
                                    <Text numberOfLines={2} style={[styles.textEmail2]}>{ItemView?.email.toLowerCase()}</Text>
                                </View>
                                <View style={styles.containerName}>
                                    <TextInput
                                        style={[styles.textName2]}
                                        multiline={true}

                                        editable={Platform.OS === 'ios' ? false : true}
                                        textAlignVertical='top'
                                        value={ItemView?.title}
                                        onChangeText={() => { }}
                                    />
                                </View>
                                <View style={styles.containerDescrip}>
                                    <TextInput
                                        style={[styles.textDesc2]}
                                        multiline={true}


                                        textAlignVertical='top'
                                        editable={Platform.OS === 'ios' ? false : true}
                                        onChangeText={() => { }}
                                        value={ItemView?.description}
                                    />
                                </View>
                            </View>
                            <Animated.View style={[styles.viewOpcacityItem]} >
                                <Text numberOfLines={2} style={styles.textEmail2}>{ItemView?.date}</Text>
                                <SwitchSelector
                                    options={[
                                        { label: "C", value: "0", activeColor: 'red' },
                                        { label: "P", value: "1", activeColor: 'orange' },
                                        { label: "F", value: "2", activeColor: 'green' },
                                    ]}
                                    disabled={true}
                                    buttonColor={ItemView?.status}
                                    initial={Number(ItemView?.numberStatus)}
                                    onPress={() => { }}

                                />
                                <Text numberOfLines={2} style={styles.textEmail2}>{ItemView?.statusText}</Text>
                            </Animated.View>
                        </View>

                    </View>
                </View>
            </Modal>

        </>
    );
}
export default List;