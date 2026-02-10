import React from 'react';

const HeartButton = ({ isFavorite, onAdd, onRemove }) => {
    return (
        <button
            onClick={isFavorite ? onRemove : onAdd}
            className="btn p-0 border-0"
            style={{ fontSize: '1.2rem', background: 'none', cursor: 'pointer' }}
        >
            {isFavorite ? <i className="fas fa-heart text-danger"></i> : <i className="far fa-heart"></i>}
        </button>
    );
};

export default HeartButton;