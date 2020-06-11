import React, { useState } from 'react'
import {
	Switch,
	Route,
	BrowserRouter as Router,
	Link,
	useLocation,
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Emoji from './Emoji'

export const pageLayout = `
			max-width: 800px;
			margin: 0 auto;
			font-size: 110%;
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
				font-weight: normal;
				max-width: 20rem;
			}
			> p {
				margin-top: 0;
			}
		`}
	>
		<h1>Kilomètre</h1>
	</header>
)

const modes = [
	['marche', '🚶'],
	['vélo', '🚲'],
	['voiture', '🚗'],
	['moto', '🏍'],

	['bus', '🚌'],
	['métro', '🚇'],
	['tram', '🚋'],
]

const Accueil = () => {
	const [answers, setAnswers] = useState([])
	return (
		<div css={pageLayout}>
			<Header />
			<h2>Dans la vie, quel est ton trajet principal ?</h2>
			<p>Pour le boulot, l'école, etc.</p>
			<ul
				css={`
					padding: 0;
					list-style-type: none;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					li {
						margin: 0.2rem;
						font-size: 200%;
					}
					input[type='checkbox'] {
						display: none;
					}
				`}
			>
				{modes.map(([mode, icon]) => (
					<li>
						<input
							type="checkbox"
							id={mode}
							name={mode}
							checked={answers.includes(mode)}
						/>
						<label
							onClick={() =>
								setAnswers(
									answers.includes(mode)
										? answers.filter((a) => a !== mode)
										: [...answers, mode]
								)
							}
							css={`
								img {
									background: ${answers.includes(mode) ? 'chartreuse' : 'none'};
									border-radius: 2rem;
									padding: 1.3rem;
								}
								cursor: pointer;
								display: inline-block;
								text-align: center;
							`}
							title={mode}
							for={mode}
						>
							{<Emoji emoji={icon} />}
						</label>
					</li>
				))}
			</ul>
		</div>
	)
}

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
