// Priority List
// FIXED: removed unused "import { is } from 'zod/locales'"
import { useTaskFormContext } from "../../Windows/TasksWindow";
import { Priority } from "../../Windows/TasksWindow";

export default function PriorityListComponent() {
    const {
        priorityListObject: { priorityList, setPriorityList },
    } = useTaskFormContext();

    return (
        <div className="flex flex-col gap-2">
            {priorityList.map((singlePriority, index) => (
                <SinglePriority
                    key={index}
                    singlePriority={singlePriority}
                    index={index}
                />
            ))}
        </div>
    );
}

// FIXED: moved outside parent component and gave it its name "SinglePriority"
function SinglePriority({
    singlePriority,
    index,
}: {
    singlePriority: Priority;
    index: number;
}) {
    const {
        setPriority,
        setOpenTasksDropDown,
        priorityListObject: { setPriorityList },
    } = useTaskFormContext();

    function updateThePriority(index: number) {
        // Update the priority state
        setPriority(singlePriority);
        // Update the priority list array
        setPriorityList((prevState: Priority[]) =>
            prevState.map((sPriority: Priority, i: number) => ({
                ...sPriority,
                isSelected: i === index,
            }))
        );
        // Close the dropdown
        setOpenTasksDropDown(false);
    }

    return (
        <div
            onClick={() => updateThePriority(index)}
            className={`${
                singlePriority.isSelected && "bg-orange-50 border border-orange-200"
            } flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
        >
            <div>{singlePriority.icon}</div>
            <p className="text-slate-500 hover:text-orange-600 text-[14px]">
                {singlePriority.name}
            </p>
        </div>
    );
}