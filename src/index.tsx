import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { useSavedUser, useLoading } from './Context/contextAuth';
import AuthRouter from './Routers/AuthRouter';
import MainRouter from './Routers/MainRouter';
const Router: React.FC = () => {
    const { userSaved } = useSavedUser();
    const { loading } = useLoading();
    useEffect(()=>{},[userSaved])
    if (loading) {
        return null;
    }
    if (userSaved) {
        return (
            <>
                <StatusBar barStyle={'light-content'} backgroundColor={'grey'} />
                <MainRouter />
            </>
        );
    }
    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={'grey'} />
            <AuthRouter />
        </>
    );



}
export default Router;