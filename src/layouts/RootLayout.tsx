import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div>
            <header>
                {/* Navigation can go here */}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                {/* Footer can go here */}
            </footer>
        </div>
    )
}

export default RootLayout
