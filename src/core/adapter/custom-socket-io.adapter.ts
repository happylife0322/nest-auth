import { Server, ServerOptions } from 'socket.io';
import { getAddress } from '../../shared/utils/get-address';
import { SocketIoAdapter } from './socket-io-adapter';

export class CustomSocketIoAdapter extends SocketIoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    server.use((client, next) => {
      client.handshake.address = getAddress(client);

      next();
    });

    return server;
  }
}
