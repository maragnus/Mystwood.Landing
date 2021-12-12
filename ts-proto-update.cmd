@ECHO OFF
cd %~dp0\Mystwood.Landing\ClientApp
copy ..\..\Mystwood.Landing.GrpcLarp\Protos\larp.proto .
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_opt=esModuleInterop=true --ts_proto_opt=env=browser --ts_proto_opt=useOptionals=true --ts_proto_opt=outputClientImpl=grpc-web --ts_proto_out=. larp.proto
copy larp.ts src\Protos\Larp.ts
del larp.ts
