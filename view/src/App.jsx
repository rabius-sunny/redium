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
import Edit from './components/others/Edit'
import { ScrollToTop } from './components/others/ScrollToTop'

export default function App() {

  return <>
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/posts/:page" exact component={Home} />

          <Route path="/sign-in" component={SignIn} />

          <Route path="/sign-up" component={SignUp} />

          <PrivateRoute path="/profile/me/:post?" component={MyProfile} />

          <PrivateRoute path="/create" component={CreatePost} />

          <PrivateRoute path="/edit/:id" component={Edit} />

          <Route path="*" component={Notfound} />

        </Switch>
      </Layout>
    </Router>
  </>
}
