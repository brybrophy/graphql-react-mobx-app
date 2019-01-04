import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated';
import Poems from './Poems';
import PoemsStateContainer from './PoemsStateContainer';

interface IProps extends RouteComponentProps<any> {}

export default class PoemsPage extends React.Component<IProps, {}> {
    render() {
        return (
            <Subscribe to={[PoemsStateContainer]}>
                {(stateContainer: PoemsStateContainer) => {
                    return (
                        <Poems
                            stateContainer={stateContainer}
                            {...this.props}
                        />
                    );
                }}
            </Subscribe>
        );
    }
}
