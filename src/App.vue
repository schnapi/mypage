<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import { sunIcon } from './icons'
import { reactive } from 'vue'
// import { ref, reactive, nextTick, PropType, onMounted, Ref, watchEffect } from 'vue'
import MultiSelect from 'primevue/multiselect';
import Modal from './Modal.vue'
import { Project } from './interfaces'

let modal = reactive({ text: "", title: "", visible: false })
let selectedProjects: any = []
let _projects: Project[] = [{
  name: "Python Testing Framework", dateFrom: "Oct 2021", dateTo: "", company: "Magna PowerTrain", jobPosition: "Python Engineer", link: "",
  description: `
  • Architecture and implementation of state of the art Python Framework for generating
  and executing test cases on Testbeds, HIL's and custom virtual environment.<br>
  • Jenkins and Gitlab CI pipelines for checking code quality, unit tests, reports creation.<br>
  • Django backend, Vue front-end for tracking and managing test results with WebSockets.<br>
  • Architecture of database for storing results.<br>
  • Code reviews.`,
}, {
  name: "Python and Android applications for automotive industry", dateFrom: "Mar 2018", dateTo: "2021", company: "AVL ", jobPosition: "Software Developer", link: "",
  description: `
  <b>Python:</b><br>
  • Data validation tool for comparing HIL, Chassis Dyno, etc. measurements.<br>
  • Merging, aligning, validating measurements from different sources (XION, CANOE, PUMA).<br><br>
  <b>Android:</b><br>
  • Two applications for driving cars (MQTT protocol). Communication over WIFI or Bluetooth.<br>
  • Application for reading values from the car (OBD). Based on <a href="https://github.com/fr3ts0n/AndrOBD.">https://github.com/fr3ts0n/AndrOBD</a>`,
}, {
  name: "Data Science", dateFrom: "Jul 2017", dateTo: "Jan 2018", company: "Fedger io", jobPosition: "Python Developer", link: "",
  description: `
  • Website scraping (scrapy tool) and parsing (beautifulsoup library). Using google cloud
  (Pub/Sub client libraries) for storing and later receiving (analyzing) data, caching, etc.<br>
  • Machine learning: unsupervised learning (clustering algorithms like k-means, gaussian
  mixture model), supervised learning (Random forest, SVM, Bayesian classifier with
  TF-IDF.); cross validation for testing quality of classifiers.<br>
  • Feature selection (chi2, mutual information, random forest).`,
}, {
  name: "Android/Windows chat application", dateFrom: "May 2017", dateTo: "Jun 2017", company: "Biokoda", jobPosition: "Software Developer", link: "",
  description: `
  • Developing chat application modules for windows mobile devices.`,
}, {
  name: "Car UI application developed in Android Compose", dateFrom: "", dateTo: "", company: "", jobPosition: "", link: "https://drive.google.com/file/d/14gf54BNR7zHN1WTFPdAo2j7cFoXOA18m/view?usp=drivesdk",
  description: `
  • Displaying animated speed, battery status on the Android tablet.<br>
  • Implemented CAN (CAN232) communication between Android device and a "Car".`,
}
]
// Additional projects(outside of the regular work)
// • Car UI application developed in Android Compose
// • Displaying animated speed, battery status on the Android tablet..
//   https://drive.google.com/fle/d/14gf54BNR7zHN1WTFPdAo2j7cFoXOA18m/view?us
// p = share_link
// • Implemented CAN(CAN232) communication between Android device and a "Car".
// • API development for crypto in Dart programming language.
let projects: any = reactive(_projects.map(it => ({ value: it, label: it.name })))

function filterProjects(event: any) {
  let selection = event.value.map((it: any) => it.value.name)
  console.log(selection)
  projects.forEach((project: any) => {
    if (selection.length == 0 || selection.includes(project.value.name)) {
      project.visible = true
    } else {
      project.visible = false
    }
  })
}
</script>

<template>
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
              <span>{{ project.value.company }}</span>
              <div v-if="project.value.dateFrom || project.value.dateTo">
                <i>{{ project.value.dateFrom }} - {{ project.value.dateTo
                  }}</i>
              </div>

            </td>
            <td>{{ project.value.jobPosition }}</td>
            <td>{{ project.value.name }}</td>
            <td><a class="text-sm cursor-pointer"
                @click="modal.visible = true; modal.text = project.value.description; modal.title = project.value.name;">Show
                More</a></td>
            <td><a target="_blank" v-if="project.value.link" :href="project.value.link" class="text-sm">Link</a></td>
          </tr>
        </template>
        <tr>
          <td colspan="100%"></td>
        </tr>
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
