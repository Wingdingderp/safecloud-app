import Image from "next/image";
import Instruction from "../Instruction";
import imgDiscordJoinServer from "../../../public/assets/images/onboarding/discord-join-server.png";
import imgMinecraftAddServer from "../../../public/assets/images/onboarding/minecraft-add-server.png";
import imgMinecraftServerAddress from "../../../public/assets/images/onboarding/minecraft-server-address.png";

const JoinSteps: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Instruction step="1">
        Join the Discord server:{" "}
        <a className="link" href="/discord" target="_blank">
          discord.safecloud.quest
        </a>
        <div className="mt-1 max-w-[24rem]">
          <Image
            src={imgDiscordJoinServer}
            alt="Join the Discord server"
            className="rounded-md"
          />
        </div>
      </Instruction>
      <Instruction step="2">
        Go to Multiplayer and click on Add Server
        <div className="mt-1 max-w-[24rem]">
          <Image
            src={imgMinecraftAddServer}
            alt="Add Server button in Minecraft"
            className="rounded-md"
          />
        </div>
      </Instruction>
      <Instruction step="3">
        Enter <strong>tristansmp.com</strong> (Java) into Server Address
        <div className="mt-1 max-w-[24rem]">
          <Image
            src={imgMinecraftServerAddress}
            alt="safecloud.quest in the Server Address field"
            className="rounded-md"
          />
        </div>
      </Instruction>
      <Instruction step="4">Click Done then join the server</Instruction>
    </div>
  );
};

export default JoinSteps;
