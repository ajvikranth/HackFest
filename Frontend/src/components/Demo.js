import React from "react";
import {
  Terminal,
  useEventQueue,
  textLine,
  textWord,
  commandWord,
} from "@nojsja/crt-terminal";

const bannerText = `
Hello world!

And not only world
`;

export default function App() {
  const eventQueue = useEventQueue();
  const { print } = eventQueue.handlers;

  return (
    <div style={{ width: "1000px", height: "600px" }}>
      <Terminal
        queue={eventQueue}
        banner={[textLine({ words: [textWord({ characters: bannerText })] })]}
        effects={{ scanner: false }}
        style={{ backgroundColor: "black", textColor: "red" }}
        className="text-[40px]"
        onCommand={(command) => {
          console.log(command);
          const commandResponse = command + " a";
          print([
            textLine({
              words: [
                // textWord({ characters: "hello" }),
                commandWord({ characters: commandResponse }),
              ],
            }),
            // textLine({
            //   words: [
            //     textWord({ characters: "You entered command: " }),
            //     commandWord({ characters: command, prompt: ">" }),
            //   ],
            // }),
          ]);
        }}
      />
    </div>
  );
}
