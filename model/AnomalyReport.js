class AnomalyReport{
    description;
    timeStep;
    constructor( description, timeStep) {
        this.description=description;
        this.timeStep=timeStep;
    }
}

module.exports.ARConstructor=AnomalyReport