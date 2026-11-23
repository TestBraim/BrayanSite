import { useState } from "react";

function IconList({ items }) {
  const [revealed, setRevealed] = useState(null);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Safari drops list semantics for list-style: none.
    <ul className="tech-list" role="list">
      {items.map(({ component: Icon, name }) => (
        <li key={name}>
          <button
            className="tech-item"
            type="button"
            aria-pressed={revealed === name}
            onClick={() => setRevealed((current) => current === name ? null : name)}
          >
            <Icon aria-hidden="true" focusable="false" />
            <span>{name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default IconList;
