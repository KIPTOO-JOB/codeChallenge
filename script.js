document.addEventListener("DOMContentLoaded", () => {
	const apiUrl = "https://db-json-pi.vercel.app/films";

	fetch(apiUrl)
		.then((res) => res.json())
		.then((movies) => {
			const title = document.querySelector(".lists");
			movies.map((movie) => {
				const list = document.createElement("li");
				list.textContent = movie.title;
				list.addEventListener("click", () => MovieDesc(movie.id));
				title.appendChild(list);
				const description = document.querySelector(".description");

				const movieList = document.createElement("h3");
				movieList.textContent = movie.title;
				description.appendChild(movieList);

				const moviedescription = document.createElement("p");
				moviedescription.textContent = movie.description;
				description.appendChild(moviedescription);

				const movieShowtime = document.createElement("h2");
				movieShowtime.textContent = `ShowTime :${movie.showtime}`;
				description.appendChild(movieShowtime);

				const movieRuntime = document.createElement("h2");
				movieRuntime.textContent = `Runtime: ${movie.runtime} `;
				description.appendChild(movieRuntime);

				const movieNoOfTickets = document.createElement("h3");
				movieNoOfTickets.textContent = `Number Of Movie Tickets Sold: ${movie.tickets_sold}`;
				description.appendChild(movieNoOfTickets);

				const movieCapacity = document.createElement("h3");
				movieCapacity.textContent = `Capacity:${movie.capacity}`;
				description.appendChild(movieCapacity);

				const moviePoster = document.createElement("img");
				moviePoster.src = movie.poster;
				description.appendChild(moviePoster);
			});
		});
	runtime;
	function MovieDesc(movieId) {
		const movieUrl = `${apiUrl}/${movieId}`;
		fetch(movieUrl)
			.then((res) => res.json())
			.then((movie) => {
				const description = document.querySelector(".description");

				description.innerHTML = `
					<h1>${movie.title}</h1>
					<div>
						<p>${movie.description}</p>
					</div>
					<h1>Movie Starts at: ${movie.showtime}</h1>
					<h2 id="tickets-sold">Tickets Sold: ${movie.tickets_sold}</h2>
					<img src="${movie.poster}" alt="${movie.title}">
					<button id="buy-ticket">Buy Ticket</button>
				`;

				// Add event listener to the button
				const button = document.querySelector("#buy-ticket");
				button.addEventListener("click", () => {
					if (movie.tickets_sold > 0) {
						movie.tickets_sold--;
						const ticketsSold = document.querySelector("#tickets-sold");
						ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;
					} else {
						alert("No more tickets available!");
					}
				});
			});
	}
});
