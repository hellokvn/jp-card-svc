/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'wanikani';

export interface Card {
  id: number;
  wanikaniId: number;
  type: string;
  characters: string;
  meanings: string[];
  readings: string[];
  audio: string;
}

export interface FindRequest {
  level: number;
  type: string;
}

export interface FindResponse {
  status: number;
  error: string;
  data: Card[];
}

export const WANIKANI_PACKAGE_NAME = 'wanikani';

export interface WanikaniServiceClient {
  find(request: FindRequest): Observable<FindResponse>;
}

export interface WanikaniServiceController {
  find(request: FindRequest): Promise<FindResponse> | Observable<FindResponse> | FindResponse;
}

export function WanikaniServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['find'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('WanikaniService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('WanikaniService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WANIKANI_SERVICE_NAME = 'WanikaniService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
