import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Link from 'ring-ui/components/link/link';

const Item = ({title, legacy, ...linkProps}) => (
  <li className="nav__item">
    <Link
      {...linkProps}
      className={classNames({
        /* eslint-disable camelcase */
        nav__link_legacy: legacy,
        nav__link_active: linkProps.active
        /* eslint-enable */
      })}
    >{title}</Link>
  </li>
);

Item.propTypes = {
  ...Link.propTypes,
  legacy: PropTypes.bool,
  title: PropTypes.string
};

export default Item;
