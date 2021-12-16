import { Suspense } from 'react';
import { Layout } from 'antd';
import {Route, Switch} from 'react-router-dom';
import routes from './routes';
import AppSider from 'features/Layouts/AppSider';
import AppHeader from 'features/Layouts/AppHeader';

const { Content } = Layout;

function ProtectedRoutes() {

  return (
    <Layout>
      <Layout>
        <AppSider/>
        <Layout>
          <AppHeader />
          <Content>
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                {routes.map(({component: Component, path, exact}, index) => (
                  <Route path={`/${path}`} key={index} exact={exact}>
                    <Component/>
                  </Route>
                ))}
              </Suspense>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default ProtectedRoutes;
