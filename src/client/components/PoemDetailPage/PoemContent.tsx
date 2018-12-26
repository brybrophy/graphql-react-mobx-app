import React from 'react';
import { IPoemDetail } from '../../stores/container/PoemDetailStore';

interface IProps {
    errorMessage: string;
    isLoading: Boolean;
    poem: IPoemDetail;
}

const PoemContent = ({ errorMessage, isLoading, poem }: IProps) => {
    if (isLoading) {
        return <p className="message">Loading Poem...</p>;
    }

    if (errorMessage) {
        return <p className="message">{errorMessage}</p>;
    }

    return (
        <section>
            <h1 className="page-title">{poem.title}</h1>
            <h4 className="by-line">
                {poem.author ? `By ${poem.author}` : ''}
            </h4>
            <div className="lines">
                {poem.lines.map(line => {
                    return <p key={line}>{line}</p>;
                })}
            </div>
        </section>
    );
};

export default PoemContent;
