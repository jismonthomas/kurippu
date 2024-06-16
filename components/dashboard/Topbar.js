'use server';

import TopbarProfile from './TopbarProfile';

const Topbar = () => {
    return (
        <div className="sticky top-0 left-0 bg-white border-b border-slate-200 px-6">
            <div className="flex justify-end  min-h-16 items-center">
                <TopbarProfile />
            </div>
        </div>
    );
};

export default Topbar;
