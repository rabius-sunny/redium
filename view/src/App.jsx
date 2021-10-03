import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './components/others/Layout'

import Home from './pages'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import CreatePost from './pages/CreatePost'
import Notfound from './pages/Notfound'
import MyProfile from './pages/MyProfile'
import PrivateRoute from './components/auth/PrivateRoute'

export default function App() {

  return <>
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/posts/:page" exact component={Home} />

          <Route path="/sign-in" component={SignIn} />

          <Route path="/sign-up" component={SignUp} />

          <PrivateRoute path="/profile/me/:post?" component={MyProfile} />

          <PrivateRoute path="/create" component={CreatePost} />

          <Route path="*" component={Notfound} />

        </Switch>
      </Layout>
    </Router>
  </>
}
