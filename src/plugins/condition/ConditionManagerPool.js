import ConditionManager from './ConditionManager'

export default class ConditionManagerPool {
    constructor(openmct) {
        this.openmct = openmct;
        this.entries = {};
    }

    get(domainObject) {
        const id = this.openmct.objects.makeKeyString(domainObject.identifier);
        let entry = this.entries[id];

        if (!entry) {
            entry = {
                conditionManager: new ConditionManager(domainObject, this.openmct),
                leases: 0
            }
            this.entries[id] = entry;
        }

        entry.leases += 1;
        return entry.conditionManager;
    }

    release(id) {
        let entry = this.entries[id];
        if (!entry) {
            console.warn(`tried to destroy condition manager ${id} that doesn't exist`);
            return;
        }

        entry.leases -= 1;

        if (entry.leases <= 0) {
            entry.conditionManager.destroy();
            delete this.entries[id];
        }
    }
}
