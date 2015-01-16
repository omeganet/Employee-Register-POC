import {ComponentDirective} from 'templating';
import {EmployeeService} from 'employeeService';
import {Inject} from 'di';

@Inject(EmployeeService)
@ComponentDirective()
export class Employees {
	constructor(employeeService:EmployeeService) {
		this.name = null;
		this.age = null;
		this.list = [{ name: 'Tine', age: 45 }];
		this.employeeService = employeeService;
		this.submitted = false;
		// needed to ensure this points to the class
		// ngRepeat creates a new object context for each item
		this.removeEmployee.bind(this);
	}

	valid() {
		return this.nameValid.valid && this.ageValid.valid;
	}

	addEmployee() {
		this.submitted = true;

		if (!this.valid()) {
			console.log('Invalid input');
			return;
		}

		var that = this;
		this.employeeService.add(this.name, this.age).then(function(emp) {
			that.list.push(emp);
			that.name = null;
			that.age = null;
			that.submitted = false;
			console.log('Employee added: ' + emp.name + ', ' + emp.age);
		});
	}

	removeEmployee(emp) {
		var that = this;
		this.employeeService.remove(emp.name).then(function() {
			var index = that.list.find(x => x == emp);
			that.list.splice(index, 1);
			console.log('Employee removed: ' + emp.name + ', ' + emp.age);
		});
	}
}