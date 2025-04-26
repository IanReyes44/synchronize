import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {createClient} from "@supabase/supabase-js";
import {SessionContextProvider} from "@supabase/auth-helpers-react";
const supabase = createClient(
  "https://utshmtxzfuqsdozixrtj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0c2htdHh6ZnVxc2Rveml4cnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDU5MzMsImV4cCI6MjA2MTIyMTkzM30.OxivDnAjbyrhKzzhqA6_l8yrmoq8M_N37ySk-KIKhas"
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
  rootElement
);
