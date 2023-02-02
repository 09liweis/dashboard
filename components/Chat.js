import { useState, useRef, useEffect } from 'react';
import ChatKitty from 'chatkitty';

const chatkitty = ChatKitty.getInstance(process.env.CHATKITTY_API_KEY);

function Chat() {
  const sendMessage = async (channel) => {
    const result = await chatkitty.sendMessage({
      channel,
      body: 'Hello, world!',
    });

    if (result.succeeded) {
      const message = result.message; // Handle message
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };
  const startChatSession = async (channel) => {
    const result = chatkitty.startChatSession({
      channel,
      onMessageReceived: (message) => {
        // handle received messages
      },
      onKeystrokesReceived: (keystrokes) => {
        // handle received typing keystrokes
      },
      onTypingStarted: (user) => {
        // handle user starts typing
      },
      onTypingStopped: (user) => {
        // handle user stops typing
      },
      onParticipantEnteredChat: (user) => {
        // handle user who just entered the chat
      },
      onParticipantLeftChat: (user) => {
        // handle user who just left the chat
      },
      onParticipantPresenceChanged: (user) => {
        // handle user who became online, offline, do not disturb, invisible
      },
      onMessageRead: (message, receipt) => {
        // handle read receipt for message
      },
      onMessageUpdated: (message) => {
        // handle message changes
      },
      onChannelUpdated: (channel) => {
        // handle channel changes
      },
    });

    if (result.succeeded) {
      const session = result.session; // Handle session
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };

  const getChannel = async (channelId) => {
    const result = await chatkitty.getChannel(channelId);
    console.log(result);
    if (result.succeeded) {
      const channel = result.channel; // Handle channel
      return channel;
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
    return null;
  };

  const startChannel = async () => {
    const channelId = 'dashboard-public-channel';
    // const channel = await getChannel(channelId);
    // if (channel) {
    //   await startChatSession(channel);
    //   return;
    // }
    const channelResult = await chatkitty.createChannel({
      type: 'PUBLIC',
      name: channelId,
    });

    if (channelResult.succeeded) {
      const channel = channelResult.channel; // Handle channel
      await startChatSession(channel);
    }

    if (channelResult.failed) {
      const error = channelResult.error; // Handle error
    }
  };

  const initialChatkitty = async () => {
    const result = await chatkitty.startSession({
      username: 'weisen.li@hotmail.com',
    });

    if (result.succeeded) {
      const session = result.session; // Handle session
      await startChannel();
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };

  useEffect(() => {
    initialChatkitty();
    return () => {
      chatkitty.endSession();
    };
  }, []);

  const handleSendMsg = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <section className="fixed bg-white p-3 right-0 bottom-0 w-96">
      <h4 className="text-3xl">Chat</h4>
      <section className="overflow-y h-96"></section>
      <form onSubmit={handleSendMsg} className="flex ">
        <input
          placeholder="Type Your Message"
          className="flex-1 border rounded p-2"
        />
        <button className="flex-none border rounded p-2">Send</button>
      </form>
    </section>
  );
}

export default Chat;
