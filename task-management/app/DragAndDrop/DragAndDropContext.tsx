// components/DndContext.js
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ReactNode } from 'react';

const DndContext = ({children}:{children:ReactNode}) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DndContext;
