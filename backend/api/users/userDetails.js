// UserDetails.js
class UserDetails {
    constructor() {
      this.id = '';
      this.name = '';
      this.level = '';
      this.topic = '';
      this.college = '';
      this.domain = '';
      this.graduationYear = '';
    }
    
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setName(name) {
      this.name = name;
    }
  
    setLevel(level) {
      this.level = level;
    }
  
    setTopic(topic) {
      this.topic = topic;
    }
  
    getName() {
      return this.name;
    }
  
    getLevel() {
      return this.level;
    }
  
    getTopic() {
      return this.topic;
    }
    getCollege() {
      return this.college;
    }
    getDomain() {
      return this.domain;
    }
    getGraduationYear() {
      return this.graduationYear;
    }
    setCollege(college) {
      this.college = college;
    }
    setDomain(domain) {
      this.domain = domain;
    }
    setGraduationYear(graduationYear) {
      this.graduationYear = graduationYear;
    }

  }
  
  // Create an instance of UserDetails
  const userDetails = new UserDetails();
  
  export default userDetails;
  