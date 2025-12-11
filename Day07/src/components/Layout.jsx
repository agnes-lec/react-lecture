import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Layout() {
    return (    
        <div className="layout">
            <NavigationBar />
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">
                &copy; 2025 AI 지출 관리 앱. All rights reserved.
            </footer>
        </div>
    );
}

export default Layout;