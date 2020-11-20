//import { Logger } from "../../../core";
import { SessionDescriptionHandler } from "../session-description-handler";
import { SimpleUser } from "../simple-user";
import { Levels } from "../../../core/log/levels";
/**
 * A ToIP user class.
 * @public
 */
export class ToIP extends SimpleUser {
    /**
     * Constructs a new instance of the `SimpleUser` class.
     * @param server - SIP WebSocket Server URL.
     * @param options - Options bucket. See {@link ToIPOptions} for details.
     * @param debug - If not set log level to error
     */
    constructor(server, options = {}, debug = false) {
        super(server, options);
        if (!debug) {
            this.logger.level = Levels.error;
        }
    }
    /**
     * Send DTMF
     * @remarks
     * Send DTMF via RTP (RFC 4733).
     * @param tone - Tone to send.
     */
    sendDTMF(tone) {
        this.logger.log(`[${this.id}] sending ToIP DTMF...`);
        // Validate tone
        if (!/^[0-9A-D#*,]$/.exec(tone)) {
            return Promise.reject(new Error("Invalid DTMF tone."));
        }
        if (!this.session) {
            return Promise.reject(new Error("Session does not exist."));
        }
        const sdh = this.session.sessionDescriptionHandler;
        if (!sdh) {
            return Promise.reject(new Error("Session Handler not exist."));
        }
        if (!(sdh instanceof SessionDescriptionHandler)) {
            return Promise.reject(new Error("Session description handler not instance of web SessionDescriptionHandler"));
        }
        this.logger.log(`[${this.id}] Sending Mosaica DTMF tone: ${tone}`);
        const options = {
            duration: 160,
            interToneGap: 30
        };
        if (!sdh.sendDtmf(tone, options)) {
            return Promise.reject(new Error("Can't send DTMF"));
        }
        return Promise.resolve();
    }
}
