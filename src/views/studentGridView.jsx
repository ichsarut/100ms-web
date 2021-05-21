import {
  VideoList,
  audioLevelEmitter,
  useHMSRoom,
} from "@100mslive/sdk-components";
import React, { useContext } from "react";
import { HMSPeertoCameraStreamWithInfo } from "../utlis";
import { ChatView } from "./chatView";
import { AppContext } from "../store/AppContext";
export const StudentGridView = ({ isChatOpen, toggleChat }) => {
  const { maxTileCount } = useContext(AppContext);
  const { peers } = useHMSRoom();
  const streamsWithInfo =
    peers && peers.length > 0 && peers[0]
      ? peers
          .filter((peer) => Boolean(peer.videoTrack || peer.audioTrack))
          .map((peer) => HMSPeertoCameraStreamWithInfo(peer))
      : [];
  return (
    <React.Fragment>
      <div className=" h-full  " style={{ width: "80%" }}>
        {streamsWithInfo &&
          streamsWithInfo.filter((peer) => peer.role === "Teacher").length >
            0 && (
            <VideoList
              streams={streamsWithInfo.filter(
                (peer) => peer.role === "Teacher"
              )}
              classes={{
                root: "",
                videoTileContainer: " p-2.5 rounded-lg",
                //video: "rounded-3xl",
              }}
              showAudioMuteStatus={true}
              allowRemoteMute={false}
              maxTileCount={2}
              audioLevelEmitter={audioLevelEmitter}
            />
          )}
      </div>
      <div className="flex flex-col" style={{ width: "20%" }}>
        <div
          className={
            isChatOpen
              ? "flex items-end w-full  h-1/3"
              : "flex items-end w-full  h-full"
          }
        >
          {streamsWithInfo &&
            streamsWithInfo.filter((peer) => peer.role === "Student").length >
              0 && (
              <VideoList
                streams={streamsWithInfo.filter(
                  (peer) => peer.role === "Student"
                )}
                classes={{
                  root: "",
                  videoTileContainer: "p-2.5 rounded-lg",
                  //video: "rounded-3xl",
                }}
                showAudioMuteStatus={true}
                allowRemoteMute={false}
                maxTileCount={maxTileCount}
                maxColCount={2}
                audioLevelEmitter={audioLevelEmitter}
              />
            )}
        </div>
        {isChatOpen && (
          <div className="flex h-2/3 items-end p-2">
            <div className="w-full h-full">
              <ChatView toggleChat={toggleChat}></ChatView>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
