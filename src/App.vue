<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div style="text-align: left;">
    <table style="width: 100%; border-spacing: 30px;">
      <tbody>
        <tr>
          <td style="vertical-align:top; text-align: centhttps://stackoverflow.com/tagser">
            <img src="./assets/sandikrivec.webp" style="width:168px;height:168px;object-fit:cover;border-radius: 50%;"
              width="168" height="168" fetchpriority="high">
            <h2>Sandi Krivec</h2>
            <div style="position:relative;width: 60px;height: 3px;border-top:2px solid blue;margin:auto"></div>
            <p className="underline font-bold" style="letter-spacing:0.25em;font: sans-serif;">Software Engineer</p>
          </td>
          <td>
            <h1>Hi</h1>
            <h3>Here's who I am and what I can do for you</h3>
            Python expert specialized in:
            <ul>
              <li>Software architecture</li>
              <li>Workflows automation (GitLab CI/CD, Jenkins, Docker)</li>
              <li>Web (Django, Vue, Bokeh)</li>
              <li>Android applications</li>
              <li>CAN communication</li>
            </ul>
            I use my skills to help businesses optimize their workflows and achieve their goals. Feel free to browse my
            portfolio and contact me to discuss how I can help you.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
