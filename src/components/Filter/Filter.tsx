import React from 'react';
import './Filter.css';

type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <button
        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
        disabled={filter === 'all'}
      >
        Toutes
      </button>
      <button
        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
        disabled={filter === 'completed'}
      >
        Terminées
      </button>
      <button
        className={`filter-button ${filter === 'incomplete' ? 'active' : ''}`}
        onClick={() => setFilter('incomplete')}
        disabled={filter === 'incomplete'}
      >
        Non terminées
      </button>
    </div>
  );
};

export default Filter;
