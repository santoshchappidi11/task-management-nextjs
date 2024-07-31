import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
  timestamp: string | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const cleanedTimeAgo = timeAgo.replace(/^about\s/, '');

  return (
    <span className='text-xs'>
      {cleanedTimeAgo}
    </span>
  );
};

export default TimeAgo;
