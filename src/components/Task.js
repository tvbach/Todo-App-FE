import { FaClock } from "react-icons/fa";
import { Checkbox, FormControlLabel } from "@mui/material";

const Task = ({ id, title, sub_title, priority, due_date, handleCheckboxChange }) => {
  const priorityClasses = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const handleFinishTask = (id) => {
    handleCheckboxChange(id);
  }

  return (
    <div className="flex items-start space-x-4 p-4 border-b">
      <FormControlLabel
        control={<Checkbox onChange={() => handleFinishTask(id)} />}
        label=""
      />
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="font-bold">{title}</h2>
          <p className="text-gray-600">{sub_title}</p>
        </div>
        <div className="flex items-center">
          <span className={`flex items-center justify-center w-32 h-8 rounded-full text-xs font-semibold ${priorityClasses[priority]}`}>
            {priority.toUpperCase()} PRIORITY
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-gray-500 h-8 bg-gray-100 rounded-full w-full justify-center">
            <FaClock />
            <span className="ml-1">{due_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
