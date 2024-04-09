const PROTO_PATH = "./proto/user.proto";

import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

function main() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH ,{
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
    });
    
    
    const userProto = grpc.loadPackageDefinition(packageDefinition);
    
    const server = new grpc.Server();
    
    let users = [
      {
        name: "Animesh",
        email: "a@X.com",
        age: 22,
      },
    ];
    
    server.addService(userProto.UserService.service, {
        getUsers : (_, callback) => {
            callback(null, { users });
        },
        addUser : (call, callback) => {
            const user = call.request;
            users.push(user)
            callback(null, user);
        }
    });
    
    server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
        //server.start();
        console.log("server port:127.0.0.1:30043");
    });
    
}
main();