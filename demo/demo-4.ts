/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import { ToIP, ToIPDelegate, ToIPOptions } from "../src/platform/web";
import { getAudio, getButton, getButtons, getInput, getSpan } from "./demo-utils";

const serverSpan = getSpan("server");
const targetSpan = getSpan("target");
const connectButton = getButton("connect");
const callButton = getButton("call");
const hangupButton = getButton("hangup");
const disconnectButton = getButton("disconnect");
const audioElement = getAudio("remoteAudio");
const keypad = getButtons("keypad");
const dtmfSpan = getSpan("dtmf");
const holdCheckbox = getInput("hold");
const muteCheckbox = getInput("mute");

// WebSocket Server URL
const webSocketServer = "wss://at.kertel.com:8089";
serverSpan.innerHTML = webSocketServer;

// Destination URI
const target = "sip:0602580001@at.kertel.com";
targetSpan.innerHTML = target;
// Name for demo user

const displayName = "SIP.js ToIP Demo";

// SIP Authorization Username
// This is the user's authorization username used for authorizing requests.
// SIP is an internet standard the details of which are outside the
// scope of this documentation, but there are many resources available.
// See: https://tools.ietf.org/html/rfc3261 for the specification.
const authorizationUsername = "10061109";

// SIP Authorization Password
// This is the user's authorization password used for authorizing requests.
// SIP is an internet standard the details of which are outside the
// scope of this documentation, but there are many resources available.
// See: https://tools.ietf.org/html/rfc3261 for the specification.
const authorizationPassword = "FBBdY8GNRhsnb466u2SB";

const contactName = "10061109";

const aor = "sip:10061109@at.kertel.com";

// ToIP delegate
const toIPDelegate: ToIPDelegate = {
  onCallCreated: (): void => {
    console.log(`[${displayName}] Call created`);
    callButton.disabled = true;
    hangupButton.disabled = false;
    keypadDisabled(true);
    holdCheckboxDisabled(true);
    muteCheckboxDisabled(true);
  },
  onCallAnswered: (): void => {
    console.log(`[${displayName}] Call answered`);
    keypadDisabled(false);
    holdCheckboxDisabled(false);
    muteCheckboxDisabled(false);
  },
  onCallHangup: (): void => {
    console.log(`[${displayName}] Call hangup`);
    callButton.disabled = false;
    hangupButton.disabled = true;
    keypadDisabled(true);
    holdCheckboxDisabled(true);
    muteCheckboxDisabled(true);
  },
  onCallHold: (held: boolean): void => {
    console.log(`[${displayName}] Call hold ${held}`);
    holdCheckbox.checked = held;
  }
};

// ToIP options
const toIPOptions: ToIPOptions = {
  delegate: toIPDelegate,
  aor,
  media: {
    remote: {
      audio: audioElement
    }
  },
  userAgentOptions: {
    authorizationPassword,
    authorizationUsername,
    contactName,
    displayName
  }
};

// ToIP construction
const toIP = new ToIP(webSocketServer, toIPOptions);

// Add click listener to connect button
connectButton.addEventListener("click", () => {
  connectButton.disabled = true;
  disconnectButton.disabled = true;
  callButton.disabled = true;
  hangupButton.disabled = true;
  toIP
    .connect()
    .then(() => {
      connectButton.disabled = true;
      disconnectButton.disabled = false;
      callButton.disabled = false;
      hangupButton.disabled = true;
    })
    .catch((error: Error) => {
      connectButton.disabled = false;
      console.error(`[${toIP.id}] failed to connect`);
      console.error(error);
      alert("Failed to connect.\n" + error);
    });
});

// Add click listener to call button
callButton.addEventListener("click", () => {
  callButton.disabled = true;
  hangupButton.disabled = true;
  toIP.call(target).catch((error: Error) => {
    console.error(`[${toIP.id}] failed to place call`);
    console.error(error);
    alert("Failed to place call.\n" + error);
  });
});

// Add click listener to hangup button
hangupButton.addEventListener("click", () => {
  callButton.disabled = true;
  hangupButton.disabled = true;
  toIP.hangup().catch((error: Error) => {
    console.error(`[${toIP.id}] failed to hangup call`);
    console.error(error);
    alert("Failed to hangup call.\n" + error);
  });
});

// Add click listener to disconnect button
disconnectButton.addEventListener("click", () => {
  connectButton.disabled = true;
  disconnectButton.disabled = true;
  callButton.disabled = true;
  hangupButton.disabled = true;
  toIP
    .disconnect()
    .then(() => {
      connectButton.disabled = false;
      disconnectButton.disabled = true;
      callButton.disabled = true;
      hangupButton.disabled = true;
    })
    .catch((error: Error) => {
      console.error(`[${toIP.id}] failed to disconnect`);
      console.error(error);
      alert("Failed to disconnect.\n" + error);
    });
});

// Add click listeners to keypad buttons
keypad.forEach((button) => {
  button.addEventListener("click", () => {
    const tone = button.textContent;
    if (tone) {
      toIP.sendDTMF(tone).then(() => {
        dtmfSpan.innerHTML += tone;
      });
    }
  });
});

// Keypad helper function
const keypadDisabled = (disabled: boolean): void => {
  keypad.forEach((button) => (button.disabled = disabled));
  dtmfSpan.innerHTML = "";
};

// Add change listener to hold checkbox
holdCheckbox.addEventListener("change", () => {
  if (holdCheckbox.checked) {
    // Checkbox is checked..
    toIP.hold().catch((error: Error) => {
      holdCheckbox.checked = false;
      console.error(`[${toIP.id}] failed to hold call`);
      console.error(error);
      alert("Failed to hold call.\n" + error);
    });
  } else {
    // Checkbox is not checked..
    toIP.unhold().catch((error: Error) => {
      holdCheckbox.checked = true;
      console.error(`[${toIP.id}] failed to unhold call`);
      console.error(error);
      alert("Failed to unhold call.\n" + error);
    });
  }
});

// Hold helper function
const holdCheckboxDisabled = (disabled: boolean): void => {
  holdCheckbox.checked = false;
  holdCheckbox.disabled = disabled;
};

// Add change listener to mute checkbox
muteCheckbox.addEventListener("change", () => {
  if (muteCheckbox.checked) {
    // Checkbox is checked..
    toIP.mute();
    if (toIP.isMuted() === false) {
      muteCheckbox.checked = false;
      console.error(`[${toIP.id}] failed to mute call`);
      alert("Failed to mute call.\n");
    }
  } else {
    // Checkbox is not checked..
    toIP.unmute();
    if (toIP.isMuted() === true) {
      muteCheckbox.checked = true;
      console.error(`[${toIP.id}] failed to unmute call`);
      alert("Failed to unmute call.\n");
    }
  }
});

// Mute helper function
const muteCheckboxDisabled = (disabled: boolean): void => {
  muteCheckbox.checked = false;
  muteCheckbox.disabled = disabled;
};

// Enable the connect button
connectButton.disabled = false;
