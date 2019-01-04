import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import PoemsList from './PoemsList';
import PoemsSearch from './PoemsSearch';
import PoemsStateContainer from './PoemsStateContainer';

interface IProps extends RouteComponentProps<any> {
    stateContainer: PoemsStateContainer;
}
interface IChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

export default class PoemsPage extends React.Component<IProps, {}> {
    componentDidMount() {
        scrollTopOnPush(this.props.history.action);
    }

    handleInputChange = (
        e: IChangeEvent,
        stateContainer: PoemsStateContainer
    ) => {
        const { value } = e.target;
        stateContainer.setAuthor(value);
    };

    handleSearchSubmit = (
        e: IChangeEvent,
        stateContainer: PoemsStateContainer
    ) => {
        e.preventDefault();
        const { author } = stateContainer.state;
        stateContainer.getPoemsByAuthor(author);
    };

    render() {
        const { stateContainer } = this.props;
        const { author, errorMessage, isLoading, poems } = stateContainer.state;

        return (
            <main className="poems-page page">
                <h1 className="page-title">Search Poems By Author</h1>
                <PoemsSearch
                    onChange={(e: IChangeEvent) => {
                        return this.handleInputChange(e, stateContainer);
                    }}
                    onSubmit={(e: IChangeEvent) => {
                        return this.handleSearchSubmit(e, stateContainer);
                    }}
                    value={author}
                />
                <PoemsList
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    poems={poems}
                />
            </main>
        );
    }
}
