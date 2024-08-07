import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";
import ApiClient from "./ApiClient";

export interface BaseModel {
  id: number;
  [key: string]: string | number | boolean | object;
}

export class BaseStore<T extends BaseModel> {
  records: { [id: number]: T } = {};
  uiFlags: { [key: string]: string } = {};
  apiClient: ApiClient;

  constructor(resource: string) {
    this.apiClient = new ApiClient(resource);
    makeObservable(this, {
      records: observable,
      uiFlags: observable,
      getRecords: computed,
      getRecordById: action,
      index: action,
      show: action,
      update: action,
      delete: action,
    });
  }

  get getRecords(): T[] {
    return Object.values(this.records);
  }

  getRecordById = (id: number): T | undefined => {
    return this.records[id];
  };

  index = async () => {
    try {
      const { data } = await this.apiClient.get();
      const { payload } = data.data;
      runInAction(() => {
        payload.forEach((item: T) => {
          this.records[item.id] = item;
        });
      });
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  };

  show = async (id: number) => {
    try {
      const { data } = await this.apiClient.show(id);
      runInAction(() => {
        this.records[id] = data;
      });
    } catch (error) {
      console.error(`Failed to fetch record with id ${id}:`, error);
    }
  };

  update = async (id: number, updateData: Partial<T>) => {
    try {
      const { data } = await this.apiClient.update(id, updateData);
      runInAction(() => {
        this.records[id] = { ...this.records[id], ...data };
      });
    } catch (error) {
      console.error(`Failed to update record with id ${id}:`, error);
    }
  };

  delete = async (id: number) => {
    try {
      await this.apiClient.delete(id);
      runInAction(() => {
        delete this.records[id];
      });
    } catch (error) {
      console.error(`Failed to delete record with id ${id}:`, error);
    }
  };
}
