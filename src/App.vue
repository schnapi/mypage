<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import { sunIcon } from './icons'
</script>

<template>
  <!-- ABOUT ME -->
  <div class="text-left font-sans">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-lg">
      <div
        class="col-span-1 text-center text-nowrap relative bg-[#f4ece6] dark:bg-slate-800 text-black dark:text-white rounded-lg"
        style="box-shadow: 0 1px 4px rgba(0, 0, 0, .6);">
        <div class="p-16">
          <img src="./assets/sandikrivec.webp" class="w-40 h-40 object-cover rounded-full m-auto" fetchpriority="high">
          <br>
          <h3>Sandi Krivec</h3>
          <a href="mailto:sandi.krivec@gmail.com">sandi.krivec@gmail.com</a>
          <br>
          <br>
          <div class="w-20 h-3 border-t-2 border-blue-500 m-auto"></div>
          <br>
          <p class="" style="letter-spacing:0.25em">Software Engineer</p>
          <br>
        </div>
        <div class="bg-white w-[100%] absolute bottom-0 rounded-lg">
          <div class="py-4">
            <a class="px-3" href="https://linkedin.com/in/sandi-krivec-28428b65" target="_blank">LinkedIn</a>
            <a class="px-3" href="https://github.com/schnapi" target="_blank">GitHub</a>
            <a class="px-3" href="https://gitlab.com/sandi.krivec" target="_blank">GitLab</a>
          </div>
        </div>
      </div>
      <div class="col-span-1 p-16">
        <h4>Here's who I am and what I can do for you</h4>
        <br>
        <h6>Python expert specialized in:</h6>
        <ul>
          <li>- Software architecture</li>
          <li>- Workflows automation (GitLab CI/CD, Jenkins)</li>
          <li>- Web development (Django, Celery, Vue, Bokeh)</li>
          <li>- Android development</li>
          <li>- Databases: SQLite, PostgreSQL, Redis, LMDB</li>
          <li>- Others: MQTT, WebSockets, Docker, CSS, HTML</li>
        </ul>
        <br>
        I use my skills to help businesses optimize their workflows and achieve their goals. Feel free to browse
        my portfolio and contact me to discuss how I can help you.
      </div>
    </div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
