<template>
    <div class="student-info">
    <!-- ใส่รูปภาพด้านบนข้อมูลนิสิต -->
    <img src="@/assets/Book.jpg" alt="Student Profile" class="profile-image" />
    <h2>ข้อมูลนิสิต</h2>
    <p><strong>ชื่อ-นามสกุล:</strong> {{ student.firstName }} {{ student.lastName }}</p>
    <p><strong>รหัสนิสิต:</strong> {{ student.studentId }}</p>
    <p><strong>สาขาวิชา:</strong> {{ student.major }}</p>
    <p><strong>โรงเรียนเดิม:</strong> {{ student.school }}</p>
    <router-link to="/edit">แก้ไขข้อมูล</router-link>
  </div>
</template>
<style scoped>
.student-info {
  text-align: center;
  color: white;
  background-color: #111;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc;
}

.profile-image {
  display: block;
  margin: 20px auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #00ffcc;
  box-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc;
}
</style>
<script>
export default {
  data() {
    return {
      student: {
        firstName: '',
        lastName: '',
        studentId: '',
        major: '',
        school: '',
      },
    };
  },
  created() {
    // ดึงข้อมูลนิสิตจาก localStorage
    const studentData = JSON.parse(localStorage.getItem('studentInfo')) || {};
    this.student = { ...this.student, ...studentData };
  },
};
</script>
