<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import { sunIcon } from './icons'
import { reactive, ref, computed } from 'vue'
// import { ref, reactive, nextTick, PropType, onMounted, Ref, watchEffect } from 'vue'
import MultiSelect from 'primevue/multiselect';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

import Modal from './Modal.vue'
import { Project, ProjectLabel } from './interfaces'
import * as Api from "./api"
import * as Utils from "./utils"

// TODO
// add sorting in table by different filter
// add database, dockergitlab
let modal = reactive({ text: "", title: "", visible: false })
// let selectedProjects: any = []
let url = ""

let projects: Project[] = reactive([])
let loadingData = ref("loading...")

// let TAGS_FILTER = ref("TAG_FILTER")
// FilterService.register(TAGS_FILTER.value, (value, filter): boolean => {
//   console.log(value, filter);
//   if (filter.length == 0) return true;
//   for (let el of filter) {
//     if (el.project.job_position == value) {
//       return true;
//     }
//   }
//   return false;
// });
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'project.name': { value: '', matchMode: FilterMatchMode.CONTAINS },
  'project.job_position': { value: null, matchMode: FilterMatchMode.IN },
  // 'project.job_position': { value: null, matchMode: TAGS_FILTER.value }
});


Api.get(`${url}/api/resume/`, response => {
  loadingData.value = ""
  projects.push(...response.data.results)
  projects.forEach((it: any) => {
    it.project.date_start_display = Utils.formatDatetime(it.project.date_start, "MMM YYYY")
    it.project.date_end_display = Utils.formatDatetime(it.project.date_end, "MMM YYYY")
  })
}, error => {
  loadingData.value = `<span class="text-red-500">${error}</span>`
}, undefined, {
})
// function filterProjects(event: any) {
//   let selection = event.value.map((it: any) => it.value.project.name)
//   console.log(selection)
//   projects.forEach((project: any) => {
//     if (selection.length == 0 || selection.includes(project.value.project.name)) {
//       project.visible = true
//     } else {
//       project.visible = false
//     }
//   })
// }
function showDescription(value: Project) {
  modal.visible = true
  modal.text = value.project.description
  modal.title = value.project.name
}

const jobPositions = computed(() => {
  return [...new Set(projects.map(it => it.project.job_position))]
})
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
    <br>
    <DataTable removableSort v-model:filters="filters" :value="projects" dataKey="id" filterDisplay="row"
      :globalFilterFields="['company.name', 'project.date_start_display', 'project.date_end_display', 'project.job_position', 'project.name']"
      class="border mt-4 p-4 rounded-lg overflow-auto">
      <template #header>
        <h4>Experience</h4>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="company.name" sortable header="Company">
      </Column>
      <Column header="Date start/end">
        <template #body="{ data }">
          <template v-if="data.project.date_start || data.project.date_end">
            {{ data.project.date_start_display }} - {{ data.project.date_end_display }}
          </template>
        </template>
      </Column>
      <Column field="project.job_position" sortable header="Position" filterField="project.job_position"
        :showFilterMenu="true" :showFilterMatchModes="false">
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="jobPositions" optionLabel=""
            placeholder="Any" style="min-width: 14rem" :maxSelectedLabels="1">
            <!-- <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option.label }}</span>
              </div>
            </template> -->
          </MultiSelect>
        </template>
      </Column>
      <Column field="project.name" sortable header="Project name">
        <template #body="{ data }">
          {{ data.project.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
        </template>
      </Column>
      <Column header="Description">
        <template #body="{ data }">
          <a class="text-sm cursor-pointer" @click="showDescription(data)">Show More</a>
        </template>
      </Column>
      <Column header="Link">
        <template #body="{ data }">
          <a target="_blank" v-if="data.project.url" :href="data.project.url" class="text-sm">Link</a>
        </template>
      </Column>
    </DataTable>
    <!-- <div class="border mt-4 p-4 rounded-lg overflow-auto">
      <h4>Experience</h4>
      <div class="p-3" v-if="loadingData != ''" v-html="loadingData"></div>
      <table v-else class=" table mt-2">
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
                <span>{{ project.company.name }}</span>
                <div v-if="project.project.date_start || project.project.date_end">
                  <i>{{ Utils.formatDatetime(project.project.date_start, "MMM YYYY") }} - {{
                    Utils.formatDatetime(project.project.date_end, "MMM YYYY")
                  }}</i>
                </div>
              </td>
              <td>{{ project.project.job_position }}</td>
              <td>{{ project.project.name }}</td>
              <td><a class="text-sm cursor-pointer"
                  @click="modal.visible = true; modal.text = project.project.description; modal.title = project.project.name;">Show
                  More</a></td>
              <td><a target="_blank" v-if="project.project.url" :href="project.project.url" class="text-sm">Link</a>
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="100%"></td>
          </tr>
        </tbody>
      </table>

    </div> -->
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
