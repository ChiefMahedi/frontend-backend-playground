export default class Customer {
    public ID: string;
    public CustomerName: string;
    public Division: string;
    public Gender: 'M' | 'F'; 
    public MaritalStatus: 'Single' | 'Married' | 'Divorced';
    public Age: number;
    public Income: number;
 
    constructor(
      id: string,
      name: string,
      division: string,
      gender: 'M' | 'F',
      maritalStatus: 'Single' | 'Married' | 'Divorced',
      age: number,
      income: number
    ) {
      this.ID = id;
      this.CustomerName = name;
      this.Division = division;
      this.Gender = gender;
      this.MaritalStatus = maritalStatus;
      this.Age = age;
      this.Income = income;
    }

}