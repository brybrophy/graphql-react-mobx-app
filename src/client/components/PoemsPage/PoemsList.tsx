import React from 'react';

interface IProps {
    errorMessage: string;
    isLoading: Boolean;
    poems: any[];
}

const PoemsList = ({ errorMessage, isLoading, poems }: IProps) => {
    if (isLoading) {
        return <p className="message">Loading Poems...</p>;
    }

    if (errorMessage) {
        return <p className="message">{errorMessage}</p>;
    }

    return (
        <section className="poems-list">
            {poems.map((poem, i) => {
                return (
                    <div className={`list-card card-${i + 1}`} key={poem.title}>
                        <div className="row">
                            <h5>author:</h5>
                            <p>{poem.author}</p>
                        </div>
                        <div className="row">
                            <h5>title:</h5>
                            <p>{poem.title}</p>
                        </div>
                        <div className="row">
                            <h5>Line Count:</h5>
                            <p>{poem.linecount}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default PoemsList;
