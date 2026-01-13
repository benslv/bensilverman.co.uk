export default async () => {
	const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=benslv&api_key=${Netlify.env.get(
		"LAST_FM_API_KEY"
	)}&format=json`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		const current = result.recenttracks.track[0];

		return new Response(JSON.stringify(current), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		console.error(error.message);
	}
};
