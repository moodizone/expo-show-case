import * as React from "react";
import { Redirect } from "expo-router";

import { ROUTES } from "@/routes";

function Home() {
  return <Redirect href={ROUTES.login} />;
}

export default Home;
