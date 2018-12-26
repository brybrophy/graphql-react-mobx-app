import React from 'react';
import cx from 'classnames';

interface IProps {
    onChange: any;
    onSubmit: any;
    value: string;
}

const PoemsSearch = ({ onChange, onSubmit, value }: IProps) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            <div className={cx('input-group', { valid: value })}>
                <input id="author" value={value} onChange={onChange} />
                <label htmlFor="author">Author</label>
                <span className="highlight" />
                <span className="bar" />
            </div>
            <div className="form-actions">
                <button type="submit">Search Poems</button>
            </div>
        </form>
    );
};

export default PoemsSearch;
