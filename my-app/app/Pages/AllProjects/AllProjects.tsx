import AllProjectsSection from "./Components/AllProjectsSection";
import ProjectsHeader from "./Components/ProjectsHeader";
import ProjectsSubHeader from "./Components/ProjectsSubHeader";
import StatsRightSideBar from "./Components/StatsRightSideBar";
function AllProjects() {
    return (
        <div className=" bg-slate-50 w-full min-h-screen flex">
            <AllProjectsArea />
            <StatsRightSideBar />
        </div>
    );

    function AllProjectsArea() {
        return (
            <div className="w-[78%] p-10 flex flex-col gap-3">
                {/* Search bar and the add project button */}
                <ProjectsHeader />
                {/* My Projects Title and the add button */}
                <ProjectsSubHeader />
                { /* All Projects Added */}
                <AllProjectsSection />
            </div>
        )
    }
}

export default AllProjects;