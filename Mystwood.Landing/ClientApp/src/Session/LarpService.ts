/* eslint-disable no-restricted-globals */
import {
    GrpcWebImpl,
    LarpAuthenticationClientImpl,
    LarpAccountClientImpl,
    LarpManageClientImpl
} from "../Protos/Larp";
import {grpc} from "@improbable-eng/grpc-web";

const host = location.hostname === 'localhost'
    ? 'https://localhost:44330'
    : 'https://mystwoodlanding.azurewebsites.net';

const rpc = new GrpcWebImpl(host, {
    debug: true,
    transport: grpc.CrossBrowserHttpTransport({withCredentials: false})
});

export const larpAuthClient = new LarpAuthenticationClientImpl(rpc);
export const larpAccountClient = new LarpAccountClientImpl(rpc);
export const larpManageClient = new LarpManageClientImpl(rpc);

