<template>
  <div id="app">
    <header>
      <h1>Portfolio</h1>
      <nav>
        <router-link to="/" class="nav-link">ข้อมูลนิสิต</router-link>
        <router-link to="/edit" class="nav-link">แก้ไขข้อมูลนิสิต</router-link>
        <router-link to="/course" class="nav-link">ผลการเรียน</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff; /* เปลี่ยนสีตัวอักษรเป็นสีขาว */
  background-color: #000; /* ทำให้พื้นหลังเป็นสีดำ */
  min-height: 100vh; /* ให้ครอบคลุมทั้งหน้า */
}

header {
  background-color: rgba(0, 0, 0, 0.8); /* พื้นหลังสีดำโปร่งแสง */
  padding: 20px;
  color: white;
  border-radius: 10px; /* เพิ่มมุมโค้ง */
}

h1 {
  color: #4CAF50; /* ทำให้คำว่า Portfolio เป็นสีเขียว */
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.nav-link {
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  margin: 0 10px;
  border: 2px solid #fff; /* กรอบเป็นสีขาว */
  border-radius: 5px; /* มุมกลม */
  transition: all 0.3s ease;
}

/* เอฟเฟกต์เมื่อโฮเวอร์ */
.nav-link:hover {
  background-color: #4CAF50; /* สีพื้นหลังเมื่อโฮเวอร์ */
  color: white;
}
</style>
