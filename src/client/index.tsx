import './assets/styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider as MobxProvider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';
import Stores from './stores';
import App from './App';

const container = document.getElementById('root');
const stores = new Stores();
const renderApp = (component: typeof App) =>
    render(
        <AppContainer>
            <MobxProvider stores={stores}>
                <Router>
                    <ApolloProvider client={client}>
                        <App />
                    </ApolloProvider>
                </Router>
            </MobxProvider>
        </AppContainer>,
        container
    );

renderApp(App);

if (module.hot) {
    module.hot.accept(() => renderApp(App));
}
