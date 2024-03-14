import { SelectChat } from './SelectChat';
import { Recommend } from './Recommend';
import { Ask } from './Ask';
import { Instruction } from './Instruction';
import { useState } from 'react';

export function AnythingElse({ message, posts, sent }) {
  const [selectedValue, setSelectedValue] = useState(-1);
  const handleSelectedValue = value => {
    setSelectedValue(value);
  };
  return (
    <div>
      <div>
        <SelectChat onSelect={handleSelectedValue} greetings={false} />
      </div>

      {selectedValue === 0 ? (
        <Recommend inputValue={message} posts={posts} sent={sent} />
      ) : selectedValue === 1 ? (
        <Ask />
      ) : selectedValue === 2 ? (
        <Instruction />
      ) : null}
    </div>
  );
}
