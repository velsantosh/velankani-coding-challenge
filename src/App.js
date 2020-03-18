import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
// const RecruitDefaultLayout = React.lazy(() => import('./containers/RecruitDefaultLayout'));
const RecruitDefaultLayout = React.lazy(() => import('./_navRecruit'));
// const AdminDefaultLayout = React.lazy(() => import('./containers/AdminDefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const ForgotPassword = React.lazy(() => import('./views/Pages/ForgotPassword'));

class App extends Component {

  render() {
    const permission = ["CREATE_USER","MODIFY_USER"]
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route  path="/" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/ForgotPassword" name="Forgot Password" render={props => <ForgotPassword {...props}/>} />
              {/* <Route path="/" name="Home" render={props => <AdminDefaultLayout {...props}/>} />  */}
              <Route  exact path="/recruit" name="Page" render={props => <RecruitDefaultLayout permission={permission} {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
