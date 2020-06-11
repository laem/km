import React from 'react'
import {
	Switch,
	Route,
	BrowserRouter as Router,
	Link,
	useLocation,
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

export const pageLayout = `
			max-width: 800px;
			margin: 0 auto;
`

export default () => {
	return (
		<Router>
			<ScrollToTop>
				<Switch>
					<Route path="/">
						<Accueil />
					</Route>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</ScrollToTop>
		</Router>
	)

	const theOne = parsedArticles.find(({ id }) => id === path.replace('/', ''))
	if (theOne) return <Article data={theOne} />

	return <div>Désolé, cette page n'existe pas</div>
}

const Header = () => (
	<header
		css={`
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			justify-content: center;
			> h1 {
				margin: 0.8rem;
				font-size: 100%;
				font-weight: normal;
				max-width: 20rem;
			}
			> p {
				margin-top: 0;
			}
			img {
				width: 2.6rem;
			}
		`}
	>
		<img src="https://avatars1.githubusercontent.com/u/1177762?s=460&v=4" />
		<h1>
			Quelques idées sur notre environnement, nos villes et les algorithmes
		</h1>
	</header>
)

const Accueil = () => <div>Salut</div>

function NoMatch() {
	let location = useLocation()

	return (
		<div>
			<h3>
				No match for <code>{location.pathname}</code>
			</h3>
		</div>
	)
}
