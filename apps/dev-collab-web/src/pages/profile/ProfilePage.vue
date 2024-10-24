<!-- src/App.vue -->
<template>
  <div class="d-flex rounded rounded-5">
    <div class="rounded-start-5 rounded-5 left-panel shadow-lg">
      <div class="text-center bg-red-1 rounded-top-5 py-6">
        <div
          class="bg-color-white d-inline rounded-circle profile-icon m-4 px-6 py-1 fw-bolder border border-5"
        >
          U
        </div>
      </div>
      <div class="p-4">
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-account side-icon"></i>
          </div>
          <div class="w-100">
            <div class="d-flex">
              <div class="fs-6">Username</div>
              <div class="ms-auto fs-sm">Change</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">CodeMonkey</div>
          </div>
        </div>
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-email side-icon"></i>
          </div>
          <div class="w-100">
            <div>
              <div class="fs-6">E-Mail</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5 text-break">CodeMonkey@gmail.com</div>
          </div>
        </div>
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-lock side-icon"></i>
          </div>
          <div class="w-100">
            <div class="d-flex">
              <div class="fs-6">Password</div>
              <div class="ms-auto fs-sm">Change</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">******</div>
          </div>
        </div>
        <hr />
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-shield side-icon"></i>
          </div>
          <div class="w-100">
            <div>
              <div>Security</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">Email Sign-On</div>
          </div>
          <div><div>Button</div></div>
        </div>
        <div class="bg-red-1 rounded-4 p-3 white-text-1 text-center my-4">Delete My Account</div>
      </div>
    </div>

    <div class="right-panel">
      <div class="mx-5 h-100 rounded-5 px-5 shadow">
        <div class="d-flex mb-auto pt-4">
          <div class="red-text-1 fs-4 fw-bolder">Team Management</div>
          <button
            class="bg-red-1 white-text-1 px-3 rounded-4 fs-4 ms-auto"
            @click="toggleCreateModal"
          >
            +
          </button>
        </div>
        <hr />
        <div
          class="border border-2 shadow px-4 pt-2 rounded-4 cursor-pointer"
          @click="toggleTeamModal"
        >
          <div class="d-flex jusifiy-content-center align-items-center">
            <div class="w-100">Team</div>
            <button
              class="bg-red-1 white-text-1 px-3 rounded-4 fs-sm ms-auto d-flex jusifiy-content-center align-items-center"
            >
              <i class="mdi mdi-logout me-2"></i> Leveas
            </button>
          </div>
          <div class="d-flex pb-2 jusifiy-content-center align-items-center">
            <div class="d-flex align-items-center jusifiy-content-center">
              <div class="fs-3 fw-bolder red-text-1">Code Monkey</div>
              <!--div class="fs-sm ms-4">[Group Admin]</div-->
            </div>
            <div class="ms-auto fw-bolder">Group Admin</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="show_create_modal"
    class="position-fixed vw-100 vh-100 bg-color-gray-50 text-center top-0 left-0 z-999 d-flex shadow-lg"
  >
    <div class="create-team-modal m-auto w-75 h-75 bg-color-white rounded-5">
      <div class="modal-content h-100 w-100">
        <!-- Add your form or other content here -->
        <button
          @click="toggleCreateModal"
          class="position-absolute me-4 mt-4 right-0 top-0 rounded-5 px-2 fs-4 bg-red-1 white-text-1"
        >
          <i class="mdi mdi-close"></i>
        </button>
        <div class="d-flex w-100 h-100">
          <div class="w-50 bg-red-1 white-text-1 h-100 rounded-start-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text bg-color-white red-text-1 rounded-circle">
                <i class="mdi mdi-plus"></i>
              </div>
              <div class="py-2 fs-2 fw-bolder">Create a Team</div>
            </div>

            <div class="my-auto">
              <div>
                <input
                  class="bg-color-white red-text-1 fs-2 px-4 w-75 py-3 rounded-4"
                  placeholder="Team Name"
                />
              </div>
              <div class="mt-4">
                <button class="bg-color-white red-text-1 fs-4 w-75 px-5 py-2 rounded-4 shadow">
                  <i class="mdi mdi-plus"></i> Create
                </button>
              </div>
            </div>
          </div>
          <div class="w-50 red-text-1 rounded-end-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text rounded-circle bg-red-1 white-text-1">
                <i class="mdi mdi-account-multiple"></i>
              </div>
              <div class="py-2 fs-2 fw-bolder">Join a Team</div>
            </div>

            <div class="my-auto">
              <div>
                <input
                  class="red-text-1 fs-2 px-4 w-75 py-3 rounded-4 red-border-1 border-2 border"
                  placeholder="Invitation Code"
                />
              </div>
              <div class="mt-4">
                <button class="fs-4 w-75 px-5 py-2 rounded-4 bg-red-1 white-text-1 shadow">
                  <i class="mdi mdi-plus"></i> Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="show_team_modal"
    class="position-fixed vw-100 vh-100 bg-color-gray-50 text-center top-0 left-0 z-999 d-flex shadow-lg"
  >
    <div class="create-team-modal m-auto w-75 h-75 bg-color-white rounded-5">
      <div class="modal-content h-100 w-100">
        <!-- Add your form or other content here -->
        <button
          @click="toggleTeamModal"
          class="position-absolute me-4 mt-4 right-0 top-0 rounded-5 px-2 fs-4 bg-red-1 white-text-1"
        >
          <i class="mdi mdi-close"></i>
        </button>
        <div class="d-flex w-100 h-100">
          <div class="w-50 bg-red-1 white-text-1 h-100 rounded-start-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text bg-color-white red-text-1 rounded-circle">
                <div class="px-3 d-inline">T</div>
              </div>
              <div class="py-2 fs-2 fw-bolder">Team Name</div>
            </div>

            <div class="my-auto">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <div class="w-75 position-relative">
                  <input
                    class="bg-color-white red-text-1 fs-2 px-4 w-100 py-3 rounded-4 d-block"
                    placeholder="Invitation Code"
                    value="IaC128S@S"
                    readonly
                  />
                  <button
                    class="position-absolute right-0 top-0 me-4 h-100 d-flex align-items-center justify-content-center gray-text-2 fs-2"
                  >
                    <i class="mdi mdi-refresh"></i>
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <button class="bg-color-white red-text-1 fs-4 w-75 px-5 py-2 rounded-4 shadow">
                  <i class="mdi mdi-trash-can"></i> Delete Team
                </button>
              </div>
            </div>
          </div>
          <div class="w-50 red-text-1 rounded-end-4 d-flex flex-column py-4">
            <div class="fw-bolder fs-2 text-start px-4">Team Member</div>
            <div class="text-start px-4 w-100">
              <table class="w-100 text-break">
                <thead class="bg-red-1 white-text-1 fw-bolder">
                  <th class="p-2 text-start">Username</th>
                  <th class="p-2 text-center">Email</th>
                  <th class="p-2 text-center">Roles</th>
                  <th class="p-2 text-center">Action</th>
                </thead>
                <tbody class="gray-text-2">
                  <td class="red-text-1 fw-bolder">CodeMonkey@gmail.com</td>
                  <td>CodeMonkey@gmail.com</td>
                  <td>Group Admin</td>
                  <td class="d-flex align-items-center justify-content-center p-2">
                    <div class="bg-red-1 white-text-1 fs-6 px-2 py-1 rounded-4 mx-2">
                      <i class="mdi mdi-account-minus"></i>
                    </div>
                    <div class="bg-red-1 white-text-1 fs-6 px-2 py-1 rounded-4 mx-2">
                      <i class="mdi mdi-chevron-up-circle"></i>
                    </div>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const show_create_modal = ref(false)
    const show_team_modal = ref(false)
    const toggleCreateModal = () => {
      show_create_modal.value = !show_create_modal.value
    }
    const toggleTeamModal = () => {
      show_team_modal.value = !show_team_modal.value
    }

    return { show_create_modal, show_team_modal, toggleCreateModal, toggleTeamModal }
  }
}
</script>

<style lang="scss" scoped>
.z-999 {
  z-index: 9999;
}
.fs-sm {
  font-size: 12px;
}
.left-panel {
  width: 25%;
}
.right-panel {
  width: 75%;
}
.side-icon {
  font-size: 2rem;

  color: $gray-2;
}
.red-text-1 {
  color: $red-1;
}
.large-text {
  font-size: 6rem;
}
.bg-red-1 {
  background-color: $red-1;
}
.bg-color-gray {
  background-color: $gray-2;
}
.bg-color-gray-50 {
  background-color: rgba($gray-2, 0.75); // Assuming $gray-2 is a color variable
}
.red-border-1 {
  border-color: $red-1 !important;
}
.bg-color-white {
  background-color: $vt-c-white;
}
.gray-text-2 {
  color: $gray-2;
}
.white-text-1 {
  color: $vt-c-white;
}
.profile-icon {
  font-size: 8rem;
}
</style>
