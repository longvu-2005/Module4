// Mảng dữ liệu mẫu nhân viên trong bộ nhớ
let employees = [
    { id: 1, name: 'Vũ Văn Gia Long', email: 'vuvangialong02@gmail.com', avatarUrl: null },
    { id: 2, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', avatarUrl: null }
];

let nextId = 3;

const Employee = {
    getAll() {
        return employees;
    },

    findById(id) {
        const numericId = Number(id);
        return employees.find(e => e.id === numericId);
    },

    findByEmail(email) {
        return employees.find(e => e.email.toLowerCase() === email.toLowerCase());
    },

    create(data) {
        const newEmployee = {
            id: nextId++,
            name: data.name,
            email: data.email,
            avatarUrl: null
        };
        employees.push(newEmployee);
        return newEmployee;
    },

    updateAvatar(id, avatarUrl) {
        const employee = this.findById(id);
        if (employee) {
            employee.avatarUrl = avatarUrl;
            return employee;
        }
        return null;
    }
};

module.exports = Employee;