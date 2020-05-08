<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [sip.js](./sip.js.md) &gt; [Transport](./sip.js.transport.md)

## Transport class

Transport for SIP over secure WebSocket (WSS).

<b>Signature:</b>

```typescript
export declare class Transport extends EventEmitter implements TransportDefinition 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(logger, options)](./sip.js.transport._constructor_.md) |  | Constructs a new instance of the <code>Transport</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [onConnect](./sip.js.transport.onconnect.md) |  | <code>(() =&gt; void) &#124; undefined</code> |  |
|  [onDisconnect](./sip.js.transport.ondisconnect.md) |  | <code>((error?: Error) =&gt; void) &#124; undefined</code> |  |
|  [onMessage](./sip.js.transport.onmessage.md) |  | <code>((message: string) =&gt; void) &#124; undefined</code> |  |
|  [protocol](./sip.js.transport.protocol.md) |  | <code>string</code> | The protocol. |
|  [server](./sip.js.transport.server.md) |  | <code>string</code> | The URL of the WebSocket Server. |
|  [state](./sip.js.transport.state.md) |  | <code>TransportState</code> | Transport state. |
|  [stateChange](./sip.js.transport.statechange.md) |  | <code>Emitter&lt;TransportState&gt;</code> | Transport state change emitter. |
|  [ws](./sip.js.transport.ws.md) |  | <code>WebSocket &#124; undefined</code> | The WebSocket. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [connect()](./sip.js.transport.connect.md) |  | Connect to network. Resolves once connected. Otherwise rejects with an Error. |
|  [disconnect()](./sip.js.transport.disconnect.md) |  | Disconnect from network. Resolves once disconnected. Otherwise rejects with an Error. |
|  [dispose()](./sip.js.transport.dispose.md) |  |  |
|  [isConnected()](./sip.js.transport.isconnected.md) |  | Returns true if the <code>state</code> equals "Connected". |
|  [on(event, listener)](./sip.js.transport.on.md) |  | Add listener for connection events. |
|  [on(event, listener)](./sip.js.transport.on_1.md) |  | Add listener for message event. |
|  [send(message)](./sip.js.transport.send.md) |  | Sends a message. Resolves once message is sent. Otherwise rejects with an Error. |
