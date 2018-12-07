import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import CountUp from 'react-countup';
import styles from './numberCard.css';

const NumberCard = ({ icon, color, title, number, countUp }) => (
  <Card
    className={styles.numberCard}
    bordered
    bodyStyle={{
      padding: '20px 24px 8px 24px',
    }}
  >
    <div className={styles.content}>
      <h3 className={styles.title}>{title || 'No Title'}</h3>
      <p className={styles.number} style={{ fontSize: '3em' }}>
        <CountUp
          start={0}
          end={number}
          duration={2.75}
          useEasing
          useGrouping
          separator=","
          {...countUp || {}}
        />
      </p>
    </div>
  </Card>
);

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
};

export default NumberCard;
