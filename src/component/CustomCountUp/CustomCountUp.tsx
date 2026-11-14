'use client';

import CountUp from 'react-countup';

export default function CustomCountUp({
  start,
  end,
  duration = 5,
}: {
  start?: number;
  end: number;
  duration?: number;
}) {
  return (
    <CountUp
      start={start || 0}
      end={end}
      duration={duration}
      separator=" "
      enableScrollSpy={true}
    />
  );
}
