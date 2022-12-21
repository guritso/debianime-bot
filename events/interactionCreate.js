export const InteractionCreate = (client) => {
	client.on("interactionCreate", (inter) => {
		if (!inter.isChatInputCommand) return;
		const command = inter.commandName;
		import `../commands/${command}.js`
	})
}