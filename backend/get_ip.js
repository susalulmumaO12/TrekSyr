const os = require('os');

const interfaces = os.networkInterfaces();
let wirelessIp = null;

wirelessIp = (() => {
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && iface.internal === false && name.includes('Wi-Fi')) {
          return iface.address;
          break;
        }
      }
    }
})();

module.exports = wirelessIp;
