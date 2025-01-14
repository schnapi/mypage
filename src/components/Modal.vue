<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Modal } from '../interfaces';

const props = defineProps({
    modal: { type: Object as PropType<Modal>, required: true },
})

let visible = ref<boolean>(false)

function clickOutside(el: any) {
    if (!props.modal.visible) return
    console.info(el)
    if (visible.value == true) {
        visible.value = props.modal.visible = false
    } else visible.value = props.modal.visible = true
}

</script>

<template>
    <div v-show="visible" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-black text-left shadow-xl transition-all sm:my-8 sm:w-full 
                    sm:max-w-lg"> <!-- TODO -->
                    <div style="box-shadow: 0 1px 4px rgba(0, 0, 0, .6);" class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                        v-click-outside="clickOutside">
                        <h4 class="mb-4">{{ props.modal.title }}</h4>
                        <div v-html="props.modal.text"></div>
                        <!-- <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 class="text-base font-semibold text-gray-900" id="modal-title">Deactivate account
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Are you sure you want to deactivate your account?
                                        All of your data will be permanently removed. This action cannot be undone.</p>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="button"
                            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                        <button type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xxl">
            <div class=" modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-text="props.modal!.title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-html="props.modal!.text"></div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped></style>