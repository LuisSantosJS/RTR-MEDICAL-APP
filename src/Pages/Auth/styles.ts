import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5'
    },
    conatainerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerViewOptions: {
        height: '70%',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    containerLogo: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * 0.45,
        height: width * 0.45,
        borderRadius: ((width * 0.45) / 2),
    },
    inputLogin: {
        width: width * 0.8,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: width * 0.04,
        borderRadius: width * 0.04,
    },
    inputRegister: {
        width: width * 0.75,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: width * 0.04,
        borderRadius: width * 0.04,
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
    containerModal: {
        width: width * 0.9,
        height: width * 0.7,
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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

export default styles;