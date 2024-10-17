import './App.css'
import {AppRoot} from "@telegram-apps/telegram-ui";
import {miniApp, retrieveLaunchParams, useLaunchParams, useSignal} from "@telegram-apps/sdk-react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./navigation/routes.tsx";
import { init } from './init.ts';

init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

function App() {
    const isDark = useSignal(miniApp.isDark);
    const lp = useLaunchParams();

    return (
        <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            <HashRouter>
                <Routes>
                    {routes.map((route) => <Route key={route.path} {...route} />)}
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </HashRouter>
        </AppRoot>
    )
}

export default App
