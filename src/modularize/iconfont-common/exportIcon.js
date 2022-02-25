const requireAll = requireContext => requireContext.keys().map(requireContext)
const requireComponent = require.context('.', true, /.json$/)
const jsonList = requireAll(requireComponent)
export const exportIconList = jsonList
