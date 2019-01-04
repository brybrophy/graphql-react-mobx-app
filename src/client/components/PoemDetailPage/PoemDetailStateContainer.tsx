import { Container } from 'unstated';
import client from '../../graphql/client';
import gql from 'graphql-tag';

export interface IPoemDetail {
    author: string;
    title: string;
    lines: string[];
}

export interface IState {
    errorMessage: string;
    isLoading: boolean;
    poem: IPoemDetail;
}

export default class PoemStateContainer extends Container<IState> {
    public state: IState = {
        errorMessage: '',
        isLoading: false,
        poem: { author: '', title: '', lines: [] }
    };

    public async getPoemByTitle(title: string): Promise<void> {
        this.setState({ isLoading: true, errorMessage: '' });

        try {
            const res: any = await client.query({
                query: gql`
                    {
                        poemByTitle(title: "${title}") {
                            author
                            title
                            lines
                        }
                    }
                `
            });

            if (res.data && res.data.poemByTitle) {
                this.setState({ poem: res.data.poemByTitle });
            }
        } catch (err) {
            this.setState({
                errorMessage: `Poem ${title} Could Not Be Found.`
            });
        }

        this.setState({ isLoading: false });
    }
}
