import { action, observable } from 'mobx';
import client from '../../graphql/client';
import gql from 'graphql-tag';

export interface IPoemDetail {
    author: string;
    title: string;
    lines: string[];
}

export default class PoemDetailStore {
    @observable public poem: IPoemDetail = { title: '', author: '', lines: [] };
    @observable public errorMessage: string = '';
    @observable public isLoading: boolean = false;

    @action
    async getPoemByTitle(title: string): Promise<void> {
        this.isLoading = true;
        this.errorMessage = '';

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
                this.poem = res.data.poemByTitle;
            }
        } catch (err) {
            this.errorMessage = `Poem ${title} Could Not Be Found.`;
        }

        this.isLoading = false;
    }
}

export interface IPoemDetailStore extends PoemDetailStore {}
