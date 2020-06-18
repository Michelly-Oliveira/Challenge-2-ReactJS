import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
	// Store data from the api
	const [repositories, setRepositories] = useState([]);

	// Load repositories from the API when the component mounts
	useEffect(() => {
		api.get('/repositories').then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		// response receives the response of the api = newly created repository
		// passing the route and the object to be created to the api
		const response = await api.post('/repositories', {
			title: `New repository ${Date.now()}`,
			url: 'https://github.com/Michelly-Oliveira',
			techs: ['NodeJS'],
		});

		// store the new repository
		const repository = response.data;

		// Add new repository to app state
		setRepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		// Wait the api delete the repository
		await api.delete(`/repositories/${id}`);

		// Create a new array without the one that was deleted from the api
		const filteredrepositories = repositories.filter(
			(repository) => repository.id !== id
		);

		// Update the state
		setRepositories(filteredrepositories);
	}

	return (
		<div>
			<ul data-testid='repository-list'>
				{repositories.map((repository) => (
					<li key={repository.id}>
						{repository.title}

						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
