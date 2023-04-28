import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageIonicServer {
    constructor(private storage: Storage) {
        this.createStorage();
    }

    private async createStorage() {
        this.storage = await this.storage.create();
    }

    async setItem(key: string, value: any) {
        await this.storage.set(key, value);
    }

    async getItem(key: string) {
        return await this.storage.get(key);
    }

    async removeItem(key: string) {
        await this.storage.remove(key);
    }

    async clear() {
        await this.storage.clear();
    }
    async getAllKeys() {
        const keys = await this.storage.keys();
        return keys;
    }

    async getAllItems() {
        const keys = await this.storage.keys();
        const items = [];
        for (const key of keys) {
            const value = await this.storage.get(key);
            items.push({ key, value });
        }
        return items;
    }
}
