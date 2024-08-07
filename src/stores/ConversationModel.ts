import { makeAutoObservable } from "mobx";
import { BaseModel } from "./BaseStore";

export interface ConversationData extends BaseModel {
  accountId: number;
  additionalAttributes: object;
  agentLastSeenAt: number;
  assigneeLastSeenAt: number;
  canReply: boolean;
  contactLastSeenAt: number;
  createdAt: number;
  customAttributes: object;
  messages: number[]; // Array of message IDs
  [key: string]: any;
}

export class ConversationModel implements ConversationData {
  id: number;
  accountId: number;
  additionalAttributes: object;
  agentLastSeenAt: number;
  assigneeLastSeenAt: number;
  canReply: boolean;
  contactLastSeenAt: number;
  createdAt: number;
  customAttributes: object;
  messages: number[];
  [key: string]: any;

  constructor(data: ConversationData) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.additionalAttributes = data.additionalAttributes;
    this.agentLastSeenAt = data.agentLastSeenAt;
    this.assigneeLastSeenAt = data.assigneeLastSeenAt;
    this.canReply = data.canReply;
    this.contactLastSeenAt = data.contactLastSeenAt;
    this.createdAt = data.createdAt;
    this.customAttributes = data.customAttributes;
    this.messages = data.messages;

    // Assign any additional properties
    Object.keys(data).forEach((key) => {
      if (!(key in this)) {
        this[key] = data[key];
      }
    });

    makeAutoObservable(this);
  }
}
