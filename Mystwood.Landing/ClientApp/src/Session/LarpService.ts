/* eslint-disable no-restricted-globals */
import {GrpcWebImpl, LarpClientImpl} from "../Protos/Larp";
import {grpc} from "@improbable-eng/grpc-web";

const host = location.hostname === 'localhost'
    ? 'https://localhost:44330'
    : 'https://mystwoodlanding.azurewebsites.net';

const rpc = new GrpcWebImpl(host, {
    debug: true,
    transport: grpc.CrossBrowserHttpTransport({withCredentials: false})
});

export const larpClient = new LarpClientImpl(rpc);

