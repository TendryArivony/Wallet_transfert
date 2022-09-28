const baseURI = (url) => {
  var host = "https://prod-k8s.treetracker.org/wallet" + url;
  return host;
}

export default baseURI;

