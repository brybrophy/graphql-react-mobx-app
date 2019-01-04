import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated';
import PoemDetail from './PoemDetail';
import PoemDetailStateContainer from './PoemDetailStateContainer';

interface IProps extends RouteComponentProps<any> {}

export default class PoemDetailPage extends React.Component<IProps, {}> {
    render() {
        return (
            <Subscribe to={[PoemDetailStateContainer]}>
                {(stateContainer: PoemDetailStateContainer) => {
                    return (
                        <PoemDetail
                            stateContainer={stateContainer}
                            {...this.props}
                        />
                    );
                }}
            </Subscribe>
        );
    }
}
