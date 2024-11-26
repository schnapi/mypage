<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import { sunIcon } from './icons'
import { reactive } from 'vue'
// import { ref, reactive, nextTick, PropType, onMounted, Ref, watchEffect } from 'vue'
import MultiSelect from 'primevue/multiselect';

import Modal from './Modal.vue'
import { Project, ProjectLabel } from './interfaces'
import * as Api from "./api"
import * as Utils from "./utils"


// TODO
// add sorting in table by different filter
// add database, dockergitlab
let modal = reactive({ text: "", title: "", visible: false })
let selectedProjects: any = []
let url = ""

let _projects: Project[] = []
let projects: ProjectLabel[] = reactive([])

Api.get(`${url}/api/resume/`, response => {
  _projects = response.data.results
  projects.push(..._projects.map(it => ({ value: it, label: it.project.name })))
  //   {
  //     "value": {
  //         "id": 1,
  //         "company": {
  //             "id": 1,
  //             "name": "Magna PowerTrain"
  //         },
  //         "project": {
  //             "id": 1,
  //             "name": "Python Testing Framework",
  //             "job_position": "Python Engineer",
  //             "description": "\n                    • Architecture and implementation of state of the art Python Framework for generating\n                    and executing test cases on Testbeds, HIL's and custom virtual environment.<br>\n                    • Jenkins and Gitlab CI pipelines for checking code quality, unit tests, reports creation.<br>\n                    • Django backend, Vue front-end for tracking and managing test results with WebSockets.<br>\n                    • Architecture of database for storing results.<br>\n                    • Code reviews.",
  //             "url": "",
  //             "date_start": "2021-10-01",
  //             "date_end": null
  //         },
  //         "user": {
  //             "username": "sandi"
}, error => {
}, undefined, {
})
function filterProjects(event: any) {
  let selection = event.value.map((it: any) => it.value.project.name)
  console.log(selection)
  projects.forEach((project: any) => {
    if (selection.length == 0 || selection.includes(project.value.project.name)) {
      project.visible = true
    } else {
      project.visible = false
    }
  })
}
</script>

<template>
  <i class="pi pi-angle-up"></i>
  <i class="pi pi-angle-down"></i>
  <span class="pi pi-search"></span>
  <span class="pi pi-user"></span>
  <!-- ABOUT ME -->
  <div class="text-left font-sans text-black dark:text-white">
    <Modal :modal="modal"></Modal>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-lg w-full">
      <div class="col-span-1 text-center text-nowrap relative bg-[#f4ece6] dark:bg-slate-800  rounded-lg"
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
    <div class="border mt-4 p-4 rounded-lg overflow-auto">
      <h4>Experience</h4>
      <table class="table mt-2">
        <tbody>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Name<br>
              <MultiSelect @change="filterProjects($event)" v-model="selectedProjects" :options="projects"
                optionLabel="label" filter placeholder="Project name" class="w-full md:w-80" />
            </th>
            <th>Description</th>
            <th>Link</th>
          </tr>
          <template v-for="project in projects">
            <tr v-if="project.visible != false">
              <td>
                <span>{{ project.value.company.name }}</span>
                <div v-if="project.value.project.date_start || project.value.project.date_end">
                  <i>{{ Utils.formatDatetime(project.value.project.date_start, "MMM YYYY") }} - {{
                    Utils.formatDatetime(project.value.project.date_end, "MMM YYYY")
                  }}</i>
                </div>

              </td>
              <td>{{ project.value.project.job_position }}</td>
              <td>{{ project.value.project.name }}</td>
              <td><a class="text-sm cursor-pointer"
                  @click="modal.visible = true; modal.text = project.value.project.description; modal.title = project.value.project.name;">Show
                  More</a></td>
              <td><a target="_blank" v-if="project.value.project.url" :href="project.value.project.url"
                  class="text-sm">Link</a></td>
            </tr>
          </template>
          <tr>
            <td colspan="100%"></td>
          </tr>
        </tbody>
      </table>

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
