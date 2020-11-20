import { SimpleUser, SimpleUserDelegate, SimpleUserMedia, SimpleUserMediaConstraints, SimpleUserMediaLocal, SimpleUserMediaRemote, SimpleUserOptions } from "../simple-user";
export declare type ToIPMedia = SimpleUserMedia;
export declare type ToIPMediaConstraints = SimpleUserMediaConstraints;
export declare type ToIPMediaLocal = SimpleUserMediaLocal;
export declare type ToIPUserMediaRemote = SimpleUserMediaRemote;
export declare type ToIPOptions = SimpleUserOptions;
export declare type ToIPDelegate = SimpleUserDelegate;
/**
 * A ToIP user class.
 * @public
 */
export declare class ToIP extends SimpleUser {
    /**
     * Constructs a new instance of the `SimpleUser` class.
     * @param server - SIP WebSocket Server URL.
     * @param options - Options bucket. See {@link ToIPOptions} for details.
     * @param debug - If not set log level to error
     */
    constructor(server: string, options?: ToIPOptions, debug?: boolean);
    /**
     * Send DTMF
     * @remarks
     * Send DTMF via RTP (RFC 4733).
     * @param tone - Tone to send.
     */
    sendDTMF(tone: string): Promise<void>;
}
//# sourceMappingURL=toip.d.ts.map