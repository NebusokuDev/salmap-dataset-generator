import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';
import {Contact, Create, Home} from "./pages.tsx";
import {Route, Routes} from "react-router-dom";

export default function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/create" element={<Create/>}/>
        </Routes>
      </MantineProvider>
    </>
  )
    ;
}