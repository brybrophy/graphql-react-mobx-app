import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    path: string;
}

const BackLink = ({ path }: IProps) => {
    return (
        <div className="header-actions">
            <Link to={path}>
                <button className="sm">back to search</button>
            </Link>
        </div>
    );
};

export default BackLink;
