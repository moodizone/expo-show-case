import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Redirect, Slot, usePathname } from "expo-router";

import { forbiddenPublics, ROUTES } from "@/routes";

function PrivateLayout() {
  const qc = useQueryClient();
  const pathname = usePathname();
  const isForbidden = forbiddenPublics.some((f) => f === pathname);
  const auth = qc.getQueryData<boolean>(["auth"]);

  // invalid token
  if (!auth) {
    return <Redirect href={ROUTES.login} />;
  }

  // logged-in users can not see some of public routes like login
  if (auth && isForbidden) {
    return <Redirect href={ROUTES.home} />;
  }
  return <Slot />;
}

export default PrivateLayout;
