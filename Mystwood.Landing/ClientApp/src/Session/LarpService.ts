import {GrpcWebImpl, LarpClientImpl} from "../Protos/Larp";
import {grpc} from "@improbable-eng/grpc-web";

const rpc = new GrpcWebImpl('https://localhost:44330', {
    debug: true,
    transport: grpc.CrossBrowserHttpTransport({ withCredentials: false })
});

export const larpClient = new LarpClientImpl(rpc);

