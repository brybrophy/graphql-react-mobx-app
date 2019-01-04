import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import BackLink from './BackLink';
import PoemContent from './PoemContent';
import PoemDetailStateContainer from './PoemDetailStateContainer';

interface IProps extends RouteComponentProps<any> {
    stateContainer: PoemDetailStateContainer;
}

export default class PoemDetail extends React.Component<IProps, {}> {
    componentDidMount() {
        const { title } = this.props.match.params;
        scrollTopOnPush(this.props.history.action);
        this.props.stateContainer.getPoemByTitle(title);
    }

    render() {
        const {
            errorMessage,
            isLoading,
            poem
        } = this.props.stateContainer.state;

        return (
            <main className="poem-detail-page page">
                <BackLink path="/" />
                <PoemContent
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    poem={poem}
                />
            </main>
        );
    }
}
