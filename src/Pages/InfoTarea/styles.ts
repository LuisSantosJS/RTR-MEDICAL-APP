import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    separator: {
        width: '100%',
        height: width * 0.04
    },
    text: {
        color: 'white',
        fontSize: width * 0.05,
        fontWeight: '400',

    },
    itemContain: {
         width: '90%',
        // height: width * 0.5,
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
        height: width * 0.4,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.02
    },
    bodyContainerItem2: {
        width: '70%',
        height: width * 0.4,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: width * 0.02
    },
    bodyContainerItem3: {
        width: '95%',
        height: width * 0.4,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: width * 0.03
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
    header: {
        width: width,
        height: width * 0.15,
        backgroundColor: '#141414',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.01
    },
    textHeader: {
        color: 'white',
        fontSize: width * 0.06
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
    iconHeader2: {
        height: '55%',
        width: '65%'
    },
    textName: {
        fontSize: width * 0.055,
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
        alignItems: 'flex-start',
        height: '10%',
        width: '100%'
    },
    containerName: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '38%',
        width: '100%'

    },
    containerDescrip: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '68%',
    },
    containerDescrip2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
    },
    containerList: {
        width: '100%',
        height: width * 0.5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textEmail: {
        fontSize: width * 0.04,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    textEmail2: {
        fontSize: width * 0.03,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

    },
    textDesc: {
        fontSize: width * 0.04,
        fontWeight: '400',
        textAlign: 'auto',
        color: '#141414'

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
    viewOpcacityItem2: {
        height: '100%',
        width: '25%',
        backgroundColor: '#E5E5E5',
        borderTopRightRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    buttomList: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: '#141414',
        position: 'absolute',
        top: height - (height / 6),
        left: width / 1.25,
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttomList2: {
        height: width * 0.15,
        width: width * 0.15,
        borderRadius: ((width * 0.15) / 2),
        backgroundColor: '#808080',
        position: 'absolute',
        top: height - (height / 3.5),
        left: width / 1.25,
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLive: {
        color: 'white',
        fontSize: width * 0.04
    },
    submitList: {
        width: '80%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: width * 0.01
    },
    conatainerModal4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerModal4: {
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
    inputAddComments: {
        width: '80%',
        height: '40%',
        borderWidth: width * 0.002,
        borderColor: 'grey',
        borderRadius: width * 0.01
    },
});
export default styles;