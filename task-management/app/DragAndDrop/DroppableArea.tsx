// components/DroppableArea.tsx
import React, { useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface DroppableAreaProps {
  onDrop: (item: { id: string | number }) => void;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item: unknown) => {
      const droppedItem = item as { id: string | number };
      onDrop(droppedItem);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div ref={ref} className={`${ isOver ? 'bg-gray-100 rounded-lg': 'bg-white'}`}>
      {children}
    </div>
  );
};

export default DroppableArea;
