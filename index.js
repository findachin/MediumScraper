const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {


  const { getLink } = require('./getLinks')
  console.log(`Worker ${process.pid} started`);
  const links = new getLink();
  links.getlinks('https://medium.com')
}