describe('<App />', () => {
  let students;

  beforeEach(() => {
    students = ['Mike', 'Tony', 'Cassius'];
  });

  it('should return TRUE', () => {
    expect(true).toBe(true);
  });

  it('should be the object', () => {
    expect({name: 'Mike', age: 22}).toEqual({name: 'Mike', age: 22});
  });

  it('students array should not have length of 3', () => {
    students.push('Alex');

    expect(students).not.toHaveLength(3);
  });

  it('drunkStudents should have Mike', () => {
    const drunkStudents = [
      { name: 'Mike', age: 27 },
      { name: 'Tony', age: 30 },
      { name: 'Alex', age: 35 }
    ];

    const mike = drunkStudents[0];

    expect(drunkStudents).toContain(mike);
    expect(drunkStudents).toContainEqual({ name: 'Mike', age: 27 });
  });

  it('something always should be truthy and falsy', () => {
    expect(students).toBeTruthy();
    expect('').toBeFalsy();
  });

  it('string should have name George', () => {
    const name = 'George';

    expect(`Hello my name is ${name} and my age is 63`).toMatch(/george/i);
  });

});