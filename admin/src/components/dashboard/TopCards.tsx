import { Card } from 'reactstrap';
import React from 'react';

interface TopCardsProps {
  bg: string;
  icon: string;
  title: string;
  earning: number;
  subtitle: string;
  background: string;
  textcolor: string;
  subtitlecolor: string;
}

const TopCards: React.FC<TopCardsProps> = ({
  bg,
  icon,
  title,
  earning,
  subtitle,
  background,
  textcolor,
  subtitlecolor,
}: TopCardsProps) => {
  return (
    <Card>
      <div className={`d-flex p-3 shadow-md cursor-pointer hover:bg-white rounded ${background}`}>
        <div className={`circle-box lg-box d-inline-block ${bg}`}>
          <i className={icon} />
        </div>
        <div className="ms-3">
          <h2 className={`mb-0 font-bold text-xl ${textcolor}`}>{earning}</h2>
          <small className={`font-bold ${subtitlecolor}`}>{subtitle}</small>
        </div>
      </div>
    </Card>
  );
};

export default TopCards;
