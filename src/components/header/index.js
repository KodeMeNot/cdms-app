import { h } from 'preact';
import { useState } from 'preact/hooks';

const Header = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div style="width:100%">
      <span style="align-items: center; display: none;">
        <span style="margin-right: 7px; max-width: 240px; overflow: hidden; position: relative; color:#fff; font-size:20px;">KOTHARI</span>
      </span>
    </div>
  );
};

export default Header;
