import { SelectChat } from './SelectChat';
import { Recommend } from './Recommend';
import { Ask } from './Ask';
import { Instruction } from './Instruction';
import { useState } from 'react';

export function AnythingElse({ message, posts, sent, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(-1);
  const handleSelectedValue = value => {
    setSelectedValue(value);
    onSelect(value);
  };
  return (
    <div>
      <div>
        <SelectChat onSelect={handleSelectedValue} greetings={false} passValue />
      </div>

      {selectedValue === 0 ? (
        <Recommend key="recommend" inputValue={message} posts={posts} sent={sent} onSelect={onSelect} />
      ) : selectedValue === 1 ? (
        <Ask key="ask" message={message} posts={posts} sent={sent} onSelect={onSelect} />
      ) : selectedValue === 2 ? (
        <Instruction key="instruction" message={message} posts={posts} sent={sent} onSelect={onSelect} />
      ) : null}
    </div>
  );
}
