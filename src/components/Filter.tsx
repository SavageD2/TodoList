import React from 'react';

type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
        Toutes
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Terminées
      </button>
      <button onClick={() => setFilter('incomplete')} disabled={filter === 'incomplete'}>
        Non terminées
      </button>
    </div>
  );
};

export default Filter;
