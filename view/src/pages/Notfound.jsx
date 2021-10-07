import Helmet from 'react-helmet'

export default function Notfound() {
    return (
        <div className="notfound">
            <Helmet>
                <title>Not found</title>
                <meta property="og:title" content="Not found" />
                <meta property="og:description" content="Welcome to Redium, The Social Blogging Application with React, Redux, Nodejs" />
                <meta property="og:url" content="https://redium.herokuapp.com/" />
            </Helmet>
            <h1>404 | Not Found</h1>
        </div>
    )
}
