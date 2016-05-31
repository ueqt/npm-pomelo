declare module pomelo {    
    
    /**
     * Application
     */
    export class Application {
        /**
         * Get application base path
         *
         *  // cwd: /home/game/
         *  pomelo start
         *  // app.getBase() -> /home/game
         *
         * @return {String} application base path
         *
         */
        getBase(): string;
        
        /**
         * add a filter to before and after filter
         *
         * @param {Object} filter provide before and after filter method.
         *                        A filter should have two methods: before and after.         
         */
        filter(filter: Object): void;
        
        /**
         * Add before filter.
         *
         * @param {Object|Function} bf before fileter, bf(msg, session, next)
         */
        before(bf: Object | ((msg, session, next) => any)): void;
        
        /**
         * Add after filter.
         *
         * @param {Object|Function} af after filter, `af(err, msg, session, resp, next)`         
         */
        after(af: Object | ((err, msg, session, resp, next) => any)): void;
        
        /**
         * add a global filter to before and after global filter
         *
         * @param {Object} filter provide before and after filter method.
         *                        A filter should have two methods: before and after.         
         */
        globalFilter(filter: Object): void;
        
        /**
         * Add global before filter.
         *
         * @param {Object|Function} bf before fileter, bf(msg, session, next)         
         */
        globalBefore(bf: Object | ((msg, session, next) => any)): void;
        
        /**
         * Add global after filter.
         *
         * @param {Object|Function} af after filter, `af(err, msg, session, resp, next)`         
         */
        globalAfter(af: Object | ((err, msg, session, resp, next) => any)): void;
        
        /**
         * Add rpc before filter.
         *
         * @param {Object|Function} bf before fileter, bf(serverId, msg, opts, next)         
         */
        rpcBefore(bf: Object | ((serverId, msg, opts, next) => any)): void;
        
        /**
         * Add rpc after filter.
         *
         * @param {Object|Function} af after filter, `af(serverId, msg, opts, next)`         
         */
        rpcAfter(af: Object | ((serverId, msg, opts, next) => any)): void;
        
        /**
         * add a rpc filter to before and after rpc filter
         *
         * @param {Object} filter provide before and after filter method.
         *                        A filter should have two methods: before and after.         
         */
        rpcFilter(filter: Object): void;
        
        /**
         * Load component
         *
         * @param  {String} name    (optional) name of the component
         * @param  {Object} component component instance or factory function of the component
         * @param  {[type]} opts    (optional) construct parameters for the factory function
         * @return {Object}     app instance for chain invoke         
         */
        load(name: string, component: Object, opts?: any): Object;
        
        /**
         * Load component
         *         
         * @param  {Object} component component instance or factory function of the component
         * @param  {[type]} opts    (optional) construct parameters for the factory function
         * @return {Object}     app instance for chain invoke         
         */        
        load(component: Object, opts?: any): Object;
        
        /**
         * Load Configure json file to settings.
         *
         * @param {String} key environment key
         * @param {String} val environment value
         * @return {Server|Mixed} for chaining, or the setting value
         */
        loadConfig(key: string, val: string): any;
        
        /**
         * Set the route function for the specified server type.
         *
         * Examples:
         *
         *  app.route('area', routeFunc);
         *
         *  var routeFunc = function(session, msg, app, cb) {
         *    // all request to area would be route to the first area server
         *    var areas = app.getServersByType('area');
         *    cb(null, areas[0].id);
         *  };
         *
         * @param  {String} serverType server type string
         * @param  {Function} routeFunc  route function. routeFunc(session, msg, app, cb)
         * @return {Object}     current application instance for chain invoking         
         */
        route(kserverTypeey: string, routeFunc: (session, msg, app, cb) => any): Object;     
        
        /**
         * Set before stop function. It would perform before servers stop.
         *
         * @param  {Function} fun before close function
         * @return {Void}         
         */
        beforeStopHook(fun: Function): void;
        
        /**
         * Start application. It would load the default components and start all the loaded components.
         *
         * @param  {Function} cb callback function
         */
        start(cb?: Function): void;
        
        /**
         * Assign `setting` to `val`, or return `setting`'s value.
         *
         * Example:
         *
         *  app.set('key1', 'value1');
         *  app.get('key1');  // 'value1'
         *  app.key1;         // undefined
         *
         *  app.set('key2', 'value2', true);
         *  app.get('key2');  // 'value2'
         *  app.key2;         // 'value2'
         *
         * @param {String} setting the setting of application
         * @param {String} val the setting's value
         * @param {Boolean} attach whether attach the settings to application
         * @return {Server|Mixed} for chaining, or the setting value         
         */
        set(setting: string, val: string | any, attach?: Boolean): any;
        
        /**
         * Get property from setting
         *
         * @param {String} setting application setting
         * @return {String} val         
         */
        get(setting: string): string | any;
        
        /**
         * Check if `setting` is enabled.
         *
         * @param {String} setting application setting
         * @return {Boolean}         
         */
        enabled(setting: string): Boolean;
        
        /**
         * Check if `setting` is disabled.
         *
         * @param {String} setting application setting
         * @return {Boolean}
         */
        disabled(setting: string): Boolean;
        
        /**
         * Enable `setting`.
         *
         * @param {String} setting application setting
         * @return {app} for chaining         
         */
        enable(setting: string): Application;
        
        /**
         * Disable `setting`.
         *
         * @param {String} setting application setting
         * @return {app} for chaining
         */
        disable(setting: string): Application;
        
        /**
         * Configure callback for the specified env and server type.
         * When no env is specified that callback will
         * be invoked for all environments and when no type is specified
         * that callback will be invoked for all server types.
         *
         * Examples:
         *
         *  app.configure(function(){
         *    // executed for all envs and server types
         *  });
         *
         *  app.configure('development', function(){
         *    // executed development env
         *  });
         *
         *  app.configure('development', 'connector', function(){
         *    // executed for development env and connector server type
         *  });
         *
         * @param {String} env application environment
         * @param {Function} fn callback function
         * @param {String} type server type
         * @return {Application} for chaining         
         */
        configure(env: string, type: string, fn: () => any): Application;
        /**
         * Configure callback for the specified env and server type.
         * When no env is specified that callback will
         * be invoked for all environments and when no type is specified
         * that callback will be invoked for all server types.
         *
         * Examples:
         *
         *  app.configure(function(){
         *    // executed for all envs and server types
         *  });
         *
         *  app.configure('development', function(){
         *    // executed development env
         *  });
         *
         *  app.configure('development', 'connector', function(){
         *    // executed for development env and connector server type
         *  });
         *
         * @param {String} env application environment
         * @param {Function} fn callback function
         * @param {String} type server type
         * @return {Application} for chaining         
         */
        configure(env: string, fn: () => any): Application;       
        /**
         * Configure callback for the specified env and server type.
         * When no env is specified that callback will
         * be invoked for all environments and when no type is specified
         * that callback will be invoked for all server types.
         *
         * Examples:
         *
         *  app.configure(function(){
         *    // executed for all envs and server types
         *  });
         *
         *  app.configure('development', function(){
         *    // executed development env
         *  });
         *
         *  app.configure('development', 'connector', function(){
         *    // executed for development env and connector server type
         *  });
         *
         * @param {String} env application environment
         * @param {Function} fn callback function
         * @param {String} type server type
         * @return {Application} for chaining         
         */
        configure(fn: () => any): Application;                
        
        /**
         * Register admin modules. Admin modules is the extends point of the monitor system.
         *
         * @param {String} moduleId (optional) module id or provoided by module.moduleId
         * @param {Object} module module object or factory function for module
         * @param {Object} opts construct parameter for module         
         */
        registerAdmin(moduleId: string, module: Object, opts: Object): void;
        
        /**
         * Use plugin.
         *
         * @param  {Object} plugin plugin instance
         * @param  {[type]} opts    (optional) construct parameters for the factory function         
         */
        use(plugin: Object, opts?: any): void;
        
        /**
         * Application transaction. Transcation includes conditions and handlers, if conditions are satisfied, handlers would be executed.
         * And you can set retry times to execute handlers. The transaction log is in file logs/transaction.log.
         *
         * @param {String} name transaction name
         * @param {Object} conditions functions which are called before transaction
         * @param {Object} handlers functions which are called during transaction
         * @param {Number} retry retry times to execute handlers if conditions are successfully executed
         */
        transaction(name: string, conditions: Object, handlers: Object, retry: Number): void;
        
        /**
         * Get master server info.
         *
         * @return {Object} master server info, {id, host, port} 
         */
        getMaster(): MasterInfo;
        
        /**
         * Get current server info.
         *
         * @return {Object} current server info, {id, serverType, host, port}         
         */
        getCurServer(): ServerInfo;
        
        /**
         * Get current server id.
         *
         * @return {String|Number} current server id from servers.json         
         */
        getServerId(): string | Number;
        
        /**
         * Get current server type.
         *
         * @return {String|Number} current server type from servers.json         
         */
        getServerType(): string | Number;
        
        /**
         * Get all the current server infos.
         *
         * @return {Object} server info map, key: server id, value: server info         
         */
        getServers(): Object;
        
        /**
         * Get all server infos from servers.json.
         *
         * @return {Object} server info map, key: server id, value: server info         
         */
        getServersFromConfig(): Object;
        
        /**
         * Get all the server type.
         *
         * @return {Array} server type list         
         */
        getServerTypes(): (string | Number)[];
        
        /**
         * Get server info by server id from current server cluster.
         *
         * @param  {String} serverId server id
         * @return {Object} server info or undefined
         */
        getServerById(serverId: string): ServerInfo;
        
        /**
         * Get server info by server id from servers.json.
         *
         * @param  {String} serverId server id
         * @return {Object} server info or undefined         
         */
        getServerFromConfig(serverId: string): ServerInfo;
        
        /**
         * Get server infos by server type.
         *
         * @param  {String} serverType server type
         * @return {Array}      server info list
         */
        getServersByType(serverType: string): ServerInfo[];
        
        /**
         * Check the server whether is a frontend server
         *
         * @param  {server}  server server info. it would check current server
         *            if server not specified
         * @return {Boolean}
         */
        isFrontend(server: ServerInfo): Boolean;
        
        /**
         * Check the server whether is a backend server
         *
         * @param  {server}  server server info. it would check current server
         *            if server not specified
         * @return {Boolean}
         */
        isBackend(server: ServerInfo): Boolean;
        
        /**
         * Check whether current server is a master server
         *
         * @return {Boolean}
         */
        isMaster(): Boolean;
        
        /**
         * Add new server info to current application in runtime.
         *
         * @param {Array} servers new server info list         
         */
        addServers(servers: ServerInfo[]): void;
        
        /**
         * Remove server info from current application at runtime.
         *
         * @param  {Array} ids server id list         
         */
        removeServers(servers: (string | Number)[]): void;
        
        /**
         * Replace server info from current application at runtime.
         *
         * @param  {Object} servers id map
         */
        replaceServers(servers: Object): void;
        
        /**
         * Add crons from current application at runtime.
         *
         * @param  {Array} crons new crons would be added in application         
         */
        addCrons(crons: any): void;
        
        /**
         * Remove crons from current application at runtime.
         *
         * @param  {Array} crons old crons would be removed in application
         */
        removeCrons(crons: any): void;  
        
        rpc: any;        
        backendSessionService: BackendSessionService;
        sessionService: SessionService;     
    }   
    
    /**
     * BackendSessionService
     * Service that maintains backend sessions and the communiation with frontend servers.
     * BackendSessionService would be created in each server process and maintains backend sessions for current process and communicates with the relative frontend servers.
     * BackendSessionService instance could be accessed by app.get('backendSessionService') or app.backendSessionService.
     */
    export class BackendSessionService {
        /**
         * Get backend session by frontend server id and session id.
         *
         * @param  {String}   frontendId frontend server id that session attached
         * @param  {String}   sid        session id
         * @param  {Function} cb         callback function. args: cb(err, BackendSession)         
         */
        get(frontendId: string, sid: string, cb: Function): void;
        
        /**
         * Get backend sessions by frontend server id and user id.
         *
         * @param  {String}   frontendId frontend server id that session attached
         * @param  {String}   uid        user id binded with the session
         * @param  {Function} cb         callback function. args: cb(err, BackendSessions)
         */
        getByUid(frontendId: string, uid: string, cb: Function): void;
        
        /**
         * Kick a session by session id.
         *
         * @param  {String}   frontendId cooperating frontend server id
         * @param  {Number}   sid        session id
         * @param  {Function} cb         callback function
         */
        kickBySid(frontendId: string, sid: string, cb: Function): void;
        
        /**
         * Kick sessions by user id.
         *
         * @param  {String}          frontendId cooperating frontend server id
         * @param  {Number|String}   uid        user id
         * @param  {String}          reason     kick reason
         * @param  {Function}        cb         callback function
         */
        kickByUid(frontendId: string, uid: Number | string, reason: string, cb: Function): void;                
    }
    
    /**
     * BackendSession
     * BackendSession is the proxy for the frontend internal session passed to handlers and it helps to keep the key/value pairs for the server locally. 
     * Internal session locates in frontend server and should not be accessed directly.
     * The mainly operation on backend session should be read and any changes happen in backend session is local and would be discarded in next request. 
     * You have to push the changes to the frontend manually if necessary. 
     * Any push would overwrite the last push of the same key silently and the changes would be saw in next request. 
     * And you have to make sure the transaction outside if you would push the session concurrently in different processes.
     */
    export class BackendSession {
        
        /**
         * Bind current session with the user id. It would push the uid to frontend
         * server and bind  uid to the frontend internal session.
         *
         * @param  {Number|String}   uid user id
         * @param  {Function} cb  callback function
         */
        bind(uid: Number | string, cb: Function): void;
        
        /**
         * Unbind current session with the user id. It would push the uid to frontend
         * server and unbind uid from the frontend internal session.
         *
         * @param  {Number|String}   uid user id
         * @param  {Function} cb  callback function
         */
        unbind(uid: Number | string, cb: Function): void;
        
        /**
         * Set the key/value into backend session.
         *
         * @param {String} key   key
         * @param {Object} value value
         */
        set(key: string, value: Object): void;
        
        /**
         * Get the value from backend session by key.
         *
         * @param  {String} key key
         * @return {Object}     value
         */
        get(key: string): Object;
        
        /**
         * Push the key/value in backend session to the front internal session.
         *
         * @param  {String}   key key
         * @param  {Function} cb  callback function
         */
        push(key: string, cb: Function): void;
        
        /**
         * Push all the key/values in backend session to the frontend internal session.
         *
         * @param  {Function} cb callback function
         */
        pushAll(cb: Function): void;
    }
    
    /**
     * ChannelService
     * Create and maintain channels for server local.
     * ChannelService is created by channel component which is a default loaded component of pomelo and channel service would be accessed by app.get('channelService').
     */
    export class ChannelService {     
        
        /**
         * Create channel with name.
         *
         * @param {String} name channel's name
         * @return {Channel}
         */   
        createChannel(name: string): Channel;
        
        /**
         * Get channel by name.
         *
         * @param {String} name channel's name
         * @param {Boolean} create if true, create channel
         * @return {Channel}
         */
        getChannel(name: string, create: Boolean): Channel;
        
        /**
         * Destroy channel by name.
         *
         * @param {String} name channel name
         */
        destroyChannel(name: string): void;
        
        /**
         * Push message by uids.
         * Group the uids by group. ignore any uid if sid not specified.
         *
         * @param {String} route message route
         * @param {Object} msg message that would be sent to client
         * @param {Array} uids the receiver info list, [{uid: userId, sid: frontendServerId}]
         * @param {Object} opts user-defined push options, optional 
         * @param {Function} cb cb(err)
         */
        pushMessageByUids(route: string, msg: Object, uids: any, opts: Object, cb: (err) => void): void;
        
        /**
         * Broadcast message to all the connected clients.
         *
         * @param  {String}   stype      frontend server type string
         * @param  {String}   route      route string
         * @param  {Object}   msg        message
         * @param  {Object}   opts       user-defined broadcast options, optional
         *                               opts.binded: push to binded sessions or all the sessions
         *                               opts.filterParam: parameters for broadcast filter.
         * @param  {Function} cb         callback
         */
        broadcast(stype: string, route: string, msg: Object, opts: Object, cb: Function): void;
    }
    
    /**
     * Channel
     * Channel maintains the receiver collection for a subject. You can add users into a channel and then broadcast message to them by channel.
     */
    export class Channel {
        /**
         * Add user to channel.
         *
         * @param {Number} uid user id
         * @param {String} sid frontend server id which user has connected to
         * @return {Boolean} true if success or false if fail
         */
        add(uid: Number, sid: string): Boolean;
        
        /**
         * Remove user from channel.
         *
         * @param {Number} uid user id
         * @param {String} sid frontend server id which user has connected to.
         * @return [Boolean] true if success or false if fail
         */
        leave(uid: Number, sid: string): Boolean;
        
        /**
         * Get channel members.
         *
         * <b>Notice:</b> Heavy operation.
         *
         * @return {Array} channel member uid list
         */
        getMembers(): any;
        
        /**
         * Get Member info.
         *
         * @param  {String} uid user id
         * @return {Object} member info
         */
        getMember(uid: string): Object;
        
        /**
         * Destroy channel.
         */
        destroy(): void;
        
        /**
         * Push message to all the members in the channel
         *
         * @param {String} route message route
         * @param {Object} msg message that would be sent to client
         * @param {Object} opts user-defined push options, optional
         * @param {Function} cb callback function
         */
        pushMessage(route: string, msg: Object, opts: Object, cb: Function): void;
    }
    
    /**
     * SessionService
     * Session service maintains the internal session for each client connection.
     * Session service is created by session component and is only available in frontend servers. 
     * You can access the service by app.get('sessionService') or app.sessionService in frontend servers.
     */
    export class SessionService {
        
        /**
         * Get sessions by userId.
         *
         * @param {string | Number} uid User id associated with the session
         * @return {Array} list of session binded with the uid
         */
        getByUid(uid: string | Number): (Session | FrontendSession)[];
        
        /**
         * Kick all the session offline under the user id.
         *
         * @param {string | Number}   uid user id asscociated with the session
         * @param {Function} cb  callback function         
         */
        kick(uid: string | Number, cb: Function): void;
        
        /**
         * Kick a user offline by session id.
         *
         * @param {string | Number}   sid session id
         * @param {Function} cb  callback function         
         */
        kickBySessionId(sid: string | Number, cb: Function): void;
    }
    
    /**
     * Session maintains the relationship between client connection and user information.
     * There is a session associated with each client connection. And it should bind to a
     * user id after the client passes the identification.
     *
     * Session is created in frontend server and should not be accessed in handler.
     * There is a proxy class called BackendSession in backend servers and FrontendSession 
     * in frontend servers.
     */
    export class Session {
        
        /**
         * Bind the session with the the uid.
         *
         * @param {string | Number} uid User id         
         */
        bind(uid: string | Number): void;
        
        /**
         * Unbind the session with the the uid.
         *
         * @param {string | Number} uid User id         
         */
        unbind(uid: string | Number): void;
        
        /**
         * Set values (one or many) for the session.
         *
         * @param {String|Object} key session key
         * @param {Object} value session value
         */
        set(key: string | Object, value: Object);
        
        /**
         * Remove value from the session.
         *
         * @param {String} key session key         
         */
        remove(key: string): void;
        
        /**
         * Get value from the session.
         *
         * @param {String} key session key
         * @return {Object} value associated with session key
         */
        get(key: string): Object;
        
        /**
         * Send message to the session.
         *
         * @param  {Object} msg final message sent to client
         */
        send(msg: any): void;
        
        /**
         * Send message to the session in batch.
         *
         * @param  {Array} msgs list of message
         */
        sendBatch(msgs: any[]): void;
        
    }
    
    /**
     * Frontend session for frontend server.
     */
    export class FrontendSession {
        
        uid: string | Number;
        
        /**
         * Bind the session with the the uid.
         *
         * @param {string | Number} uid User id   
         * @param {Function} cb callback      
         */
        bind(uid: string | Number, cb?: Function): void;
        
        /**
         * Unbind the session with the the uid.
         *
         * @param {string | Number} uid User id      
         * @param {Function} cb callback         
         */
        unbind(uid: string | Number, cb?: Function): void;
        
        /**
         * Set values (one or many) for the session.
         *
         * @param {String|Object} key session key
         * @param {Object} value session value
         */
        set(key: string | Object, value: Object);
        
        /**
         * Get value from the session.
         *
         * @param {String} key session key
         * @return {Object} value associated with session key
         */
        get(key: string): Object;
        
        /**
         * push
         * 
         * @param {string} key session key
         * @param {Function} cb callback
         */
        push(key: string, cb: (err: Error) => void): void;
        
        /**
         * listener
         * 
         * @param {string} event event name
         * @param {Function} listener listener event function
         */
        on(event: string, listener: Function): void;
    }
    
    /**
     * master server info
     */
    export class MasterInfo {
        id: string | Number;
        host: any;
        port: any;
    }
    
    /**
     * ServerInfo
     */
    export class ServerInfo {
        id: string | Number;
        serverType: string | Number;
        host: string;
        port: Number;
        clientPort: Number;
    }
    
    /**
     * Connector
     */
    export class Connector {
        sioconnector: any;
        hybridconnector: any;
        udpconnector: any;
        mqttconnector: any;
    }    
    
    /**
     * PushScheduler
     */
    export class PushScheduler {
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
    
    /**
     * Create an pomelo application.
     * 
     * @return {Application} application
     */
    function createApp(): Application;
    
    function timeout(): any;
}

export = pomelo;