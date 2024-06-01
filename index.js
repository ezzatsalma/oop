#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class Student {
    name;
    constructor(n) { this.name = n; }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programstart = async (persons) => {
    do {
        console.log(`${chalk.bold.yellow("welcome")}`);
        const ans = await inquirer.prompt({
            name: 'select',
            type: 'list',
            message: 'who would you like to interact with?',
            choices: ['staff', 'student', 'exit']
        });
        if (ans.select == 'staff') {
            console.log(`${chalk.bold.green("you've reached staff room feell free to ask anything")}`);
        }
        else if (ans.select == 'student') {
            const ans = await inquirer.prompt({
                name: 'student',
                type: 'input',
                message: 'enter student name you would like to interact with'
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`${chalk.yellow(`hello I'm ${name.name}`)}`);
                console.log(`${chalk.bold.blue("new student added\n current student list")}`);
                console.log(persons.students);
            }
            else {
                console.log(`${chalk.yellow(`hello I'm ${student.name}. nice to see you again`)}`);
                console.log('existing students');
                console.log(persons.students);
            }
        }
        else if (ans.select == 'exit') {
            console.log(`${chalk.bold.yellowBright('exiting')}`);
            process.exit();
        }
    } while (true);
};
programstart(persons);
