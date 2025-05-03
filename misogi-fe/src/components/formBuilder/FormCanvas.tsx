import React from "react";
import { useFormBuilder } from "../../context/FormBuilderContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "FORM_FIELD";

const FormCanvas = () => {
  const { fields, removeField, reorderFields, selectField, selectedFieldId } = useFormBuilder();

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const updatedFields = [...fields];
    const [removed] = updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, removed);
    reorderFields(updatedFields);
  };

  const DraggableField = ({ field, index }: any) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
      accept: ItemType,
      hover(item: any) {
        if (!ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        moveField(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <div
        ref={ref}
        // onClick={() => selectField(field.id)}
        className={`flex items-center justify-between bg-white p-3 rounded shadow hover:shadow-md cursor-pointer transition ${
          isDragging ? "opacity-30" : "opacity-100"
        } ${selectedFieldId === field.id ? "ring-2 ring-blue-400" : ""}`}
      >
        <div>
          <p className="font-semibold capitalize">{field.label}</p>
          <small className="text-gray-500">{field.type}</small>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            selectField(field.id)
          }}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
        🖊️
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          ✖️
        </button>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded p-4 space-y-4">
        {fields.length === 0 ? (
          <p className="text-gray-400 text-center">Add fields here to start building form 🚀</p>
        ) : (
          fields.map((field, index) => (
            <DraggableField key={field.id} field={field} index={index} />
          ))
        )}
      </div>
    </DndProvider>
  );
};

export default FormCanvas;


// import React from "react";
// import { useFormBuilder } from "../../context/FormBuilderContext";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const ItemType = "FORM_FIELD";

// const FormCanvas = () => {
//   const { fields, removeField, reorderFields } = useFormBuilder();

//   const moveField = (dragIndex: number, hoverIndex: number) => {
//     const updatedFields = [...fields];
//     const [removed] = updatedFields.splice(dragIndex, 1);
//     updatedFields.splice(hoverIndex, 0, removed);
//     reorderFields(updatedFields);
//   };

//   const DraggableField = ({ field, index }: any) => {
//     const ref = React.useRef<HTMLDivElement>(null);

//     const [, drop] = useDrop({
//       accept: ItemType,
//       hover(item: any, monitor) {
//         if (!ref.current) return;

//         const dragIndex = item.index;
//         const hoverIndex = index;

//         if (dragIndex === hoverIndex) return;

//         moveField(dragIndex, hoverIndex);
//         item.index = hoverIndex;
//       },
//     });

//     const [{ isDragging }, drag] = useDrag({
//       type: ItemType,
//       item: { index },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     drag(drop(ref));

//     return (
//       <div
//         ref={ref}
//         className={`flex items-center justify-between bg-white p-3 rounded shadow hover:shadow-md cursor-move transition ${
//           isDragging ? "opacity-30" : "opacity-100"
//         }`}
//       >
//         <div>
//           <p className="font-semibold capitalize">{field.label}</p>
//           <small className="text-gray-500">{field.type}</small>
//         </div>
//         <button
//           onClick={() => removeField(field.id)}
//           className="text-red-500 hover:text-red-700"
//         >
//           ✖️
//         </button>
//       </div>
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded p-4 space-y-4">
//         {fields.length === 0 ? (
//           <p className="text-gray-400 text-center">Drag fields here to start building 🚀</p>
//         ) : (
//           fields.map((field, index) => (
//             <DraggableField key={field.id} field={field} index={index} />
//           ))
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default FormCanvas;
