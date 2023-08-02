const net = require('node:net');
const { resolve } = require('node:path');

function findAvailablePort(desiredPort) {

  return new Promise((resolve, reject) => {

    const server = net.createServer();

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => {
        console.log(`Port available: ${port}`);
        resolve(port);
      });

    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(0).then(port => resolve(port)));
      } else {
        reject(err);
      };
    })
  });
};

findAvailablePort(27017).then(port => {
  console.log(`Use port ${port} to initialize server`);
}).catch(err => {
  console.error('Error:', err);
});

module.exports = { findAvailablePort };

