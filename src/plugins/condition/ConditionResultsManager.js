import EventEmitter from 'EventEmitter';

export default class ConditionResultsManager extends EventEmitter {
    constructor(openmct) {
        super();
        this.openmct = openmct;

        this.ladResults = {};
        this.realtimeResults = {};

        this.ladTimestamp = {};
        this.realtimeTimestamp = {};
    }

    updateLADConditionResults(resultObj) {

    }

    updateRealtimeConditionResults(resultObj) {

    }

    updateLADCriteriaResults(resultObj) {

        this.updateLADTimestamp(resultObj);
    }

    updateRealtimeCriteriaResults(resultObj) {

    }

    updateLADTimestamp(resultObj) {

    }

    updateRealtimeTimestamp(resultObj) {
        
    }

    evaluateConditionResult(id) {
        let result = {};

        return {
            id: id,
            data: Object.assign({}, this.latestTimestamp, { result: result })
        }
    }

    getLADCondition() {

    }

    getRealtimeCondition() {

    }
}
