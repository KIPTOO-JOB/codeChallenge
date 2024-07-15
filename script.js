document.addEventListener("DOMContentLoaded", () => {
	const apiUrl = "https://db-json-pi.vercel.app/films";

	fetch(apiUrl)
		.then((res) => {
			console.log("Response received:", res);
			return res.json();
		})
		.then((movies) => {
			console.log("Movies data:", movies);
			const title = document.querySelector(".lists");
			if (title) {
				movies.forEach((movie) => {
					console.log("Movie:", movie);
					const list = document.createElement("li");
					list.textContent = movie.title;
					list.addEventListener("click", () => MovieDesc(movie.id));
					title.appendChild(list);
				});
			} else {
				console.error("No element with the class 'lists' found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching movies:", error);
		});

	function MovieDesc(movieId) {
		const movieUrl = `${apiUrl}/${movieId}`;
		console.log("Fetching movie details for ID:", movieId); // Debug statement
		fetch(movieUrl)
			.then((res) => {
				console.log("Movie detail response received:", res); // Debug statement
				return res.json();
			})
			.then((movie) => {
				console.log("Movie detail data:", movie); // Debug statement
				const description = document.querySelector(".description");
				if (description) {
					// Clear previous content
					description.innerHTML = `
            <h1>${movie.title}</h1>
			<div>
            <p>${movie.description}</p>

			</div>
			<h1> Movie Starts at : ${movie.showtime}</h1>
			<h2>Tickets Sold: ${movie.tickets_sold}</h2>
            <img src="${movie.poster}" alt="${movie.title}">

          `;
				} else {
					console.error("No element with the class 'description' found.");
				}
			})
			.catch((error) => {
				console.error("Error fetching movie description:", error);
			});
	}
});
