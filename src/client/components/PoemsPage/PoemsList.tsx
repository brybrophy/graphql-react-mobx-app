import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link to={poem.title} key={poem.title}>
                        <div className={`list-card card-${i + 1}`}>
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
                    </Link>
                );
            })}
        </section>
    );
};

export default PoemsList;
