import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

//Below is the code for the Supabase client and session context provider, which are commented out for now. 
// npm install @supabase/supabase-js @supabase/auth-helpers-react needs to be run in the terminal to install the required packages.
// however doing so will cause the app to break, so it is commented out for now.

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


const supabase = createClient(
  "https://utshmtxzfuqsdozixrtj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0c2htdHh6ZnVxc2Rveml4cnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDU5MzMsImV4cCI6MjA2MTIyMTkzM30.OxivDnAjbyrhKzzhqA6_l8yrmoq8M_N37ySk-KIKhas"
);

//sessionContextProvider needs to be implemented in the example code below, but is commented out for now.
//
//const rootElement = document.getElementById("root");
//ReactDOM.render( 
//  <SessionContextProvider supabaseClient={supabase}>
//    <React.StrictMode>
//      <App />
//    </React.StrictMode>
//  </SessionContextProvider>,
//  rootElement
//);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
  rootElement
);
