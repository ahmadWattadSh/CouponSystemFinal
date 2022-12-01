import React, { PropsWithChildren } from 'react';

import classes from './Card.module.css';

type Props = {
  className: string;

}
const Card: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;