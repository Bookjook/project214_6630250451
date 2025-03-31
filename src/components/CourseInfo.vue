<template>
    <div class="course-container">
      <h2>ผลการเรียน</h2>
      
      <!-- ตารางแสดงข้อมูลรายวิชา -->
      <table>
        <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชา</th>
            <th>หน่วยกิต</th>
            <th>เกรด</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="index">
            <td>{{ course.courseCode }}</td>
            <td>{{ course.courseName }}</td>
            <td>{{ course.credits }}</td>
            <td>{{ course.grade }}</td>
            <td><button class="edit-btn" @click="editCourse(index)">แก้ไข</button></td>
            <td><button class="delete-btn" @click="deleteCourse(index)">ลบ</button></td>
          </tr>
        </tbody>
      </table>
  
      <!-- ข้อมูลรวม -->
      <div class="summary">
        <h3>ข้อมูลรวม</h3>
        <p>จำนวนวิชา: {{ totalCourses }}</p>
        <p>จำนวนหน่วยกิตรวม: {{ totalCredits }}</p>
        <p>เกรดเฉลี่ย: {{ averageGrade }}</p>
      </div>
  
      <!-- ปุ่มเพิ่มวิชา -->
      <button class="add-btn" @click="addCourse">เพิ่มผลการเรียน</button>
  
      <!-- ฟอร์มสำหรับเพิ่ม/แก้ไขข้อมูล -->
      <div v-if="isEditing" class="form-container">
        <h3>{{ editingIndex === null ? 'เพิ่มข้อมูลวิชา' : 'แก้ไขข้อมูลวิชา' }}</h3>
        <form @submit.prevent="saveCourseEdit">
          <div class="form-group">
            <label for="courseCode">รหัสวิชา:</label>
            <input type="text" v-model="editedCourse.courseCode" required>
          </div>
  
          <div class="form-group">
            <label for="courseName">ชื่อวิชา:</label>
            <input type="text" v-model="editedCourse.courseName" required>
          </div>
  
          <div class="form-group">
            <label for="credits">หน่วยกิต:</label>
            <input type="number" v-model="editedCourse.credits" required>
          </div>
  
          <div class="form-group">
            <label for="grade">เกรด:</label>
            <input type="text" v-model="editedCourse.grade" required>
          </div>
  
          <button type="submit" class="save-btn">บันทึก</button>
          <button type="button" class="cancel-btn" @click="cancelEdit">ยกเลิก</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courses: JSON.parse(localStorage.getItem('courses')) || [],
        isEditing: false,
        editedCourse: { courseCode: '', courseName: '', credits: '', grade: '' },
        editingIndex: null
      };
    },
    computed: {
      // คำนวณจำนวนวิชาทั้งหมด
      totalCourses() {
        return this.courses.length;
      },
      // คำนวณจำนวนหน่วยกิตรวม
      totalCredits() {
        return this.courses.reduce((sum, course) => sum + parseInt(course.credits), 0);
      },
      // คำนวณเกรดเฉลี่ย
      averageGrade() {
        const gradePoints = { A: 4, 'A+': 4.5, 'B+': 3.5, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, D: 1, 'D+': 1.3, F: 0 };
  
        let totalPoints = 0;
        let totalWeightedCredits = 0;
  
        this.courses.forEach(course => {
          totalPoints += gradePoints[course.grade] * course.credits;
          totalWeightedCredits += parseInt(course.credits);
        });
  
        return totalWeightedCredits > 0 ? (totalPoints / totalWeightedCredits).toFixed(2) : 0;
      }
    },
    methods: {
      // เพิ่มวิชาใหม่
      addCourse() {
        this.isEditing = true;
        this.editedCourse = { courseCode: '', courseName: '', credits: '', grade: '' };
        this.editingIndex = null;
      },
      // บันทึกการแก้ไขหรือเพิ่มวิชา
      saveCourseEdit() {
        if (this.editingIndex === null) {
          this.courses.push({ ...this.editedCourse });
        } else {
          this.courses[this.editingIndex] = { ...this.editedCourse };
        }
        // บันทึกข้อมูลใน localStorage
        localStorage.setItem('courses', JSON.stringify(this.courses));
        // รีเซ็ตสถานะ
        this.cancelEdit();
      },
      // แก้ไขวิชาที่เลือก
      editCourse(index) {
        this.isEditing = true;
        this.editedCourse = { ...this.courses[index] };
        this.editingIndex = index;
      },
      // ลบวิชาที่เลือก
      deleteCourse(index) {
        this.courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(this.courses));
      },
      // ยกเลิกการแก้ไข
      cancelEdit() {
        this.isEditing = false;
        this.editedCourse = { courseCode: '', courseName: '', credits: '', grade: '' };
      }
    }
  };
  </script>
  
  <style scoped>
  /* กรอบหลัก */
  .course-container {
    background-color: #111;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc;
    max-width: 600px;
    margin: 30px auto;
    text-align: center;
    color: white;
  }
  
  /* ตาราง */
  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 15px #00ffcc;
  }
  
  th, td {
    border: 2px solid #00ffcc;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #222;
    color: #00ffcc;
    text-shadow: 0 0 5px #ff00ff;
  }
  
  td {
    background-color: #111;
    color: white;
  }
  
  /* ปุ่ม */
  button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
  }
  
  .edit-btn {
    background-color: #00ffcc;
    color: black;
    text-shadow: 0 0 5px #ff00ff;
  }
  
  .edit-btn:hover {
    background-color: #ff00ff;
    color: white;
  }
  
  .delete-btn {
    background-color: #ff4444;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #cc0000;
  }
  
  /* ปุ่มเพิ่ม */
  .add-btn {
    margin-top: 15px;
    background-color: #00ffcc;
    color: black;
  }
  
  .add-btn:hover {
    background-color: #ff00ff;
    color: white;
  }
  
  /* ฟอร์มแก้ไข */
  .form-container {
    background-color: #222;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0 0 15px #ff00ff;
  }
  
  .form-group {
    margin-bottom: 10px;
    text-align: left;
  }
  
  label {
    display: block;
    color: #00ffcc;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 2px solid #00ffcc;
    border-radius: 5px;
    background-color: #333;
    color: white;
  }
  
  /* ปุ่มในฟอร์ม */
  .save-btn {
    background-color: #00ffcc;
    color: black;
  }
  
  .save-btn:hover {
    background-color: #ff00ff;
    color: white;
  }
  
  .cancel-btn {
    background-color: #ff4444;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #cc0000;
  }
  
  /* ข้อมูลรวม */
  .summary {
    margin-top: 20px;
    padding: 10px;
    background-color: #222;
    border-radius: 10px;
    color: #00ffcc;
  }
  </style>
  