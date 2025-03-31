<template>
    <div class="edit-student-container">
      <h2>แก้ไขข้อมูลนิสิต</h2>
      <form @submit.prevent="updateStudent">
        <div class="form-group">
          <label for="firstName">ชื่อ:</label>
          <input type="text" id="firstName" v-model="student.firstName" />
        </div>
        <div class="form-group">
          <label for="lastName">นามสกุล:</label>
          <input type="text" id="lastName" v-model="student.lastName" />
        </div>
        <div class="form-group">
          <label for="studentId">รหัสนิสิต:</label>
          <input type="text" id="studentId" v-model="student.studentId" />
        </div>
        <div class="form-group">
          <label for="major">สาขาวิชา:</label>
          <input type="text" id="major" v-model="student.major" />
        </div>
        <div class="form-group">
          <label for="school">โรงเรียนเดิม:</label>
          <input type="text" id="school" v-model="student.school" />
        </div>
        <button type="submit" class="save-btn">บันทึกการแก้ไข</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        student: {
          firstName: "",
          lastName: "",
          studentId: "",
          major: "",
          school: "",
        },
      };
    },
    created() {
      // ดึงข้อมูลนิสิตจาก localStorage
      const studentData = JSON.parse(localStorage.getItem("studentInfo")) || {};
      this.student = { ...this.student, ...studentData };
    },
    methods: {
      updateStudent() {
        // บันทึกข้อมูลที่แก้ไขใหม่ลง localStorage
        localStorage.setItem("studentInfo", JSON.stringify(this.student));
        // ไปที่หน้าแสดงข้อมูลนิสิต
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style scoped>
  /* กรอบฟอร์ม */
  .edit-student-container {
    background-color: #111;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc;
    max-width: 400px;
    margin: 30px auto;
    text-align: center;
    color: white;
  }
  
  /* กล่องอินพุต */
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 2px solid #00ffcc;
    border-radius: 5px;
    background-color: #222;
    color: white;
    box-shadow: 0 0 5px #00ffcc;
  }
  
  /* ปุ่มบันทึก */
  .save-btn {
    background-color: #00ffcc;
    color: black;
    font-weight: bold;
    text-shadow: 0 0 5px #ff00ff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .save-btn:hover {
    background-color: #ff00ff;
    color: white;
  }
  </style>
  