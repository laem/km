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

const save = (answers, setOK) =>
	fetch('https://api.npoint.io/699576497bb3b4b3ed6a')
		.then((req) => req.json())
		.then((json) =>
			fetch('https://api.npoint.io/699576497bb3b4b3ed6a', {
				method: 'POST',
				body: JSON.stringify([...json, answers]),
			})
				.then((req) => req.json())
				.then((json) => setOK(true))
		)

const Header = () => (
	<header
		css={`
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			justify-content: center;
			> h1 {
				margin: 0.6 0 2rem;
				border-bottom: 6px dashed chartreuse;
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
	const [OK, setOK] = useState(false)
	if (OK)
		return (
			<div
				css={`
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100vh;
				`}
			>
				Super, merci
			</div>
		)
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
					<li key={mode}>
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
							htmlFor={mode}
						>
							{<Emoji emoji={icon} />}
						</label>
					</li>
				))}
			</ul>
			<button
				css={`
					opacity: ${answers.length ? '1' : '.3'};
					background: chartreuse;
					padding: 1rem 2rem;
					border: none;
					font-size: 130%;
					margin: 0 auto;
					border-radius: 3rem;
					box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
					display: block;
					cursor: pointer;
				`}
				onClick={() => answers.length && save(answers, setOK)}
			>
				<Emoji emoji="✔" /> Envoyer
			</button>
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
