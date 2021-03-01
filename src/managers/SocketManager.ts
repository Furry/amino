import EventEmitter from "events"
import WebSocket from "ws"
import { API } from "../api/API"
import Constants from "../api/Constants"
import { LibError, LibErrors } from "../errors/LibError"
import { Profile } from "../structs/Profile"
import { Thread } from "../structs/Thread"

interface SocketConfig {
    caching: boolean,
    autoCache: boolean
}

export class SocketManager extends EventEmitter {
    reconnects = 0;
    constructor(protected api: API, config: SocketConfig = { caching: true, autoCache: true }) {
        super()
    }

    protected startSocket() {
        if (!this.api.loggedIn) throw new LibError(LibErrors.NOTLOGGEDIN)
        let wsc = new WebSocket(Constants.Socket.url, {
            headers: this.api.socketHeaders
        })

        setInterval(() => {
            if (this.reconnects > 0) {
                this.reconnects -= 1
            }
        }, 60000)

        setInterval(() => {
            wsc.send("ping")
        }, 5000)

        wsc.on("message", (msg) => {
            this.emit("raw", msg.toString("utf8"))
        })

        wsc.on("close", () => {
            if (this.reconnects > 5) {
                throw new LibError(LibErrors.TOOMANYRECONNECTS)
            }

            wsc = new WebSocket(Constants.Socket.url, {
                headers: this.api.socketHeaders
            })
            this.reconnects += 1
        })

    }
}