import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import classes from "./RecruitDefaultLayout.module.css";
import cx from "classnames";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  // AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import NavConfig from '../../NavConfig';
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

//const DefaultAside = React.lazy(() => import('./RecruitDefaultAside'));
const DefaultFooter = React.lazy(() => import('./RecruitDefaultFooter'));
const DefaultHeader = React.lazy(() => import('./RecruitDefaultHeader'));
let userName='';
class RecruitDefaultLayout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      permissionList:[],
      permissionFlag:false,
      // userName: this.props.location.state
    }
// this.getPermission = this.getPermission.bind(this)
  }
  
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    const { history } = this.props;
   if(history) history.push('/Login');
  }

  render() {
     let redirectdom;

     const hfColor ={
      backgroundColor:'#e7e7e7'
    };
    const mainContainerStyle ={
      backgroundColor:'white'
      // backgroundColor:'#e7e7e7'
    };
    const marginBottom ={
      marginBottom :'20px'
    }

    if(this.props.location.pathname === "/" && this.props.location.state === undefined ){
      console.log("Step:1 Login",this.props);
      redirectdom = (
                       <Redirect to='/login'/>
                    );
    }
    else if(this.props.location.pathname === "/" && this.props.location.state !== null){
      console.log("Step:2 Login",this.props);
      userName=this.props.location.state.userName;
      console.log("Step:2 Login",userName);
      redirectdom = (
        // <Redirect to='/' from='/manageUser/UserList'/>
        <Redirect to='/dashboard'/>
      );
      }
      
    console.log("History Data",this.props);
     let permissionNav=navigation.items;
     console.log("List of Navigation Item::",permissionNav);
    //console.log("###########",navigation.items);
    console.log("route Path",this.route);
    // console.log("&*&**",this.state.permissionList);
     return (
       
      <div className="app">
        {/* <AppHeader style={hfColor} fixed> */}
        <AppHeader className={cx(classes.hfStyle)} fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            {/* <AppSidebarNav {...this.props} router={router}/> */}
            {/* <NavConfig navConfig={navigation} permissionList={this.state.permissionList}/> */}
            <NavConfig items= {permissionNav} {...this.props} router={router} userName={userName}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={mainContainerStyle}>
            {/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
            <Container fluid style={marginBottom}>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  {/* <Redhvirect from="/" to="/login" />  */}
                   {redirectdom}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
             
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter style={hfColor}> */}
        <AppFooter className={cx(classes.hfStyle)}>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default withRouter(RecruitDefaultLayout);
