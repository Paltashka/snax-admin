import React from 'react'
import DragDrop from './DragDrop'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Skins = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DragDrop />
            </DndProvider>
        </div>
    )
}

export default Skins

