import { Container } from 'unstated';
import client from '../../graphql/client';
import gql from 'graphql-tag';

export interface IPoem {
    author: string;
    title: string;
    linecount: string;
}

export interface IState {
    author: string;
    errorMessage: string;
    isLoading: boolean;
    poems: IPoem[];
}

export default class PoemsStateContainer extends Container<IState> {
    public state: IState = {
        author: '',
        errorMessage: '',
        isLoading: false,
        poems: []
    };

    public async getPoemsByAuthor(author: string): Promise<void> {
        if (!author) {
            return this.setState({ errorMessage: 'Author Cannot Be Blank.' });
        }

        this.setState({ isLoading: true, errorMessage: '' });

        try {
            const res: any = await client.query({
                query: gql`
                    {
                        poemsByAuthor(author: "${author}") {
                            author
                            title
                            linecount
                        }
                    }
                `
            });

            if (res.data && res.data.poemsByAuthor) {
                this.setState({ poems: res.data.poemsByAuthor });
            }
        } catch (err) {
            this.setState({ errorMessage: `No Poems By Author ${author}.` });
        }

        this.setState({ isLoading: false });
    }

    public setAuthor(nextAuthor: string): void {
        this.setState({ author: nextAuthor });
    }
}
