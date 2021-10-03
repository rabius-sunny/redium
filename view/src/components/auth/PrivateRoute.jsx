import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ path, exact, component }) {
    const { user } = useSelector(state => state.Auth)

    return user ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/sign-in" />
}
