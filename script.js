document.addEventListener("DOMContentLoaded", () => {
	const apiUrl = "https://db-json-pi.vercel.app/films";

	fetch(apiUrl)
		.then((res) => res.json())
		.then((movies) => {
			// console.log("Movies data:", movies);
			const title = document.querySelector(".lists");
			movies.map((movie) => {
				console.log("Movie:", movie);
				const list = document.createElement("li");
				list.textContent = movie.title;
				list.addEventListener("click", () => MovieDesc(movie.id));
				title.appendChild(list);
			});
		});

	function MovieDesc(movieId) {
		const movieUrl = `${apiUrl}/${movieId}`;
		fetch(movieUrl)
			.then((res) => res.json())
			.then((movie) => {
				const description = document.querySelector(".description");

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
			});
	}
});
