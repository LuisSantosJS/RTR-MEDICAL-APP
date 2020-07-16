import * as React from 'react';
import Router from './src/index';
import ProviderAuth from './src/Context/contextAuth';
const App: React.FC = () => {

    return (
        <ProviderAuth>
            <Router />
        </ProviderAuth>
    );
}
export default App;

