module.exports = {
    projects: [
		{
			name: "baseModule",
			main: "/baseModule/main.js",
			prefix: "/baseModule/",
			store: "/baseModule/store.js",
			base: true,
			path: "/baseModule"
		},
		{
			name: "subModuleTest1",
			main: "/subModuleTest1/main.js",
			prefix: "/subModuleTest1/",
			store: "/subModuleTest1/store.js",
			path: "/subModuleTest1"
		}
	]
}