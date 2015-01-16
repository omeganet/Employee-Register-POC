export class EmployeeService {
	constructor() {
		this.employees = new Map();
	}

	add(name, age) {
		var def = Promise.defer(),
			that = this;
		setTimeout(function() {
			var emp = { name: name, age: age };
			that.employees.set(name, emp);
			def.resolve(emp);
		}, 1000);
		return def.promise;
	}

	remove(name) {
		var def = Promise.defer(),
			that = this;
		setTimeout(function() {
			var emp = { name: name, age: age };
			that.employees.delete(name);
			def.resolve(emp);
		}, 1000);
		return def.promise;
	}
}