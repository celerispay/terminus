declare module "@godaddy/terminus" {

  export type HealthCheck = () => Promise<any>;

  export class HealthCheckError extends Error {
    constructor(message: string, causes: any);
    public causes: any;
  }

  export type HealthCheckMap = {
    [key: string]: HealthCheck | boolean;
  } | {
    verbatim: boolean
    [key: string]: HealthCheck | boolean;
  }

  export type BasicAuth = {
    username: string
    password: string
  }

  export interface TerminusOptions {
    healthChecks?: HealthCheckMap;
    authentication?: BasicAuth;
    timeout?: number;
    signal?: string;
    signals?: string[];
    onSignal?: () => Promise<any>;
    onSendFailureDuringShutdown?: () => Promise<any>;
    onShutdown?: () => Promise<any>;
    beforeShutdown?: () => Promise<any>;
    logger?: (msg: string, err: Error) => void;

    /** Deprecated. */
    onSigterm?: () => Promise<any>;
  }

  export type Terminus = <T>(server: T, options?: TerminusOptions) => T;

  export const createTerminus: Terminus;
}
