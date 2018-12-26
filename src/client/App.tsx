import React from 'react';
import { Route, Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// ---- Dynamic Imports for Code splitting ---- //
const PoemsPage = importedComponent(() => import('./components/PoemsPage'));
const PoemDetailPage = importedComponent(() =>
    import('./components/PoemDetailPage')
);
const NotFoundPage = importedComponent(() =>
    import('./components/NotFoundPage')
);
// ------------------- End ------------------- //

export default class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Switch>
                    <Route exact path="/" component={PoemsPage} />
                    <Route exact path="/:title" component={PoemDetailPage} />
                    <Route exact path="/not-found" component={NotFoundPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}
