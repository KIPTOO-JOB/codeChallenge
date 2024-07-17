document.addEventListener("DOMContentLoaded", () => {
	// const desc = document.querySelector("#desc");
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
				list.addEventListener("click", () => {
					MovieDesc(movie.id);
					console.log("hello");
				});
				title.appendChild(list);

				const movieDesc = document.createElement("img");
				movieDesc.src = movie.poster;
				desc.appendChild(movieDesc);

				const movietitle = document.createElement("h2");
				movietitle.textContent = movie.title;
				desc.appendChild(movietitle);
			});
		});

	function MovieDesc(movieId) {
		const movieUrl = `${apiUrl}/${movieId}`;
		fetch(movieUrl)
			.then((res) => res.json())
			.then((movie) => {
				// const description = document.name(".description");

				// Clear previous content
				const description = document.querySelector(".description");
				description.innerHTML = `
            <h1>${movie.title}</h1>
			<div>
            <p>${movie.description}</p>
			</div>
			<h1> Movie Starts at : ${movie.showtime}</h1>
			<h2>Tickets Sold: ${movie.tickets_sold}</h2>
            <img src="${movie.poster}" alt="${movie.title}">

          `;
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
