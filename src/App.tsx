import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';
import {Home} from "./pages/Home.tsx";

import {Route, Routes} from "react-router-dom";
import {ReactElement} from "react";

type route = {
  path: string;
  element: ReactElement
}

const routing: route[] = [{
  path: "/",
  element: <Home/>
}]

export default function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Routes>
          {
            routing.map((route) => <Route path={route.path} element={route.element}/>)
          }
        </Routes>
      </MantineProvider>
    </>
  );
}