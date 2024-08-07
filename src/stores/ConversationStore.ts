import { BaseStore } from './BaseStore';
import { ConversationModel, ConversationData } from './ConversationModel';
import { action, makeObservable, runInAction } from 'mobx';

export class ConversationStore extends BaseStore<ConversationModel> {
  constructor() {
    super('conversations');
    makeObservable(this, {
      createConversation: action,
      updateLabels: action,
    });
  }

  createConversation = async (data: Omit<ConversationData, 'id'>) => {
    try {
      const { data: responseData } = await this.apiClient.create(data);
      runInAction(() => {
        const newConversation = new ConversationModel(responseData);
        this.records[newConversation.id] = newConversation;
      });
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  }

  updateLabels = async (id: number, labels: string[]) => {
    const conversation = this.getRecordById(id);
    if (conversation) {
      conversation.setLabels(labels);
      await this.update(id, { customAttributes: conversation.customAttributes });
    }
  }
}

// Create and export a single instance of the store
export const conversationStore = new ConversationStore();