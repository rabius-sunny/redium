import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import CreatePost from './pages/CreatePost'
import Notfound from './pages/Notfound'

export default function App() {
  return <>
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/create">
            <CreatePost />
          </Route>
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </>
}
