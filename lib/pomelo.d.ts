declare namespace pomelo {    
    
    /**
     * application
     */
    class App {
        set(key: string, value: any): void;
        configure(env: string, type: string, callback: () => any): void;
        configure(env: string, callback: () => any): void;
        route(key: string, func: (session: any, msg: any, app: any, cb: any) => any): void;
        filter(func: any): void;
        start(): void;
    }   
    
    /**
     * Connector
     */
    class Connector {
        sioconnector: any;
        hybridconnector: any;
        udpconnector: any;
        mqttconnector: any;
    }    
    
    /**
     * PushScheduler
     */
    class PushScheduler {
        direct: any;
        buffer: any;
    }
    
    var version: any;
    var events: any;
    var components: any;
    var filters: any;
    var rpcFilters: any;
    var connectors: Connector;
    var pushSchedulers: PushScheduler;
    
    function createApp(): App;
    function timeout(): any;
}

export = pomelo;