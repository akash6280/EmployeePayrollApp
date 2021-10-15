class EmployeePayrollData 
{

    get id() {
        return this._id;
    }

    set id(id) {
            this._id = id;
    }


    get name(){
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)){
            this._name = name;
        }
        else{
            throw 'Invalid Name';
        }
    }

    get profile() {
        return this._profile;
    }
    set profile(profile) {
        this._profile = profile;

    } 
    
    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get department() 
    {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        if (startDate <= new Date() && Date.now()-startDate < 30*24*60*60*1000){
            this._startDate = startDate;
        }
        else {
            throw 'Invalid date';
        }
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const format = {year:'numeric', month:'long', day:'numeric'};
        const date = this.startDate === undefined ? "undefined" :
                     this.startDate.toLocaleDateString("en-US",format);
        return "ID= "+this.id+",Name= " + this.name + ",Profile= " + this.profile + ",Gender= " + this.gender + ",Department= " + this.department + ",Salary=" 
                + this.salary + ",StartDate= " + date + ",Notes= " + this.notes;
    }
}
