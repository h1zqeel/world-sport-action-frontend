module.exports = {
	apps: [
		{
			name: 'WorldSportActionFrontEnd',
			script: 'node_modules/next/dist/bin/next',
			args: 'start',
			env_production: {
				APP_ENV: 'prod'
			}
		}
	]
};