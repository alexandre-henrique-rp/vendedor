const os = require('os');
// função que pegar o ip da maquina local 
const requestIp = async() => {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address.toString();
      }
    }
  }
  return 'IP não encontrado';
}

module.exports = requestIp