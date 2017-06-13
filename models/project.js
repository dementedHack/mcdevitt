module.exports = class Project {
	constructor (name, id, projectManager, projectStartDate, projectEndDate, retailLocation) {
    	this.name = name;
    	this.id = id;
    	this.projectManager = projectManager;
    	this.projectStartDate = projectStartDate;
    	this.projectEndDate = projectEndDate;
    	this.retailLocation = retailLocation;
	}
}