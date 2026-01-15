import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function TasksSubHeader() {
    return (
        <div className="mt-24 flex justify-betwe en  items-center">
            <MyProjectsText />
            <SortByButton />
        </div>
    );

    function MyProjectsText() {
        return (
            <div className=" flex items-center max-sm:gap-2 gap-3">
                <div className="w-[41px] -mt-1 flex justify-center items-cenetr  h-[44px] rounded-md bg-orange-100">
                    <SplitscreenIcon 
                    sx={{  fontSize: "21px"}}
                    className="text-orange-600"
                    />
                </div>
                <ul className="flex flex-col gap-[7px] max-sm:gap-[10px]  ">
                    <li className="text-[17px] font-semibold flex gap-2 items-center">
                        <div className="text-slate-700 flex gap-2 items-center">
                            <span className="text-lg">All Projects</span>
                            <span className="bg-slate-700 text-white text-[14px] p-[2px] px-2
                             rounded-md max-[420px]:hidden">
                                6
                            </span>
                        </div>
                        <KeyboardArrowDownIcon className="text-slate-600 text-lg" />
                    </li>

                    <div className="flex gap-1 items-center">
                        <li className="text-[12px] h-[4px] w-280px] max-sm:w-[170px] max-[420px]:max-[130px] bg-slate-200 rounded-md overflow-auto">
                            <div className="w-1/2 h-[100%] bg-orange-600 rounded-r-xl"></div>
                        </li>
                        <p className="text-[12px] text-slate-400 ml-3 max-sm:hidden"> 20% Completed </p>
                    </div>
                </ul>
            </div>
        );
    }

    function SortByButton() {
        return (
            <div className="flex max-sm:flex-col text-[15px] font-semibold gap-3 max-sm:gap-1">
                <span className="text-slate-300">Sort By</span>
                <div className="flex gap-1 items-center cursor-pointer">
                    <span className="text-slate-800">Recent Tasks</span>
                    <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
                </div>
            </div>
        );
    }
}

export default TasksSubHeader;