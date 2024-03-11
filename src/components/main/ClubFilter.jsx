import { useState } from 'react';
import { TypeSort } from '../sort';

export function ClubFilter() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectedValue = value => {
    setSelectedValue(value);
  };

  return (
    <div>
      <TypeSort onSelect={handleSelectedValue} />
      <p>Selected Value: {selectedValue}</p>
    </div>
  );
}
