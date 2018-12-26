import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import { IStores } from '../../stores';
import { IPoemDetailStore } from '../../stores/container/PoemDetailStore';
import PoemContent from './PoemContent';

interface IProps extends RouteComponentProps<any> {
    stores: IStores;
}

@inject('stores')
@observer
export default class PoemDetailPage extends React.Component<IProps, {}> {
    private _store: IPoemDetailStore;

    constructor(props: IProps) {
        super(props);

        this._store = props.stores.poemDetail;
    }

    componentDidMount() {
        const { title } = this.props.match.params;
        scrollTopOnPush(this.props.history.action);
        this._store.getPoemByTitle(title);
    }

    render() {
        const { errorMessage, isLoading, poem } = this._store;

        return (
            <main className="poem-detail-page page">
                <PoemContent
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    poem={poem}
                />
            </main>
        );
    }
}
