import React, { useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Layout from "../Component/Layout";
import { AuthContext } from "../Context";
import Authority from "./Authority";
import Login from "./Login";
import Notice from "./Notice";
import ResetPassword from "./ResetPassword";
import SearchId from "./SearchId";
import Server from "./Server";
import SignUp from "./SignUp";
import SignUpResult from "./SignUpResult";
import WorkplaceLink from "./WorkplaceLink";
import WorkplaceList from "./WorkplaceList";
import WorkplaceRegist from "./WorkplaceRegist";

import Layout1 from "../Component/Layout1";

function Page() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  if (!auth?.state) {
    return (
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/signupresult" component={SignUpResult} />
        <Route path="/searchid" component={SearchId} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout1 history={history}>
      <Switch>
        <Route path="/" component={WorkplaceList} exact />
        <Route path="/notice" component={Notice} />
        <Route path="/workplacelist" component={WorkplaceList} />
        <Route path="/workplacelink" component={WorkplaceLink} />
        <Route path="/workplaceregist" component={WorkplaceRegist} />
        <Route path="/authority" component={Authority} />
        <Route path="/server" component={Server} />
      </Switch>
    </Layout1>
  );
}

export default Page;
