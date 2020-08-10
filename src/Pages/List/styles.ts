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
        backgroundColor: '#E5E5E5'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    containerSearch: {
        width: '100%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'

    },
    iconSearch: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        height: '100%',
        width: '80%',
        paddingHorizontal: width * 0.04,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerItemSearch: {
        width: '90%',
        height: '65%',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: width * 0.02,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    conatainerModal3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    conatainerModal4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    conatainerModalMAIS: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    buttomAdd: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: 'green',
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
    header: {
        width: width,
        height: width * 0.15,
        backgroundColor: '#141414',
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
    textHeader: {
        color: 'white',
        fontSize: width * 0.06
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
    containerModal3: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    containerModal4: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    containerModalDel: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    containerModalMAIS: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    conatainerModalDel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: width * 0.01
    },
    inputAddDesc: {
        width: '80%',
        height: '40%',
        textAlign: 'left',
        textAlignVertical: 'top',
        flexDirection: 'row',
        lineHeight: 20,
        borderWidth: width * 0.002,
        borderColor: 'grey',
        borderRadius: width * 0.01
    },
    IOSPickerData: {
        position: 'absolute',
        minHeight: height / 4,
        maxHeight: undefined,
        width: '100%',
        backgroundColor: '#E5E5E5',
        justifyContent: 'flex-end',
        top: getStatusBarHeight(true),
        elevation: 4000
    },
    containerList: {
        width: '100%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    separator: {
        width: '100%',
        height: width * 0.04
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
        width: '65%',
        height: width * 0.2,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.02
    },
    itemContainView: {
        width: '90%',
        height: width * 0.6,
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
    borderColorStatusView: {
        width: '5%',
        height: '100%',
        borderTopLeftRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03
    },
    bodyContainerItemView: {
        width: '65%',
        height: width * 0.6,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.02
    },
    buttomList: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: '#800080',
        position: 'absolute',
        top: height - (height / 4.2),
        left: width / 1.25,
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textEmail: {
        fontSize: width * 0.03,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    textEmail2: {
        fontSize: width * 0.04,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    textDesc: {
        fontSize: width * 0.03,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    textDesc2: {
        fontSize: width * 0.04,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    containerRowModalDel: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttomModalDel: {
        width: '40%',
        height: '70%',
        borderRadius: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    textButtomDel: {
        fontSize: width * 0.045,
        color: 'white',
        textAlign: 'auto',
        fontWeight: '600',
    },
    textName: {
        fontSize: width * 0.045,
        textAlign: 'auto',
        fontWeight: '400',
        color: '#141414'
    },
    textName2: {
        fontSize: width * 0.055,
        textAlign: 'auto',
        fontWeight: '400',
        color: '#141414'
    },
    containerEmail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%',


    },
    containerName: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '25%',

    },
    containerDescrip: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',


    },
    viewOpcacityItem: {
        height: '100%',
        width: '30%',
        backgroundColor: '#E5E5E5',
        borderTopRightRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    comments: {
        width: '100%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerCommentsView: {
        width: '90%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    containerComments: {
        width: '90%',
        height: width * 0.2,
        justifyContent: 'center',
        borderRadius: width * 0.03,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    borderColorComments: {
        height: '100%',
        width: '5%',
        backgroundColor: '#808080',
        borderTopLeftRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03,

    },
    commentsContainer: {
        height: '100%',
        width: '95%',
        backgroundColor: 'white',
        borderTopRightRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
    }
});
export default styles;