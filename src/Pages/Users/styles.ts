import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f5'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    separator: {
        width: '100%',
        height: width * 0.04
    },
    header: {
        width: width,
        height: width * 0.15,
        backgroundColor: 'grey',
        paddingLeft: width*0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.01
    },
    ViewIconHeader: {
        width: width * 0.15,
        height: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconHeader: {
        height: '45%',
        width: '55%'
    },
    logo: {
        height: width * 0.55,
        width: width * 0.55,
        borderRadius: ((width * 0.55) / 2),
        backgroundColor: '#258E4A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLive: {
        color: 'white',
        fontSize: width * 0.04
    },
    textClose: {
        color: 'black',
        fontSize: width * 0.04
    },
    text: {
        color: 'white',
        fontSize: width * 0.05,
        fontWeight: '400',

    },
    buttomAdd: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: 'green',
        position: 'absolute',
        top: height - (height / 4),
        left: width / 1.25,
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        color: 'white',
        fontSize: width * 0.06
    },
    buttomList: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: '#800080',
        position: 'absolute',
        top: height - (height / 7),
        left: width / 1.25,
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conatainerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conatainerModal3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    info: {
        height: width * 0.12,
        width: width * 0.12,
        borderRadius: ((width * 0.12) / 2),
        position: 'absolute',
        top: width * 0.19+  getStatusBarHeight(true),
        left: width - width * 0.1
    },
    iconInfo: {
        height: '50%',
        width: '50%'
    },
    containerList: {
        width: '100%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    itemContain: {
        width: '90%',
        height: width * 0.25,
        borderRadius: width * 0.03,
        backgroundColor: 'white',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    borderColorStatus: {
        width: '5%',
        height: '100%',
        borderTopLeftRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03
    },
    bodyContainerItem: {
        width: '60%',
        height: width * 0.2,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.02
    },
    textEmail: {
        fontSize: width * 0.03,
        fontWeight: '400',
        color: '#141414'

    },
    textDesc: {
        fontSize: width * 0.03,
        fontWeight: '400',
        color: '#141414'

    },
    textName: {
        fontSize: width * 0.05,
        fontWeight: '400',
        color: '#141414'
    },
    containerEmail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',


    },
    containerName: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',

    },
    containerEXCUI: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width:'35%'
     

    },
    containerModal: {
        width: width * 0.9,
        height: width * 0.4,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    conatainerModalAdd:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerDescColor: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        height: '30%'
    },
    colorBox: {
        height: width * 0.07,
        width: width * 0.07,
    },
    txt: {
        paddingLeft: width * 0.05,
        fontSize: width * 0.035,
        fontWeight: '400',
    },
    containerModal3: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    inputAddTitle: {
        width: '80%',
        height: '20%',
        borderWidth: width * 0.002,
        borderColor: 'grey',
        borderRadius: width * 0.01
    },
    submitList: {
        width: '80%',
        height: '20%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
        borderRadius: width * 0.01
    },
    inputAddDesc: {
        width: '80%',
        height: '40%',
        textAlign:'left',

        textAlignVertical: 'top',
        flexDirection:'row',

        lineHeight: 20,
        borderWidth: width * 0.002,
        borderColor: 'grey',
        borderRadius: width * 0.01
    },
    IOSPickerData:{
        position:'absolute',
        minHeight: height/4,
        maxHeight: undefined,
        width: '100%',
        backgroundColor:'#E5E5E5',
        justifyContent:'flex-end',
        top: getStatusBarHeight(true),
        elevation: 4000
    },
    textAdm: {
        color: '#141414',
        textAlign: 'auto',
        fontSize: width * 0.04
    },
    textInput: {
        color: 'white',
        textAlign: 'auto',
        fontSize: width * 0.065,
        fontWeight: '400'
    },
    containerModal2: {
        width: width * 0.9,
        height: width * 0.8,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    inputView: {
        width: width - 80,
        height: width * 0.15,
        backgroundColor: 'white',
        borderRadius: width * 0.04,
        elevation: 2,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    inputViewImage: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: width * 0.15,
        width: width * 0.15
    },
    input: {
        width: width - 160,
        height: width * 0.15,
        fontSize: 20
    },
    submit: {
        width: width - 110,
        height: width * 0.14,
        backgroundColor: 'green',
        borderRadius: width * 0.04,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
export default styles