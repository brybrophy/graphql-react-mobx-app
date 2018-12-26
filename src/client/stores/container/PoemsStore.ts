import { action, observable } from 'mobx';
import client from '../../graphql/client';
import gql from 'graphql-tag';

interface IPoem {
    author: string;
    title: string;
    lines: string[];
    linecount: string;
}

export default class PoemsStore {
    @observable public author: string = '';
    @observable public errorMessage: string = '';
    @observable public isLoading: boolean = false;
    @observable public poems: IPoem[] = [];

    @action
    async getPoemsByAuthor(author: string): Promise<void> {
        if (!author) {
            this.errorMessage = 'Author Cannot Be Blank.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            const res: any = await client.query({
                query: gql`
                    {
                        poemsByAuthor(author: "${author}") {
                            author
                            title
                            lines
                            linecount
                        }
                    }
                `
            });

            if (res.data && res.data.poemsByAuthor) {
                this.poems = res.data.poemsByAuthor;
            }
        } catch (err) {
            this.errorMessage = `No Poems By Author ${author}.`;
        }

        this.isLoading = false;
    }

    @action
    setAuthor(nextAuthor: string): void {
        this.author = nextAuthor;
    }
}

export interface IPoemsStore extends PoemsStore {}
