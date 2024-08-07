import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { conversationStore } from "./stores/ConversationStore";
import { ConversationModel } from "./stores/ConversationModel";

const ConversationListItem = observer(({ conversation, isSelected, onSelect }) => (
  <li
    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
      isSelected ? "bg-blue-100" : ""
    }`}
    onClick={() => onSelect(conversation)}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{conversation.meta.sender.name}</h3>
        <p className="text-sm text-gray-600 truncate">
          {conversation.last_non_activity_message.content}
        </p>
      </div>
      <ChevronRight className="flex-shrink-0 text-gray-400" />
    </div>
  </li>
));

const ConversationList = observer(() => {
  const conversations = conversationStore.getRecords;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectConversation = (conversation: ConversationModel) => {
    setSelectedId(conversation.id);
    conversationStore.setSelectedConversation(conversation);
  };

  return (
    <div className="h-full overflow-y-auto">
      <ul className="space-y-2">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedId === conversation.id}
            onSelect={handleSelectConversation}
          />
        ))}
      </ul>
    </div>
  );
});

const MessageView = observer(() => {
  const conversation = conversationStore.selectedConversation;

  return (
    <div className="flex flex-col h-full">
      {conversation ? (
        <>
          <h2 className="p-4 text-xl font-bold border-b">
            {conversation.name}
          </h2>
          <div className="flex-grow p-4 overflow-y-auto">
            <p>{conversation.lastMessage}</p>
            {/* You can add more message content here */}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a conversation to view messages
        </div>
      )}
    </div>
  );
});

const App = () => {
  useEffect(() => {
    conversationStore.index();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <div className="w-full h-[calc(100vh-2rem)] overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex h-full">
          <div className="w-1/3 border-r">
            <ConversationList />
          </div>
          <div className="w-2/3">
            <MessageView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;