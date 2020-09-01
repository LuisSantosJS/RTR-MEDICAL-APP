import React, {
    createContext,
    useState,
    useContext
} from 'react';



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


type ContextType = {

    listUnique: LIST;
    setListUnique: (value: LIST) => void;

};

const ContextApp = createContext<ContextType>({

    listUnique: {
        userID: '',
        description: '',
        email: '',
        status: '',
        name: '',
        title: '',
        statusText: '',
        id: '',
        timestamp: '',
        timestampTarea: '',
        views: '',
        dateAtual: '',
        date: '',
        numberStatus: 0,
    },
    setListUnique: (value: LIST) => { },


});


const Provider: React.FC = ({ children }) => {
    const [listUnique, setListUnique] = useState<LIST>({
        userID: '',
        description: '',
        email: '',
        status: '',
        name: '',
        title: '',
        statusText: '',
        id: '',
        timestamp: '',
        timestampTarea: '',
        views: '',
        dateAtual: '',
        date: '',
        numberStatus: 0,
    });



    return (
        <ContextApp.Provider value={{
            listUnique, setListUnique
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default Provider;


export function useListUnique() {
    const infoUser: ContextType = useContext(ContextApp);
    const { listUnique, setListUnique } = infoUser;
    return { listUnique, setListUnique };
}













