import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import { IStores } from '../../stores';
import { IPoemsStore } from '../../stores/container/PoemsStore';
import PoemsList from './PoemsList';
import PoemsSearch from './PoemsSearch';

interface IProps extends RouteComponentProps<any> {
    stores: IStores;
}

@inject('stores')
@observer
export default class PoemsPage extends React.Component<IProps, {}> {
    private _store: IPoemsStore;

    constructor(props: IProps) {
        super(props);

        this._store = props.stores.poems;
    }

    componentDidMount() {
        scrollTopOnPush(this.props.history.action);
    }

    handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this._store.setAuthor(value);
    };

    handleSearchSubmit = (e: Event) => {
        e.preventDefault();
        const { author } = this._store;
        this._store.getPoemsByAuthor(author);
    };

    render() {
        const { author, errorMessage, isLoading, poems } = this._store;

        return (
            <main className="poems-page">
                <h1 className="page-title">Search Poems By Author</h1>
                <PoemsSearch
                    onChange={this.handleSearchInputChange}
                    onSubmit={this.handleSearchSubmit}
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
