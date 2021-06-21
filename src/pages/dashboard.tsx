import { useEffect } from "react";

import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
    useEffect(() => {
        document.title = "Instagram";
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    );
}
