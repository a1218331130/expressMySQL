function importAll(modulesContext) {
  return modulesContext.keys().map(modulesPath => {
    return {
      camelModuleName: modulesPath.replace('./', '').replace(/\.js$/, ''),
      module: modulesContext(modulesPath).default
    }
  })
}
export const configsMethod = function(context = '') {
  const routeModules = importAll(context)
  const configs = {}
  routeModules.forEach(({ camelModuleName, module }) => {
    configs[camelModuleName] = module
  })
  return configs
}
